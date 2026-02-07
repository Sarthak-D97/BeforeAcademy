import { Curriculum } from '../types/curriculum';

export const mockCurriculum: Curriculum = {
  _id: "curr-001",
  title: "Full Stack Software Engineering Masterclass",
  description: "A comprehensive professional roadmap from foundational web technologies to advanced system architecture.",
  slug: "full-stack-software-engineering",
  status: true,
  // Main Course Cover
  coverImgUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000", 
  score: 4.9,
  subjects: [
    // =========================================================
    // SUBJECT 1: MODERN HTML & CSS ARCHITECTURE
    // =========================================================
    {
      _id: "subj-01",
      title: "Modern HTML & CSS Architecture",
      slug: "html-css-architecture",
      status: true,
      score: 4.8,
      // Added Cover Image: Artistic Web Layout
      coverImgUrl: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?auto=format&fit=crop&q=80&w=800",
      topics: [
        { title: "Semantic HTML5", slug: "semantic-html5" },
        { title: "CSS Box Model & Sizing", slug: "css-box-model" },
        { title: "Flexbox Layout Engine", slug: "flexbox-layout" },
        { title: "CSS Grid Fundamentals", slug: "css-grid" },
        { title: "Responsive Design Patterns", slug: "responsive-design" },
        { title: "CSS Variables & Theming", slug: "css-variables" },
        { title: "Advanced Selectors & Specificity", slug: "css-selectors" },
        { title: "CSS Animations & Transitions", slug: "css-animations" },
        { title: "Sass/SCSS Preprocessing", slug: "sass-scss" },
        { title: "Tailwind CSS Framework", slug: "tailwind-css" },
        { title: "BEM & Utility-First Methodologies", slug: "css-methodologies" },
        { title: "SVG Graphics & Optimization", slug: "svg-optimization" },
        { title: "Web Accessibility (A11y)", slug: "web-accessibility" },
        { title: "Browser Rendering Pipeline", slug: "browser-rendering" },
        { title: "Modern CSS Architecture (CSS-in-JS)", slug: "css-in-js" }
      ].map((t, tIdx) => ({
        _id: `t-01-${tIdx}`,
        ...t,
        status: true,
        order: tIdx + 1,
        heading: "Design Systems",
        subtopics: Array.from({ length: 5 }).map((_, sIdx) => ({
          _id: `st-01-${tIdx}-${sIdx}`,
          title: `Module ${sIdx + 1}: ${t.title} Advanced`,
          status: true,
          layout: "list",
          materials: [
            {
              _id: `m-01-${tIdx}-${sIdx}-1`,
              title: `Video Guide: Mastering ${t.title}`,
              slug: `video-${t.slug}`,
              category: "video",
              status: true,
              path: "https://www.youtube.com/watch?v=OXGznpKZ_sA",
              difficulty: "medium"
            },
            {
              _id: `m-01-${tIdx}-${sIdx}-2`,
              title: `${t.title} Best Practices`,
              slug: `article-${t.slug}`,
              category: "article",
              status: true,
              difficulty: "easy"
            },
            {
              _id: `m-01-${tIdx}-${sIdx}-3`,
              title: `Practical Challenge: ${t.title}`,
              slug: `problem-${t.slug}`,
              category: "problem",
              status: true,
              difficulty: "hard",
              companies: ["Amazon", "Google"]
            }
          ]
        }))
      }))
    },

    // =========================================================
    // SUBJECT 2: JAVASCRIPT & CORE PROGRAMMING
    // =========================================================
    {
      _id: "subj-02",
      title: "JavaScript & Core Programming",
      slug: "javascript-mastery",
      status: true,
      score: 5.0,
      // Added Cover Image: JavaScript Code
      coverImgUrl: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&q=80&w=800",
      topics: [
        { title: "ECMAScript Evolution (ES6+)", slug: "es6-plus" },
        { title: "The Execution Context & Stack", slug: "execution-context" },
        { title: "Prototypal Inheritance", slug: "prototypal-inheritance" },
        { title: "Asynchronous JS: Promises & Async/Await", slug: "async-js" },
        { title: "The Event Loop & Macro/Microtasks", slug: "event-loop" },
        { title: "Functional Programming in JS", slug: "functional-programming" },
        { title: "Object-Oriented JS (Classes)", slug: "oop-javascript" },
        { title: "Closures & Scope Chain", slug: "closures-scope" },
        { title: "Modules (ESM vs CommonJS)", slug: "js-modules" },
        { title: "Memory Management & GC", slug: "memory-management" },
        { title: "DOM Manipulation & Events", slug: "dom-events" },
        { title: "Fetch API & Network Requests", slug: "fetch-api" },
        { title: "Error Handling & Debugging", slug: "error-handling" },
        { title: "Regular Expressions (Regex)", slug: "js-regex" },
        { title: "Unit Testing with Jest", slug: "unit-testing" }
      ].map((t, tIdx) => ({
        _id: `t-02-${tIdx}`,
        ...t,
        status: true,
        order: tIdx + 1,
        heading: "Engine Logic",
        subtopics: Array.from({ length: 5 }).map((_, sIdx) => ({
          _id: `st-02-${tIdx}-${sIdx}`,
          title: `Logic Level ${sIdx + 1}`,
          status: true,
          layout: "grid",
          materials: [
            {
              _id: `m-02-${tIdx}-${sIdx}-1`,
              title: `Deep Dive: ${t.title}`,
              slug: `video-${t.slug}`,
              category: "video",
              status: true,
              path: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
              difficulty: "hard"
            },
            {
              _id: `m-02-${tIdx}-${sIdx}-2`,
              title: `Understanding ${t.title} in Depth`,
              slug: `article-${t.slug}`,
              category: "article",
              status: true,
              difficulty: "medium"
            },
            {
              _id: `m-02-${tIdx}-${sIdx}-3`,
              title: `${t.title} Algorithmic Challenge`,
              slug: `problem-${t.slug}`,
              category: "problem",
              status: true,
              difficulty: "hard",
              companies: ["Microsoft", "Uber", "Netflix"]
            }
          ]
        }))
      }))
    },

    // =========================================================
    // SUBJECT 3: REACT & FRONTEND FRAMEWORKS
    // =========================================================
    {
      _id: "subj-03",
      title: "React & Frontend Frameworks",
      slug: "react-frameworks",
      status: true,
      score: 4.9,
      // Added Cover Image: React/Atom Concept
      coverImgUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
      topics: [
        { title: "React Component Lifecycle", slug: "component-lifecycle" },
        { title: "Advanced Hooks (useMemo, useCallback)", slug: "advanced-hooks" },
        { title: "Context API & State Management", slug: "context-api" },
        { title: "Next.js App Router Architecture", slug: "nextjs-app-router" },
        { title: "Server Components vs Client Components", slug: "rsc-vs-client" },
        { title: "Data Fetching (SWR & React Query)", slug: "data-fetching" },
        { title: "React Portals & Error Boundaries", slug: "portals-error-boundaries" },
        { title: "Higher Order Components (HOC)", slug: "hoc-pattern" },
        { title: "Custom Hooks Development", slug: "custom-hooks" },
        { title: "Form Management (React Hook Form)", slug: "react-hook-form" },
        { title: "Client-side Routing (React Router)", slug: "react-router" },
        { title: "SEO in Next.js (Metadata API)", slug: "nextjs-seo" },
        { title: "Testing Components (Vitest & RTL)", slug: "component-testing" },
        { title: "Zustand & Lightweight State", slug: "zustand-state" },
        { title: "Framework Comparison (Remix/Vue/Svelte)", slug: "framework-comparison" }
      ].map((t, tIdx) => ({
        _id: `t-03-${tIdx}`,
        ...t,
        status: true,
        order: tIdx + 1,
        heading: "Framework Mastery",
        subtopics: Array.from({ length: 5 }).map((_, sIdx) => ({
          _id: `st-03-${tIdx}-${sIdx}`,
          title: `Module ${sIdx + 1}: ${t.title} Deep Dive`,
          status: true,
          layout: "list",
          materials: [
            {
              _id: `m-03-${tIdx}-${sIdx}-1`,
              title: "Component Tree Diagram",
              slug: "tree-diagram",
              category: "article",
              status: true,
              path: "https://react.dev/learn/render-and-commit",
              difficulty: "medium"
            },
            {
              _id: `m-03-${tIdx}-${sIdx}-2`,
              title: "Build-along Video",
              slug: "build-video",
              category: "video",
              status: true,
              path: "https://www.youtube.com/watch?v=SqcY0GlETPk",
              difficulty: "hard"
            },
            {
              _id: `m-03-${tIdx}-${sIdx}-3`,
              title: "Code Refactoring Problem",
              slug: "refactor-problem",
              category: "problem",
              status: true,
              difficulty: "hard",
              companies: ["Airbnb", "Meta", "Discord"]
            }
          ]
        }))
      }))
    },

    // =========================================================
    // SUBJECT 4: NODE.JS & BACKEND ARCHITECTURE
    // =========================================================
    {
      _id: "subj-04",
      title: "Node.js & Backend Architecture",
      slug: "nodejs-backend",
      status: true,
      score: 4.7,
      // Added Cover Image: Servers & Backend
      coverImgUrl: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=800",
      topics: [
        { title: "Node.js Architecture (V8 & Libuv)", slug: "nodejs-internals" },
        { title: "Express.js Middleware Pattern", slug: "express-middleware" },
        { title: "RESTful API Design Principles", slug: "rest-design" },
        { title: "Authentication (JWT & OAuth2)", slug: "auth-patterns" },
        { title: "Authorization & Role-Based Access", slug: "rbac-security" },
        { title: "Node.js Streams & Buffers", slug: "node-streams" },
        { title: "File System & Path Management", slug: "fs-module" },
        { title: "WebSockets for Real-time Apps", slug: "websockets" },
        { title: "Microservices with NestJS", slug: "nestjs-microservices" },
        { title: "Server-side Caching (Redis)", slug: "redis-backend" },
        { title: "Testing Backends (Supertest & Mocha)", slug: "backend-testing" },
        { title: "Environment & Config Management", slug: "env-config" },
        { title: "Logging (Winston & Morgan)", slug: "logging-strategies" },
        { title: "API Documentation (Swagger/OpenAPI)", slug: "swagger-docs" },
        { title: "Node.js Worker Threads", slug: "worker-threads" }
      ].map((t, tIdx) => ({
        _id: `t-04-${tIdx}`,
        ...t,
        status: true,
        order: tIdx + 1,
        heading: "Server Excellence",
        subtopics: Array.from({ length: 5 }).map((_, sIdx) => ({
          _id: `st-04-${tIdx}-${sIdx}`,
          title: `Server Logic ${sIdx + 1}`,
          status: true,
          layout: "list",
          materials: [
            {
              _id: `m-04-${tIdx}-${sIdx}-1`,
              title: "Backend Flowchart",
              slug: "backend-flow",
              category: "article",
              status: true,
              difficulty: "medium"
            },
            {
              _id: `m-04-${tIdx}-${sIdx}-2`,
              title: "API Design Video",
              slug: "api-video",
              category: "video",
              status: true,
              path: "https://www.youtube.com/watch?v=-MTSQjw5DrM",
              difficulty: "easy"
            },
            {
              _id: `m-04-${tIdx}-${sIdx}-3`,
              title: "System Design Problem",
              slug: "system-design-problem",
              category: "problem",
              status: true,
              difficulty: "hard",
              companies: ["Uber", "Scalable Systems", "LinkedIn"]
            }
          ]
        }))
      }))
    },

    // =========================================================
    // SUBJECT 5: DATABASE DESIGN & MANAGEMENT
    // =========================================================
    {
      _id: "subj-05",
      title: "Database Design & Management",
      slug: "database-systems",
      status: true,
      score: 4.8,
      // Added Cover Image: Data Center / Abstract Data
      coverImgUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800",
      topics: [
        { title: "Relational DB Fundamentals (Postgres)", slug: "sql-fundamentals" },
        { title: "NoSQL Architectures (MongoDB)", slug: "mongodb-nosql" },
        { title: "Database Indexing Strategies", slug: "db-indexing" },
        { title: "ACID vs BASE Transactions", slug: "acid-base" },
        { title: "Data Normalization (1NF to BCNF)", slug: "db-normalization" },
        { title: "Query Optimization & Execution Plans", slug: "query-optimization" },
        { title: "Database Sharding & Partitioning", slug: "db-sharding" },
        { title: "Replication & High Availability", slug: "db-replication" },
        { title: "ORM vs Query Builders (Prisma/Drizzle)", slug: "orm-builders" },
        { title: "Advanced SQL (Joins & CTEs)", slug: "advanced-sql" },
        { title: "Graph Databases (Neo4j)", slug: "graph-dbs" },
        { title: "Vector Databases for AI", slug: "vector-dbs" },
        { title: "Time-series Databases (InfluxDB)", slug: "timeseries-dbs" },
        { title: "Data Migration Strategies", slug: "db-migrations" },
        { title: "Backup & Disaster Recovery", slug: "db-backup" }
      ].map((t, tIdx) => ({
        _id: `t-05-${tIdx}`,
        ...t,
        status: true,
        order: tIdx + 1,
        heading: "Persistence Layer",
        subtopics: Array.from({ length: 5 }).map((_, sIdx) => ({
          _id: `st-05-${tIdx}-${sIdx}`,
          title: `Data Structure ${sIdx + 1}`,
          status: true,
          layout: "grid",
          materials: [
            {
              _id: `m-05-${tIdx}-${sIdx}-1`,
              title: "ER Diagram Tutorial",
              slug: "er-diagram",
              category: "video",
              status: true,
              path: "https://www.youtube.com/watch?v=QpdhBUYk7Kk",
              difficulty: "medium"
            },
            {
              _id: `m-05-${tIdx}-${sIdx}-2`,
              title: "Schema Design Table",
              slug: "schema-table",
              category: "article",
              status: true,
              difficulty: "medium"
            },
            {
              _id: `m-05-${tIdx}-${sIdx}-3`,
              title: "Complex Query Problem",
              slug: "sql-problem",
              category: "problem",
              status: true,
              difficulty: "hard",
              companies: ["Oracle", "Snowflake", "Citadel"]
            }
          ]
        }))
      }))
    },

    // =========================================================
    // SUBJECT 6: DEVOPS & CLOUD INFRASTRUCTURE
    // =========================================================
    {
      _id: "subj-06",
      title: "DevOps & Cloud Infrastructure",
      slug: "devops-cloud",
      status: true,
      score: 4.8,
      // Added Cover Image: Cloud Computing Concept
      coverImgUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
      topics: [
        { title: "Docker & Containerization", slug: "docker-containers" },
        { title: "Kubernetes Orchestration", slug: "kubernetes" },
        { title: "CI/CD Pipelines (GitHub Actions)", slug: "cicd-pipelines" },
        { title: "AWS Cloud Fundamentals", slug: "aws-basics" },
        { title: "Infrastructure as Code (Terraform)", slug: "terraform-iac" },
        { title: "Linux Server Administration", slug: "linux-admin" },
        { title: "Monitoring & Logging (Prometheus)", slug: "monitoring-grafana" },
        { title: "Nginx & Reverse Proxies", slug: "nginx-proxy" },
        { title: "Cloud Security & IAM", slug: "cloud-security" },
        { title: "Serverless Architecture (Lambda)", slug: "serverless-lambda" },
        { title: "GitOps & ArgoCD", slug: "gitops" },
        { title: "CDN & Edge Computing", slug: "cdn-edge" },
        { title: "Autoscaling & Load Balancing", slug: "autoscaling" },
        { title: "Disaster Recovery & Backups", slug: "disaster-recovery" },
        { title: "SRE Fundamentals", slug: "sre-basics" }
      ].map((t, tIdx) => ({
        _id: `t-06-${tIdx}`,
        ...t,
        status: true,
        order: tIdx + 1,
        heading: "Cloud Operations",
        subtopics: Array.from({ length: 5 }).map((_, sIdx) => ({
          _id: `st-06-${tIdx}-${sIdx}`,
          title: `Infrastructure Layer ${sIdx + 1}`,
          status: true,
          layout: "list",
          materials: [
            {
              _id: `m-06-${tIdx}-${sIdx}-1`,
              title: `${t.title} Hands-on Lab`,
              slug: `lab-${t.slug}`,
              category: "video",
              status: true,
              path: "https://www.youtube.com/watch?v=fqMOX6JJhGo",
              difficulty: "medium"
            },
            {
              _id: `m-06-${tIdx}-${sIdx}-2`,
              title: "Architecture Blueprint",
              slug: `blueprint-${t.slug}`,
              category: "article",
              status: true,
              difficulty: "medium"
            },
            {
              _id: `m-06-${tIdx}-${sIdx}-3`,
              title: "Troubleshooting Scenario",
              slug: `troubleshoot-${t.slug}`,
              category: "problem",
              status: true,
              difficulty: "hard",
              companies: ["AWS", "DigitalOcean", "HashiCorp"]
            }
          ]
        }))
      }))
    },

    // =========================================================
    // SUBJECT 7: DATA STRUCTURES & ALGORITHMS
    // =========================================================
    {
      _id: "subj-07",
      title: "Data Structures & Algorithms",
      slug: "dsa-mastery",
      status: true,
      score: 5.0,
      // Added Cover Image: Abstract Nodes/Connections
      coverImgUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800",
      topics: [
        { title: "Big O Analysis", slug: "big-o" },
        { title: "Arrays & Strings", slug: "arrays-strings" },
        { title: "Linked Lists", slug: "linked-lists" },
        { title: "Stacks & Queues", slug: "stacks-queues" },
        { title: "Hashing & HashMaps", slug: "hashing" },
        { title: "Trees & Binary Search Trees", slug: "trees-bst" },
        { title: "Heaps & Priority Queues", slug: "heaps" },
        { title: "Graphs & BFS/DFS", slug: "graphs" },
        { title: "Sorting & Searching", slug: "sorting-searching" },
        { title: "Recursion & Backtracking", slug: "recursion" },
        { title: "Dynamic Programming", slug: "dp" },
        { title: "Greedy Algorithms", slug: "greedy" },
        { title: "Sliding Window Patterns", slug: "sliding-window" },
        { title: "Bit Manipulation", slug: "bit-manipulation" },
        { title: "Tries & Segment Trees", slug: "advanced-dsa" }
      ].map((t, tIdx) => ({
        _id: `t-07-${tIdx}`,
        ...t,
        status: true,
        order: tIdx + 1,
        heading: "Algorithmic Thinking",
        subtopics: Array.from({ length: 5 }).map((_, sIdx) => ({
          _id: `st-07-${tIdx}-${sIdx}`,
          title: `Pattern ${sIdx + 1}`,
          status: true,
          layout: "grid",
          materials: [
            {
              _id: `m-07-${tIdx}-${sIdx}-1`,
              title: `${t.title} Conceptual Video`,
              slug: `vid-${t.slug}`,
              category: "video",
              status: true,
              path: "https://www.youtube.com/watch?v=RBSGKlAvoiM",
              difficulty: "medium"
            },
            {
              _id: `m-07-${tIdx}-${sIdx}-2`,
              title: "Complexity Cheat Sheet",
              slug: `sheet-${t.slug}`,
              category: "article",
              status: true,
              difficulty: "easy"
            },
            {
              _id: `m-07-${tIdx}-${sIdx}-3`,
              title: "FAANG Interview Problem",
              slug: `interview-${t.slug}`,
              category: "problem",
              status: true,
              difficulty: "hard",
              companies: ["Google", "Facebook", "Amazon"]
            }
          ]
        }))
      }))
    },

    // =========================================================
    // SUBJECT 8: SYSTEM DESIGN & SCALABILITY
    // =========================================================
    {
      _id: "subj-08",
      title: "System Design & Scalability",
      slug: "system-design",
      status: true,
      score: 4.9,
      // Added Cover Image: Blueprint / Architecture
      coverImgUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
      topics: [
        { title: "Load Balancing Strategies", slug: "load-balancing" },
        { title: "Caching (CDN & In-Memory)", slug: "caching" },
        { title: "Database Sharding", slug: "sharding" },
        { title: "CAP Theorem & Consistency", slug: "cap-theorem" },
        { title: "Message Queues (Kafka/RabbitMQ)", slug: "message-queues" },
        { title: "Microservices vs Monolith", slug: "microservices" },
        { title: "API Gateway Patterns", slug: "api-gateway" },
        { title: "Designing a URL Shortener", slug: "design-tinyurl" },
        { title: "Designing WhatsApp/Chat System", slug: "design-whatsapp" },
        { title: "Designing Netflix/Video Streaming", slug: "design-netflix" },
        { title: "Designing Uber/Ride Sharing", slug: "design-uber" },
        { title: "Rate Limiting Algorithms", slug: "rate-limiting" },
        { title: "Distributed Locks (Zookeeper)", slug: "distributed-locks" },
        { title: "Leader Election Protocols", slug: "leader-election" },
        { title: "System Design Interview Prep", slug: "sd-interview" }
      ].map((t, tIdx) => ({
        _id: `t-08-${tIdx}`,
        ...t,
        status: true,
        order: tIdx + 1,
        heading: "High-Level Architecture",
        subtopics: Array.from({ length: 5 }).map((_, sIdx) => ({
          _id: `st-08-${tIdx}-${sIdx}`,
          title: `Architecture Component ${sIdx + 1}`,
          status: true,
          layout: "list",
          materials: [
            {
              _id: `m-08-${tIdx}-${sIdx}-1`,
              title: "System Design Breakdown",
              slug: `sd-vid-${t.slug}`,
              category: "video",
              status: true,
              path: "https://www.youtube.com/watch?v=i7S8_hI_SUI",
              difficulty: "hard"
            },
            {
              _id: `m-08-${tIdx}-${sIdx}-2`,
              title: "Scalability Whitepaper",
              slug: `whitepaper-${t.slug}`,
              category: "article",
              status: true,
              difficulty: "hard"
            },
            {
              _id: `m-08-${tIdx}-${sIdx}-3`,
              title: "Live Design Challenge",
              slug: `challenge-${t.slug}`,
              category: "problem",
              status: true,
              difficulty: "hard",
              companies: ["Netflix", "Twitter", "Slack"]
            }
          ]
        }))
      }))
    },

    // =========================================================
    // SUBJECT 9: TESTING, QA & CYBERSECURITY
    // =========================================================
    {
      _id: "subj-09",
      title: "Testing, QA & Cybersecurity",
      slug: "testing-security",
      status: true,
      score: 4.7,
      // Added Cover Image: Security/Matrix
      coverImgUrl: "https://images.unsplash.com/photo-1563206767-5b1d972b9fb1?auto=format&fit=crop&q=80&w=800",
      topics: [
        { title: "Unit Testing with Jest", slug: "unit-testing" },
        { title: "Integration Testing Strategies", slug: "integration-testing" },
        { title: "E2E Testing with Cypress", slug: "e2e-testing" },
        { title: "Test-Driven Development (TDD)", slug: "tdd-patterns" },
        { title: "OWASP Top 10 Security Risks", slug: "owasp-security" },
        { title: "JWT & OAuth2 Implementation", slug: "jwt-oauth" },
        { title: "Cross-Site Scripting (XSS) Defense", slug: "xss-prevention" },
        { title: "SQL Injection & Data Sanitization", slug: "sql-injection" },
        { title: "Content Security Policy (CSP)", slug: "csp-headers" },
        { title: "Penetration Testing Basics", slug: "pen-testing" },
        { title: "Load Testing with k6", slug: "load-testing" },
        { title: "Mocking & Dependency Injection", slug: "mocking-patterns" },
        { title: "Visual Regression Testing", slug: "visual-regression" },
        { title: "Security Auditing for Node.js", slug: "security-audits" },
        { title: "Accessibility (A11y) Audits", slug: "a11y-testing" }
      ].map((t, tIdx) => ({
        _id: `t-09-${tIdx}`,
        ...t,
        status: true,
        order: tIdx + 1,
        heading: "Quality & Protection",
        subtopics: Array.from({ length: 5 }).map((_, sIdx) => ({
          _id: `st-09-${tIdx}-${sIdx}`,
          title: `Security Module ${sIdx + 1}`,
          status: true,
          layout: "list",
          materials: [
            {
              _id: `m-09-${tIdx}-${sIdx}-1`,
              title: `${t.title} Security Workshop`,
              slug: `sec-vid-${t.slug}`,
              category: "video",
              status: true,
              path: "https://www.youtube.com/watch?v=7r4xVDI2vho",
              difficulty: "hard"
            },
            {
              _id: `m-09-${tIdx}-${sIdx}-2`,
              title: "Vulnerability Assessment Lab",
              slug: `lab-${t.slug}`,
              category: "problem",
              status: true,
              difficulty: "medium",
              companies: ["CrowdStrike", "Okta", "Cloudflare"]
            },
            {
              _id: `m-09-${tIdx}-${sIdx}-3`,
              title: "Testing Best Practices",
              slug: `art-${t.slug}`,
              category: "article",
              status: true,
              difficulty: "easy"
            }
          ]
        }))
      }))
    },

    // =========================================================
    // SUBJECT 10: UI/UX & PRODUCT DESIGN FOR ENGINEERS
    // =========================================================
    {
      _id: "subj-10",
      title: "UI/UX & Product Design for Engineers",
      slug: "ui-ux-design",
      status: true,
      score: 4.6,
      // Added Cover Image: Design Tools/Colors
      coverImgUrl: "https://images.unsplash.com/photo-1586717791821-3f44a5638d4f?auto=format&fit=crop&q=80&w=800",
      topics: [
        { title: "Design Thinking Methodology", slug: "design-thinking" },
        { title: "Typography & Visual Hierarchy", slug: "typography-hierarchy" },
        { title: "Color Theory & Palette Design", slug: "color-theory" },
        { title: "Grid Systems & Layout Design", slug: "grid-systems" },
        { title: "User Research & Persona Building", slug: "user-research" },
        { title: "Wireframing with Figma", slug: "wireframing-figma" },
        { title: "Prototyping & Interaction Design", slug: "prototyping" },
        { title: "Design Systems & Storybook", slug: "design-systems" },
        { title: "Responsive & Adaptive UX", slug: "responsive-ux" },
        { title: "Micro-interactions & Animations", slug: "micro-interactions" },
        { title: "Accessibility (WCAG) Guidelines", slug: "wcag-accessibility" },
        { title: "Information Architecture", slug: "info-architecture" },
        { title: "Product Analytics (Mixpanel/Amplitude)", slug: "product-analytics" },
        { title: "A/B Testing & User Feedback", slug: "ab-testing" },
        { title: "Handoff: From Design to Code", slug: "design-handoff" }
      ].map((t, tIdx) => ({
        _id: `t-10-${tIdx}`,
        ...t,
        status: true,
        order: tIdx + 1,
        heading: "User-Centric Design",
        subtopics: Array.from({ length: 5 }).map((_, sIdx) => ({
          _id: `st-10-${tIdx}-${sIdx}`,
          title: `Creative Module ${sIdx + 1}`,
          status: true,
          layout: "grid",
          materials: [
            {
              _id: `m-10-${tIdx}-${sIdx}-1`,
              title: "Design for Non-Designers",
              slug: `design-vid-${t.slug}`,
              category: "video",
              status: true,
              path: "https://www.youtube.com/watch?v=c9Wg6WMLAF4",
              difficulty: "easy"
            },
            {
              _id: `m-10-${tIdx}-${sIdx}-2`,
              title: "Style Guide Documentation",
              slug: `guide-${t.slug}`,
              category: "article",
              status: true,
              difficulty: "medium"
            },
            {
              _id: `m-10-${tIdx}-${sIdx}-3`,
              title: "Mockup Implementation Challenge",
              slug: `mockup-${t.slug}`,
              category: "problem",
              status: true,
              difficulty: "medium",
              companies: ["Figma", "Canva", "Adobe"]
            }
          ]
        }))
      }))
    }
  ]
};