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

    // Create new PDF document with custom font
    const pdf = new jsPDF();
    let yPos = 20;

    // Add header and logo
    pdf.setFontSize(24);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(76, 175, 80); // Primary green color
    pdf.text("Xpedition R", pdf.internal.pageSize.width / 2, yPos, { align: "center" });
    yPos += 15;

    pdf.setFontSize(20);
    pdf.setTextColor(33, 33, 33);
    pdf.text(`Crop Disease Analysis Report - ${cropType}`, pdf.internal.pageSize.width / 2, yPos, { align: "center" });
    yPos += 25;

    // Add user information table
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.setDrawColor(200, 200, 200);
    pdf.setFillColor(245, 245, 245);
    
    // Table headers style
    pdf.setFillColor(76, 175, 80);
    pdf.setTextColor(255, 255, 255);
    
    // Disease information section
    yPos += 20;
    pdf.setTextColor(33, 33, 33);
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.text("Disease Information", 20, yPos);
    yPos += 10;

    // Disease name and confidence
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Disease: ${analysisData.diseaseName}`, 20, yPos);
    yPos += 8;
    pdf.text(`Confidence: ${analysisData.confidence}%`, 20, yPos);
    yPos += 8;

    // Status with color coding
    const statusColor = {
      severe: "#FF5252",
      moderate: "#FFC107",
      healthy: "#4CAF50"
    }[analysisData.status];
    
    pdf.setTextColor(statusColor);
    pdf.text(`Status: ${analysisData.status.toUpperCase()}`, 20, yPos);
    pdf.setTextColor(33, 33, 33);
    yPos += 8;
    pdf.text(`Affected Area: ${analysisData.affectedArea}%`, 20, yPos);
    yPos += 15;

    // Description section
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("Description", 20, yPos);
    yPos += 8;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    const descriptionLines = pdf.splitTextToSize(analysisData.description, 170);
    pdf.text(descriptionLines, 20, yPos);
    yPos += descriptionLines.length * 7 + 10;

    // Causes section
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("Causes", 20, yPos);
    yPos += 8;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    analysisData.causes.forEach(cause => {
      pdf.circle(23, yPos - 2, 1, 'F');
      pdf.text(cause, 28, yPos);
      yPos += 8;
    });
    yPos += 10;

    // Prevention section
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("Prevention Steps", 20, yPos);
    yPos += 8;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    analysisData.prevention.forEach(step => {
      pdf.circle(23, yPos - 2, 1, 'F');
      pdf.text(step, 28, yPos);
      yPos += 8;
    });
    yPos += 10;

    // Treatment section
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("Treatment Recommendations", 20, yPos);
    yPos += 8;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);

    // Treatment details with custom bullets
    const treatment = analysisData.treatment;
    pdf.circle(23, yPos - 2, 1, 'F');
    pdf.text(`Medicine: ${treatment.medicine}`, 28, yPos);
    yPos += 8;
    pdf.circle(23, yPos - 2, 1, 'F');
    pdf.text(`Dosage: ${treatment.dosage}`, 28, yPos);
    yPos += 8;
    pdf.circle(23, yPos - 2, 1, 'F');
    pdf.text(`Frequency: ${treatment.frequency}`, 28, yPos);
    yPos += 8;
    pdf.circle(23, yPos - 2, 1, 'F');
    pdf.text(`Instructions: ${treatment.instructions}`, 28, yPos);

    // Add watermark
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(12);
    pdf.setTextColor(200, 200, 200);
    pdf.text(
      "Xpedition R Crop Health",
      pdf.internal.pageSize.width - 20,
      pdf.internal.pageSize.height - 10,
      { align: "right" }
    );

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
            diseaseName={analysisData?.diseaseName || ""}
            confidence={analysisData?.confidence || 0}
          />
          <DiseaseStatus 
            status={analysisData?.status || "healthy"}
            affectedArea={analysisData?.affectedArea || 0}
          />
        </div>

        <div className="flex items-start gap-2">
          <Sprout className="w-6 h-6 text-primary animate-bounce mt-1" />
          <div>
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-gray-600">{analysisData?.description}</p>
          </div>
        </div>

        {analysisData && (
          <DiseaseTreatment 
            causes={analysisData.causes}
            prevention={analysisData.prevention}
            treatment={analysisData.treatment}
          />
        )}

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