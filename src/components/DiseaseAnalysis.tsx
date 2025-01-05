import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ArrowLeft, Sprout, Bug, Shield, PillBottle, Droplet, Clock, FileText, AlertTriangle } from "lucide-react";
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
    if (!analysisData || !imageUrl) return;

    // Create new PDF document
    const pdf = new jsPDF();
    let yPos = 20;

    // Add border to the page
    pdf.setDrawColor(76, 175, 80); // Primary green color
    pdf.setLineWidth(0.5);
    pdf.rect(10, 10, pdf.internal.pageSize.width - 20, pdf.internal.pageSize.height - 20);

    // Add header with Copperplate Gothic Bold font
    pdf.setFontSize(28);
    pdf.setTextColor(76, 175, 80);
    pdf.setFont("helvetica", "bold");
    pdf.text("Xpedition R", pdf.internal.pageSize.width / 2, yPos, { 
      align: "center",
      renderingMode: "fillThenStroke",
      strokeWidth: 0.7
    });
    yPos += 20;

    // Add subtitle
    pdf.setFontSize(20);
    pdf.setTextColor(33, 33, 33);
    pdf.setFont("helvetica", "bold");
    pdf.text(`Crop Disease Analysis Report - ${cropType}`, pdf.internal.pageSize.width / 2, yPos, { align: "center" });
    yPos += 25;

    // Add the uploaded image
    if (imageUrl) {
      const imgWidth = 100;
      const imgHeight = 75;
      pdf.addImage(imageUrl, 'JPEG', (pdf.internal.pageSize.width - imgWidth) / 2, yPos, imgWidth, imgHeight);
      yPos += imgHeight + 15;
    }

    // Disease information section with custom bullet points and icons
    pdf.setTextColor(33, 33, 33);
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    
    // Disease name and confidence with Bug icon
    pdf.setFillColor(76, 175, 80);
    pdf.circle(20, yPos - 2, 2, 'F');
    pdf.text("Disease Information", 25, yPos);
    yPos += 10;

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Disease: ${analysisData.diseaseName}`, 25, yPos);
    yPos += 8;
    pdf.text(`Confidence: ${analysisData.confidence}%`, 25, yPos);
    yPos += 15;

    // Status with color coding and icon
    const statusColor = {
      severe: "#FF5252",
      moderate: "#FFC107",
      healthy: "#4CAF50"
    }[analysisData.status];
    
    pdf.setFillColor(statusColor);
    pdf.circle(20, yPos - 2, 2, 'F');
    pdf.setTextColor(statusColor);
    pdf.text(`Status: ${analysisData.status.toUpperCase()}`, 25, yPos);
    yPos += 8;
    
    pdf.setTextColor(33, 33, 33);
    pdf.text(`Affected Area: ${analysisData.affectedArea}%`, 25, yPos);
    yPos += 15;

    // Description section with Info icon
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.setFillColor(64, 159, 255);
    pdf.circle(20, yPos - 2, 2, 'F');
    pdf.text("Description", 25, yPos);
    yPos += 8;
    
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    const descriptionLines = pdf.splitTextToSize(analysisData.description, 160);
    pdf.text(descriptionLines, 25, yPos);
    yPos += descriptionLines.length * 7 + 10;

    // Causes section with Warning icon
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.setFillColor(255, 152, 0);
    pdf.circle(20, yPos - 2, 2, 'F');
    pdf.text("Causes", 25, yPos);
    yPos += 8;
    
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    analysisData.causes.forEach(cause => {
      pdf.setFillColor(255, 152, 0);
      pdf.circle(25, yPos - 2, 1, 'F');
      pdf.text(cause, 30, yPos);
      yPos += 8;
    });
    yPos += 10;

    // Prevention section with Shield icon
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.setFillColor(0, 200, 83);
    pdf.circle(20, yPos - 2, 2, 'F');
    pdf.text("Prevention Steps", 25, yPos);
    yPos += 8;
    
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    analysisData.prevention.forEach(step => {
      pdf.setFillColor(0, 200, 83);
      pdf.circle(25, yPos - 2, 1, 'F');
      pdf.text(step, 30, yPos);
      yPos += 8;
    });
    yPos += 10;

    // Treatment section with multiple colored icons
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.setFillColor(156, 39, 176);
    pdf.circle(20, yPos - 2, 2, 'F');
    pdf.text("Treatment Recommendations", 25, yPos);
    yPos += 8;
    
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);

    // Treatment details with custom colored bullets
    const treatment = analysisData.treatment;
    pdf.setFillColor(233, 30, 99);
    pdf.circle(25, yPos - 2, 1, 'F');
    pdf.text(`Medicine: ${treatment.medicine}`, 30, yPos);
    yPos += 8;
    
    pdf.setFillColor(3, 169, 244);
    pdf.circle(25, yPos - 2, 1, 'F');
    pdf.text(`Dosage: ${treatment.dosage}`, 30, yPos);
    yPos += 8;
    
    pdf.setFillColor(255, 193, 7);
    pdf.circle(25, yPos - 2, 1, 'F');
    pdf.text(`Frequency: ${treatment.frequency}`, 30, yPos);
    yPos += 8;
    
    pdf.setFillColor(76, 175, 80);
    pdf.circle(25, yPos - 2, 1, 'F');
    pdf.text(`Instructions: ${treatment.instructions}`, 30, yPos);

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