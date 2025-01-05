import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload, Camera } from "lucide-react";
import { useState } from "react";

interface ImageUploadProps {
  onBack: () => void;
  onAnalyze: () => void;
}

export function ImageUpload({ onBack, onAnalyze }: ImageUploadProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (selectedImage) {
      setIsAnalyzing(true);
      console.log("Analyzing image...");
      // Simulate analysis delay
      setTimeout(() => {
        setIsAnalyzing(false);
        onAnalyze();
      }, 2000);
    }
  };

  return (
    <Card className="w-full animate-fade-up">
      <CardHeader>
        <Button
          variant="ghost"
          className="w-fit mb-4"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2" /> Back
        </Button>
        <CardTitle className="text-2xl">Upload Crop Image</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary transition-colors">
          {selectedImage ? (
            <div className="space-y-4 w-full">
              <img
                src={selectedImage}
                alt="Selected crop"
                className="max-w-full h-auto rounded-lg mx-auto"
              />
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedImage(null)}
                >
                  Remove
                </Button>
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Image"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="flex flex-col items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <div className="flex gap-4">
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer"
                  >
                    <Button>
                      <Upload className="mr-2" />
                      Upload Image
                    </Button>
                  </label>
                  <Button variant="outline">
                    <Camera className="mr-2" />
                    Take Photo
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Upload a clear image of the affected crop part
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}