import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DiseaseHeader } from "./analysis/DiseaseHeader";
import { DiseaseStatus } from "./analysis/DiseaseStatus";
import { DiseaseTreatment } from "./analysis/DiseaseTreatment";
import { generatePDF } from "./pdf/PDFGenerator";
import { FarmerData, AnalysisData } from "./types/analysis";

interface DiseaseAnalysisProps {
  onBack: () => void;
  cropType?: string;
  imageUrl?: string;
  farmerData?: FarmerData;
  analysisData?: AnalysisData;
}

export function DiseaseAnalysis({ onBack, cropType, imageUrl, analysisData, farmerData }: DiseaseAnalysisProps) {
  const { toast } = useToast();

  const handleDownloadPDF = async () => {
    try {
      if (!analysisData || !imageUrl || !farmerData || !cropType) {
        toast({
          title: "Error",
          description: "Missing required data for PDF generation",
          variant: "destructive",
        });
        return;
      }

      console.log("Generating PDF with data:", { cropType, imageUrl, farmerData, analysisData });
      
      const pdf = await generatePDF(cropType, imageUrl, farmerData, analysisData);
      pdf.save(`crop-analysis-${farmerData.name}-${Date.now()}.pdf`);
      
      toast({
        title: "Success",
        description: "Your analysis report has been downloaded.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF report. Please try again.",
        variant: "destructive",
      });
    }
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

        {analysisData && (
          <DiseaseTreatment 
            causes={analysisData.causes}
            prevention={analysisData.prevention}
            treatment={analysisData.treatment}
          />
        )}

        <div className="flex justify-end mt-6">
          <Button 
            onClick={handleDownloadPDF}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <Download className="mr-2" />
            Download PDF Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}