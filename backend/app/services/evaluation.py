import re
from typing import Tuple, List
import numpy as np

# Lazy load sentence transformers
_model = None

def get_similarity_model():
    """Lazy load the sentence transformer model"""
    global _model
    if _model is None:
        try:
            from sentence_transformers import SentenceTransformer
            _model = SentenceTransformer('all-MiniLM-L6-v2')
        except Exception as e:
            print(f"Warning: Could not load sentence transformer: {e}")
            _model = False  # Mark as failed
    return _model if _model is not False else None


def rule_based_score(prompt: str, challenge_type: str) -> Tuple[float, List[str]]:
    """
    Rule-based scoring (0-10)
    +2 if role is mentioned
    +2 if output format is specified
    +2 if constraints are specified (length / style / tone)
    +2 if task is clearly described
    +2 if audience or context is mentioned
    """
    score = 0
    suggestions = []
    
    prompt_lower = prompt.lower()
    
    # Check for role (Act as, You are, As a, etc.)
    role_keywords = ['act as', 'you are', 'as a', 'as an', 'role:', 'persona:', 'you will be']
    has_role = any(keyword in prompt_lower for keyword in role_keywords)
    if has_role:
        score += 2
    else:
        suggestions.append("Consider specifying a role (e.g., 'Act as a...' or 'You are a...')")
    
    # Check for output format
    format_keywords = ['format:', 'output:', 'return', 'generate', 'write in', 'structure:', 'json', 'list', 'table', 'paragraph']
    has_format = any(keyword in prompt_lower for keyword in format_keywords)
    if has_format:
        score += 2
    else:
        suggestions.append("Specify the desired output format (e.g., 'Format: bullet points' or 'Generate a JSON')")
    
    # Check for constraints (length, style, tone)
    constraint_keywords = ['length:', 'words', 'characters', 'sentences', 'tone:', 'style:', 
                          'formal', 'informal', 'brief', 'detailed', 'maximum', 'minimum',
                          'short', 'long', 'concise', 'verbose', 'professional', 'casual']
    has_constraints = any(keyword in prompt_lower for keyword in constraint_keywords)
    if has_constraints:
        score += 2
    else:
        suggestions.append("Add constraints (e.g., 'Length: 200 words' or 'Tone: professional')")
    
    # Check for clear task description (length and specificity)
    has_clear_task = len(prompt.split()) >= 10 and ('?' in prompt or any(verb in prompt_lower for verb in ['create', 'write', 'generate', 'describe', 'explain', 'make']))
    if has_clear_task:
        score += 2
    else:
        suggestions.append("Provide a clear and specific task description with action verbs")
    
    # Check for audience or context
    audience_keywords = ['audience:', 'for', 'targeted at', 'context:', 'background:', 'scenario:', 'situation:', 'beginners', 'experts', 'students', 'professionals']
    has_audience = any(keyword in prompt_lower for keyword in audience_keywords)
    if has_audience:
        score += 2
    else:
        suggestions.append("Mention the target audience or context (e.g., 'For beginners' or 'Context: business meeting')")
    
    return score, suggestions


def similarity_score(generated_output: str, expected_output: str) -> float:
    """
    Calculate semantic similarity between generated and expected output
    Returns score 0-10
    """
    if not expected_output or not generated_output:
        return 5.0  # Neutral score if no comparison possible
    
    model = get_similarity_model()
    if model is None:
        # Fallback to simple keyword matching
        return keyword_similarity(generated_output, expected_output)
    
    try:
        # Encode both texts
        embeddings = model.encode([generated_output, expected_output])
        
        # Calculate cosine similarity
        similarity = np.dot(embeddings[0], embeddings[1]) / (
            np.linalg.norm(embeddings[0]) * np.linalg.norm(embeddings[1])
        )
        
        # Convert to 0-10 scale
        score = float(similarity) * 10
        return max(0, min(10, score))
    
    except Exception as e:
        print(f"Error calculating similarity: {e}")
        return keyword_similarity(generated_output, expected_output)


def keyword_similarity(text1: str, text2: str) -> float:
    """Fallback keyword-based similarity"""
    words1 = set(text1.lower().split())
    words2 = set(text2.lower().split())
    
    if not words1 or not words2:
        return 0.0
    
    intersection = words1.intersection(words2)
    union = words1.union(words2)
    
    jaccard = len(intersection) / len(union)
    return jaccard * 10


def evaluate_prompt(
    prompt: str, 
    generated_output: str, 
    expected_output: str,
    challenge_type: str
) -> dict:
    """
    Main evaluation function
    Returns evaluation result with score, feedback, and suggestions
    """
    # Get rule-based score
    rule_score, suggestions = rule_based_score(prompt, challenge_type)
    
    # Get similarity score
    sim_score = similarity_score(generated_output, expected_output)
    
    # Calculate final score (weighted average)
    # 40% rule-based, 60% similarity
    final_score = (rule_score * 0.4) + (sim_score * 0.6)
    final_score = round(final_score, 2)
    
    # Generate feedback
    feedback = generate_feedback(final_score, rule_score, sim_score, suggestions)
    
    return {
        "score": final_score,
        "feedback": feedback,
        "rule_score": rule_score,
        "similarity_score": round(sim_score, 2),
        "suggestions": suggestions
    }


def generate_feedback(final_score: float, rule_score: float, sim_score: float, suggestions: List[str]) -> str:
    """Generate human-readable feedback"""
    feedback_parts = []
    
    # Overall assessment
    if final_score >= 8:
        feedback_parts.append("🎉 Excellent work! Your prompt is well-structured and effective.")
    elif final_score >= 6:
        feedback_parts.append("✅ Good job! Your prompt shows solid understanding.")
    elif final_score >= 4:
        feedback_parts.append("📝 Fair attempt. There's room for improvement.")
    else:
        feedback_parts.append("💡 Keep practicing! Let's work on improving your prompt.")
    
    # Specific scores
    feedback_parts.append(f"\n\n**Breakdown:**")
    feedback_parts.append(f"- Prompt Structure Score: {rule_score}/10")
    feedback_parts.append(f"- Output Quality Score: {round(sim_score, 2)}/10")
    feedback_parts.append(f"- Final Score: {final_score}/10")
    
    # Suggestions
    if suggestions:
        feedback_parts.append(f"\n\n**Suggestions for improvement:**")
        for i, suggestion in enumerate(suggestions, 1):
            feedback_parts.append(f"{i}. {suggestion}")
    
    return "\n".join(feedback_parts)


def get_auto_help(prompt: str, sample_prompt: str) -> str:
    """
    Auto-help for low scores
    Shows what's missing and provides a sample
    """
    _, suggestions = rule_based_score(prompt, "general")
    
    help_text = "**Auto-Help Activated** 🚀\n\n"
    help_text += "Your prompt needs improvement. Here's what's missing:\n\n"
    
    for i, suggestion in enumerate(suggestions, 1):
        help_text += f"{i}. {suggestion}\n"
    
    help_text += f"\n\n**Example of a better prompt:**\n{sample_prompt}"
    
    return help_text