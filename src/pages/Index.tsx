import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Disease Diagnosis",
    description: "Advanced AI-powered analysis to identify crop diseases accurately",
  },
  {
    icon: Shield,
    title: "Treatment Recommendations",
    description: "Get detailed treatment plans and prevention strategies",
  },
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "Quick and reliable results to help you take immediate action",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center animate-fade-up">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            AI-Powered Crop Health Analysis
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We empower Indian farmers with AI tools to improve crop health using technology
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary-dark">
            Get Started
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            Designed and Developed by Dhadi Sai Praneeth Reddy |{" "}
            <a
              href="https://github.com/dspraneeth07"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark"
            >
              GitHub: /dspraneeth07
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;