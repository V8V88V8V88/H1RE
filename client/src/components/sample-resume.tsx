import { motion } from "framer-motion";

export function SampleResume() {
  return (
    <motion.div
      className="max-w-xs mx-auto my-6 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <div className="apple-card p-5 theme-transition contrast-card">
        <div className="space-y-4">
          {/* Resume Header */}
          <div className="text-center border-b border-gray-200/20 dark:border-white/10 pb-3">
            <h3 className="text-lg font-bold bg-gradient-to-r from-[#0078d4] to-[#50b0ff] bg-clip-text text-transparent">
              Jane Smith
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Frontend Developer
            </p>
            <div className="flex justify-center gap-2 mt-1 text-[10px] text-gray-500 dark:text-gray-500">
              <span>jane@example.com</span>
              <span>•</span>
              <span>(555) 123-4567</span>
            </div>
          </div>
          
          {/* Resume Content */}
          <div className="space-y-2">
            {/* Experience Section */}
            <div>
              <h4 className="text-xs font-semibold text-[#0078d4]">Experience</h4>
              <div className="mt-1 space-y-1.5">
                <div>
                  <div className="flex justify-between items-center">
                    <p className="text-[11px] font-medium text-gray-700 dark:text-gray-300">Senior Developer</p>
                    <p className="text-[9px] text-gray-500">2020-Present</p>
                  </div>
                  <p className="text-[9px] text-gray-500">TechCorp Inc.</p>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <p className="text-[11px] font-medium text-gray-700 dark:text-gray-300">Frontend Developer</p>
                    <p className="text-[9px] text-gray-500">2018-2020</p>
                  </div>
                  <p className="text-[9px] text-gray-500">WebSolutions Ltd.</p>
                </div>
              </div>
            </div>
            
            {/* Skills Section - Simple Pills */}
            <div>
              <h4 className="text-xs font-semibold text-[#0078d4]">Skills</h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {["React", "TypeScript", "CSS", "Node.js", "UI/UX"].map((skill) => (
                  <span
                    key={skill}
                    className="inline-block px-2 py-0.5 text-[9px] font-medium rounded-full 
                    bg-[#0078d4]/10 text-[#0078d4] border border-[#0078d4]/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Education Section */}
            <div>
              <h4 className="text-xs font-semibold text-[#0078d4]">Education</h4>
              <div className="mt-1">
                <p className="text-[11px] font-medium text-gray-700 dark:text-gray-300">B.S. Computer Science</p>
                <p className="text-[9px] text-gray-500">University of Technology, 2018</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Paper effect shadow */}
      <div 
        className="absolute -bottom-1 -right-1 -left-1 h-[98%] rounded-2xl -z-10 bg-gray-200/50 dark:bg-white/5 theme-transition"
        style={{ transform: 'rotate(1deg)' }}
      />
    </motion.div>
  );
}