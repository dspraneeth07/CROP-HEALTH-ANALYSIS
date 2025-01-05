import jsPDF from "jspdf";

export const generatePDFReport = (data: {
  farmerName: string;
  location: string;
  cropType: string;
  imageUrl: string;
  analysis: any;
}) => {
  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(20);
  doc.text("Crop Disease Analysis Report", 20, 20);
  
  // Add farmer details
  doc.setFontSize(12);
  doc.text(`Farmer Name: ${data.farmerName}`, 20, 40);
  doc.text(`Location: ${data.location}`, 20, 50);
  doc.text(`Crop Type: ${data.cropType}`, 20, 60);
  
  // Add analysis results
  doc.text("Disease Analysis Results:", 20, 80);
  doc.text(`Disease: ${data.analysis.diseaseName}`, 30, 90);
  doc.text(`Confidence: ${data.analysis.confidence}%`, 30, 100);
  doc.text(`Status: ${data.analysis.status}`, 30, 110);
  
  // Add treatment recommendations
  doc.text("Treatment Recommendations:", 20, 130);
  doc.text(`Medicine: ${data.analysis.treatment.medicine}`, 30, 140);
  doc.text(`Dosage: ${data.analysis.treatment.dosage}`, 30, 150);
  doc.text(`Frequency: ${data.analysis.treatment.frequency}`, 30, 160);
  
  // Save the PDF
  doc.save("crop-analysis-report.pdf");
};