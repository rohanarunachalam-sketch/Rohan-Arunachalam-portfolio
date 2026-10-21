/*
 * Central portfolio configuration.
 * Edit the values here — the page reads everything below at load time.
 * Leave a link as "" to show it as "coming soon" instead of a broken link.
 */
window.PORTFOLIO = {
  name: "Rohan Arunachalam. G",
  role: "Civil Engineer | Building with AI & Automation",

  email: "rohanarunachalam@gmail.com",
  github: "https://github.com/rohanarunachalam-sketch",
  linkedin: "https://www.linkedin.com/in/rohan-arunachalam-68a25722a",

  // Pre-graded black & white portrait (spaces in the filename are URL-encoded as %20).
  // Other photos in /image: "Picsart_24-06-12_12-53-00-190.jpg.jpeg" (colour original),
  // "rohan-cinematic.jpg".
  profileImage: "image/Cinematic%20High-Contrast%20Monochrome%20Portrait.png",

  /*
   * Projects. Add a new object to this list to add a project card.
   * visual: one of "graph" | "dairy" | "billing" | "flow" | "term" | "site"
   *   flow → uses `flow` (three short steps; "\n" breaks a line)
   *   term → uses `term` (lines; a line starting with "> " is typed input, "✓ " a success line)
   * tag: short category label shown on the carousel card
   * featured: true → shown in the large featured block (its text lives in index.html;
   * only its github/demo links are read from here) instead of the grid.
   */
  projects: [
    {
      featured: true,
      title: "Construction Project AI Assistant",
      description:
        "Upload a project's documents once and ask questions in plain language — answers come back with the source file, page number and the relevant drawing.",
      tech: ["Python", "LangChain", "Streamlit", "FAISS", "BM25", "PyMuPDF", "OpenAI"],
      features: ["Project ZIP upload", "Hybrid retrieval", "Source references", "Drawing search", "Answer cache"],
      github: "https://github.com/rohanarunachalam-sketch/Construction_RAG",
      demo: ""
    },
    {
      title: "RAGFusion — Hybrid RAG",
      description:
        "Upload a PDF and ask questions about it. Combines FAISS vector search with a Neo4j knowledge graph to retrieve context for GPT-4.1-mini.",
      tech: ["Python", "Streamlit", "FastAPI", "LangChain", "FAISS", "Neo4j", "OpenAI", "Docker"],
      features: [
        "Vector search + knowledge graph retrieval",
        "Natural-language Q&A over PDFs",
        "Duplicate document detection",
        "Streamlit frontend, FastAPI backend",
        "Docker Compose deployment"
      ],
      visual: "graph",
      tag: "Hybrid RAG",
      github: "https://github.com/rohanarunachalam-sketch/RAGFusion",
      demo: ""
    },
    {
      title: "GRV Dairy Management System",
      description:
        "A real-world dairy management platform for customer milk subscriptions, purchases and add-on products — on the web and as an Android app.",
      tech: ["JavaScript", "Node.js", "libSQL", "PWA", "Capacitor", "Vercel"],
      features: [
        "Customer login & ID system",
        "Milk subscription management",
        "Cancel milk for specific days",
        "Add-on products — eggs, ghee, curd",
        "Purchase history & billing",
        "Installable web app + Android build"
      ],
      visual: "dairy",
      tag: "Business app",
      github: "https://github.com/rohanarunachalam-sketch/GRV-2.0",
      demo: "https://rohanarunachalam-sketch.github.io/GRV-2.0/"
    },
    {
      title: "OHM Billing — GST Invoicing",
      description:
        "Self-hosted billing for Indian small businesses: customers, products and GST-compliant tax invoices with automatic CGST/SGST or IGST and true A4 PDFs.",
      tech: ["Python", "FastAPI", "SQLAlchemy", "Pydantic", "ReportLab", "SQLite", "JavaScript"],
      features: [
        "Live sales, pending & overdue dashboard",
        "Automatic CGST + SGST / IGST by state",
        "A4 PDF invoices with amount in words",
        "Partial payments & invoice status",
        "Exact money maths — Decimal, no floats"
      ],
      visual: "billing",
      tag: "Business app",
      github: "https://github.com/rohanarunachalam-sketch/OHM-powerin-billing",
      demo: ""
    },
    {
      title: "Telegram & Voice AI Agents",
      description:
        "n8n agents you talk to on Telegram — by text or voice — that remember the conversation and act across Gmail, Google Calendar, Docs, Sheets and web search.",
      tech: ["n8n", "OpenAI", "Telegram", "Gmail", "Google Workspace", "SerpAPI"],
      features: [
        "Text and voice messages",
        "Conversation memory",
        "Email, calendar, docs & sheets tools",
        "Live web search"
      ],
      visual: "flow",
      flow: ["Telegram\nvoice / text", "AI\nagent", "Gmail · Calendar\nSheets · Search"],
      tag: "AI agents",
      github: "https://github.com/rohanarunachalam-sketch/n8n-multi-agent-voice-agent",
      demo: ""
    },
    {
      title: "Timon AI",
      description:
        "A sarcastic, lazy and surprisingly smart chatbot that roasts you in Tanglish — then still gives you the right answer.",
      tech: ["Python", "Streamlit", "LangChain", "Gemini", "LangSmith"],
      features: [
        "Streaming responses",
        "Custom personality prompt",
        "Chat history in session state",
        "LangSmith tracing"
      ],
      visual: "term",
      term: ["> What is Python?", "Dei, why disturb my sleep? 😴", "Seri seri — Python is a high-level", "language for AI, automation & web.", "✓ answered (reluctantly)"],
      tag: "Chatbot",
      github: "https://github.com/rohanarunachalam-sketch/Timon-Gen-AI",
      demo: ""
    },
    {
      title: "PDF RAG Assistant",
      description:
        "Upload any PDF and get answers grounded strictly in its text, with the exact pages and source chunks shown alongside.",
      tech: ["Python", "Streamlit", "LangChain", "FAISS", "OpenAI", "LangSmith"],
      features: [
        "MD5 hashing to skip re-processing",
        "1,000-char chunks, 200 overlap",
        "Strictly grounded answers",
        "Page & chunk inspection"
      ],
      visual: "flow",
      flow: ["PDF\nupload", "FAISS\nsearch", "gpt-4o-mini\nanswer"],
      tag: "RAG",
      github: "https://github.com/rohanarunachalam-sketch/RAG_Assignment",
      demo: ""
    },
    {
      title: "WhatsApp Automation",
      description:
        "Reads names, numbers and messages from a Google Sheet and sends each one through WhatsApp Web by driving Chrome with Playwright.",
      tech: ["Python", "Playwright", "Google Sheets", "WhatsApp Web"],
      features: [
        "Google Sheet as the contact list",
        "Reuses a logged-in Chrome session",
        "Phone number clean-up",
        "Sent / failed summary"
      ],
      visual: "term",
      term: ["> python send.py", "reading sheet… 3 contacts", "→ Rohan   sent", "→ Arun    sent", "✓ Finished. Sent: 3  Failed: 0"],
      tag: "Automation",
      github: "https://github.com/rohanarunachalam-sketch/playwright-whatsapp",
      demo: ""
    },
    {
      title: "AI Student Data Cleaning",
      description:
        "An n8n workflow that takes a messy student-enrollment CSV, cleans it with OpenAI, validates it with JavaScript and returns a clean CSV.",
      tech: ["n8n", "OpenAI", "JavaScript", "CSV"],
      features: [
        "CSV upload through an n8n form",
        "AI clean-up of names, cities & dates",
        "Email, phone & course validation",
        "Clean CSV output"
      ],
      visual: "flow",
      flow: ["Messy\nCSV", "OpenAI\nclean-up", "Validated\nCSV"],
      tag: "Automation",
      github: "https://github.com/rohanarunachalam-sketch/Student-Data-Cleaning-Validation-using-n8n",
      demo: ""
    },
    {
      title: "n8n Automation Workflows",
      description:
        "AI workflows for everyday tasks: a Slack bot that turns a recipe into a shopping list, and a Gmail workflow that writes and sends personalised emails from a Google Sheet.",
      tech: ["n8n", "OpenAI", "Slack", "Gmail", "Google Sheets"],
      features: [
        "Slack recipe → shopping list",
        "Personalised emails from a Google Sheet",
        "LLM-generated content"
      ],
      visual: "flow",
      flow: ["Slack · Sheet\ntrigger", "LLM\nchain", "Reply ·\nEmail"],
      tag: "Automation",
      github: "https://github.com/rohanarunachalam-sketch/n8n-Automation-Projects-1",
      demo: ""
    },
    {
      title: "APEX Engineering Website",
      description:
        "Company website for an engineering consultancy in Ajman, UAE — services, projects and approach with a structural-drawing visual style.",
      tech: ["HTML", "CSS", "JavaScript"],
      features: ["Responsive single-page site", "Services & project showcase", "Blueprint-inspired design"],
      visual: "site",
      tag: "Website",
      github: "https://github.com/rohanarunachalam-sketch/apex-engineering-website",
      demo: ""
    }
  ]
};
