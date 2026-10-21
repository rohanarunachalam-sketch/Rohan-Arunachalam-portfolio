/*
 * Central portfolio configuration.
 * Edit the values here — the page reads everything below at load time.
 * Leave a link as "" to show it as "coming soon" instead of a broken link.
 */
window.PORTFOLIO = {
  name: "Rohan Arunachalam",
  role: "AI Developer | Generative AI | Automation",

  // TODO: replace with your real email / profile URLs
  email: "your.email@example.com",
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/",

  // Pre-graded black & white portrait (spaces in the filename are URL-encoded as %20).
  // Other photos in /image: "Picsart_24-06-12_12-53-00-190.jpg.jpeg" (colour original),
  // "rohan-cinematic.jpg".
  profileImage: "image/Cinematic%20High-Contrast%20Monochrome%20Portrait.png",

  /*
   * Projects. Add a new object to this list to add a project card.
   * visual: one of "graph" | "dairy" | "agents" | "cad"
   * tag: short category label shown on the carousel card
   * featured: true → shown in the large featured block (its text lives in index.html;
   * only its github/demo links are read from here) instead of the grid.
   */
  projects: [
    {
      featured: true,
      title: "Construction Drawing AI Assistant",
      description:
        "An AI-powered assistant for querying construction drawings and project documents using RAG, vector search and visual retrieval.",
      tech: ["Python", "LangChain", "Streamlit", "FAISS", "OpenAI"],
      features: ["PDF ingestion", "Semantic search", "Hybrid retrieval", "Visual retrieval", "AI question answering"],
      github: "",
      demo: ""
    },
    {
      title: "Hybrid RAG + Knowledge Graph",
      description:
        "A hybrid AI retrieval system combining vector search with Neo4j knowledge graphs to improve contextual retrieval and answer generation.",
      tech: ["Python", "LangChain", "FAISS", "Neo4j", "OpenAI"],
      features: [
        "Vector retrieval",
        "Knowledge graph retrieval",
        "Entity extraction",
        "Relationship extraction",
        "Hybrid retrieval",
        "LLM answer generation"
      ],
      visual: "graph",
      tag: "Retrieval",
      github: "",
      demo: ""
    },
    {
      title: "GRV Dairy Management System",
      description:
        "A real-world web-based dairy management platform designed to manage customer milk subscriptions, purchases and additional products.",
      tech: ["Web App", "Customer Portal", "Billing", "Responsive UI"],
      features: [
        "Customer login & ID system",
        "Milk subscription management",
        "Cancel milk for specific days",
        "Additional products — eggs, ghee, curd",
        "Purchase history & account management",
        "Billing / invoices"
      ],
      visual: "dairy",
      tag: "Business app",
      github: "",
      demo: ""
    },
    {
      title: "AI Customer Support System",
      description:
        "A multi-agent customer support application where multiple AI agents collaborate to answer customer queries.",
      tech: ["Python", "CrewAI", "Streamlit", "OpenAI"],
      features: [
        "Multiple AI agents",
        "Sequential agent workflow",
        "Web research",
        "Answer generation",
        "Query & response logging"
      ],
      visual: "agents",
      tag: "Multi-agent",
      github: "",
      demo: ""
    },
    {
      title: "AutoCAD AI Automation",
      description: "Exploring natural-language-driven automation for AutoCAD using AI and AutoLISP.",
      tech: ["AutoCAD", "AutoLISP", "Python", "Generative AI"],
      features: [
        "Natural language commands",
        "CAD automation",
        "Automated drawing operations",
        "AI-assisted engineering workflows"
      ],
      visual: "cad",
      tag: "CAD automation",
      github: "",
      demo: ""
    }
  ]
};
