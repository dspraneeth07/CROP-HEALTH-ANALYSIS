import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImageUpload } from "@/components/ImageUpload";
import { FarmerForm, FarmerData } from "@/components/FarmerForm";
import { DiseaseAnalysis } from "@/components/DiseaseAnalysis";
import { Leaf, Shield, Zap, ArrowRight, Github } from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: Leaf,
    title: "Disease Diagnosis",
    description: "Advanced AI-powered analysis to identify crop diseases accurately",
  },
  {
    icon: Shield,
    title: "Treatment Recommendations",
    description: "Get detailed treatment plans and prevention strategies",
  },
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "Quick and reliable results to help you take immediate action",
  },
];

// Mock analysis data for development
const mockAnalysisData = {
  diseaseName: "Leaf Blight",
  confidence: 95,
  description: "A common fungal disease affecting crop leaves",
  affectedArea: 30,
  normalRange: "0-5%",
  status: "moderate" as const,
  causes: [
    "High humidity",
    "Poor air circulation",
    "Overcrowding of plants"
  ],
  prevention: [
    "Proper spacing between plants",
    "Regular pruning",
    "Adequate ventilation",
    "Fungicide application"
  ],
  treatment: {
    medicine: "Copper-based fungicide",
    dosage: "2-3 ml per liter of water",
    frequency: "Every 7-10 days",
    instructions: "Apply early morning or late evening for best results"
  }
};

export default function Index() {
  const [step, setStep] = useState(1);
  const [farmerData, setFarmerData] = useState<FarmerData | null>(null);

  const handleGetStarted = () => {
    setStep(2);
    console.log("Moving to step 2: Farmer Details");
  };

  const handleFarmerSubmit = (data: FarmerData) => {
    setFarmerData(data);
    setStep(3);
    console.log("Moving to step 3: Image Upload", data);
  };

  const handleImageAnalyzed = () => {
    setStep(4);
    console.log("Moving to step 4: Disease Analysis");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation />
      
      <div className="container mx-auto px-4">
        {step === 1 && (
          <>
            <section className="pt-32 pb-16">
              <div className="text-center animate-fade-up">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                  AI-Powered Crop Health Analysis
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  We empower Indian farmers with AI tools to improve crop health using technology
                </p>
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary-dark"
                  onClick={handleGetStarted}
                >
                  Get Started <ArrowRight className="ml-2" />
                </Button>
              </div>
            </section>

            <section className="py-16">
              <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <CardContent className="pt-6">
                      <feature.icon className="w-12 h-12 text-primary mb-4" />
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}
        {step === 2 && (
          <section className="pt-32 pb-16">
            <div className="container mx-auto max-w-2xl">
              <FarmerForm 
                onBack={() => setStep(1)}
                onNext={handleFarmerSubmit}
              />
            </div>
          </section>
        )}
        {step === 3 && (
          <section className="pt-32 pb-16">
            <div className="container mx-auto max-w-2xl">
              <ImageUpload 
                onBack={() => setStep(2)}
                onAnalyze={handleImageAnalyzed}
                cropType={farmerData?.cropType || "crop"}
              />
            </div>
          </section>
        )}
        {step === 4 && (
          <section className="pt-32 pb-16">
            <div className="container mx-auto max-w-2xl">
              <DiseaseAnalysis
                onBack={() => setStep(3)}
                cropType={farmerData?.cropType}
                analysisData={mockAnalysisData}
              />
            </div>
          </section>
        )}
      </div>

      <footer className="bg-white border-t py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            Designed and Developed by Dhadi Sai Praneeth Reddy |{" "}
            <a
              href="https://github.com/dspraneeth07"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark inline-flex items-center"
            >
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub Profile</span>
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}