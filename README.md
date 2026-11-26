<p align="center">
  <img src="hire.png" alt="H1RE logo" width="96" />
</p>

<h1 align="center">H1RE</h1>

<p align="center">AI resume analyzer. Upload your resume, pick the job you're aiming for, get scores and concrete fixes.</p>

## What it does

- Reads a **PDF or DOCX** resume (or pasted text).
- Scores it for **grammar**, **ATS compatibility**, **keyword match** and **format** against a chosen job role and experience level.
- Lists what to fix, and lets you download the report as a PDF.

Analysis is done by Google Gemini on the server; nothing is stored.

## Run locally

Needs [Bun](https://bun.sh) and a [Gemini API key](https://aistudio.google.com/apikey).

```bash
bun install
echo "GEMINI_API_KEY=your_key" > .env
bun run dev          # http://localhost:5000
```

## Stack

React + Vite + Tailwind (`client/`), Express API (`server/`), deployed on Vercel with the API as a serverless function (`api/index.ts`).

| Endpoint | Body | Returns |
|---|---|---|
| `POST /api/upload-resume` | multipart `resume` file | `{ text }` |
| `POST /api/analyze-resume` | `{ resumeText, jobRole, customJobRole?, experienceLevel }` | scores + feedback |
