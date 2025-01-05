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
      "farmer_details": "Farmer Details",
      "crop_type": "Crop Type",
      "select_crop": "Select your crop",
      "name": "Name",
      "enter_name": "Enter your full name",
      "location": "Location",
      "enter_location": "Enter your location",
      "phone": "Phone Number",
      "enter_phone": "Enter your phone number",
      "email": "Email",
      "enter_email": "Enter your email address",
      "optional": "Optional",
      "next": "Next"
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
      "farmer_details": "రైతు వివరాలు",
      "crop_type": "పంట రకం",
      "select_crop": "మీ పంటను ఎంచుకోండి",
      "name": "పేరు",
      "enter_name": "మీ పూర్తి పేరు నమోదు చేయండి",
      "location": "ప్రాంతం",
      "enter_location": "మీ ప్రాంతాన్ని నమోదు చేయండి",
      "phone": "ఫోన్ నంబర్",
      "enter_phone": "మీ ఫోన్ నంబర్‌ను నమోదు చేయండి",
      "email": "ఇమెయిల్",
      "enter_email": "మీ ఇమెయిల్ చిరునామాను నమోదు చేయండి",
      "optional": "ఐచ్ఛికం",
      "next": "తదుపరి"
    }
  },
  {
    code: "hi",
    name: "हिंदी",
    translations: {
      "upload": "छवि अपलोड करें",
      "take_photo": "फोटो लें",
      "analyze": "छवि का विश्लेषण करें",
      "analyzing": "विश्लेषण हो रहा है...",
      "remove": "हटाएं",
      "back": "वापस",
      "capture": "फोटो कैप्चर करें",
      "cancel": "रद्द करें",
      "upload_instruction": "प्रभावित पौधे की स्पष्ट छवि अपलोड करें",
      "camera_error": "कैमरा एक्सेस नहीं कर सकते। कृपया अनुमतियां जांचें।",
      "analysis_failed": "छवि का विश्लेषण करने में त्रुटि हुई। कृपया पुनः प्रयास करें।",
      "pdf_generated": "आपकी विश्लेषण रिपोर्ट डाउनलोड की गई है।",
      "disease_analysis": "रोग विश्लेषण परिणाम",
      "confidence": "विश्वास",
      "status": "स्थिति",
      "affected_area": "प्रभावित क्षेत्र",
      "description": "विवरण",
      "causes": "कारण",
      "prevention": "रोकथाम के उपाय",
      "treatment": "उपचार की सिफारिशें",
      "download_pdf": "PDF रिपोर्ट डाउनलोड करें",
      "farmer_details": "किसान विवरण",
      "crop_type": "फसल प्रकार",
      "select_crop": "अपनी फसल चुनें",
      "name": "नाम",
      "enter_name": "अपना पूरा नाम दर्ज करें",
      "location": "स्थान",
      "enter_location": "अपना स्थान दर्ज करें",
      "phone": "फोन नंबर",
      "enter_phone": "अपना फोन नंबर दर्ज करें",
      "email": "ईमेल",
      "enter_email": "अपना ईमेल पता दर्ज करें",
      "optional": "वैकल्पिक",
      "next": "अगला"
    }
  },
  {
    code: "kn",
    name: "ಕನ್ನಡ",
    translations: {
      "upload": "ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
      "take_photo": "ಫೋಟೋ ತೆಗೆಯಿರಿ",
      "analyze": "ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
      "analyzing": "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
      "remove": "ತೆಗೆದುಹಾಕಿ",
      "back": "ಹಿಂದೆ",
      "capture": "ಫೋಟೋ ಸೆರೆಹಿಡಿಯಿರಿ",
      "cancel": "ರದ್ದುಮಾಡಿ",
      "upload_instruction": "ಪ್ರಭಾವಿತ ಸಸ್ಯದ ಸ್ಪಷ್ಟ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
      "camera_error": "ಕ್ಯಾಮೆರಾವನ್ನು ಪ್ರವೇಶಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಅನುಮತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
      "analysis_failed": "ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸುವಲ್ಲಿ ದೋಷ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
      "pdf_generated": "ನಿಮ್ಮ ವಿಶ್ಲೇಷಣೆ ವರದಿಯನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಲಾಗಿದೆ.",
      "disease_analysis": "ರೋಗ ವಿಶ್ಲೇಷಣೆ ಫಲಿತಾಂಶಗಳು",
      "confidence": "ವಿಶ್ವಾಸ",
      "status": "ಸ್ಥಿತಿ",
      "affected_area": "ಪ್ರಭಾವಿತ ಪ್ರದೇಶ",
      "description": "ವಿವರಣೆ",
      "causes": "ಕಾರಣಗಳು",
      "prevention": "ತಡೆಗಟ್ಟುವ ಕ್ರಮಗಳು",
      "treatment": "ಚಿಕಿತ್ಸೆಯ ಶಿಫಾರಸುಗಳು",
      "download_pdf": "PDF ವರದಿಯನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
      "farmer_details": "ರೈತ ವಿವರಗಳು",
      "crop_type": "ಬೆಳೆ ಪ್ರಕಾರ",
      "select_crop": "ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ",
      "name": "ಹೆಸರು",
      "enter_name": "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
      "location": "ಸ್ಥಳ",
      "enter_location": "ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ನಮೂದಿಸಿ",
      "phone": "ಫೋನ್ ಸಂಖ್ಯೆ",
      "enter_phone": "ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ",
      "email": "ಇಮೇಲ್",
      "enter_email": "ನಿಮ್ಮ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ",
      "optional": "ಐಚ್ಛಿಕ",
      "next": "ಮುಂದೆ"
    }
  },
  {
    code: "ta",
    name: "தமிழ்",
    translations: {
      "upload": "படத்தை பதிவேற்றவும்",
      "take_photo": "புகைப்படம் எடுக்கவும்",
      "analyze": "படத்தை பகுப்பாய்வு செய்யவும்",
      "analyzing": "பகுப்பாய்வு செய்கிறது...",
      "remove": "அகற்று",
      "back": "பின்செல்",
      "capture": "புகைப்படம் எடுக்கவும்",
      "cancel": "ரத்து செய்",
      "upload_instruction": "பாதிக்கப்பட்ட தாவரத்தின் தெளிவான படத்தை பதிவேற்றவும்",
      "camera_error": "கேமராவை அணுக முடியவில்லை. அனுமதிகளை சரிபார்க்கவும்.",
      "analysis_failed": "படத்தை பகுப்பாய்வு செய்வதில் பிழை. மீண்டும் முயற்சிக்கவும்.",
      "pdf_generated": "உங்கள் பகுப்பாய்வு அறிக்கை பதிவிறக்கப்பட்டது.",
      "disease_analysis": "நோய் பகுப்பாய்வு முடிவுகள்",
      "confidence": "நம்பகத்தன்மை",
      "status": "நிலை",
      "affected_area": "பாதிக்கப்பட்ட பகுதி",
      "description": "விளக்கம்",
      "causes": "காரணங்கள்",
      "prevention": "தடுப்பு நடவடிக்கைகள்",
      "treatment": "சிகிச்சை பரிந்துரைகள்",
      "download_pdf": "PDF அறிக்கையை பதிவிறக்கவும்",
      "farmer_details": "விவசாயி விவரங்கள்",
      "crop_type": "பயிர் வகை",
      "select_crop": "உங்கள் பயிரைத் தேர்ந்தெடுக்கவும்",
      "name": "பெயர்",
      "enter_name": "உங்கள் முழு பெயரை உள்ளிடவும்",
      "location": "இடம்",
      "enter_location": "உங்கள் இடத்தை உள்ளிடவும்",
      "phone": "தொலைபேசி எண்",
      "enter_phone": "உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்",
      "email": "மின்னஞ்சல்",
      "enter_email": "உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும்",
      "optional": "விருப்ப",
      "next": "அடுத்து"
    }
  }
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
