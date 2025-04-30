# Resume Analyzer AI

![Resume Analyzer AI](generated-icon.png)

A cutting-edge resume evaluation platform powered by Google's Gemini 2.0-Flash AI. Get instant, comprehensive feedback on your resume to maximize your chances of landing your dream job.

## Features

### 📊 Comprehensive Analysis Modules

- **Grammar & Readability**: Catches spelling and grammar errors while evaluating overall readability
- **ATS Compatibility**: Checks if your resume will pass Applicant Tracking Systems used by employers
- **Keyword Analysis**: Identifies missing keywords important for your target job role
- **Smart Recommendations**: Provides personalized suggestions to improve your resume

### 🎯 Targeted Job Analysis

Select from a range of job roles or create a custom role to get feedback specific to your target position. The AI adjusts its analysis based on:
- Your chosen job role (Frontend Developer, Data Scientist, Product Manager, etc.)
- Experience level (Entry, Mid, Senior, Executive)

### 💻 Modern, Responsive UI

- Sleek Apple-inspired design with glass-effect components
- Dark/light mode support
- Fully responsive layouts for all devices
- Azure blue accents and elegant animations

### 🧠 AI-Powered Intelligence

- Leverages Google's Gemini 2.0-Flash model
- Provides scores across multiple categories
- Suggests specific improvements with clear action items

## Technologies Used

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- ShadCN UI component library (not anymore)
- Framer Motion for animations
- React Query for data fetching

### Backend
- Node.js with Express
- File parsing (PDF, DOCX support)
- Google Gemini API integration
- In-memory storage for demos

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- NPM or Yarn
- Google Gemini API key

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/v8v88v8v88/h1re.git
   cd h1re
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5000`

## Usage Guide

1. **Upload Your Resume**
   - Drag and drop a PDF or DOCX file
   - Or paste your resume text directly

2. **Select Job Details**
   - Choose a target job role from the dropdown
   - Select your experience level
   - For custom roles, enter the specific job title

3. **Analyze Your Resume**
   - Click "Analyze Resume" to process your document
   - View comprehensive results organized by category

4. **Implement Suggestions**
   - Review AI recommendations
   - Make changes to your resume based on feedback
   - Re-analyze to see improved scores

## API Documentation

The application exposes the following API endpoints:

- `POST /api/upload-resume`: Upload and parse a resume file
  - Accepts multipart/form-data with a file field
  - Returns parsed text content

- `POST /api/analyze-resume`: Analyze resume text
  - Request body: `{ resumeText, jobRole, customJobRole?, experienceLevel }`
  - Returns comprehensive analysis results

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Acknowledgments

- Built with ❤️ by v8v88v8v88.com
- Powered by Google's Gemini AI technology
