import { LanguageSelector } from "./LanguageSelector";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">Xpedition R</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/">
            <Button variant="link" className="text-gray-600 hover:text-primary">Home</Button>
          </Link>
          <Link to="/about">
            <Button variant="link" className="text-gray-600 hover:text-primary">About Us</Button>
          </Link>
          <Button variant="link" className="text-gray-600 hover:text-primary">Get Help</Button>
          <Button variant="link" className="text-gray-600 hover:text-primary">Contact</Button>
        </div>

        <div className="flex items-center space-x-4">
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
}