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
  farmerData?: {
    name: string;
    location: string;
    phone: string;
    email: string;
  };
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

export function DiseaseAnalysis({ onBack, cropType, imageUrl, analysisData, farmerData }: DiseaseAnalysisProps) {
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
    
    // Draw the title text twice for a bold effect
    pdf.text("Xpedition R", pdf.internal.pageSize.width / 2, yPos, { 
      align: "center",
      renderingMode: "fill"
    });
    pdf.setTextColor(0, 100, 0); // Darker green for stroke
    pdf.text("Xpedition R", pdf.internal.pageSize.width / 2, yPos, { 
      align: "center",
      renderingMode: "stroke"
    });
    yPos += 20;

    // Add subtitle
    pdf.setFontSize(20);
    pdf.setTextColor(33, 33, 33);
    pdf.setFont("helvetica", "bold");
    pdf.text(`Crop Disease Analysis Report - ${cropType}`, pdf.internal.pageSize.width / 2, yPos, { align: "center" });
    yPos += 25;

    // Add user details table
    pdf.setFillColor(245, 247, 250);
    pdf.setDrawColor(76, 175, 80);
    pdf.setLineWidth(0.1);

    const tableData = [
      ["Farmer Details", ""],
      ["Name", farmerData?.name || "N/A"],
      ["Location", farmerData?.location || "N/A"],
      ["Phone", farmerData?.phone || "N/A"],
      ["Email", farmerData?.email || "N/A"],
      ["Crop Type", cropType || "N/A"]
    ];

    // Calculate table dimensions
    const cellPadding = 5;
    const columnWidth = 80;
    const rowHeight = 10;
    const startX = (pdf.internal.pageSize.width - (columnWidth * 2)) / 2;

    // Draw table
    tableData.forEach((row, i) => {
      // Header row styling
      if (i === 0) {
        pdf.setFillColor(76, 175, 80);
        pdf.setTextColor(255, 255, 255);
      } else {
        pdf.setFillColor(i % 2 === 0 ? 245 : 255, 247, 250);
        pdf.setTextColor(33, 33, 33);
      }

      // Draw cells
      row.forEach((cell, j) => {
        pdf.rect(startX + (j * columnWidth), yPos, columnWidth, rowHeight, 'F');
        pdf.rect(startX + (j * columnWidth), yPos, columnWidth, rowHeight, 'S');
        pdf.text(cell, startX + (j * columnWidth) + cellPadding, yPos + 7);
      });
      yPos += rowHeight;
    });

    yPos += 15;

    // Add the uploaded image
    if (imageUrl) {
      const imgWidth = 100;
      const imgHeight = 75;
      
      // Check if we need to add a new page before the image
      if (yPos + imgHeight > pdf.internal.pageSize.height - 20) {
        pdf.addPage();
        yPos = 20;
        // Add border to the new page
        pdf.rect(10, 10, pdf.internal.pageSize.width - 20, pdf.internal.pageSize.height - 20);
      }
      
      pdf.addImage(imageUrl, 'JPEG', (pdf.internal.pageSize.width - imgWidth) / 2, yPos, imgWidth, imgHeight);
      yPos += imgHeight + 15;
    }

    // Function to check and add new page if needed
    const checkAndAddNewPage = (requiredSpace: number) => {
      if (yPos + requiredSpace > pdf.internal.pageSize.height - 20) {
        pdf.addPage();
        yPos = 20;
        // Add border to the new page
        pdf.rect(10, 10, pdf.internal.pageSize.width - 20, pdf.internal.pageSize.height - 20);
        return true;
      }
      return false;
    };

    // Disease information section with custom bullet points and icons
    pdf.setTextColor(33, 33, 33);
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");

    // Check space for disease information
    checkAndAddNewPage(100);
    
    // Disease name and confidence
    pdf.setFillColor(76, 175, 80);
    pdf.circle(20, yPos - 2, 2, 'F');
    pdf.text("Disease Information", 25, yPos);
    yPos += 10;

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    const maxWidth = pdf.internal.pageSize.width - 40; // 20px margin on each side

    // Function to add wrapped text
    const addWrappedText = (text: string, startY: number) => {
      const lines = pdf.splitTextToSize(text, maxWidth);
      lines.forEach((line: string) => {
        checkAndAddNewPage(7);
        pdf.text(line, 25, yPos);
        yPos += 7;
      });
      return lines.length * 7;
    };

    // Add disease details with proper text wrapping
    pdf.text(`Disease: ${analysisData.diseaseName}`, 25, yPos);
    yPos += 8;
    pdf.text(`Confidence: ${analysisData.confidence}%`, 25, yPos);
    yPos += 15;

    // Status section
    checkAndAddNewPage(50);
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

    // Description section
    checkAndAddNewPage(50);
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.setFillColor(64, 159, 255);
    pdf.circle(20, yPos - 2, 2, 'F');
    pdf.text("Description", 25, yPos);
    yPos += 8;
    
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    addWrappedText(analysisData.description, yPos);
    yPos += 10;

    // Causes section
    checkAndAddNewPage(50);
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.setFillColor(255, 152, 0);
    pdf.circle(20, yPos - 2, 2, 'F');
    pdf.text("Causes", 25, yPos);
    yPos += 8;
    
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    analysisData.causes.forEach(cause => {
      checkAndAddNewPage(10);
      pdf.setFillColor(255, 152, 0);
      pdf.circle(25, yPos - 2, 1, 'F');
      addWrappedText(cause, yPos);
    });
    yPos += 10;

    // Prevention section
    checkAndAddNewPage(50);
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.setFillColor(0, 200, 83);
    pdf.circle(20, yPos - 2, 2, 'F');
    pdf.text("Prevention Steps", 25, yPos);
    yPos += 8;
    
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    analysisData.prevention.forEach(step => {
      checkAndAddNewPage(10);
      pdf.setFillColor(0, 200, 83);
      pdf.circle(25, yPos - 2, 1, 'F');
      addWrappedText(step, yPos);
    });
    yPos += 10;

    // Treatment section
    checkAndAddNewPage(50);
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
    checkAndAddNewPage(40);
    
    pdf.setFillColor(233, 30, 99);
    pdf.circle(25, yPos - 2, 1, 'F');
    addWrappedText(`Medicine: ${treatment.medicine}`, yPos);
    
    pdf.setFillColor(3, 169, 244);
    pdf.circle(25, yPos - 2, 1, 'F');
    addWrappedText(`Dosage: ${treatment.dosage}`, yPos);
    
    pdf.setFillColor(255, 193, 7);
    pdf.circle(25, yPos - 2, 1, 'F');
    addWrappedText(`Frequency: ${treatment.frequency}`, yPos);
    
    pdf.setFillColor(76, 175, 80);
    pdf.circle(25, yPos - 2, 1, 'F');
    addWrappedText(`Instructions: ${treatment.instructions}`, yPos);

    // Add watermark on each page
    const totalPages = pdf.internal.pages.length;
    for(let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFont("helvetica", "italic");
      pdf.setFontSize(12);
      pdf.setTextColor(200, 200, 200);
      pdf.text(
        "Xpedition R Crop Health",
        pdf.internal.pageSize.width - 20,
        pdf.internal.pageSize.height - 10,
        { align: "right" }
      );
    }

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
