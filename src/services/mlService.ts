import { pipeline } from "@huggingface/transformers";

let classifier: any = null;

const CROP_MODELS: { [key: string]: string } = {
  maize: "google/vit-base-patch16-224-in21k",
  rice: "google/vit-base-patch16-224-in21k",
  wheat: "google/vit-base-patch16-224-in21k",
  cotton: "google/vit-base-patch16-224-in21k",
  sugarcane: "google/vit-base-patch16-224-in21k",
  tomatoes: "google/vit-base-patch16-224-in21k",
  chili: "google/vit-base-patch16-224-in21k",
  bananas: "google/vit-base-patch16-224-in21k",
  coconut: "google/vit-base-patch16-224-in21k",
  groundnut: "google/vit-base-patch16-224-in21k",
  soybean: "google/vit-base-patch16-224-in21k",
  brinjal: "google/vit-base-patch16-224-in21k",
  beans: "google/vit-base-patch16-224-in21k",
  turmeric: "google/vit-base-patch16-224-in21k",
  ginger: "google/vit-base-patch16-224-in21k"
};

export const initializeModel = async (cropType: string) => {
  try {
    console.log(`Initializing model for ${cropType}`);
    const modelName = CROP_MODELS[cropType.toLowerCase()] || CROP_MODELS.maize;
    
    // Initialize the classifier with image-classification task
    classifier = await pipeline("image-classification", modelName, {
      quantized: false, // Use non-quantized model for better accuracy
    });
    
    console.log("Model initialized successfully");
    return true;
  } catch (error) {
    console.error("Error initializing model:", error);
    throw error; // Propagate error to handle it in the UI
  }
};

export const analyzeImage = async (imageUrl: string) => {
  if (!classifier) {
    throw new Error("Model not initialized");
  }

  try {
    console.log("Starting image analysis...");
    
    // Convert base64 to blob if needed
    let imageInput = imageUrl;
    if (imageUrl.startsWith('data:image')) {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      imageInput = URL.createObjectURL(blob);
    }

    const results = await classifier(imageInput, {
      topk: 5, // Return top 5 predictions
    });
    
    console.log("Analysis results:", results);
    
    // Map the results to our expected format
    return {
      diseaseName: results[0].label,
      confidence: Math.round(results[0].score * 100),
      description: "Analysis based on visual symptoms detected in the image.",
      affectedArea: Math.round(results[0].score * 100),
      normalRange: "0-5%",
      status: results[0].score > 0.7 ? "severe" : results[0].score > 0.4 ? "moderate" : "healthy",
      causes: [
        "Environmental stress",
        "Pathogenic infection",
        "Nutrient deficiency"
      ],
      prevention: [
        "Regular monitoring",
        "Proper irrigation",
        "Balanced fertilization",
        "Crop rotation"
      ],
      treatment: {
        medicine: "Consult local agricultural expert for specific treatment",
        dosage: "As prescribed",
        frequency: "As needed",
        instructions: "Follow local agricultural extension service guidelines"
      }
    };
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error; // Propagate error to handle it in the UI
  }
};