import { Leaf } from "lucide-react";

interface DiseaseHeaderProps {
  diseaseName: string;
  confidence: number;
}

export function DiseaseHeader({ diseaseName, confidence }: DiseaseHeaderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Leaf className="w-6 h-6 text-primary animate-bounce" />
        <h3 className="font-semibold text-lg">{diseaseName}</h3>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Confidence:</span>
        <span className="font-medium">{confidence}%</span>
      </div>
    </div>
  );
}