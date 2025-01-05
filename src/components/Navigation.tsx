import { LanguageSelector } from "./LanguageSelector";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

export function Navigation() {
  const { t } = useTranslation();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img 
            src="https://drive.google.com/file/d/1BupNVXXDCP8vDPDER0Q-OHTSIn3tqIAG/view?usp=drive_link" 
            alt="Xpedition R Logo" 
            className="h-8 w-auto"
          />
          <span className="text-xl font-bold text-primary">{t("app.title")}</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Button variant="link" className="text-gray-600 hover:text-primary">{t("nav.home")}</Button>
          <Button variant="link" className="text-gray-600 hover:text-primary">{t("nav.about")}</Button>
          <Button variant="link" className="text-gray-600 hover:text-primary">{t("nav.help")}</Button>
          <Button variant="link" className="text-gray-600 hover:text-primary">{t("nav.contact")}</Button>
        </div>

        <div className="flex items-center space-x-4">
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
}