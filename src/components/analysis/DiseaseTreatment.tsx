import { Pill, Shield, AlertCircle } from "lucide-react";

interface DiseaseTreatmentProps {
  causes: string[];
  prevention: string[];
  treatment: {
    medicine: string;
    dosage: string;
    frequency: string;
    instructions: string;
  };
}

export function DiseaseTreatment({ causes, prevention, treatment }: DiseaseTreatmentProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <AlertCircle className="w-6 h-6 text-yellow-500 animate-pulse mt-1" />
        <div>
          <h4 className="font-semibold mb-2">Causes</h4>
          <ul className="list-disc pl-5 space-y-1">
            {causes.map((cause, index) => (
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
            {prevention.map((step, index) => (
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
            <p><span className="font-medium">Medicine:</span> {treatment.medicine}</p>
            <p><span className="font-medium">Dosage:</span> {treatment.dosage}</p>
            <p><span className="font-medium">Frequency:</span> {treatment.frequency}</p>
            <p><span className="font-medium">Instructions:</span> {treatment.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}