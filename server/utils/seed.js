import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Home from '../models/Home.js';
import Process from '../models/Process.js';
import Work from '../models/Work.js';
import Services from '../models/Services.js';
import Contact from '../models/Contact.js';
import User from '../models/User.js';

dotenv.config();

const homeData = {
  stack: {
    Frontend: [
      { icon: "⚛", name: "React" },
      { icon: "▲", name: "Next.js" },
      { icon: "🌀", name: "Tailwind" },
      { icon: "📦", name: "Vite" },
      { icon: "🦋", name: "TypeScript" },
      { icon: "🎨", name: "Framer" },
    ],
    Backend: [
      { icon: "🟢", name: "Node.js" },
      { icon: "🐍", name: "Python" },
      { icon: "🚀", name: "FastAPI" },
      { icon: "🛡", name: "NestJS" },
      { icon: "🐘", name: "PostgreSQL" },
      { icon: "🔴", name: "Redis" },
    ],
    AI: [
      { icon: "🤖", name: "OpenAI" },
      { icon: "🦜", name: "LangChain" },
      { icon: "🧠", name: "PyTorch" },
      { icon: "📊", name: "Pandas" },
      { icon: "🔍", name: "Pinecone" },
      { icon: "🪄", name: "HuggingFace" },
    ],
    Cloud: [
      { icon: "☁", name: "AWS" },
      { icon: "🐳", name: "Docker" },
      { icon: "⚙", name: "Kubernetes" },
      { icon: "🔁", name: "GitHub CI" },
      { icon: "🌍", name: "Vercel" },
      { icon: "🔥", name: "Firebase" },
    ],
  },
  testimonials: [
    {
      q: "TechCean delivered our platform 2 weeks ahead of schedule. The code quality and attention to detail was extraordinary.",
      name: "Aryan Sharma",
      role: "Founder — BuildFast",
      init: "AS",
      color: "#00d4ff",
    },
    {
      q: "Their AI integration tripled our lead conversion rate. Genuinely one of the best technical teams I've worked with.",
      name: "Priya Mehta",
      role: "CTO — Growlytics",
      init: "PM",
      color: "#00ff9d",
    },
    {
      q: "From design to deployment, the process was smooth, transparent and professional. Will definitely work with them again.",
      name: "Rahul Desai",
      role: "Product Manager — Novex",
      init: "RD",
      color: "#8b5cf6",
    },
  ],
  stats: [
    ["50+", "Projects Delivered"],
    ["98%", "Client Satisfaction"],
    ["5+", "Years Experience"],
    ["24h", "Average Response"],
  ],
};

const processData = {
  steps: [
    {
      num: "01", phase: "Phase One",
      title: "Discovery & Alignment",
      icon: "◎",
      color: "#00d4ff",
      duration: "1–2 weeks",
      desc: "We start by deeply understanding your business, users, and technical landscape. No assumptions, no templates.",
      details: [
        "Stakeholder interviews & goal mapping",
        "User research & persona definition",
        "Competitor & market analysis",
        "Technical feasibility audit",
        "Risk identification & mitigation plan",
      ],
      deliverable: "Project Charter + Technical Brief",
    },
    {
      num: "02", phase: "Phase Two",
      title: "Architecture & Design",
      icon: "⬡",
      color: "#00ff9d",
      duration: "1–3 weeks",
      desc: "System design, tech stack selection, and UI/UX wireframes — all locked before a single line of production code.",
      details: [
        "Database schema & API contract design",
        "Tech stack selection & rationale",
        "UI/UX wireframes & prototypes",
        "Component library setup",
        "Infrastructure & DevOps planning",
      ],
      deliverable: "Architecture Doc + Figma Prototype",
    },
    {
      num: "03", phase: "Phase Three",
      title: "Build Sprints",
      icon: "⚡",
      color: "#8b5cf6",
      duration: "4–12 weeks",
      desc: "Two-week sprints with real deliverables at every checkpoint. Staging previews, async standups, total transparency.",
      details: [
        "Two-week sprint cycles",
        "Daily async standups via Slack/Linear",
        "Live staging environment previews",
        "Code review & QA at each sprint",
        "Weekly client sync & demo",
      ],
      deliverable: "Working Product Increments",
    },
    {
      num: "04", phase: "Phase Four",
      title: "QA & Hardening",
      icon: "◈",
      color: "#00d4ff",
      duration: "1–2 weeks",
      desc: "Automated tests, load testing, security audits, and accessibility checks — we don't ship anything we wouldn't use ourselves.",
      details: [
        "Unit, integration & E2E test suite",
        "Load & performance benchmarking",
        "Security vulnerability audit",
        "WCAG accessibility compliance",
        "Cross-browser & device testing",
      ],
      deliverable: "QA Report + Bug-free Build",
    },
    {
      num: "05", phase: "Phase Five",
      title: "Launch & Handoff",
      icon: "▲",
      color: "#00ff9d",
      duration: "1 week",
      desc: "Zero-downtime deployment, full documentation, team training, and a smooth handover so you can run independently.",
      details: [
        "CI/CD pipeline configuration",
        "Zero-downtime production deployment",
        "Full technical documentation",
        "Team training & walkthrough sessions",
        "Post-launch monitoring setup",
      ],
      deliverable: "Live Product + Full Documentation",
    },
    {
      num: "06", phase: "Phase Six",
      title: "Support & Scale",
      icon: "∞",
      color: "#8b5cf6",
      duration: "Ongoing",
      desc: "We don't disappear after launch. Retainer options, feature sprints, performance monitoring — we grow with you.",
      details: [
        "Monthly retainer engagements",
        "24h critical bug response SLA",
        "Feature sprint planning & execution",
        "Performance monitoring & reporting",
        "Strategic product roadmap advisory",
      ],
      deliverable: "Growth-Ready Product",
    },
  ],
  faqs: [
    {
      q: "How long does a typical project take?",
      a: "Most web and mobile projects complete in 8–14 weeks. AI integrations typically take 4–8 weeks. Larger platforms and custom solutions vary based on scope.",
    },
    {
      q: "What is your development methodology?",
      a: "We follow agile with two-week sprints. Each sprint delivers working, testable software. You'll see progress every two weeks with demos and feedback sessions.",
    },
    {
      q: "Do you provide ongoing support after launch?",
      a: "Yes. All projects include 30 days of hypercare after launch. We also offer retainers for ongoing improvements, maintenance, and new feature development.",
    },
    {
      q: "Can you work with our existing team?",
      a: "Absolutely. We've successfully augmented existing teams, provided code reviews, and done knowledge transfer. We adapt to your workflow.",
    },
    {
      q: "How do you handle pricing and payments?",
      a: "We provide fixed-price quotes for defined scope, and time-and-materials for ongoing work. Payments are milestone-based: 30% start, 30% midpoint, 40% completion.",
    },
    {
      q: "What if our requirements change mid-project?",
      a: "We build flexibility into our process. Scope changes go through a change request process with transparent impact assessment before we proceed.",
    },
  ],
  tools: [
    { icon: "Ln", label: "Linear", color: "#5e6ad2" },
    { icon: "Gh", label: "GitHub", color: "#00d4ff" },
    { icon: "Fg", label: "Figma", color: "#00ff9d" },
    { icon: "Sl", label: "Slack", color: "#8b5cf6" },
    { icon: "Vr", label: "Vercel", color: "#00d4ff" },
    { icon: "Dk", label: "Docker", color: "#00ff9d" },
    { icon: "Aw", label: "AWS", color: "#8b5cf6" },
    { icon: "Nt", label: "Notion", color: "#00d4ff" },
  ],
};

const workData = {
  categories: ["All", "Web App", "AI / ML", "Mobile", "E-Commerce", "Branding"],
  projects: [
    {
      id: 1, cat: "Web App", tag: "Web App",
      title: "BuildFast Platform",
      desc: "A SaaS project management platform with real-time collaboration, advanced analytics dashboard, and AI-powered task prioritization.",
      tags: ["React", "Node.js", "PostgreSQL", "WebSockets"],
      metric: "2× faster", metricLabel: "delivery speed",
      year: "2024", client: "BuildFast Inc.",
      color: "#00d4ff", accent: "rgba(0,212,255,.08)",
      featured: true,
    },
    {
      id: 2, cat: "AI / ML", tag: "AI / ML",
      title: "Growlytics AI CRM",
      desc: "AI-powered CRM that tripled lead conversion through predictive scoring, automated nurture sequences, and behavioral segmentation.",
      tags: ["Python", "FastAPI", "OpenAI", "React"],
      metric: "3×", metricLabel: "lead conversion",
      year: "2024", client: "Growlytics",
      color: "#00ff9d", accent: "rgba(0,255,157,.06)",
      featured: true,
    },
    {
      id: 3, cat: "E-Commerce", tag: "E-Commerce",
      title: "Shopflow Commerce",
      desc: "Headless e-commerce architecture for a D2C brand — custom storefront, inventory sync, and checkout in under 1.2s.",
      tags: ["Next.js", "Stripe", "Sanity", "Vercel"],
      metric: "1.2s", metricLabel: "checkout speed",
      year: "2023", client: "Shopflow",
      color: "#8b5cf6", accent: "rgba(139,92,246,.07)",
      featured: false,
    },
    {
      id: 4, cat: "Mobile", tag: "Mobile",
      title: "HealthTrack App",
      desc: "Cross-platform health monitoring app with wearable sync, AI diet recommendations, and HIPAA-compliant data storage.",
      tags: ["React Native", "Firebase", "ML Kit", "HealthKit"],
      metric: "40K+", metricLabel: "active users",
      year: "2024", client: "HealthTrack",
      color: "#00d4ff", accent: "rgba(0,212,255,.08)",
      featured: false,
    },
    {
      id: 5, cat: "Web App", tag: "Web App",
      title: "Novex Dashboard",
      desc: "Enterprise analytics dashboard with real-time data pipelines, custom chart builder, and role-based access for 200+ users.",
      tags: ["Vue.js", "Python", "Redis", "D3.js"],
      metric: "200+", metricLabel: "enterprise users",
      year: "2023", client: "Novex Corp",
      color: "#00ff9d", accent: "rgba(0,255,157,.06)",
      featured: false,
    },
    {
      id: 6, cat: "Branding", tag: "Branding",
      title: "Zeta Brand System",
      desc: "Full brand identity + design system for a fintech startup — logo, typography, color tokens, and component library in Figma.",
      tags: ["Figma", "Tokens", "Storybook", "Design Ops"],
      metric: "80+", metricLabel: "components",
      year: "2023", client: "Zeta Finance",
      color: "#8b5cf6", accent: "rgba(139,92,246,.07)",
      featured: false,
    },
    {
      id: 7, cat: "AI / ML", tag: "AI / ML",
      title: "DocuMind AI",
      desc: "Document intelligence platform — upload contracts, invoices, or reports and extract structured data, summaries, and risk flags automatically.",
      tags: ["LangChain", "Pinecone", "FastAPI", "Next.js"],
      metric: "90%", metricLabel: "manual effort saved",
      year: "2024", client: "LegalEdge",
      color: "#00d4ff", accent: "rgba(0,212,255,.08)",
      featured: false,
    },
    {
      id: 8, cat: "E-Commerce", tag: "E-Commerce",
      title: "FreshCart Grocery",
      desc: "Hyperlocal grocery delivery app with live inventory, dynamic pricing engine, and 15-minute delivery slot optimization.",
      tags: ["React Native", "Node.js", "MongoDB", "Redis"],
      metric: "15 min", metricLabel: "delivery window",
      year: "2024", client: "FreshCart",
      color: "#00ff9d", accent: "rgba(0,255,157,.06)",
      featured: false,
    },
  ],
  processSteps: [
    { num: "01", title: "Discovery", desc: "We deep-dive into your domain, users, and goals — aligning on the problem before touching any code.", icon: "◎" },
    { num: "02", title: "Architecture", desc: "We design the system — database schema, API contracts, component structure — so there are zero surprises later.", icon: "⬡" },
    { num: "03", title: "Build Sprint", desc: "Two-week sprints with daily standups, live staging previews, and direct communication — no middle-men.", icon: "⚡" },
    { num: "04", title: "Launch & Scale", desc: "We ship, monitor, and iterate. Post-launch support is part of every engagement — we don't disappear.", icon: "▲" },
  ],
  testimonials: [
    { q: "TechCean delivered our platform 2 weeks ahead of schedule. The code quality and attention to detail was extraordinary.", name: "Aryan Sharma", role: "Founder — BuildFast", init: "AS", color: "#00d4ff" },
    { q: "Their AI integration tripled our lead conversion rate. Genuinely one of the best technical teams I've worked with.", name: "Priya Mehta", role: "CTO — Growlytics", init: "PM", color: "#00ff9d" },
    { q: "From design to deployment the process was smooth, transparent and professional. Will definitely work with them again.", name: "Rahul Desai", role: "Product Manager — Novex", init: "RD", color: "#8b5cf6" },
  ],
};

const servicesData = {
  services: [
    {
      id: "web",
      num: "01",
      color: "#00d4ff",
      icon: "web",
      title: "Website Development",
      short: "Blazing-fast, pixel-perfect web experiences.",
      desc: "We build performant, conversion-focused websites and web apps using modern stacks. From landing pages to complex enterprise portals — every pixel is intentional, every interaction is smooth.",
      features: ["Custom React / Next.js development", "CMS integration (Sanity, Contentful)", "SEO-optimised architecture", "Performance & Core Web Vitals tuning", "Responsive & accessibility-first design"],
      tags: ["React", "Next.js", "Node.js", "Tailwind", "TypeScript"],
      deliverables: ["Figma designs", "Production codebase", "Hosting & CI/CD setup", "3-month support"],
    },
    {
      id: "ai",
      num: "02",
      color: "#00ff9d",
      icon: "ai",
      title: "AI Integrations",
      short: "Embed intelligent automation into your product.",
      desc: "We integrate large language models, build custom AI pipelines, and create automation systems that save your team hours every day. From smart chatbots to full ML feature development.",
      features: ["LLM-powered features (GPT-4, Claude, Gemini)", "RAG systems & vector database setup", "Custom AI chatbots & assistants", "Recommendation & prediction engines", "AI workflow automation"],
      tags: ["OpenAI", "LangChain", "Python", "Pinecone", "HuggingFace"],
      deliverables: ["AI architecture doc", "Production API", "Monitoring dashboard", "Training & handoff"],
    },
    {
      id: "mobile",
      num: "03",
      color: "#8b5cf6",
      icon: "mobile",
      title: "Mobile Apps",
      short: "Native-feeling cross-platform experiences.",
      desc: "We build native-feeling iOS and Android apps using React Native and Flutter. From MVPs to App Store-ready products with push notifications, biometric auth, and offline support.",
      features: ["React Native & Flutter development", "Push notifications & deep linking", "Biometric authentication", "Offline-first architecture", "App Store & Play Store deployment"],
      tags: ["React Native", "Firebase", "expo", "Native Modules", "App Store"],
      deliverables: ["Production builds", "App Store listing", "Source code", "6-month support"],
    },
    {
      id: "ecomm",
      num: "04",
      color: "#f472b6",
      icon: "ecomm",
      title: "E-Commerce",
      short: "High-conversion shopping experiences.",
      desc: "We build headless and traditional e-commerce stores that convert. From custom storefronts to Shopify Plus themes — optimized for speed, SEO, and average order value.",
      features: ["Shopify Plus & headless commerce", "Custom storefronts (Next.js, Hydrogen)", "Payment gateway integration (Stripe, PayPal)", "Inventory & order management", "Multi-currency & international shipping"],
      tags: ["Shopify", "Stripe", "Next.js", "Sanity", "Recharge"],
      deliverables: ["Production store", "Payment setup", "Training sessions", "30-day support"],
    },
    {
      id: "cloud",
      num: "05",
      color: "#06b6d4",
      icon: "cloud",
      title: "Cloud & DevOps",
      short: "Scalable infra and zero-downtime deployments.",
      desc: "From containerised microservices to full Kubernetes clusters — we build the infrastructure that scales with your growth. CI/CD pipelines, monitoring, and 24/7 reliability built in.",
      features: ["AWS / GCP infrastructure setup", "Docker & Kubernetes orchestration", "CI/CD pipeline automation", "Monitoring & alerting (Datadog, Grafana)", "Security & compliance audits"],
      tags: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
      deliverables: ["Infra architecture doc", "IaC codebase", "Runbooks", "Ongoing SLA support"],
    },
    {
      id: "custom",
      num: "06",
      color: "#f59e0b",
      icon: "custom",
      title: "Custom Solutions",
      short: "Anything else you can dream up.",
      desc: "Got a unique challenge? We've built booking systems, SaaS dashboards, real-time collaboration tools, blockchain explorers, and more. If it exists in technology, we can build it.",
      features: ["Custom API development", "Real-time systems (WebSockets)", "Dashboard & admin panels", "Third-party integrations", "Legacy system modernization"],
      tags: ["Node.js", "Python", "PostgreSQL", "Redis", "AWS"],
      deliverables: ["Custom quote", "Architecture doc", "Production app", "Ongoing support"],
    },
  ],
  process: [
    { num: "01", title: "Discovery Call", desc: "We learn your goals, constraints and vision. No templates — every engagement is bespoke." },
    { num: "02", title: "Proposal & Scope", desc: "A clear fixed-scope proposal with timelines, milestones and pricing — no surprises." },
    { num: "03", title: "Design Sprint", desc: "Wireframes and high-fidelity designs before code. You approve everything first." },
    { num: "04", title: "Build & Iterate", desc: "Biweekly sprints with staging previews. You stay in the loop at every step." },
    { num: "05", title: "QA & Launch", desc: "Thorough testing across devices, browsers and edge cases. Then a smooth go-live." },
    { num: "06", title: "Support & Scale", desc: "Post-launch monitoring, bug fixes and feature additions as your product grows." },
  ],
  faqs: [
    { question: "How long does a typical project take?", answer: "Most projects complete in 6–12 weeks. Complex platforms may take 3–6 months. We provide a detailed timeline before starting." },
    { question: "Do you offer ongoing support?", answer: "Yes! All projects include 3 months of support. We also offer retainers for continued improvements and maintenance." },
    { question: "What tech stack do you use?", answer: "We use modern, battle-tested technologies: React/Next.js for web, React Native for mobile, Python/FastAPI for AI and backend." },
    { question: "How do payments work?", answer: "We split payments into milestones: 30% to start, 30% at midpoint, 40% on completion. For larger projects, we break into monthly installments." },
    { question: "Can you work with our existing team?", answer: "Absolutely. We can augment your team or work alongside your existing developers. We provide detailed documentation and knowledge transfer." },
  ],
};

const contactData = {
  contacts: [
    { label: "Email", value: "hello@techcean.co.in", icon: "✉" },
    { label: "Phone", value: "+91 98765 43210", icon: "📞" },
    { label: "Location", value: "Mumbai, India", icon: "📍" },
  ],
  socials: [
    { name: "GitHub", href: "https://github.com", icon: "⌘" },
    { name: "LinkedIn", href: "https://linkedin.com", icon: "◈" },
    { name: "Twitter", href: "https://twitter.com", icon: "✦" },
    { name: "Instagram", href: "https://instagram.com", icon: "◎" },
  ],
};

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Home.deleteMany({});
    await Process.deleteMany({});
    await Work.deleteMany({});
    console.log('Existing data cleared');

    await Home.create(homeData);
    await Process.create(processData);
    await Work.create(workData);
    await Services.create(servicesData);
    await Contact.create(contactData);
    console.log('Seed data created');

    const adminExists = await User.findOne({ email: 'admin@techcean.co.in' });
    if (!adminExists) {
      await User.create({
        email: 'admin@techcean.co.in',
        password: 'admin123',
        name: 'Admin',
        role: 'admin'
      });
      console.log('Admin user created: admin@techcean.co.in / admin123');
    }

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDB();