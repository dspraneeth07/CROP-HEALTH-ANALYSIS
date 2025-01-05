import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload, Camera } from "lucide-react";
import { useState, useRef } from "react";
import { analyzeCropDisease } from "@/services/mlService";

interface ImageUploadProps {
  onBack: () => void;
  onAnalyze: (results: any) => void;
  cropType: string;
}

export function ImageUpload({ onBack, onAnalyze, cropType }: ImageUploadProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCapturing(true);
        setError(null);
      }
    } catch (err) {
      setError('Failed to access camera');
      console.error('Camera error:', err);
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
      const imageUrl = canvas.toDataURL('image/jpeg');
      setSelectedImage(imageUrl);
      setIsCapturing(false);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCapturing(false);
    }
  };

  const handleAnalyze = async () => {
    if (selectedImage) {
      setIsAnalyzing(true);
      setError(null);
      try {
        const results = await analyzeCropDisease(selectedImage, cropType);
        onAnalyze(results);
      } catch (err) {
        setError('Failed to analyze image. Please try again.');
        console.error('Analysis error:', err);
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  return (
    <Card className="w-full animate-fade-up">
      <CardHeader>
        <Button variant="ghost" className="w-fit mb-4" onClick={onBack}>
          <ArrowLeft className="mr-2" /> Back
        </Button>
        <CardTitle className="text-2xl">Upload {cropType} Image</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="text-warning-dark bg-warning-light/20 p-3 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary transition-colors">
          {isCapturing ? (
            <div className="space-y-4 w-full">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg"
              />
              <div className="flex justify-center gap-4">
                <Button onClick={captureImage}>Capture</Button>
                <Button variant="outline" onClick={stopCamera}>Cancel</Button>
              </div>
            </div>
          ) : selectedImage ? (
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
                  <Button variant="outline" onClick={startCamera}>
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