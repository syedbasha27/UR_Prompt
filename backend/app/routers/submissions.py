from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
import re

router = APIRouter(prefix="/submissions", tags=["submissions"])

CHALLENGES = {
    1: {"expected_output": "A breathtaking golden sunset over a tropical beach with palm trees silhouetted against the orange and purple sky, gentle waves lapping at the sandy shore, warm golden light reflecting on the water", "module_type": "image"},
    2: {"expected_output": "A majestic snow-capped mountain perfectly reflected in a crystal clear alpine lake surrounded by pine trees under a bright blue sky with wispy clouds", "module_type": "image"},
    3: {"expected_output": "A warm cozy coffee shop interior with wooden tables, soft ambient lighting, steaming cups of coffee, bookshelf in the background, comfortable armchairs, and a rustic aesthetic", "module_type": "image"},
    4: {"expected_output": "A friendly, motivating welcome email that introduces app features, encourages the user to set their first fitness goal, includes a warm greeting, and ends with a call-to-action button text", "module_type": "script"},
    5: {"expected_output": "A persuasive product description highlighting key features like noise cancellation, battery life, comfort, sound quality, with benefit-focused language and a compelling call to action", "module_type": "script"},
    6: {"expected_output": "A futuristic cyberpunk cityscape at night with towering neon-lit skyscrapers, holographic advertisements, flying vehicles, rain-slicked streets reflecting colorful neon lights, dense urban atmosphere with fog and dramatic lighting", "module_type": "image"},
    7: {"expected_output": "An enchanted forest path with sunlight filtering through ancient towering trees, mystical fog, glowing mushrooms, fireflies, lush green moss covering the ground, ethereal and magical atmosphere, fantasy art style", "module_type": "image"},
    8: {"expected_output": "A heartfelt 2-minute motivational speech addressing students who failed exams, acknowledging their pain, sharing examples of famous failures who succeeded, providing actionable advice for bouncing back, ending with an inspiring call to action", "module_type": "script"},
    9: {"expected_output": "A well-structured beginner-friendly blog post about REST APIs with introduction, what REST is, HTTP methods explained with examples, status codes, best practices, code examples, and conclusion", "module_type": "script"},
    10: {"expected_output": "A photorealistic underwater scene of an ancient Greek temple ruins covered in coral and marine life, shafts of sunlight penetrating the deep blue water, schools of tropical fish swimming around marble columns, sea turtles, volumetric lighting, 8K resolution, hyperdetailed", "module_type": "image"},
    11: {"expected_output": "A professional executive summary covering company overview, problem statement, solution, target market, revenue model, competitive advantage, team overview, funding requirements, and financial projections for an AI tutoring startup", "module_type": "script"},
    12: {"expected_output": "def is_palindrome(s): cleaned = join(c.lower() for c in s if c.isalnum()) return cleaned == cleaned[::-1]", "module_type": "code"},
    13: {"expected_output": "def fibonacci(n): if n <= 0: return [] seq = [0, 1] for i in range(2, n): seq.append(seq[-1] + seq[-2]) return seq", "module_type": "code"},
    14: {"expected_output": "def word_frequency(text, n=5): words = text.lower().split() freq = {} for word in words: freq[word] = freq.get(word, 0) + 1 return sorted(freq.items(), key=lambda x: x[1], reverse=True)[:n]", "module_type": "code"},
}


class SubmissionRequest(BaseModel):
    challenge_id: int
    user_prompt: str
    generated_output: str
    generated_code: Optional[str] = None
    generated_image_description: Optional[str] = None


def rule_based_score(prompt):
    score = 0
    feedback = []
    improvements = []

    role_keywords = ["you are", "act as", "imagine you", "as a", "role:", "pretend", "assume you are", "behave as"]
    if any(kw in prompt.lower() for kw in role_keywords):
        score += 2
        feedback.append("Role is specified in your prompt")
    else:
        improvements.append("Try assigning a role (e.g., You are a professional photographer...)")

    format_keywords = ["format:", "output:", "write as", "in the form of", "structure:", "list", "bullet points",
                        "paragraph", "json", "markdown", "table", "step by step", "numbered"]
    if any(kw in prompt.lower() for kw in format_keywords):
        score += 2
        feedback.append("Output format is specified")
    else:
        improvements.append("Specify the desired output format (e.g., Write as a numbered list...)")

    constraint_keywords = ["must", "should", "limit", "maximum", "minimum", "at least", "no more than",
                           "words", "sentences", "tone:", "style:", "formal", "casual", "professional",
                           "within", "between", "exactly", "keep it", "short", "detailed", "brief"]
    if any(kw in prompt.lower() for kw in constraint_keywords):
        score += 2
        feedback.append("Constraints are specified (length/style/tone)")
    else:
        improvements.append("Add constraints like length, tone, or style (e.g., Keep it under 200 words, professional tone)")

    if len(prompt.split()) >= 10:
        score += 2
        feedback.append("Task is clearly described with enough detail")
    else:
        improvements.append("Describe the task more clearly with more detail (aim for at least 10 words)")

    audience_keywords = ["audience:", "for", "target", "reader", "user", "beginner", "expert", "student",
                         "children", "developer", "customer", "client", "manager", "team"]
    if any(kw in prompt.lower() for kw in audience_keywords):
        score += 2
        feedback.append("Audience or context is mentioned")
    else:
        improvements.append("Mention the target audience (e.g., for beginner developers...)")

    return score, feedback, improvements


def simple_similarity_score(prompt, expected):
    prompt_words = set(prompt.lower().split())
    expected_words = set(expected.lower().split())

    if not expected_words:
        return 0

    common_words = prompt_words.intersection(expected_words)
    stop_words = {"a", "an", "the", "is", "are", "was", "were", "in", "on", "at", "to", "for",
                  "of", "with", "and", "or", "but", "not", "this", "that", "it", "be", "as", "by"}
    meaningful_common = common_words - stop_words
    meaningful_expected = expected_words - stop_words

    if not meaningful_expected:
        return 0

    overlap_ratio = len(meaningful_common) / len(meaningful_expected)
    return round(min(overlap_ratio * 10, 10), 1)


def generate_auto_help(prompt, challenge_id):
    challenge = CHALLENGES.get(challenge_id, {})
    module_type = challenge.get("module_type", "script")

    if module_type == "image":
        sample = "You are a professional digital artist. Create a highly detailed image of [describe scene]. The style should be [style]. Include [specific elements]. The lighting should be [lighting type]. The mood is [mood]."
    elif module_type == "code":
        sample = "You are an expert Python developer. Write a clean, well-documented function called [name] that [does what]. It should accept [parameters] and return [return type]. Handle edge cases like [cases]. Include type hints and docstring."
    else:
        sample = "You are a [role] with expertise in [domain]. Write a [format] about [topic] for [audience]. The tone should be [tone]. Include [sections/elements]. Keep it [length constraint]."

    return {
        "message": "Your score is low. Here is help to improve your prompting skills:",
        "missing_elements": [
            "Your prompt may be too short or vague",
            "Try adding a specific role for the AI",
            "Describe exactly what output format you want",
            "Add constraints like length, tone, or style",
            "Mention who the target audience is"
        ],
        "sample_prompt": sample
    }


@router.post("/create")
def create_submission(submission: SubmissionRequest):
    rule_score, feedback, improvements = rule_based_score(submission.user_prompt)

    challenge = CHALLENGES.get(submission.challenge_id, {})
    expected = challenge.get("expected_output", "")
    module_type = challenge.get("module_type", "script")

    text_to_compare = ""
    if module_type == "image":
        if submission.generated_image_description:
            text_to_compare = submission.generated_image_description
        elif submission.generated_output and not submission.generated_output.startswith("data:image") and not submission.generated_output.startswith("http"):
            text_to_compare = submission.generated_output
        else:
             # Fallback if no description provided for image challenge
             # Maybe check if user prompt itself has enough detail to score against expected?
             # For now, let's just use empty string which results in 0 similarity score
             text_to_compare = submission.user_prompt
    auto_help = None
    if final_score < 2:
        auto_help = generate_auto_help(submission.user_prompt, submission.challenge_id)

    return {
        "challenge_id": submission.challenge_id,
        "rule_score": rule_score,
        "similarity_score": similarity,
        "final_score": final_score,
        "max_score": 10,
        "feedback": feedback,
        "improvements": improvements,
        "auto_help": auto_help
    }


@router.post("/score")
def score_submission(submission: SubmissionRequest):
    return create_submission(submission)


@router.get("/")
def get_submissions():
    return []
