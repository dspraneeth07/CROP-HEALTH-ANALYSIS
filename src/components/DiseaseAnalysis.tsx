import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DiseaseAnalysisProps {
  onBack: () => void;
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

export function DiseaseAnalysis({ onBack, analysisData }: DiseaseAnalysisProps) {
  const { toast } = useToast();

  const handleDownloadPDF = () => {
    toast({
      title: "Coming Soon",
      description: "PDF download functionality will be available soon.",
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
              Processing your image...
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

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
        <CardTitle className="text-2xl">Disease Analysis Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">{analysisData.diseaseName}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Confidence:</span>
              <span className="font-medium">{analysisData.confidence}%</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Status:</span>
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
          <div>
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-gray-600">{analysisData.description}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Causes</h4>
            <ul className="list-disc pl-5 space-y-1">
              {analysisData.causes.map((cause, index) => (
                <li key={index} className="text-gray-600">{cause}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Prevention Steps</h4>
            <ul className="list-disc pl-5 space-y-1">
              {analysisData.prevention.map((step, index) => (
                <li key={index} className="text-gray-600">{step}</li>
              ))}
            </ul>
          </div>

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