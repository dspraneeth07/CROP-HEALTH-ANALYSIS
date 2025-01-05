import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ArrowLeft, Sprout } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import { DiseaseHeader } from "./analysis/DiseaseHeader";
import { DiseaseStatus } from "./analysis/DiseaseStatus";
import { DiseaseTreatment } from "./analysis/DiseaseTreatment";

interface DiseaseAnalysisProps {
  onBack: () => void;
  cropType?: string;
  imageUrl?: string;
  analysisData?: {
    diseaseName: string;
    confidence: number;
    description: string;
    affectedArea: number;
    normalRange: string;
    status: "severe" | "moderate" | "healthy";
    causes: string[];
    prevention: string[];
    treatment: {
      medicine: string;
      dosage: string;
      frequency: string;
      instructions: string;
    };
  };
}

export function DiseaseAnalysis({ onBack, cropType, imageUrl, analysisData }: DiseaseAnalysisProps) {
  const { toast } = useToast();

  const handleDownloadPDF = () => {
    if (!analysisData) return;

    const pdf = new jsPDF();
    let yPos = 20;

    // Add title
    pdf.setFontSize(20);
    pdf.text(`Crop Disease Analysis Report - ${cropType}`, 20, yPos);
    yPos += 20;

    // Add disease info
    pdf.setFontSize(12);
    pdf.text(`Disease: ${analysisData.diseaseName}`, 20, yPos);
    yPos += 10;
    pdf.text(`Confidence: ${analysisData.confidence}%`, 20, yPos);
    yPos += 10;
    pdf.text(`Status: ${analysisData.status}`, 20, yPos);
    yPos += 10;
    pdf.text(`Affected Area: ${analysisData.affectedArea}%`, 20, yPos);
    yPos += 20;

    // Add description
    pdf.text("Description:", 20, yPos);
    yPos += 10;
    const descriptionLines = pdf.splitTextToSize(analysisData.description, 170);
    pdf.text(descriptionLines, 20, yPos);
    yPos += descriptionLines.length * 7 + 10;

    // Add causes
    pdf.text("Causes:", 20, yPos);
    yPos += 10;
    analysisData.causes.forEach(cause => {
      pdf.text(`• ${cause}`, 25, yPos);
      yPos += 7;
    });
    yPos += 10;

    // Add prevention steps
    pdf.text("Prevention Steps:", 20, yPos);
    yPos += 10;
    analysisData.prevention.forEach(step => {
      pdf.text(`• ${step}`, 25, yPos);
      yPos += 7;
    });
    yPos += 10;

    // Add treatment
    pdf.text("Treatment Recommendations:", 20, yPos);
    yPos += 10;
    pdf.text(`Medicine: ${analysisData.treatment.medicine}`, 25, yPos);
    yPos += 7;
    pdf.text(`Dosage: ${analysisData.treatment.dosage}`, 25, yPos);
    yPos += 7;
    pdf.text(`Frequency: ${analysisData.treatment.frequency}`, 25, yPos);
    yPos += 7;
    pdf.text(`Instructions: ${analysisData.treatment.instructions}`, 25, yPos);

    // Save the PDF
    pdf.save(`crop-analysis-${cropType}-${Date.now()}.pdf`);
    
    toast({
      title: "PDF Generated",
      description: "Your analysis report has been downloaded.",
    });
  };

  if (!analysisData) {
    return (
      <Card className="w-full animate-fade-up">
        <CardHeader>
          <Button variant="ghost" className="w-fit mb-4" onClick={onBack}>
            <ArrowLeft className="mr-2" /> Back
          </Button>
          <CardTitle className="text-2xl">Analysis in Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40">
            <div className="animate-pulse text-gray-500">
              Processing your {cropType} image...
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full animate-fade-up">
      <CardHeader>
        <Button variant="ghost" className="w-fit mb-4" onClick={onBack}>
          <ArrowLeft className="mr-2" /> Back
        </Button>
        <CardTitle className="text-2xl">Disease Analysis Results for {cropType}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {imageUrl && (
          <div className="rounded-lg overflow-hidden shadow-lg mb-6">
            <img src={imageUrl} alt="Analyzed crop" className="w-full h-auto" />
          </div>
        )}
        
        <div className="grid gap-4 md:grid-cols-2">
          <DiseaseHeader 
            diseaseName={analysisData.diseaseName}
            confidence={analysisData.confidence}
          />
          <DiseaseStatus 
            status={analysisData.status}
            affectedArea={analysisData.affectedArea}
          />
        </div>

        <div className="flex items-start gap-2">
          <Sprout className="w-6 h-6 text-primary animate-bounce mt-1" />
          <div>
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-gray-600">{analysisData.description}</p>
          </div>
        </div>

        <DiseaseTreatment 
          causes={analysisData.causes}
          prevention={analysisData.prevention}
          treatment={analysisData.treatment}
        />

        <div className="flex justify-end mt-6">
          <Button onClick={handleDownloadPDF}>
            <Download className="mr-2" />
            Download PDF Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
