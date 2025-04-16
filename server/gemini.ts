import { GoogleGenerativeAI } from "@google/generative-ai";
import { ResumeAnalysisRequest, ResumeAnalysisResponse } from "@shared/schema";

// Initialize the Gemini API
const apiKey = process.env.GEMINI_API_KEY;
console.log("GEMINI_API_KEY status:", apiKey ? "Present (value starts with: " + apiKey.substring(0, 5) + "...)" : "Missing");
if (!apiKey) {
  console.error("GEMINI_API_KEY is missing in .env file");
}
const genAI = new GoogleGenerativeAI(apiKey || "");
// Using gemini-2.0-flash model for improved speed and performance
// Optimal for our use case of analyzing text content with fast responses
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Job role descriptions
const jobRoleDescriptions: Record<string, string> = {
  "frontend-developer": `
    Frontend Developer skills: HTML, CSS, JavaScript, TypeScript, React.js, Vue.js, Angular, Redux, CSS frameworks like Tailwind/Bootstrap, responsive design, web accessibility, version control (Git), testing frameworks (Jest, Enzyme), build tools (Webpack, Vite), performance optimization.
    Frontend Developer responsibilities: Implement visual elements users see and interact with in web applications, collaborate with UI/UX designers, optimize applications for maximum speed, ensure cross-browser compatibility, write reusable code for future use, translate design wireframes to actual code.
    `,
  "backend-developer": `
    Backend Developer skills: Server-side languages (Node.js, Python, Java, Ruby, PHP, .NET), databases (SQL, NoSQL), REST APIs, server architecture, authentication/authorization, security best practices, cloud services (AWS, Azure, GCP), containerization (Docker, Kubernetes), microservices, serverless, message brokers.
    Backend Developer responsibilities: Design and implement server architecture, develop APIs, integrate with databases, ensure data security, implement business logic, optimize for performance and scalability, handle error logging and monitoring.
    `,
  "full-stack-developer": `
    Full Stack Developer skills: Frontend technologies (HTML, CSS, JavaScript, React/Angular/Vue), backend languages (Node.js, Python, Java, etc.), databases (SQL, NoSQL), API design, server management, version control, responsive design, testing methodologies, deployment processes, security practices.
    Full Stack Developer responsibilities: Develop both client and server software, write clean code for both frontend and backend, design and implement databases, ensure cross-platform optimization, test and debug entire applications, stay updated with emerging technologies.
    `,
  "data-scientist": `
    Data Scientist skills: Python/R programming, SQL, statistics, machine learning algorithms, deep learning, data visualization (Tableau, PowerBI), big data technologies (Hadoop, Spark), cloud platforms, A/B testing, experiment design, domain knowledge.
    Data Scientist responsibilities: Collect, analyze, and interpret complex data sets, build predictive models, use machine learning to improve outcomes, develop data-driven solutions, translate findings into business insights, collaborate with engineering and product teams.
    `,
  "data-analyst": `
    Data Analyst skills: SQL, Excel, data visualization tools (Tableau, PowerBI), statistical analysis, Python/R, data cleaning, ETL processes, reporting, basic machine learning, business intelligence tools.
    Data Analyst responsibilities: Transform and clean data, analyze datasets to identify trends, create dashboards and visualizations, generate reports, support data-driven decision making, maintain databases, ensure data quality and integrity.
    `,
  "product-manager": `
    Product Manager skills: Product lifecycle management, market research, user experience design, agile methodologies, roadmap planning, stakeholder management, analytics tools, wireframing, prioritization frameworks, technical understanding, communication.
    Product Manager responsibilities: Define product vision and strategy, gather and prioritize requirements, work with engineering to deliver features, analyze market trends, conduct user research, define success metrics, coordinate product launches.
    `,
  "ui-ux-designer": `
    UI/UX Designer skills: User research, wireframing, prototyping, visual design, interaction design, information architecture, design tools (Figma, Sketch, Adobe XD), design systems, usability testing, accessibility standards, HTML/CSS knowledge.
    UI/UX Designer responsibilities: Create user-centered designs, conduct user research, develop wireframes and prototypes, establish design guidelines, collaborate with developers, test usability, ensure accessible designs, iterate based on user feedback.
    `,
  "project-manager": `
    Project Manager skills: Project planning, risk management, budgeting, resource allocation, stakeholder communication, team leadership, Agile/Scrum/Waterfall methodologies, project management tools (JIRA, Asana, MS Project), conflict resolution.
    Project Manager responsibilities: Define project scope and objectives, develop project plans, monitor progress, manage resources and budget, identify and mitigate risks, communicate with stakeholders, ensure timely delivery, lead cross-functional teams.
    `,
  "marketing-specialist": `
    Marketing Specialist skills: Marketing strategy, digital marketing (SEO, SEM, email, social media), content creation, analytics tools, CRM systems, market research, A/B testing, campaign management, basic design skills, copywriting.
    Marketing Specialist responsibilities: Develop marketing campaigns, create content for various channels, analyze campaign performance, identify target audiences, optimize conversion funnels, conduct competitor analysis, support brand development.
    `,
};

function getExperienceLevelDescription(level: string): string {
  switch (level) {
    case "entry":
      return "Entry Level (0-2 years of experience): Focus on educational background, internships, projects, and fundamental skills.";
    case "mid":
      return "Mid Level (3-5 years of experience): Highlight specific achievements, growing responsibilities, and demonstrated expertise in relevant skills.";
    case "senior":
      return "Senior Level (6+ years of experience): Emphasize leadership, strategic contributions, advanced technical expertise, and measurable business impact.";
    case "executive":
      return "Executive Level: Focus on leadership philosophy, organizational transformation, strategic vision, business growth metrics, and industry influence.";
    default:
      return "Varied experience level: Focus on relevant skills and achievements for the target role.";
  }
}

export async function analyzeResume(request: ResumeAnalysisRequest): Promise<ResumeAnalysisResponse> {
  const { resumeText, jobRole, customJobRole, experienceLevel } = request;
  
  // Get job role description
  let roleDescription = "";
  if (jobRole === "custom" && customJobRole) {
    roleDescription = `Custom role: ${customJobRole}. Evaluate the resume based on typical skills and responsibilities for this role.`;
  } else {
    roleDescription = jobRoleDescriptions[jobRole] || "General professional role";
  }

  const levelDescription = getExperienceLevelDescription(experienceLevel);

  // Prompt for Gemini
  const prompt = `
  Analyze the following resume for a ${jobRole === "custom" ? customJobRole : jobRole.replace(/-/g, " ")} position (${levelDescription}).
  
  RESUME:
  ${resumeText}
  
  JOB REQUIREMENTS:
  ${roleDescription}
  
  Perform a detailed analysis and provide a JSON response with the following structure:
  {
    "overallScore": (number between 1-100),
    "grammarScore": (number between 1-100),
    "atsScore": (number between 1-100),
    "keywordScore": (number between 1-100),
    "formatScore": (number between 1-100),
    "level": (string - either "Beginner", "Intermediate", "Pro", or "Expert" based on overall score),
    "earnedBadges": [
      {
        "id": (number),
        "name": (string name of the badge, like "Grammar Guru" or "Keyword King"),
        "icon": (string - recommend an icon name from Remix Icon, e.g. "ri-quill-pen-line")
      }
    ],
    "grammarFeedback": {
      "issues": [
        {
          "type": (string - either "positive", "warning", or "error"),
          "text": (string describing the issue or positive aspect)
        }
      ],
      "readabilityComment": (string with overall readability assessment)
    },
    "atsFeedback": {
      "sections": [
        {
          "name": (string name of section, e.g. "Contact Information", "Work Experience"),
          "found": (boolean indicating if section was found)
        }
      ],
      "recommendations": [
        (string with ATS recommendation)
      ]
    },
    "keywordFeedback": {
      "foundKeywords": [
        (string keyword found in resume)
      ],
      "missingKeywords": [
        (string important keyword missing from resume)
      ],
      "recommendation": (string with keyword recommendation)
    },
    "recommendations": [
      {
        "text": (string with recommendation),
        "type": (string - either "strength", "improvement", or "next-step")
      }
    ]
  }
  
  Be honest but helpful in your assessment. The scores should reflect the resume's quality for the specific job role.
  `;

  try {
    // Generate content with Gemini
    const systemMessage = "You are an expert resume analyst with deep knowledge of recruitment, applicant tracking systems, and industry-specific requirements.";
    const result = await model.generateContent([systemMessage, prompt]);
    const response = result.response;
    const text = response.text();
    
    // Parse the JSON response
    // First find the JSON part in the response (in case Gemini adds extra text)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to extract JSON from Gemini response");
    }
    
    const jsonResponse = jsonMatch[0];
    const parsedResponse = JSON.parse(jsonResponse) as ResumeAnalysisResponse;
    
    // Add the job role and experience level to the response
    const enrichedResponse: ResumeAnalysisResponse = {
      ...parsedResponse,
      jobRole,
      customJobRole,
      experienceLevel
    };
    
    return enrichedResponse;
  } catch (error: any) {
    console.error("Error analyzing resume with Gemini:", error.message);
    
    // Provide more specific error messages for API key issues
    if (error.message.includes("403 Forbidden") || error.message.includes("unregistered callers")) {
      throw new Error("Invalid or unregistered Gemini API key. Please make sure your API key is valid and properly set up in the Google AI Studio.");
    }
    
    throw new Error(`Failed to analyze resume: ${error.message}`);
  }
}