import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

def extract_text_from_image(base64_image: str) -> dict:
    """
    Calls Google Gemini 1.5 Flash to extract problem text from a base64 image.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return {"success": False, "error": "GEMINI_API_KEY is missing in backend/.env"}

    genai.configure(api_key=api_key)
    
    # Clean the base64 string if it contains the data URI prefix
    # e.g., data:image/png;base64,iVBORw0...
    mime_type = "image/jpeg"
    if "base64," in base64_image:
        header, base64_data = base64_image.split("base64,")
        if "image/png" in header:
            mime_type = "image/png"
        elif "image/webp" in header:
            mime_type = "image/webp"
        base64_image = base64_data

    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        prompt = (
            "You are an expert OCR system specializing in Data Structures and Algorithms problems. "
            "Extract all the text from this image exactly as it appears. "
            "If there is code, include it inside markdown code blocks. "
            "If there are constraints, preserve them clearly. "
            "Do NOT add any conversational filler, explanations, or introductory text. "
            "Just return the raw problem text and nothing else."
        )

        response = model.generate_content([
            {'mime_type': mime_type, 'data': base64_image},
            prompt
        ])
        
        extracted_text = response.text.strip()
        
        if not extracted_text:
            return {"success": False, "error": "Could not extract any text from the image."}
            
        return {"success": True, "text": extracted_text}
        
    except Exception as e:
        print(f"Error in extract_text_from_image: {e}")
        return {"success": False, "error": str(e)}
