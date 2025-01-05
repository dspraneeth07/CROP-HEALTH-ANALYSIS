import { pipeline } from "@huggingface/transformers";

let classifier: any = null;

const CROP_MODELS: { [key: string]: string } = {
  maize: "Xenova/resnet-50",
  rice: "Xenova/resnet-50",
  wheat: "Xenova/resnet-50",
  cotton: "Xenova/resnet-50",
  sugarcane: "Xenova/resnet-50",
  tomatoes: "Xenova/resnet-50",
  chili: "Xenova/resnet-50",
  bananas: "Xenova/resnet-50",
  coconut: "Xenova/resnet-50",
  groundnut: "Xenova/resnet-50",
  soybean: "Xenova/resnet-50",
  brinjal: "Xenova/resnet-50",
  beans: "Xenova/resnet-50",
  turmeric: "Xenova/resnet-50",
  ginger: "Xenova/resnet-50"
};

export const initializeModel = async (cropType: string) => {
  try {
    console.log(`Initializing model for ${cropType}`);
    const modelName = CROP_MODELS[cropType.toLowerCase()] || CROP_MODELS.maize;
    
    classifier = await pipeline("image-classification", modelName, {
      revision: "main"
    });
    
    console.log("Model initialized successfully");
    return true;
  } catch (error) {
    console.error("Error initializing model:", error);
    throw error;
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
      topk: 5 // Return top 5 predictions
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
    throw error;
  }
};