import jsPDF from 'jspdf';
import type { ResumeAnalysisResponse } from '@shared/schema';

export function generatePDFReport(result: ResumeAnalysisResponse): void {
  const {
    overallScore,
    grammarScore,
    atsScore,
    keywordScore,
    formatScore,
    earnedBadges,
    grammarFeedback,
    atsFeedback,
    keywordFeedback,
    recommendations
  } = result;

  // Initialize PDF document
  const doc = new jsPDF();
  
  // Set document properties
  doc.setProperties({
    title: 'Resume Analysis Report',
    subject: 'Detailed resume analysis',
    author: 'Resume Analyzer AI',
    keywords: 'resume, analysis, report'
  });

  // Title
  doc.setFontSize(20);
  doc.text('Resume Analysis Report', 105, 20, { align: 'center' });
  doc.setFontSize(12);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 30, { align: 'center' });
  
  // Scores
  doc.setFontSize(16);
  doc.text('Scores', 20, 45);
  
  doc.setFontSize(12);
  doc.text(`Overall Score: ${overallScore}`, 20, 55);
  doc.text(`Grammar & Readability: ${grammarScore}`, 20, 65);
  doc.text(`ATS Compatibility: ${atsScore}`, 20, 75);
  doc.text(`Keyword Optimization: ${keywordScore}`, 20, 85);
  doc.text(`Format & Structure: ${formatScore}`, 20, 95);
  
  // Badges
  if (earnedBadges.length > 0) {
    doc.setFontSize(16);
    doc.text('Earned Badges', 20, 110);
    
    doc.setFontSize(12);
    earnedBadges.forEach((badge, index) => {
      doc.text(`• ${badge.name}`, 20, 120 + (index * 10));
    });
  }
  
  // Grammar Feedback
  doc.setFontSize(16);
  doc.text('Grammar & Readability', 20, 145);
  
  doc.setFontSize(12);
  doc.text(grammarFeedback.readabilityComment, 20, 155, { maxWidth: 170 });
  
  let yPosition = 165;
  grammarFeedback.issues.forEach((issue) => {
    const icon = issue.type === 'positive' ? '✅' : issue.type === 'warning' ? '⚠️' : '❌';
    const text = `${icon} ${issue.text}`;
    
    // Check if we need a new page
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.text(text, 20, yPosition, { maxWidth: 170 });
    yPosition += 10 + (Math.floor(issue.text.length / 70) * 5); // Account for text wrapping
  });
  
  // ATS Feedback
  // Check if we need a new page
  if (yPosition > 240) {
    doc.addPage();
    yPosition = 20;
  } else {
    yPosition += 15;
  }
  
  doc.setFontSize(16);
  doc.text('ATS Compatibility', 20, yPosition);
  yPosition += 10;
  
  doc.setFontSize(12);
  doc.text('Section Detection:', 20, yPosition);
  yPosition += 10;
  
  atsFeedback.sections.forEach((section) => {
    doc.text(`${section.found ? '✅' : '❌'} ${section.name}`, 20, yPosition);
    yPosition += 10;
  });
  
  yPosition += 5;
  doc.text('ATS Recommendations:', 20, yPosition);
  yPosition += 10;
  
  atsFeedback.recommendations.forEach((recommendation) => {
    // Check if we need a new page
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.text(`• ${recommendation}`, 20, yPosition, { maxWidth: 170 });
    yPosition += 10 + (Math.floor(recommendation.length / 70) * 5); // Account for text wrapping
  });
  
  // Keyword Feedback
  // Check if we need a new page
  if (yPosition > 240) {
    doc.addPage();
    yPosition = 20;
  } else {
    yPosition += 15;
  }
  
  doc.setFontSize(16);
  doc.text('Keyword Analysis', 20, yPosition);
  yPosition += 10;
  
  doc.setFontSize(12);
  
  // Found Keywords
  doc.text('Found Keywords:', 20, yPosition);
  yPosition += 10;
  
  if (keywordFeedback.foundKeywords.length > 0) {
    const foundKeywordsText = keywordFeedback.foundKeywords.join(', ');
    doc.text(foundKeywordsText, 20, yPosition, { maxWidth: 170 });
    yPosition += 10 + (Math.floor(foundKeywordsText.length / 70) * 5); // Account for text wrapping
  } else {
    doc.text('None found', 20, yPosition);
    yPosition += 10;
  }
  
  // Missing Keywords
  yPosition += 5;
  doc.text('Missing Keywords:', 20, yPosition);
  yPosition += 10;
  
  if (keywordFeedback.missingKeywords.length > 0) {
    const missingKeywordsText = keywordFeedback.missingKeywords.join(', ');
    doc.text(missingKeywordsText, 20, yPosition, { maxWidth: 170 });
    yPosition += 10 + (Math.floor(missingKeywordsText.length / 70) * 5); // Account for text wrapping
  } else {
    doc.text('None missing', 20, yPosition);
    yPosition += 10;
  }
  
  // Keyword Recommendation
  yPosition += 5;
  doc.text('Recommendation:', 20, yPosition);
  yPosition += 10;
  
  doc.text(keywordFeedback.recommendation, 20, yPosition, { maxWidth: 170 });
  yPosition += 10 + (Math.floor(keywordFeedback.recommendation.length / 70) * 5); // Account for text wrapping
  
  // General Recommendations
  // Check if we need a new page
  if (yPosition > 240) {
    doc.addPage();
    yPosition = 20;
  } else {
    yPosition += 15;
  }
  
  doc.setFontSize(16);
  doc.text('Recommendations', 20, yPosition);
  yPosition += 10;
  
  doc.setFontSize(12);
  
  recommendations.forEach((recommendation) => {
    // Check if we need a new page
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }
    
    const icon = recommendation.type === 'strength' 
      ? '💪' 
      : recommendation.type === 'improvement' 
        ? '🔄' 
        : '➡️';
    
    doc.text(`${icon} ${recommendation.text}`, 20, yPosition, { maxWidth: 170 });
    yPosition += 10 + (Math.floor(recommendation.text.length / 70) * 5); // Account for text wrapping
  });
  
  // Footer
  doc.setFontSize(10);
  doc.text('Generated by Resume Analyzer AI • https://resume-analyzer.ai', 105, 285, { align: 'center' });
  
  // Save the PDF
  doc.save('resume-analysis-report.pdf');
} 