import { LanguageSelector } from "./LanguageSelector";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Flag, Github } from "lucide-react";

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

      <footer className="bg-white/80 backdrop-blur-md border-t py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Link 
                to="https://www.researchgate.net/lab/XPEDITION-R-RESEARCH-GROUP-Sai-Praneeth-Reddy-Dhadi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-bold text-primary hover:scale-105 transition-transform inline-block"
              >
                Xpedition R
              </Link>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Our Team</h3>
                <div className="grid grid-cols-2 gap-2">
                  {teamMembers.map((member, index) => (
                    <Link 
                      key={index}
                      to="/about"
                      className="text-sm text-gray-600 hover:text-primary transition-colors"
                    >
                      {member}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-end space-x-2 bg-primary/10 px-3 py-1.5 rounded-full">
                <Flag className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-primary">Made in India</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  Designed and Developed by{" "}
                  <a
                    href="https://github.com/dspraneeth07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-dark inline-flex items-center gap-1"
                  >
                    Dhadi Sai Praneeth Reddy
                    <Github className="w-4 h-4" />
                  </a>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  © {new Date().getFullYear()} Xpedition R. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}