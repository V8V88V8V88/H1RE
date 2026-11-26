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
      </div>
    </footer>
  );
}
