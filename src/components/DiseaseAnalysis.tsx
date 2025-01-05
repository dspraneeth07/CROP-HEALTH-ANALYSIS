import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ArrowLeft, Leaf, AlertCircle, CheckCircle, XCircle, Sprout, Shield, Pill } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "severe":
        return <XCircle className="w-6 h-6 text-red-500 animate-pulse" />;
      case "moderate":
        return <AlertCircle className="w-6 h-6 text-yellow-500 animate-bounce" />;
      case "healthy":
        return <CheckCircle className="w-6 h-6 text-green-500 animate-bounce" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "severe":
        return "text-red-500";
      case "moderate":
        return "text-yellow-500";
      case "healthy":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

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
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-primary animate-bounce" />
              <h3 className="font-semibold text-lg">{analysisData.diseaseName}</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Confidence:</span>
              <span className="font-medium">{analysisData.confidence}%</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Status:</span>
              {getStatusIcon(analysisData.status)}
              <span className={`font-medium ${getStatusColor(analysisData.status)}`}>
                {analysisData.status.charAt(0).toUpperCase() + analysisData.status.slice(1)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Affected Area:</span>
              <span className="font-medium">{analysisData.affectedArea}%</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <Sprout className="w-6 h-6 text-primary animate-bounce mt-1" />
            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-gray-600">{analysisData.description}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <AlertCircle className="w-6 h-6 text-yellow-500 animate-pulse mt-1" />
            <div>
              <h4 className="font-semibold mb-2">Causes</h4>
              <ul className="list-disc pl-5 space-y-1">
                {analysisData.causes.map((cause, index) => (
                  <li key={index} className="text-gray-600">{cause}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Shield className="w-6 h-6 text-blue-500 animate-pulse mt-1" />
            <div>
              <h4 className="font-semibold mb-2">Prevention Steps</h4>
              <ul className="list-disc pl-5 space-y-1">
                {analysisData.prevention.map((step, index) => (
                  <li key={index} className="text-gray-600">{step}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Pill className="w-6 h-6 text-green-500 animate-pulse mt-1" />
            <div>
              <h4 className="font-semibold mb-2">Treatment Recommendations</h4>
              <div className="space-y-2">
                <p><span className="font-medium">Medicine:</span> {analysisData.treatment.medicine}</p>
                <p><span className="font-medium">Dosage:</span> {analysisData.treatment.dosage}</p>
                <p><span className="font-medium">Frequency:</span> {analysisData.treatment.frequency}</p>
                <p><span className="font-medium">Instructions:</span> {analysisData.treatment.instructions}</p>
              </div>
            </div>
          </div>
        </div>

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