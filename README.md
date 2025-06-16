# KDP Translator

This project is a small React application built with Vite. It translates Amazon KDP category paths into the equivalent path for a selected marketplace using the Google Gemini API.

## Setup

Install dependencies and provide your Google Gemini API key in a `.env` file at the project root:

```bash
npm install

# .env
VITE_GEMINI_API_KEY=your-gemini-key
```

## Development

Run the development server with hot reload:

```bash
npm run dev
```

The application allows entering up to four category levels in English and will query Gemini for the translated path when clicking **Search**.
