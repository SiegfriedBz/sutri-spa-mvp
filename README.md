# Sutri Spa - Review Assistant

Lightweight Next.js app that drafts warm, brand-consistent replies to Sutri Spa customer reviews using Gemini.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` (or `.env`) from the example and add your key from [Google AI Studio](https://aistudio.google.com/apikey):

```bash
cp .env.example .env.local
```

```env
GEMINI_API_KEY=your_key_here
```

Never commit your real API key.

3. Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- `@google/genai` with **Gemini 3.5 Flash** (`gemini-3.5-flash`)
- Server Action for generation (API key stays server-only)

## Usage

1. Optionally enter the customer name.
2. Paste the customer review (required).
3. Click **Generate Responses**.
4. Copy Option 1 or Option 2.
5. Click **Reset** to clear and draft another reply.
