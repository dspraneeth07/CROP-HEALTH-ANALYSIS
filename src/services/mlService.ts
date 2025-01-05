import { pipeline } from "@huggingface/transformers";

let classifier: any = null;

export const initializeML = async () => {
  try {
    classifier = await pipeline(
      "image-classification",
      "Xenova/crop-disease-detection"
    );
    console.log("ML model initialized successfully");
  } catch (error) {
    console.error("Error initializing ML model:", error);
    throw error;
  }
};

export const analyzeCropDisease = async (imageUrl: string, cropType: string) => {
  try {
    if (!classifier) {
      await initializeML();
    }
    
    console.log(`Analyzing ${cropType} image:`, imageUrl);
    const results = await classifier(imageUrl);
    return results;
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
};