import jsPDF from "jspdf";
import { FarmerData, AnalysisData } from "../types/analysis";

export const generatePDF = (
  cropType: string,
  imageUrl: string,
  farmerData: FarmerData,
  analysisData: AnalysisData
) => {
  const pdf = new jsPDF();
  let yPos = 20;

  // Add border to all pages
  const addPageBorder = () => {
    pdf.setDrawColor(76, 175, 80);
    pdf.setLineWidth(0.5);
    pdf.rect(10, 10, pdf.internal.pageSize.width - 20, pdf.internal.pageSize.height - 20);
  };

  // Initialize first page
  addPageBorder();

  // Add header
  pdf.setFontSize(28);
  pdf.setTextColor(76, 175, 80);
  pdf.setFont("helvetica", "bold");
  
  // Draw title
  pdf.text("Xpedition R", pdf.internal.pageSize.width / 2, yPos, { 
    align: "center",
    renderingMode: "fill"
  });
  
  // Add subtitle
  yPos += 20;
  pdf.setFontSize(18);
  pdf.setTextColor(33, 33, 33);
  pdf.text(`Crop Disease Analysis Report`, pdf.internal.pageSize.width / 2, yPos, { align: "center" });
  
  yPos += 10;
  pdf.setFontSize(16);
  pdf.text(`${cropType}`, pdf.internal.pageSize.width / 2, yPos, { align: "center" });
  yPos += 25;

  // Add user details table with improved styling
  pdf.setFillColor(240, 247, 250);
  pdf.setDrawColor(76, 175, 80);
  pdf.setLineWidth(0.1);

  const tableData = [
    ["Farmer Details", ""],
    ["Name", farmerData?.name || "N/A"],
    ["Location", farmerData?.location || "N/A"],
    ["Phone", farmerData?.phone || "N/A"],
    ["Email", farmerData?.email || "N/A"],
    ["Crop Type", cropType || "N/A"]
  ];

  // Table styling
  const cellPadding = 5;
  const columnWidth = 85;
  const rowHeight = 12;
  const startX = (pdf.internal.pageSize.width - (columnWidth * 2)) / 2;

  // Draw enhanced table
  tableData.forEach((row, i) => {
    if (i === 0) {
      pdf.setFillColor(76, 175, 80);
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(14);
    } else {
      pdf.setFillColor(i % 2 === 0 ? 245 : 255, 247, 250);
      pdf.setTextColor(33, 33, 33);
      pdf.setFontSize(12);
    }

    // Draw cells with proper spacing
    row.forEach((cell, j) => {
      pdf.rect(startX + (j * columnWidth), yPos, columnWidth, rowHeight, 'F');
      pdf.rect(startX + (j * columnWidth), yPos, columnWidth, rowHeight, 'S');
      pdf.text(cell, startX + (j * columnWidth) + cellPadding, yPos + 8);
    });
    yPos += rowHeight;
  });

  yPos += 15;

  // Add the analyzed image with label
  if (imageUrl) {
    const imgWidth = 120;
    const imgHeight = 90;
    
    if (yPos + imgHeight + 30 > pdf.internal.pageSize.height - 20) {
      pdf.addPage();
      yPos = 20;
      addPageBorder();
    }
    
    pdf.addImage(imageUrl, 'JPEG', (pdf.internal.pageSize.width - imgWidth) / 2, yPos, imgWidth, imgHeight);
    yPos += imgHeight + 10;
    
    // Add "Analyzed Image" label
    pdf.setFontSize(12);
    pdf.setTextColor(76, 175, 80);
    pdf.text("Analyzed Image", pdf.internal.pageSize.width / 2, yPos, { align: "center" });
    yPos += 15;
  }

  // Function to check and add new page if needed
  const checkAndAddNewPage = (requiredSpace: number) => {
    if (yPos + requiredSpace > pdf.internal.pageSize.height - 20) {
      pdf.addPage();
      yPos = 20;
      addPageBorder();
      return true;
    }
    return false;
  };

  // Function to add wrapped text with proper bullet points
  const addBulletPoint = (text: string, indent: number = 25, bulletSize: number = 1) => {
    const maxWidth = pdf.internal.pageSize.width - 40 - indent;
    const lines = pdf.splitTextToSize(text, maxWidth);
    
    checkAndAddNewPage(lines.length * 7 + 5);
    
    // Draw bullet point
    pdf.circle(20 + indent - 15, yPos + 2, bulletSize, 'F');
    
    // Add text with proper spacing
    lines.forEach((line: string) => {
      pdf.text(line, indent + 20, yPos + 4);
      yPos += 8;
    });
    yPos += 2;
  };

  // Disease information section
  pdf.setTextColor(33, 33, 33);
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");

  checkAndAddNewPage(100);
  
  // Disease name and confidence
  pdf.setFillColor(76, 175, 80);
  pdf.text("Disease Information", 25, yPos);
  yPos += 10;

  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  
  // Add disease details with improved spacing
  pdf.text(`Disease: ${analysisData.diseaseName}`, 25, yPos);
  yPos += 8;
  pdf.text(`Confidence: ${analysisData.confidence}%`, 25, yPos);
  yPos += 15;

  // Status section with improved colors
  checkAndAddNewPage(50);
  const statusColor = {
    severe: "#D32F2F",
    moderate: "#F57C00",
    healthy: "#388E3C"
  }[analysisData.status];
  
  pdf.setFillColor(statusColor);
  pdf.setTextColor(statusColor);
  pdf.text(`Status: ${analysisData.status.toUpperCase()}`, 25, yPos);
  yPos += 8;
  
  pdf.setTextColor(33, 33, 33);
  pdf.text(`Affected Area: ${analysisData.affectedArea}%`, 25, yPos);
  yPos += 15;

  // Description section
  checkAndAddNewPage(50);
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text("Description", 25, yPos);
  yPos += 8;
  
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  const descriptionLines = pdf.splitTextToSize(analysisData.description, pdf.internal.pageSize.width - 50);
  descriptionLines.forEach((line: string) => {
    checkAndAddNewPage(7);
    pdf.text(line, 25, yPos);
    yPos += 7;
  });
  yPos += 10;

  // Causes section with improved bullet points
  checkAndAddNewPage(50);
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text("Causes", 25, yPos);
  yPos += 8;
  
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  analysisData.causes.forEach(cause => {
    addBulletPoint(cause);
  });
  yPos += 10;

  // Prevention section with improved bullet points
  checkAndAddNewPage(50);
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text("Prevention Steps", 25, yPos);
  yPos += 8;
  
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  analysisData.prevention.forEach(step => {
    addBulletPoint(step);
  });
  yPos += 10;

  // Treatment section with improved formatting
  checkAndAddNewPage(50);
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text("Treatment Recommendations", 25, yPos);
  yPos += 8;
  
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);

  const treatment = analysisData.treatment;
  addBulletPoint(`Medicine: ${treatment.medicine}`);
  addBulletPoint(`Dosage: ${treatment.dosage}`);
  addBulletPoint(`Frequency: ${treatment.frequency}`);
  addBulletPoint(`Instructions: ${treatment.instructions}`);

  // Add watermark on each page
  const totalPages = pdf.internal.pages.length;
  for(let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(10);
    pdf.setTextColor(180, 180, 180);
    pdf.text(
      "Xpedition R Crop Health",
      pdf.internal.pageSize.width - 20,
      pdf.internal.pageSize.height - 10,
      { align: "right" }
    );
  }

  return pdf;
};