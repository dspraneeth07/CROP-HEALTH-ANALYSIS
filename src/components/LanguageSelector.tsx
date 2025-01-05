import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { create } from "zustand";

interface Language {
  code: string;
  name: string;
  translations: Record<string, string>;
}

const languages: Language[] = [
  {
    code: "en",
    name: "English",
    translations: {
      "upload": "Upload Image",
      "take_photo": "Take Photo",
      "analyze": "Analyze Image",
      "analyzing": "Analyzing...",
      "remove": "Remove",
      "back": "Back",
      "capture": "Capture Photo",
      "cancel": "Cancel",
      "upload_instruction": "Upload a clear image of the affected plant",
      "camera_error": "Unable to access camera. Please check permissions.",
      "analysis_failed": "There was an error analyzing the image. Please try again.",
      "pdf_generated": "Your analysis report has been downloaded.",
      "disease_analysis": "Disease Analysis Results for",
      "confidence": "Confidence",
      "status": "Status",
      "affected_area": "Affected Area",
      "description": "Description",
      "causes": "Causes",
      "prevention": "Prevention Steps",
      "treatment": "Treatment Recommendations",
      "download_pdf": "Download PDF Report",
    }
  },
  {
    code: "te",
    name: "తెలుగు",
    translations: {
      "upload": "చిత్రాన్ని అప్‌లోడ్ చేయండి",
      "take_photo": "ఫోటో తీయండి",
      "analyze": "చిత్రాన్ని విశ్లేషించండి",
      "analyzing": "విశ్లేషిస్తోంది...",
      "remove": "తొలగించు",
      "back": "వెనుకకు",
      "capture": "ఫోటో తీయండి",
      "cancel": "రద్దు చేయండి",
      "upload_instruction": "ప్రభావిత మొక్క యొక్క స్పష్టమైన చిత్రాన్ని అప్‌లోడ్ చేయండి",
      "camera_error": "కెమెరాను యాక్సెస్ చేయలేకపోయాము. అనుమతులను తనిఖీ చేయండి.",
      "analysis_failed": "చిత్రాన్ని విశ్లేషించడంలో లోపం. దయచేసి మళ్లీ ప్రయత్నించండి.",
      "pdf_generated": "మీ విశ్లేషణ నివేదిక డౌన్‌లోడ్ చేయబడింది.",
      "disease_analysis": "వ్యాధి విశ్లేషణ ఫలితాలు",
      "confidence": "నమ్మకం",
      "status": "స్థితి",
      "affected_area": "ప్రభావిత ప్రాంతం",
      "description": "వివరణ",
      "causes": "కారణాలు",
      "prevention": "నివారణ చర్యలు",
      "treatment": "చికిత్స సిఫార్సులు",
      "download_pdf": "PDF నివేదికను డౌన్‌లోడ్ చేయండి",
    }
  },
  { code: "hi", name: "हिंदी" },
  { code: "kn", name: "ಕನ್ನಡ" },
  { code: "ta", name: "தமிழ்" },
];

interface LanguageStore {
  currentLanguage: string;
  translations: Record<string, string>;
  setLanguage: (code: string) => void;
  t: (key: string) => string;
}

export const useLanguageStore = create<LanguageStore>((set, get) => ({
  currentLanguage: "en",
  translations: languages[0].translations,
  setLanguage: (code: string) => {
    const language = languages.find(lang => lang.code === code);
    if (language) {
      set({
        currentLanguage: code,
        translations: language.translations
      });
    }
  },
  t: (key: string) => get().translations[key] || key,
}));

export function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguageStore();

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    console.log("Language changed to:", value);
  };

  return (
    <Select value={currentLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
