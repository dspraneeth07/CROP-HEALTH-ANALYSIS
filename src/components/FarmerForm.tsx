import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, User, Phone, Mail, MapPin, Wheat } from "lucide-react";
import { useState } from "react";
import { useLanguageStore } from "./LanguageSelector";
import { Link } from "react-router-dom";

interface FarmerFormProps {
  onBack: () => void;
  onNext: (farmerData: FarmerData) => void;
}

export interface FarmerData {
  name: string;
  location: string;
  phone: string;
  email: string;
  cropType: string;
}

const crops = [
  "Maize",
  "Rice",
  "Wheat",
  "Cotton",
  "Sugarcane",
  "Tomatoes",
  "Chili",
  "Bananas",
  "Coconut",
  "Groundnut",
  "Soybean",
  "Brinjal",
  "Beans",
  "Turmeric",
  "Ginger"
];

export function FarmerForm({ onBack, onNext }: FarmerFormProps) {
  const { t } = useLanguageStore();
  const [formData, setFormData] = useState<FarmerData>({
    name: "",
    location: "",
    phone: "",
    email: "",
    cropType: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting farmer data with crop type:", formData);
    onNext(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCropSelect = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      cropType: value,
    }));
  };

  const isFormValid = formData.name && formData.location && formData.phone && formData.cropType;

  return (
    <div className="relative">
      <div className="absolute -top-20 left-0 right-0 h-40 overflow-hidden pointer-events-none">
        {crops.map((crop, index) => (
          <div
            key={crop}
            className="absolute animate-farmer-walk"
            style={{
              top: `${(index * 30) % 120}px`,
              animationDelay: `${index * 2}s`,
              opacity: 0.6
            }}
          >
            <Wheat className="w-8 h-8 text-primary animate-sway" />
          </div>
        ))}
      </div>

      <Card className="w-full animate-fade-up backdrop-blur-sm bg-white/80 shadow-xl border-t border-l border-white/20">
        <CardHeader>
          <Button variant="ghost" className="w-fit mb-4 hover:scale-105 transition-transform" onClick={onBack}>
            <ArrowLeft className="mr-2" /> {t('back')}
          </Button>
          <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            {t('farmer_details')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 transition-all duration-300 hover:translate-x-1">
              <label htmlFor="cropType" className="text-sm font-medium flex items-center gap-2">
                <Wheat className="w-4 h-4 text-primary" />
                {t('crop_type')} *
              </label>
              <Select value={formData.cropType} onValueChange={handleCropSelect}>
                <SelectTrigger className="bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-colors">
                  <SelectValue placeholder={t('select_crop')} />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((crop) => (
                    <SelectItem key={crop} value={crop.toLowerCase()}>
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 transition-all duration-300 hover:translate-x-1">
              <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                {t('name')} *
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('enter_name')}
                className="bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-colors"
                required
              />
            </div>

            <div className="space-y-2 transition-all duration-300 hover:translate-x-1">
              <label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                {t('location')} *
              </label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder={t('enter_location')}
                className="bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-colors"
                required
              />
            </div>

            <div className="space-y-2 transition-all duration-300 hover:translate-x-1">
              <label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                {t('phone')} *
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t('enter_phone')}
                className="bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-colors"
                required
              />
            </div>

            <div className="space-y-2 transition-all duration-300 hover:translate-x-1">
              <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                {t('email')} ({t('optional')})
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('enter_email')}
                className="bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-colors"
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button 
                type="submit" 
                disabled={!isFormValid}
                className="bg-primary hover:bg-primary-dark transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
              >
                {t('next')}
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}