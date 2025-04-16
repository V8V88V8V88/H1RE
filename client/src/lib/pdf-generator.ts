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
    recommendations,
    jobRole,
    customJobRole,
    experienceLevel
  } = result;

  // Format job role for display
  const formatJobRole = (role: string | undefined | null): string => {
    if (!role) return "Not specified";
    
    if (role === "custom" && customJobRole) {
      return customJobRole;
    }
    return role.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Format experience level for display
  const formatExperienceLevel = (level: string | undefined | null): string => {
    if (!level) return "Not specified";
    
    switch (level) {
      case "entry": return "Entry Level (0-2 years)";
      case "mid": return "Mid Level (3-5 years)";
      case "senior": return "Senior Level (6+ years)";
      case "executive": return "Executive Level";
      default: return level.charAt(0).toUpperCase() + level.slice(1);
    }
  };

  // Initialize PDF document with better fonts
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });
  
  // Set document properties
  doc.setProperties({
    title: 'Resume Analysis Report',
    subject: 'Detailed resume analysis',
    author: 'Resume Analyzer AI',
    keywords: 'resume, analysis, report'
  });

  // Helper function for text handling
  const addText = (text: string, x: number, y: number, options: any = {}) => {
    const defaultOptions = { maxWidth: 170, align: 'left' };
    doc.text(text, x, y, { ...defaultOptions, ...options });
  };

  // Using bullet points instead of emojis for better compatibility
  const bulletTypes = {
    positive: '✓',
    warning: '!',
    error: '✗',
    strength: '•',
    improvement: '•',
    nextStep: '•'
  };

  // Title with styling - reduced font size
  doc.setTextColor(0, 120, 212); // Azure blue
  doc.setFontSize(20); // Was 24
  addText('Resume Analysis Report', 105, 15, { align: 'center' });
  
  doc.setTextColor(100, 100, 100); // Gray for date
  doc.setFontSize(10); // Was 12
  addText(`Generated on ${new Date().toLocaleDateString()}`, 105, 22, { align: 'center' });
  
  // Target position information
  doc.setFillColor(240, 245, 255);
  doc.roundedRect(15, 25, 180, 20, 2, 2, 'F');
  
  doc.setTextColor(0, 120, 212);
  doc.setFontSize(12);
  addText('Target Position:', 20, 33);
  
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  addText(formatJobRole(jobRole), 60, 33);
  
  doc.setTextColor(0, 120, 212);
  doc.setFontSize(12);
  addText('Experience Level:', 100, 33);
  
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  addText(formatExperienceLevel(experienceLevel), 140, 33);
  
  // Reset text color for main content
  doc.setTextColor(0, 0, 0);
  
  // Scores section with improved styling - more compact
  doc.setFillColor(240, 240, 240);
  doc.roundedRect(15, 50, 180, 48, 2, 2, 'F');
  
  doc.setFontSize(14); // Was 18
  doc.setTextColor(0, 120, 212);
  addText('Scores', 20, 58);
  
  doc.setFontSize(10); // Was 12
  doc.setTextColor(60, 60, 60);
  
  // Score bars with visual representation - reduced spacing
  const drawScoreBar = (score: number, y: number, label: string) => {
    const barWidth = 90;
    const barHeight = 5; // Was 6
    const startX = 20;
    
    // Draw score label
    addText(`${label}: ${score}`, startX, y);
    
    // Draw background bar
    doc.setFillColor(220, 220, 220);
    doc.roundedRect(startX + 65, y - 3, barWidth, barHeight, 1, 1, 'F');
    
    // Draw score bar
    let fillColor;
    if (score < 50) fillColor = [220, 53, 69]; // Red
    else if (score < 70) fillColor = [255, 193, 7]; // Yellow
    else if (score < 90) fillColor = [0, 123, 255]; // Blue
    else fillColor = [40, 167, 69]; // Green
    
    doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
    doc.roundedRect(startX + 65, y - 3, barWidth * (score / 100), barHeight, 1, 1, 'F');
  };
  
  drawScoreBar(overallScore, 66, 'Overall Score');
  drawScoreBar(grammarScore, 74, 'Grammar & Readability');
  drawScoreBar(atsScore, 82, 'ATS Compatibility');
  drawScoreBar(keywordScore, 90, 'Keyword Optimization');
  
  let yPosition = 102;
  
  // Badges with better styling - reduced spacing
  if (earnedBadges.length > 0) {
    doc.setFillColor(240, 249, 255);
    doc.roundedRect(15, yPosition - 5, 180, 8 + (earnedBadges.length * 7), 2, 2, 'F');
    
    doc.setFontSize(14); // Was 16
    doc.setTextColor(0, 120, 212);
    addText('Earned Badges', 20, yPosition);
    
    doc.setFontSize(10); // Was 12
    doc.setTextColor(60, 60, 60);
    
    earnedBadges.forEach((badge, index) => {
      addText(`• ${badge.name}`, 25, yPosition + 7 + (index * 7));
    });
    
    yPosition += 15 + (earnedBadges.length * 7);
  }
  
  // Grammar Feedback - reduced spacing
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(15, yPosition, 180, 30, 2, 2, 'F');
  
  doc.setFontSize(14); // Was 16
  doc.setTextColor(0, 120, 212);
  addText('Grammar & Readability', 20, yPosition + 8);
  
  doc.setFontSize(10); // Was 12
  doc.setTextColor(60, 60, 60);
  addText(grammarFeedback.readabilityComment, 20, yPosition + 16, { maxWidth: 170 });
  
  yPosition += 35;
  
  grammarFeedback.issues.forEach((issue) => {
    let bulletPoint;
    let textColor;
    
    if (issue.type === 'positive') {
      bulletPoint = '✓';
      textColor = [40, 167, 69]; // Green
    } else if (issue.type === 'warning') {
      bulletPoint = '!';
      textColor = [255, 193, 7]; // Yellow
    } else {
      bulletPoint = '✗';
      textColor = [220, 53, 69]; // Red
    }
    
    // Check if we need a new page
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 15; // Was 20
    }
    
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    addText(bulletPoint, 20, yPosition);
    
    doc.setTextColor(60, 60, 60);
    addText(issue.text, 25, yPosition, { maxWidth: 170 });
    
    yPosition += 6 + (Math.floor(issue.text.length / 90) * 4); // Account for text wrapping
  });
  
  // ATS Feedback
  // Check if we need a new page
  if (yPosition > 240) {
    doc.addPage();
    yPosition = 15; // Was 20
  } else {
    yPosition += 10; // Was 15
  }
  
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(15, yPosition, 180, 12 + (atsFeedback.sections.length * 7), 2, 2, 'F');
  
  doc.setFontSize(14); // Was 16
  doc.setTextColor(0, 120, 212);
  addText('ATS Compatibility', 20, yPosition + 8);
  
  yPosition += 16;
  
  doc.setFontSize(10); // Was 12
  doc.setTextColor(60, 60, 60);
  addText('Section Detection:', 20, yPosition);
  
  yPosition += 6; // Was 8
  
  atsFeedback.sections.forEach((section) => {
    if (section.found) {
      doc.setTextColor(40, 167, 69); // Green
      addText('✓', 20, yPosition);
    } else {
      doc.setTextColor(220, 53, 69); // Red
      addText('✗', 20, yPosition);
    }
    
    doc.setTextColor(60, 60, 60);
    addText(section.name, 25, yPosition);
    addText(section.found ? "Found" : "Missing", 150, yPosition);
    
    yPosition += 7; // Was 8
  });
  
  yPosition += 8; // Was 10
  
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(15, yPosition, 180, 12, 2, 2, 'F');
  
  doc.setFontSize(12); // Was 14
  doc.setTextColor(0, 120, 212);
  addText('ATS Recommendations:', 20, yPosition + 8);
  
  yPosition += 16;
  
  doc.setFontSize(10); // Was 12
  doc.setTextColor(60, 60, 60);
  
  atsFeedback.recommendations.forEach((recommendation) => {
    // Check if we need a new page
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 15; // Was 20
    }
    
    addText('•', 20, yPosition);
    addText(recommendation, 25, yPosition, { maxWidth: 170 });
    
    yPosition += 6 + (Math.floor(recommendation.length / 90) * 4); // Account for text wrapping
  });
  
  // Keyword Feedback
  // Check if we need a new page
  if (yPosition > 240) {
    doc.addPage();
    yPosition = 15; // Was 20
  } else {
    yPosition += 10; // Was 15
  }
  
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(15, yPosition, 180, 12, 2, 2, 'F');
  
  doc.setFontSize(14); // Was 16
  doc.setTextColor(0, 120, 212);
  addText('Keyword Analysis', 20, yPosition + 8);
  
  yPosition += 16;
  
  doc.setFontSize(12); // Was 14
  doc.setTextColor(40, 167, 69); // Green
  addText('Found Keywords:', 20, yPosition);
  
  yPosition += 6; // Was 8
  
  doc.setFontSize(10); // Was 12
  doc.setTextColor(60, 60, 60);
  
  if (keywordFeedback.foundKeywords.length > 0) {
    const foundKeywordsText = keywordFeedback.foundKeywords.join(', ');
    addText(foundKeywordsText, 25, yPosition, { maxWidth: 170 });
    yPosition += 6 + (Math.floor(foundKeywordsText.length / 90) * 4); // Account for text wrapping
  } else {
    addText('None found', 25, yPosition);
    yPosition += 6;
  }
  
  yPosition += 4; // Was 5
  
  doc.setFontSize(12); // Was 14
  doc.setTextColor(220, 53, 69); // Red
  addText('Missing Keywords:', 20, yPosition);
  
  yPosition += 6; // Was 8
  
  doc.setFontSize(10); // Was 12
  doc.setTextColor(60, 60, 60);
  
  if (keywordFeedback.missingKeywords.length > 0) {
    const missingKeywordsText = keywordFeedback.missingKeywords.join(', ');
    addText(missingKeywordsText, 25, yPosition, { maxWidth: 170 });
    yPosition += 6 + (Math.floor(missingKeywordsText.length / 90) * 4); // Account for text wrapping
  } else {
    addText('None missing', 25, yPosition);
    yPosition += 6;
  }
  
  yPosition += 4; // Was 5
  
  doc.setFontSize(12); // Was 14
  doc.setTextColor(0, 120, 212);
  addText('Recommendation:', 20, yPosition);
  
  yPosition += 6; // Was 8
  
  doc.setFontSize(10); // Was 12
  doc.setTextColor(60, 60, 60);
  
  addText(keywordFeedback.recommendation, 25, yPosition, { maxWidth: 170 });
  yPosition += 6 + (Math.floor(keywordFeedback.recommendation.length / 90) * 4); // Account for text wrapping
  
  // General Recommendations
  // Check if we need a new page
  if (yPosition > 240) {
    doc.addPage();
    yPosition = 15; // Was 20
  } else {
    yPosition += 10; // Was 15
  }
  
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(15, yPosition, 180, 12, 2, 2, 'F');
  
  doc.setFontSize(14); // Was 16
  doc.setTextColor(0, 120, 212);
  addText('Recommendations', 20, yPosition + 8);
  
  yPosition += 16;
  
  doc.setFontSize(10); // Was 12
  doc.setTextColor(60, 60, 60);
  
  recommendations.forEach((recommendation) => {
    // Check if we need a new page
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 15; // Was 20
    }
    
    // Set bullet point based on recommendation type
    let bulletPoint;
    let textColor;
    
    if (recommendation.type === 'strength') {
      bulletPoint = '•';
      textColor = [0, 123, 255]; // Blue
    } else if (recommendation.type === 'improvement') {
      bulletPoint = '•';
      textColor = [255, 193, 7]; // Yellow
    } else {
      bulletPoint = '•';
      textColor = [40, 167, 69]; // Green
    }
    
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    addText(bulletPoint, 20, yPosition);
    
    doc.setTextColor(60, 60, 60);
    addText(recommendation.text, 25, yPosition, { maxWidth: 170 });
    
    yPosition += 6 + (Math.floor(recommendation.text.length / 90) * 4); // Account for text wrapping
  });
  
  // Footer
  doc.setFontSize(8); // Was 10
  doc.setTextColor(120, 120, 120);
  addText('Generated by Resume Analyzer AI • https://resume-analyzer.ai', 105, 285, { align: 'center' });
  
  // Save the PDF
  doc.save('resume-analysis-report.pdf');
} 