import { jsPDF } from 'jspdf';
import { ChecklistResultData } from '../types.js';

export function generateChecklistPDF(data: ChecklistResultData): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let y = 18;

  // Header Banner
  doc.setFillColor(15, 42, 74); // Deep navy government header
  doc.rect(0, 0, pageWidth, 26, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('CITIZEN APPLICATION DOCUMENT CHECKLIST', margin, 12);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('GOVERNMENT PUBLIC SERVICE DIGITAL ADVISORY (GOV-23)', margin, 18);

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  doc.text(`Generated: ${currentDate}`, pageWidth - margin, 18, { align: 'right' });

  y = 34;

  // Service Box
  doc.setFillColor(245, 248, 252);
  doc.setDrawColor(200, 215, 235);
  doc.roundedRect(margin, y, contentWidth, 26, 2, 2, 'FD');

  doc.setTextColor(15, 42, 74);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(data.service, margin + 5, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(70, 85, 105);
  doc.text(`Department: ${data.department}`, margin + 5, y + 15);
  doc.text(`Citizen Profile: ${data.citizenProfileSummary || 'Applicant'}`, margin + 5, y + 21);

  y += 32;

  // AI Summary Box
  if (data.summary) {
    doc.setFillColor(240, 247, 244);
    doc.setDrawColor(180, 220, 200);
    doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'FD');

    doc.setTextColor(20, 90, 60);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('ADVISORY SUMMARY:', margin + 5, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(40, 60, 50);
    const splitSummary = doc.splitTextToSize(data.summary, contentWidth - 10);
    doc.text(splitSummary, margin + 5, y + 11);

    y += 24;
  }

  // Section 1: Mandatory Documents
  doc.setTextColor(15, 42, 74);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(`1. MANDATORY DOCUMENTS (Must Be Submitted) - [${data.mandatoryDocuments.length}]`, margin, y);
  y += 6;

  data.mandatoryDocuments.forEach((item, index) => {
    // Check page overflow
    if (y > 255) {
      doc.addPage();
      y = 20;
    }

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(220, 225, 230);
    doc.roundedRect(margin, y, contentWidth, 14, 1.5, 1.5, 'FD');

    // Green mandatory pip
    doc.setFillColor(34, 139, 34);
    doc.rect(margin, y, 3, 14, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(20, 30, 45);
    doc.text(`[M-${index + 1}] ${item.name}`, margin + 6, y + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(80, 95, 110);
    const reasonText = `Reason: ${item.reason}`;
    const splitReason = doc.splitTextToSize(reasonText, contentWidth - 12);
    doc.text(splitReason, margin + 6, y + 10.5);

    y += 16;
  });

  y += 4;

  // Section 2: Conditional Documents
  if (data.conditionalDocuments.length > 0) {
    if (y > 245) {
      doc.addPage();
      y = 20;
    }

    doc.setTextColor(15, 42, 74);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`2. CONDITIONAL DOCUMENTS (Submit Only If Applicable) - [${data.conditionalDocuments.length}]`, margin, y);
    y += 6;

    data.conditionalDocuments.forEach((item, index) => {
      if (y > 255) {
        doc.addPage();
        y = 20;
      }

      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(230, 220, 190);
      doc.roundedRect(margin, y, contentWidth, 15, 1.5, 1.5, 'FD');

      // Amber conditional pip
      doc.setFillColor(217, 119, 6);
      doc.rect(margin, y, 3, 15, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(30, 40, 55);
      doc.text(`[C-${index + 1}] ${item.name}`, margin + 6, y + 5.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 80, 30);
      const conditionText = `Condition: ${item.reason || item.conditionRule || 'Required under specific eligibility conditions'}`;
      const splitCondition = doc.splitTextToSize(conditionText, contentWidth - 12);
      doc.text(splitCondition, margin + 6, y + 10.5);

      y += 17;
    });
  }

  // Source & Disclaimer Box
  if (y > 240) {
    doc.addPage();
    y = 20;
  } else {
    y += 4;
  }

  doc.setFillColor(248, 249, 250);
  doc.setDrawColor(215, 220, 225);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(50, 65, 85);
  doc.text(`OFFICIAL SOURCE: ${data.source} (Verified: ${data.sourceDate})`, margin + 4, y + 6);
  doc.text(`AI ENGINE: ${data.modelName || 'Gemini 3.8 Flash'} (Hallucination Prevention Active)`, margin + 4, y + 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 110, 120);
  const disclaimerText = `IMPORTANT NOTICE: ${data.disclaimer}`;
  const splitDisclaimer = doc.splitTextToSize(disclaimerText, contentWidth - 8);
  doc.text(splitDisclaimer, margin + 4, y + 16);

  // Footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(140, 150, 160);
    doc.text('Citizen Document Assistant (GOV-23) - Official Guidance Document', margin, 290);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, 290, { align: 'right' });
  }

  // Save the PDF
  const safeFilename = `${data.service.toLowerCase().replace(/[^a-z0-9]/g, '_')}_document_checklist.pdf`;
  doc.save(safeFilename);
}
