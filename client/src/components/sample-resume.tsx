import { motion } from "framer-motion";

export function SampleResume() {
  return (
    <motion.div
      className="max-w-sm mx-auto relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      <div className="relative apple-card p-6 theme-transition contrast-card border-2 border-gray-200/30 dark:border-zinc-800/50">
        <div className="space-y-5">
          {/* Resume Header */}
          <div className="text-center border-b border-gray-200/30 dark:border-zinc-800/50 pb-4">
            <h3 className="text-xl font-bold text-[#0078d4] dark:text-white mb-1">
              Jane Smith
            </h3>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Frontend Developer
            </p>
            <div className="flex justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                jane@example.com
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (555) 123-4567
              </span>
            </div>
          </div>
          
          {/* Resume Content */}
          <div className="space-y-4">
            {/* Experience Section */}
            <div>
              <h4 className="text-sm font-bold text-[#0078d4] mb-2 flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-[#0078d4]"></div>
                Experience
              </h4>
              <div className="mt-2 space-y-2.5">
                <div className="pl-3 border-l-2 border-[#0078d4]/20">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">Senior Developer</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">2020-Present</p>
                  </div>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400">TechCorp Inc.</p>
                </div>
                <div className="pl-3 border-l-2 border-[#0078d4]/20">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">Frontend Developer</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">2018-2020</p>
                  </div>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400">WebSolutions Ltd.</p>
                </div>
              </div>
            </div>
            
            {/* Skills Section */}
            <div>
              <h4 className="text-sm font-bold text-[#0078d4] mb-2 flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-[#0078d4]"></div>
                Skills
              </h4>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {["React", "TypeScript", "CSS", "Node.js", "UI/UX"].map((skill) => (
                  <span
                    key={skill}
                    className="inline-block px-2.5 py-1 text-[10px] font-medium rounded-md 
                    bg-[#0078d4]/10 dark:bg-[#0078d4]/20 text-[#0078d4] border border-[#0078d4]/30 dark:border-[#0078d4]/40"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Education Section */}
            <div>
              <h4 className="text-sm font-bold text-[#0078d4] mb-2 flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-[#0078d4]"></div>
                Education
              </h4>
              <div className="mt-2 pl-3 border-l-2 border-[#0078d4]/20">
                <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">B.S. Computer Science</p>
                <p className="text-[10px] text-gray-600 dark:text-gray-400 mt-0.5">University of Technology, 2018</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#0078d4]/5 dark:bg-[#0078d4]/10 rounded-bl-full -z-10"></div>
      </div>
      
      {/* Enhanced shadow effect */}
      <div 
        className="absolute -bottom-2 -right-2 -left-2 h-[98%] rounded-2xl -z-10 bg-gray-200/40 dark:bg-white/5 theme-transition blur-sm"
        style={{ transform: 'rotate(1.5deg)' }}
      />
    </motion.div>
  );
}