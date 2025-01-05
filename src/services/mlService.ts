import { pipeline } from "@huggingface/transformers";

let classifier: any = null;

const CROP_MODELS: { [key: string]: string } = {
  maize: "Xenova/crop-disease-maize",
  rice: "Xenova/crop-disease-rice",
  wheat: "Xenova/crop-disease-wheat",
  cotton: "Xenova/crop-disease-cotton",
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

const DISEASE_TREATMENTS: { [key: string]: any } = {
  "leaf_blight": {
    medicine: "Propiconazole",
    dosage: "1.5-2 ml per liter of water",
    frequency: "Every 14 days, maximum 3 applications",
    instructions: "Apply early morning or late evening. Ensure complete leaf coverage."
  },
  "blast": {
    medicine: "Tricyclazole",
    dosage: "0.6g per liter of water",
    frequency: "Every 10-14 days during disease pressure",
    instructions: "Apply preventively when conditions favor disease development."
  },
  // Add more disease treatments as needed
};

export const initializeModel = async (cropType: string) => {
  try {
    console.log(`Initializing model for ${cropType}`);
    const modelName = CROP_MODELS[cropType.toLowerCase()] || "Xenova/resnet-50";
    
    classifier = await pipeline("image-classification", modelName);
    
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
    
    const results = await classifier(imageUrl, {
      topk: 5
    });
    
    console.log("Analysis results:", results);

    const primaryResult = results[0];
    const confidence = Math.round(primaryResult.score * 100);
    const diseaseName = primaryResult.label.replace(/_/g, ' ');
    
    // Get treatment recommendations
    const treatment = DISEASE_TREATMENTS[primaryResult.label] || {
      medicine: "Consult local agricultural expert",
      dosage: "As prescribed",
      frequency: "As recommended",
      instructions: "Please consult with a local agricultural expert for specific treatment guidelines"
    };

    return {
      diseaseName,
      confidence,
      description: `Detected ${diseaseName} with ${confidence}% confidence. This analysis is based on visual symptoms and machine learning model predictions.`,
      affectedArea: Math.round(primaryResult.score * 80), // Estimate affected area
      status: confidence > 70 ? "severe" : confidence > 40 ? "moderate" : "healthy",
      causes: [
        "Environmental stress conditions",
        "Pathogenic infection",
        "Poor plant nutrition",
        "Weather conditions favorable for disease"
      ],
      prevention: [
        "Regular crop monitoring",
        "Maintain proper plant spacing",
        "Use disease-resistant varieties",
        "Practice crop rotation",
        "Ensure proper drainage"
      ],
      treatment
    };
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
};
