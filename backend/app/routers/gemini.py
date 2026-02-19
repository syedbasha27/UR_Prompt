from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import base64
import os
from google import genai
from google.genai import types

router = APIRouter(prefix="/gemini", tags=["gemini"])

class ImageGenerationRequest(BaseModel):
    prompt: str

class TextGenerationRequest(BaseModel):
    prompt: str

@router.post("/generate-text")
async def generate_text(request: TextGenerationRequest):
    try:
        # Use user-provided API key
        API_KEY = os.environ.get("model_api")
        client = genai.Client(api_key=API_KEY)

        # Simply try one widely supported model first without nested try/catch hell
        # 'gemini-1.5-flash' is the safest bet for new keys
        response = client.models.generate_content(
            model='gemini-1.5-flash',
            contents=request.prompt
        )
        
        return {
            "generated_text": response.text
        }
    except Exception as e:
        # If that fails, let's try 'gemini-pro' (1.0)
        print(f"First attempt failed: {e}")
        try:
             client = genai.Client(api_key=API_KEY)
             response = client.models.generate_content(
                model='gemini-pro',
                contents=request.prompt
            )
             return {
                "generated_text": response.text
            }
        except Exception as e2:
             print(f"Second attempt failed: {e2}")
             raise HTTPException(status_code=500, detail=f"Generation failed: {str(e2)}")

@router.post("/generate-image")
async def generate_image(request: ImageGenerationRequest):
    try:
        # Use user-provided API key
        API_KEY = os.environ.get("MODEL_API")
        
        # Initialize GenAI Client
        # Explicitly setting version to 'v1beta' if needed, though default is safer
        client = genai.Client(api_key=API_KEY)
        
        try:
            # Try Imagen 3 first
            response = client.models.generate_images(
                model='imagen-3.0-generate-001',
                prompt=request.prompt,
                config=types.GenerateImagesConfig(
                    number_of_images=1,
                )
            )
        except Exception:
             # Fallback to Imagen 2 if 3 fails
             print("Imagen 3 failed, trying fallback model...")
             try:
                 response = client.models.generate_images(
                    model='imagen-2.0-generate-001', # Attempt fallback
                    prompt=request.prompt,
                    config=types.GenerateImagesConfig(
                        number_of_images=1,
                    )
                 )
             except:
                  # Last resort fallback or re-raise original
                  raise

        if not response.generated_images:
             raise HTTPException(status_code=500, detail="No image generated")

        # Get the first image bytes
        image_bytes = response.generated_images[0].image.image_bytes
        
        # Encode to base64 for frontend display
        base64_image = base64.b64encode(image_bytes).decode('utf-8')
        image_data_uri = f"data:image/png;base64,{base64_image}"

        return {
            "image_url": image_data_uri,
            "description": f"AI generated image based on: {request.prompt}",
            "generated_output_text": "Image generated successfully." 
        }

    except Exception as e:
        print(f"Error generating image: {e}")
        raise HTTPException(status_code=500, detail=str(e))

