from fastapi import APIRouter

router = APIRouter(prefix="/challenges", tags=["challenges"])

CHALLENGES = [
    {
        "id": 1,
        "title": "Golden Sunset Beach",
        "description": "Write a prompt that could generate this image of a beautiful sunset over a beach.",
        "level": "beginner",
        "module_type": "image",
        "image_url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
        "expected_output": "A breathtaking golden sunset over a tropical beach with palm trees silhouetted against the orange and purple sky, gentle waves lapping at the sandy shore, warm golden light reflecting on the water",
        "hint": "Think about describing colors, lighting, and specific elements in the scene.",
        "teaching_objective": "Learn to describe visual scenes with specific details like colors, lighting, and composition."
    },
    {
        "id": 2,
        "title": "Mountain Lake Reflection",
        "description": "Write a prompt that could generate this image of a mountain reflected in a calm lake.",
        "level": "beginner",
        "module_type": "image",
        "image_url": "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600",
        "expected_output": "A majestic snow-capped mountain perfectly reflected in a crystal clear alpine lake surrounded by pine trees under a bright blue sky with wispy clouds",
        "hint": "Mention the reflection, water clarity, and surrounding nature elements.",
        "teaching_objective": "Learn to include environmental context and atmospheric details in image prompts."
    },
    {
        "id": 3,
        "title": "Cozy Coffee Shop",
        "description": "Write a prompt that could generate this image of a warm cozy coffee shop interior.",
        "level": "beginner",
        "module_type": "image",
        "image_url": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600",
        "expected_output": "A warm cozy coffee shop interior with wooden tables, soft ambient lighting, steaming cups of coffee, bookshelf in the background, comfortable armchairs, and a rustic aesthetic",
        "hint": "Describe the atmosphere, furniture, lighting, and mood of the place.",
        "teaching_objective": "Learn to convey mood and atmosphere in prompts."
    },
    {
        "id": 4,
        "title": "Welcome Email for New Users",
        "description": "Write a prompt to generate a welcome email for new users signing up to a fitness app.",
        "level": "beginner",
        "module_type": "script",
        "image_url": "",
        "expected_output": "A friendly, motivating welcome email that introduces app features, encourages the user to set their first fitness goal, includes a warm greeting, and ends with a call-to-action button text",
        "hint": "Specify the tone (friendly), the audience (new fitness app user), and what sections the email should have.",
        "teaching_objective": "Learn to specify tone, audience, and structure in prompts."
    },
    {
        "id": 5,
        "title": "Product Description for Headphones",
        "description": "Write a prompt to generate a compelling product description for wireless noise-cancelling headphones.",
        "level": "beginner",
        "module_type": "script",
        "image_url": "",
        "expected_output": "A persuasive product description highlighting key features like noise cancellation, battery life, comfort, sound quality, with benefit-focused language and a compelling call to action",
        "hint": "Include the product type, key features to highlight, target audience, and desired tone.",
        "teaching_objective": "Learn to provide context and constraints for marketing content."
    },
    {
        "id": 6,
        "title": "Futuristic City at Night",
        "description": "Write a prompt that could generate this image of a futuristic cyberpunk city at night.",
        "level": "intermediate",
        "module_type": "image",
        "image_url": "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600",
        "expected_output": "A futuristic cyberpunk cityscape at night with towering neon-lit skyscrapers, holographic advertisements, flying vehicles, rain-slicked streets reflecting colorful neon lights, dense urban atmosphere with fog and dramatic lighting",
        "hint": "Use style keywords like cyberpunk, mention lighting effects, and describe the mood.",
        "teaching_objective": "Learn to use style references and role prompting for image generation."
    },
    {
        "id": 7,
        "title": "Enchanted Forest Path",
        "description": "Write a prompt that could generate this magical forest scene.",
        "level": "intermediate",
        "module_type": "image",
        "image_url": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
        "expected_output": "An enchanted forest path with sunlight filtering through ancient towering trees, mystical fog, glowing mushrooms, fireflies, lush green moss covering the ground, ethereal and magical atmosphere, fantasy art style",
        "hint": "Combine realistic nature elements with fantasy details. Specify an art style.",
        "teaching_objective": "Learn to blend realism with creative elements and specify artistic style."
    },
    {
        "id": 8,
        "title": "Motivational Speech for Students",
        "description": "Write a prompt to generate a 2-minute motivational speech for students who failed their exams.",
        "level": "intermediate",
        "module_type": "script",
        "image_url": "",
        "expected_output": "A heartfelt 2-minute motivational speech addressing students who failed exams, acknowledging their pain, sharing examples of famous failures who succeeded, providing actionable advice for bouncing back, ending with an inspiring call to action",
        "hint": "Specify the role (motivational speaker), audience (failed students), length (2 minutes), tone (empathetic but empowering), and structure.",
        "teaching_objective": "Learn to use role prompting, audience specification, and output format constraints."
    },
    {
        "id": 9,
        "title": "Technical Blog Post on REST APIs",
        "description": "Write a prompt to generate a beginner-friendly technical blog post explaining REST APIs.",
        "level": "intermediate",
        "module_type": "script",
        "image_url": "",
        "expected_output": "A well-structured beginner-friendly blog post about REST APIs with introduction, what REST is, HTTP methods explained with examples, status codes, best practices, code examples, and conclusion",
        "hint": "Define the role (technical writer), audience (beginners), format (blog post with headings), and specific topics to cover.",
        "teaching_objective": "Learn to structure complex content requests with clear format specifications."
    },
    {
        "id": 10,
        "title": "Underwater Ancient Temple",
        "description": "Write a prompt that could generate a photorealistic underwater ancient temple scene.",
        "level": "advanced",
        "module_type": "image",
        "image_url": "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600",
        "expected_output": "A photorealistic underwater scene of an ancient Greek temple ruins covered in coral and marine life, shafts of sunlight penetrating the deep blue water, schools of tropical fish swimming around marble columns, sea turtles, volumetric lighting, 8K resolution, hyperdetailed",
        "hint": "Use technical photography terms, specify resolution, lighting type, and level of detail.",
        "teaching_objective": "Learn advanced prompting with technical specifications, negative prompts, and quality modifiers."
    },
    {
        "id": 11,
        "title": "Business Plan Executive Summary",
        "description": "Write a prompt to generate an executive summary for a startup business plan for an AI-powered tutoring platform.",
        "level": "advanced",
        "module_type": "script",
        "image_url": "",
        "expected_output": "A professional executive summary covering company overview, problem statement, solution, target market, revenue model, competitive advantage, team overview, funding requirements, and financial projections for an AI tutoring startup",
        "hint": "Assign the role of a business consultant, specify all required sections, provide context about the startup, and define the professional tone and format.",
        "teaching_objective": "Learn to craft complex multi-section prompts with role assignment, detailed constraints, and professional formatting."
    },
    {
        "id": 12,
        "title": "Palindrome Checker Function",
        "description": "Write a prompt to generate a Python function that checks if a string is a palindrome, ignoring spaces and punctuation.",
        "level": "advanced",
        "module_type": "code",
        "image_url": "",
        "expected_output": "def is_palindrome(s): cleaned = join(c.lower() for c in s if c.isalnum()) return cleaned == cleaned[::-1]",
        "hint": "Specify the programming language, function signature, edge cases to handle, and ask for clean readable code with comments.",
        "teaching_objective": "Learn to write precise code generation prompts with specifications for language, function signature, edge cases, and code quality."
    },
    {
        "id": 13,
        "title": "Fibonacci Sequence Generator",
        "description": "Write a prompt to generate a Python function that returns the first N numbers of the Fibonacci sequence.",
        "level": "advanced",
        "module_type": "code",
        "image_url": "",
        "expected_output": "def fibonacci(n): if n <= 0: return [] seq = [0, 1] for i in range(2, n): seq.append(seq[-1] + seq[-2]) return seq",
        "hint": "Specify input/output format, handle edge cases like n=0 or n=1, and request efficient implementation.",
        "teaching_objective": "Learn to specify edge cases, input validation, and efficiency requirements in code prompts."
    },
    {
        "id": 14,
        "title": "Word Frequency Counter",
        "description": "Write a prompt to generate a Python function that counts word frequency in a text and returns the top N most common words.",
        "level": "advanced",
        "module_type": "code",
        "image_url": "",
        "expected_output": "def word_frequency(text, n=5): words = text.lower().split() freq = {} for word in words: freq[word] = freq.get(word, 0) + 1 return sorted(freq.items(), key=lambda x: x[1], reverse=True)[:n]",
        "hint": "Specify that the function should handle punctuation, be case-insensitive, and define the return format clearly.",
        "teaching_objective": "Learn to define clear input/output specifications and data transformation requirements."
    }
]


@router.get("/")
def get_all_challenges():
    safe_challenges = []
    for c in CHALLENGES:
        safe_challenges.append({
            "id": c["id"],
            "title": c["title"],
            "description": c["description"],
            "level": c["level"],
            "module_type": c["module_type"],
            "image_url": c["image_url"]
        })
    return safe_challenges


@router.get("/level/{level}")
def get_challenges_by_level(level: str):
    filtered = [c for c in CHALLENGES if c["level"] == level]
    safe_challenges = []
    for c in filtered:
        safe_challenges.append({
            "id": c["id"],
            "title": c["title"],
            "description": c["description"],
            "level": c["level"],
            "module_type": c["module_type"],
            "image_url": c["image_url"]
        })
    return safe_challenges


@router.get("/{challenge_id}")
def get_challenge(challenge_id: int):
    for c in CHALLENGES:
        if c["id"] == challenge_id:
            return {
                "id": c["id"],
                "title": c["title"],
                "description": c["description"],
                "level": c["level"],
                "module_type": c["module_type"],
                "image_url": c["image_url"],
                "hint": c["hint"],
                "test_cases": c.get("test_cases", [])
            }
    return {"error": "Challenge not found"}


@router.get("/next/{level}")
def get_next_challenge(level: str):
    filtered = [c for c in CHALLENGES if c["level"] == level]
    if filtered:
        return {
            "id": filtered[0]["id"],
            "title": filtered[0]["title"],
            "description": filtered[0]["description"],
            "level": filtered[0]["level"],
            "module_type": filtered[0]["module_type"],
            "image_url": filtered[0]["image_url"]
        }
    return {"error": "No challenges found for this level"}


@router.get("/{challenge_id}/hint")
def get_hint(challenge_id: int):
    for c in CHALLENGES:
        if c["id"] == challenge_id:
            return {
                "hint": c["hint"],
                "teaching_objective": c["teaching_objective"]
            }
    return {"error": "Challenge not found"}
