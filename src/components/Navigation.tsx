import { LanguageSelector } from "./LanguageSelector";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Flag } from "lucide-react";

export function Navigation() {
  const teamMembers = [
    "Dhadi Sai Praneeth Reddy",
    "Kasireddy Manideep Reddy",
    "Baggari Sahasra Reddy",
    "Tanishka Kora"
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/" className="text-xl font-bold text-primary hover:scale-105 transition-transform">
              Xpedition R
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/">
              <Button variant="link" className="text-gray-600 hover:text-primary">Home</Button>
            </Link>
            <Link to="/about">
              <Button variant="link" className="text-gray-600 hover:text-primary">About Us</Button>
            </Link>
            <Link to="/contact">
              <Button variant="link" className="text-gray-600 hover:text-primary">Contact</Button>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSelector />
          </div>
        </div>
      </nav>

      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-lg font-semibold text-primary hover:scale-105 transition-transform">
                Xpedition R
              </Link>
              
              <div className="hidden md:block">
                <h3 className="text-sm font-semibold mb-2">Our Team</h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                  {teamMembers.map((member, index) => (
                    <Link 
                      key={index}
                      to="/about"
                      className="text-xs text-gray-600 hover:text-primary transition-colors"
                    >
                      {member}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 bg-primary/10 px-3 py-1.5 rounded-full">
              <Flag className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary">Made in India</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}