import { GoogleGenerativeAI } from "@google/generative-ai";
import { ResumeAnalysisRequest, ResumeAnalysisResponse } from "@shared/schema";

// Initialize the Gemini API
const apiKey = process.env.GEMINI_API_KEY?.trim();
console.log("GEMINI_API_KEY status:", apiKey ? "Present (value starts with: " + apiKey.substring(0, 5) + "...)" : "Missing");
if (!apiKey) {
  console.error("GEMINI_API_KEY is missing in .env file");
  throw new Error("GEMINI_API_KEY is required. Please set it in your .env file.");
}
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

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
  "devops-engineer": `
    DevOps Engineer skills: CI/CD pipelines, infrastructure as code (Terraform, CloudFormation), containerization (Docker, Kubernetes), cloud platforms (AWS, Azure, GCP), monitoring tools, version control, scripting (Bash, Python), networking, security best practices.
    DevOps Engineer responsibilities: Automate deployment processes, maintain infrastructure, monitor system performance, implement security measures, optimize resource usage, troubleshoot system issues, collaborate with development teams to streamline operations.
    `,
  "qa-engineer": `
    QA Engineer skills: Test planning, manual testing, automated testing frameworks (Selenium, Cypress, Jest), test case design, bug tracking systems, CI/CD familiarity, API testing, performance testing, security testing, regression testing.
    QA Engineer responsibilities: Design and execute test plans, develop automated test scripts, identify and document bugs, validate fixes, ensure software quality before release, collaborate with developers for defect resolution, improve testing processes.
    `,
  "cloud-architect": `
    Cloud Architect skills: Cloud platforms (AWS, Azure, GCP), distributed systems design, networking, security, serverless architecture, containerization, infrastructure as code, cost optimization, disaster recovery planning, performance optimization.
    Cloud Architect responsibilities: Design cloud infrastructure solutions, develop migration strategies, establish best practices, ensure scalability and high availability, optimize cloud spending, implement security controls, lead cloud adoption initiatives.
    `,
  "cybersecurity-analyst": `
    Cybersecurity Analyst skills: Network security, vulnerability assessment, penetration testing, security tools (IDS/IPS, SIEM), threat intelligence, incident response, security frameworks (ISO 27001, NIST), risk assessment, security policies, encryption.
    Cybersecurity Analyst responsibilities: Monitor systems for security breaches, investigate incidents, implement security measures, conduct vulnerability assessments, develop security policies, perform risk analyses, stay current with security trends and threats.
    `,
  "machine-learning-engineer": `
    Machine Learning Engineer skills: Python/C++/Java, ML frameworks (TensorFlow, PyTorch), data modeling, algorithm design, feature engineering, model training and evaluation, MLOps, distributed computing, data pipelines, mathematics and statistics.
    Machine Learning Engineer responsibilities: Design and implement ML systems, develop algorithms, train models, optimize performance, deploy models to production, maintain ML infrastructure, collaborate with data scientists to operationalize models.
    `,
  "blockchain-developer": `
    Blockchain Developer skills: Blockchain platforms (Ethereum, Solana, etc.), smart contract development, cryptography, distributed ledger technology, web3.js, Solidity/Rust, consensus algorithms, decentralized applications (DApps), security best practices.
    Blockchain Developer responsibilities: Design and develop blockchain applications, create and audit smart contracts, implement security measures, optimize gas usage, integrate with existing systems, test blockchain solutions, stay current with blockchain technologies.
    `,
  "mobile-developer": `
    Mobile Developer skills: Native development (Swift/Objective-C for iOS, Kotlin/Java for Android), cross-platform frameworks (React Native, Flutter), mobile UI/UX design, local data storage, RESTful APIs, performance optimization, app security, app store deployment.
    Mobile Developer responsibilities: Design and develop mobile applications, implement user interfaces, integrate with backend services, optimize app performance, fix bugs and issues, ensure cross-device compatibility, deploy apps to app stores, maintain existing apps.
    `,
  "system-administrator": `
    System Administrator skills: Operating systems (Linux, Windows Server), networking, security, backup and recovery, monitoring tools, automation, scripting, virtualization, user management, patch management, troubleshooting.
    System Administrator responsibilities: Install and configure systems, manage user accounts, maintain system security, perform updates and patches, monitor system performance, troubleshoot issues, implement backup solutions, document system configurations.
    `,
  "technical-writer": `
    Technical Writer skills: Technical documentation, content management systems, information architecture, audience analysis, style guides, API documentation, markup languages (Markdown, XML), editing, graphic design basics, project management.
    Technical Writer responsibilities: Create clear technical documentation, develop user guides and manuals, document APIs and code, maintain documentation lifecycle, collaborate with engineers to understand technical concepts, ensure content accuracy and consistency.
    `,
};

function fixJsonErrors(json: string): string {
  let fixed = json;
  
  fixed = fixed.replace(/,\s*]/g, "]");
  fixed = fixed.replace(/,\s*}/g, "}");
  fixed = fixed.replace(/([^\\])"/g, '$1"');
  fixed = fixed.replace(/\\n/g, " ");
  fixed = fixed.replace(/\\t/g, " ");
  
  const lines = fixed.split("\n");
  const cleanedLines: string[] = [];
  let inString = false;
  let stringChar = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let cleanedLine = '';
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      const prevChar = j > 0 ? line[j - 1] : '';
      
      if ((char === '"' || char === "'") && prevChar !== '\\') {
        if (!inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar) {
          inString = false;
          stringChar = '';
        }
      }
      
      if (!inString && char === '\n') {
        continue;
      }
      
      cleanedLine += char;
    }
    
    if (cleanedLine.trim()) {
      cleanedLines.push(cleanedLine);
    }
  }
  
  return cleanedLines.join('\n');
}

function getExperienceLevelDescription(level: string): string {
  switch (level) {
    case "fresher":
      return "Fresher (No experience): Focus on educational qualifications, relevant coursework, academic projects, internships, technical skills, and eagerness to learn.";
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

  const prompt = `
Analyze the following resume for a ${jobRole === "custom" ? customJobRole : jobRole.replace(/-/g, " ")} position (${levelDescription}).

RESUME:
${resumeText}

JOB REQUIREMENTS:
${roleDescription}

Perform a detailed analysis and provide ONLY valid JSON with the following structure. Do not include any markdown formatting, code blocks, or explanatory text - only the raw JSON object:
{
  "overallScore": <number between 1-100>,
  "grammarScore": <number between 1-100>,
  "atsScore": <number between 1-100>,
  "keywordScore": <number between 1-100>,
  "formatScore": <number between 1-100>,
  "level": "<Beginner|Intermediate|Pro|Expert>",
  "earnedBadges": [
    {
      "id": <number>,
      "name": "<badge name>",
      "icon": "<remix icon name>"
    }
  ],
  "grammarFeedback": {
    "issues": [
      {
        "type": "<positive|warning|error>",
        "text": "<description>"
      }
    ],
    "readabilityComment": "<comment>"
  },
  "atsFeedback": {
    "sections": [
      {
        "name": "<section name>",
        "found": <true|false>
      }
    ],
    "recommendations": ["<recommendation>"]
  },
  "keywordFeedback": {
    "foundKeywords": ["<keyword>"],
    "missingKeywords": ["<keyword>"],
    "recommendation": "<recommendation>"
  },
  "recommendations": [
    {
      "text": "<recommendation>",
      "type": "<strength|improvement|next-step>"
    }
  ]
}

Be honest but helpful. The scores should reflect the resume's quality for the specific job role. Return ONLY the JSON object, nothing else.
  `;

  try {
    const systemMessage = "You are an expert resume analyst with deep knowledge of recruitment, applicant tracking systems, and industry-specific requirements. Always respond with valid JSON only, no markdown, no code blocks, no explanations.";
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `${systemMessage}\n\n${prompt}` }] }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    });
    
    const response = result.response;
    const text = response.text();
    
    let jsonResponse = text.trim();
    
    if (jsonResponse.startsWith("```json")) {
      jsonResponse = jsonResponse.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (jsonResponse.startsWith("```")) {
      jsonResponse = jsonResponse.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }
    
    jsonResponse = jsonResponse.trim();
    
    if (!jsonResponse.startsWith("{")) {
      const jsonMatch = jsonResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonResponse = jsonMatch[0];
      }
    }
    
    let parsedResponse: ResumeAnalysisResponse;
    try {
      parsedResponse = JSON.parse(jsonResponse) as ResumeAnalysisResponse;
    } catch (parseError: any) {
      console.error("JSON parse error at position:", parseError.message);
      console.error("JSON response (first 500 chars):", jsonResponse.substring(0, 500));
      
      const fixedJson = fixJsonErrors(jsonResponse);
      try {
        parsedResponse = JSON.parse(fixedJson) as ResumeAnalysisResponse;
      } catch (retryError) {
        throw new Error(`Failed to parse JSON response: ${parseError.message}. Response preview: ${jsonResponse.substring(0, 200)}...`);
      }
    }
    
    const enrichedResponse: ResumeAnalysisResponse = {
      ...parsedResponse,
      jobRole,
      customJobRole,
      experienceLevel
    };
    
    return enrichedResponse;
  } catch (error: any) {
    console.error("Error analyzing resume with Gemini:", error.message);
    
    if (error.message.includes("403 Forbidden") || error.message.includes("unregistered callers")) {
      throw new Error("Invalid or unregistered Gemini API key. Please make sure your API key is valid and properly set up in the Google AI Studio.");
    }
    
    if (error.message.includes("429") || error.message.includes("quota") || error.message.includes("limit: 0")) {
      if (error.message.includes("limit: 0")) {
        throw new Error("Gemini API is not enabled or API key is invalid. Please check: 1) API key is correct, 2) Generative AI API is enabled in Google Cloud Console, 3) API key has proper permissions.");
      }
      throw new Error(`Quota exceeded: ${error.message}`);
    }
    
    throw new Error(`Failed to analyze resume: ${error.message}`);
  }
}