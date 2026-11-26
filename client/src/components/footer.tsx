import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const checks = [
  { title: "Grammar", text: "spelling, grammar and how easy it is to read" },
  { title: "ATS fit", text: "whether hiring software can parse your resume" },
  { title: "Keywords", text: "skills the target role expects that are missing" },
  { title: "Fixes", text: "specific changes to make, in order of impact" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-zinc-800 py-6">
      <div className="container mx-auto max-w-7xl px-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>
          Made with 💙 by{" "}
          <a
            href="https://v8v88v8v88.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-900 dark:text-white hover:text-[#0078d4] dark:hover:text-[#0078d4] transition-colors"
          >
            v8v88v8v88
          </a>
        </span>

        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                About
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-2xl border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  About H1RE
                </DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Upload your resume, choose the role you're applying for, and get a score with clear feedback.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 text-sm leading-relaxed">
                <div>
                  <h4 className="mb-2 font-medium text-gray-900 dark:text-white">What it checks</h4>
                  <ul className="space-y-2">
                    {checks.map((c) => (
                      <li key={c.title} className="text-gray-600 dark:text-gray-400">
                        <span className="font-medium text-gray-900 dark:text-white">{c.title}</span>: {c.text}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-gray-600 dark:text-gray-400">
                  Your resume is only used to generate the analysis and is not saved.
                </p>
              </div>
            </DialogContent>
          </Dialog>
          <a
            href="https://github.com/V8V88V8V88/H1RE"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            title="GitHub"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <svg viewBox="0 0 16 16" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
