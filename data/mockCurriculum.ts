import { Curriculum } from '../types/curriculum';

// --- 1. Audit Fields Helper (To satisfy Schema requirements for all collections) ---
const AUDIT_FIELDS = {
  createdAt: new Date().toISOString(), // Schema: date
  updatedAt: new Date().toISOString(), // Schema: date
  createdBy: "user-admin-001",         // Schema: objectId
  updatedBy: "user-admin-001",         // Schema: objectId
};

const articleContent: Record<string, string> = {
  "semantic-html5": `
# Mastering Semantic HTML5

Semantic HTML5 introduces elements with meaning, such as \`<article>\`, \`<section>\`, \`<nav>\`, \`<header>\`, and \`<footer>\`. 

## Why use it?
1. **Accessibility**: Screen readers rely on semantic tags to navigate the page effectively.
2. **SEO**: Search engines understand the structure and hierarchy of your content better.
3. **Maintainability**: Code is easier to read and understand for other developers.

## Key Elements
* **<header>**: Introductory content or navigational links.
* **<nav>**: Section of navigation links.
* **<main>**: The dominant content of the <body>.
* **<article>**: Self-contained composition (e.g., blog post, news story).
* **<section>**: Thematic grouping of content, typically with a heading.
* **<aside>**: Content tangentially related to the main content (sidebars).
* **<footer>**: Footer for a section or page.
  `,
  "css-box-model": `
# The CSS Box Model

Every element in web design is a rectangular box. The CSS Box Model describes how these boxes work together to create a layout.

## Components
1. **Content**: The actual image or text.
2. **Padding**: Transparent area around the content. Clears an area around the content.
3. **Border**: Goes around the padding and content.
4. **Margin**: Space outside the border.

## Box-Sizing
The property \`box-sizing: border-box;\` is crucial in modern CSS. It ensures padding and border are included in the element's total width and height, making layout calculations much more intuitive.
  `,
  "flexbox-layout": `
# Flexbox Layout Engine

The Flexible Box Layout Module, makes it easier to design flexible responsive layout structure without using float or positioning.

## Key Concepts
* **Main Axis**: The primary axis along which flex items are laid out (defined by \`flex-direction\`).
* **Cross Axis**: The axis perpendicular to the main axis.
* **Justify Content**: Aligns items along the main axis.
* **Align Items**: Aligns items along the cross axis.

## Common Use Cases
* Centering elements vertically and horizontally.
* Creating navigation bars.
* Equal height columns.
  `,
  "component-lifecycle": `
# React Component Lifecycle

Understanding the lifecycle of a component is essential for managing side effects, data fetching, and performance.

## Phases
1. **Mounting**: When an instance of a component is being created and inserted into the DOM.
   * \`constructor()\`, \`render()\`, \`componentDidMount()\`
2. **Updating**: Caused by changes to props or state.
   * \`render()\`, \`componentDidUpdate()\`
3. **Unmounting**: When a component is being removed from the DOM.
   * \`componentWillUnmount()\`

In functional components, the \`useEffect\` hook replaces most of these lifecycle methods.
  `,
  "nodejs-internals": `
# Node.js Architecture

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It uses an event-driven, non-blocking I/O model.

## V8 Engine
Converts JavaScript code into machine code that the processor understands.

## Libuv
A C library that provides support for asynchronous I/O based on event loops. It handles file systems, DNS, network, child processes, pipes, signal handling, polling and streaming.

## The Event Loop
The mechanism that allows Node.js to perform non-blocking I/O operations despite JavaScript being single-threaded. It offloads operations to the system kernel whenever possible.
  `,
  "big-o": `
# Big O Analysis

Big O notation is used to classify algorithms according to how their run time or space requirements grow as the input size grows.

## Common Complexities
* **O(1)**: Constant Time. No matter how much data, it takes the same amount of time. (e.g., accessing an array index).
* **O(log n)**: Logarithmic Time. Cuts the problem in half each step. (e.g., Binary Search).
* **O(n)**: Linear Time. Performance grows linearly with input. (e.g., looping through an array).
* **O(n log n)**: Linearithmic Time. (e.g., Merge Sort, Quick Sort).
* **O(n^2)**: Quadratic Time. (e.g., Nested loops).
  `
};

export const mockCurriculum: Curriculum = {
  _id: "curr-001",
  title: "Full Stack Software Engineering Masterclass",
  description: "A comprehensive professional roadmap from foundational web technologies to advanced system architecture.",
  slug: "full-stack-software-engineering",
  status: true,
  coverImgUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000",
  score: 4.9,
  // Schema Fields Added:
  code: "FS-MASTER-001",
  thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=200",
  snippet: "snippet-id-001", 
  ...AUDIT_FIELDS,

  subjects: [
    {
      _id: "subj-01",
      title: "Modern HTML & CSS Architecture",
      slug: "html-css-architecture",
      status: true,
      score: 4.8,
      coverImgUrl: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?auto=format&fit=crop&q=80&w=800",
      // Schema Fields Added:
      code: "SUBJ-FE-01", 
      thumbnail: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?auto=format&fit=crop&q=80&w=200",
      ...AUDIT_FIELDS,
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
        // Schema Fields Added for curriculum_topics:
        code: `TOPIC-01-${tIdx + 1}`,
        heading: "Design Systems",
        subheading: "Foundational Layouts", // from schema
        coverImgUrl: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?auto=format&fit=crop&q=80&w=400", // from schema
        description: "Deep dive into core CSS architecture principles.",
        ...AUDIT_FIELDS,
        subtopics: Array.from({ length: 5 }).map((_, sIdx) => ({
          _id: `st-01-${tIdx}-${sIdx}`,
          title: `Module ${sIdx + 1}: ${t.title} Advanced`,
          description: "Advanced techniques and best practices.", // from schema curriculum_subtopics
          status: true,
          layout: "list",
          ...AUDIT_FIELDS,
          materials: [
            {
              _id: `m-01-${tIdx}-${sIdx}-1`,
              title: `Video Guide: Mastering ${t.title}`,
              slug: `video-${t.slug}`,
              category: "video",
              status: true,
              path: "https://www.youtube.com/watch?v=OXGznpKZ_sA",
              difficulty: "medium",
              topic: t.slug, // materials.topic (string)
              ...AUDIT_FIELDS,
            },
            {
              _id: `m-01-${tIdx}-${sIdx}-2`,
              title: `${t.title} Best Practices`,
              slug: `article-${t.slug}`,
              category: "article",
              status: true,
              difficulty: "easy",
              topic: t.slug,
              ...AUDIT_FIELDS,
              content: articleContent[t.slug] || `This is a comprehensive guide about ${t.title}. It covers best practices, common pitfalls, and advanced techniques used by senior engineers.`,
              reactions: {
                fire: Math.floor(Math.random() * 50) + 1,
                thumbsUp: Math.floor(Math.random() * 100) + 10,
                thumbsDown: Math.floor(Math.random() * 5),
                heart: Math.floor(Math.random() * 30) + 1
              }
            },
            {
              _id: `m-01-${tIdx}-${sIdx}-3`,
              title: `Practical Challenge: ${t.title}`,
              slug: `problem-${t.slug}`,
              category: "problem",
              status: true,
              difficulty: "hard",
              topic: t.slug,
              codeQuestion: `cq-01-${tIdx}-${sIdx}`, // materials.codeQuestion (objectId ref)
              companies: ["Amazon", "Google"],
              ...AUDIT_FIELDS,
            }
          ]
        }))
      }))
    },

    {
      _id: "subj-02",
      title: "JavaScript & Core Programming",
      slug: "javascript-mastery",
      status: true,
      score: 5.0,
      coverImgUrl: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&q=80&w=800",
      code: "SUBJ-JS-02",
      thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&q=80&w=200",
      ...AUDIT_FIELDS,
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
        code: `TOPIC-02-${tIdx + 1}`,
        heading: "Engine Logic",
        subheading: "Advanced JS Concepts",
        coverImgUrl: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&q=80&w=400",
        description: "Mastering the runtime and core language features.",
        ...AUDIT_FIELDS,
        subtopics: Array.from({ length: 5 }).map((_, sIdx) => ({
          _id: `st-02-${tIdx}-${sIdx}`,
          title: `Logic Level ${sIdx + 1}`,
          description: "Practical application of core logic.",
          status: true,
          layout: "grid",
          ...AUDIT_FIELDS,
          materials: [
            {
              _id: `m-02-${tIdx}-${sIdx}-1`,
              title: `Deep Dive: ${t.title}`,
              slug: `video-${t.slug}`,
              category: "video",
              status: true,
              path: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
              difficulty: "hard",
              topic: t.slug,
              ...AUDIT_FIELDS,
            },
            {
              _id: `m-02-${tIdx}-${sIdx}-2`,
              title: `Understanding ${t.title} in Depth`,
              slug: `article-${t.slug}`,
              category: "article",
              status: true,
              difficulty: "medium",
              topic: t.slug,
              ...AUDIT_FIELDS,
              content: articleContent[t.slug] || `Explore the depths of ${t.title} with this detailed technical article.`,
              reactions: {
                fire: Math.floor(Math.random() * 50) + 1,
                thumbsUp: Math.floor(Math.random() * 100) + 10,
                thumbsDown: Math.floor(Math.random() * 5),
                heart: Math.floor(Math.random() * 30) + 1
              }
            },
            {
              _id: `m-02-${tIdx}-${sIdx}-3`,
              title: `${t.title} Algorithmic Challenge`,
              slug: `problem-${t.slug}`,
              category: "problem",
              status: true,
              difficulty: "hard",
              topic: t.slug,
              codeQuestion: `cq-02-${tIdx}-${sIdx}`,
              companies: ["Microsoft", "Uber", "Netflix"],
              ...AUDIT_FIELDS,
            }
          ]
        }))
      }))
    },

    {
      _id: "subj-03",
      title: "React & Frontend Frameworks",
      slug: "react-frameworks",
      status: true,
      score: 4.9,
      coverImgUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
      code: "SUBJ-RCT-03",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=200",
      ...AUDIT_FIELDS,
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
        code: `TOPIC-03-${tIdx + 1}`,
        heading: "Framework Mastery",
        subheading: "Component Architecture",
        coverImgUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400",
        description: "Building scalable frontend applications.",
        ...AUDIT_FIELDS,
        subtopics: Array.from({ length: 5 }).map((_, sIdx) => ({
          _id: `st-03-${tIdx}-${sIdx}`,
          title: `Module ${sIdx + 1}: ${t.title} Deep Dive`,
          description: "Implementation details and patterns.",
          status: true,
          layout: "list",
          ...AUDIT_FIELDS,
          materials: [
            {
              _id: `m-03-${tIdx}-${sIdx}-1`,
              title: "Component Tree Diagram",
              slug: "tree-diagram",
              category: "article",
              status: true,
              path: "https://react.dev/learn/render-and-commit",
              difficulty: "medium",
              topic: t.slug,
              ...AUDIT_FIELDS,
              content: articleContent[t.slug] || `Visualizing the ${t.title} is key to understanding how data flows through your application.`,
              reactions: {
                fire: Math.floor(Math.random() * 50) + 1,
                thumbsUp: Math.floor(Math.random() * 100) + 10,
                thumbsDown: Math.floor(Math.random() * 5),
                heart: Math.floor(Math.random() * 30) + 1
              }
            },
            {
              _id: `m-03-${tIdx}-${sIdx}-2`,
              title: "Build-along Video",
              slug: "build-video",
              category: "video",
              status: true,
              path: "https://www.youtube.com/watch?v=SqcY0GlETPk",
              difficulty: "hard",
              topic: t.slug,
              ...AUDIT_FIELDS,
            },
            {
              _id: `m-03-${tIdx}-${sIdx}-3`,
              title: "Code Refactoring Problem",
              slug: "refactor-problem",
              category: "problem",
              status: true,
              difficulty: "hard",
              topic: t.slug,
              codeQuestion: `cq-03-${tIdx}-${sIdx}`,
              companies: ["Airbnb", "Meta", "Discord"],
              ...AUDIT_FIELDS,
            }
          ]
        }))
      }))
    },

    {
      _id: "subj-04",
      title: "Node.js & Backend Architecture",
      slug: "nodejs-backend",
      status: true,
      score: 4.7,
      coverImgUrl: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=800",
      code: "SUBJ-BE-04",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=200",
      ...AUDIT_FIELDS,
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
        code: `TOPIC-04-${tIdx + 1}`,
        heading: "Server Excellence",
        subheading: "Backend Patterns",
        coverImgUrl: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=400",
        description: "Robust server-side development practices.",
        ...AUDIT_FIELDS,
        subtopics: Array.from({ length: 5 }).map((_, sIdx) => ({
          _id: `st-04-${tIdx}-${sIdx}`,
          title: `Server Logic ${sIdx + 1}`,
          description: "System design and implementation.",
          status: true,
          layout: "list",
          ...AUDIT_FIELDS,
          materials: [
            {
              _id: `m-04-${tIdx}-${sIdx}-1`,
              title: "Backend Flowchart",
              slug: "backend-flow",
              category: "article",
              status: true,
              difficulty: "medium",
              topic: t.slug,
              ...AUDIT_FIELDS,
              content: articleContent[t.slug] || `Learn how to architect robust backend systems using ${t.title}.`,
              reactions: {
                fire: Math.floor(Math.random() * 50) + 1,
                thumbsUp: Math.floor(Math.random() * 100) + 10,
                thumbsDown: Math.floor(Math.random() * 5),
                heart: Math.floor(Math.random() * 30) + 1
              }
            },
            {
              _id: `m-04-${tIdx}-${sIdx}-2`,
              title: "API Design Video",
              slug: "api-video",
              category: "video",
              status: true,
              path: "https://www.youtube.com/watch?v=-MTSQjw5DrM",
              difficulty: "easy",
              topic: t.slug,
              ...AUDIT_FIELDS,
            },
            {
              _id: `m-04-${tIdx}-${sIdx}-3`,
              title: "System Design Problem",
              slug: "system-design-problem",
              category: "problem",
              status: true,
              difficulty: "hard",
              topic: t.slug,
              codeQuestion: `cq-04-${tIdx}-${sIdx}`,
              companies: ["Uber", "Scalable Systems", "LinkedIn"],
              ...AUDIT_FIELDS,
            }
          ]
        }))
      }))
    },

    {
      _id: "subj-05",
      title: "Database Design & Management",
      slug: "database-systems",
      status: true,
      score: 4.8,
      coverImgUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800",
      code: "SUBJ-DB-05",
      thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=200",
      ...AUDIT_FIELDS,
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
        code: `TOPIC-05-${tIdx + 1}`,
        heading: "Persistence Layer",
        subheading: "Data Modeling",
        coverImgUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=400",
        description: "Designing efficient and scalable data storage.",
        ...AUDIT_FIELDS,
        subtopics: Array.from({ length: 5 }).map((_, sIdx) => ({
          _id: `st-05-${tIdx}-${sIdx}`,
          title: `Data Structure ${sIdx + 1}`,
          description: "Database internals and optimization.",
          status: true,
          layout: "grid",
          ...AUDIT_FIELDS,
          materials: [
            {
              _id: `m-05-${tIdx}-${sIdx}-1`,
              title: "ER Diagram Tutorial",
              slug: "er-diagram",
              category: "video",
              status: true,
              path: "https://www.youtube.com/watch?v=QpdhBUYk7Kk",
              difficulty: "medium",
              topic: t.slug,
              ...AUDIT_FIELDS,
            },
            {
              _id: `m-05-${tIdx}-${sIdx}-2`,
              title: "Schema Design Table",
              slug: "schema-table",
              category: "article",
              status: true,
              difficulty: "medium",
              topic: t.slug,
              ...AUDIT_FIELDS,
              content: articleContent[t.slug] || `Mastering ${t.title} is crucial for designing scalable and efficient data models.`,
              reactions: {
                fire: Math.floor(Math.random() * 50) + 1,
                thumbsUp: Math.floor(Math.random() * 100) + 10,
                thumbsDown: Math.floor(Math.random() * 5),
                heart: Math.floor(Math.random() * 30) + 1
              }
            },
            {
              _id: `m-05-${tIdx}-${sIdx}-3`,
              title: "Complex Query Problem",
              slug: "sql-problem",
              category: "problem",
              status: true,
              difficulty: "hard",
              topic: t.slug,
              codeQuestion: `cq-05-${tIdx}-${sIdx}`,
              companies: ["Oracle", "Snowflake", "Citadel"],
              ...AUDIT_FIELDS,
            }
          ]
        }))
      }))
    },

    {
      _id: "subj-06",
      title: "DevOps & Cloud Infrastructure",
      slug: "devops-cloud",
      status: true,
      score: 4.8,
      coverImgUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
      code: "SUBJ-OPS-06",
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=200",
      ...AUDIT_FIELDS,
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
        code: `TOPIC-06-${tIdx + 1}`,
        heading: "Cloud Operations",
        subheading: "Infrastructure",
        coverImgUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400",
        description: "Deploying and managing scalable applications.",
        ...AUDIT_FIELDS,
        subtopics: Array.from({ length: 5 }).map((_, sIdx) => ({
          _id: `st-06-${tIdx}-${sIdx}`,
          title: `Infrastructure Layer ${sIdx + 1}`,
          description: "Cloud setup and configuration.",
          status: true,
          layout: "list",
          ...AUDIT_FIELDS,
          materials: [
            {
              _id: `m-06-${tIdx}-${sIdx}-1`,
              title: `${t.title} Hands-on Lab`,
              slug: `lab-${t.slug}`,
              category: "video",
              status: true,
              path: "https://www.youtube.com/watch?v=fqMOX6JJhGo",
              difficulty: "medium",
              topic: t.slug,
              ...AUDIT_FIELDS,
            },
            {
              _id: `m-06-${tIdx}-${sIdx}-2`,
              title: "Architecture Blueprint",
              slug: `blueprint-${t.slug}`,
              category: "article",
              status: true,
              difficulty: "medium",
              topic: t.slug,
              ...AUDIT_FIELDS,
              content: articleContent[t.slug] || `A detailed blueprint and guide on setting up ${t.title} for production environments.`,
              reactions: {
                fire: Math.floor(Math.random() * 50) + 1,
                thumbsUp: Math.floor(Math.random() * 100) + 10,
                thumbsDown: Math.floor(Math.random() * 5),
                heart: Math.floor(Math.random() * 30) + 1
              }
            },
            {
              _id: `m-06-${tIdx}-${sIdx}-3`,
              title: "Troubleshooting Scenario",
              slug: `troubleshoot-${t.slug}`,
              category: "problem",
              status: true,
              difficulty: "hard",
              topic: t.slug,
              codeQuestion: `cq-06-${tIdx}-${sIdx}`,
              companies: ["AWS", "DigitalOcean", "HashiCorp"],
              ...AUDIT_FIELDS,
            }
          ]
        }))
      }))
    },

    {
      _id: "subj-07",
      title: "Data Structures & Algorithms",
      slug: "dsa-mastery",
      status: true,
      score: 5.0,
      coverImgUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800",
      code: "SUBJ-DSA-07",
      thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=200",
      ...AUDIT_FIELDS,
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
        code: `TOPIC-07-${tIdx + 1}`,
        heading: "Algorithmic Thinking",
        subheading: "CS Fundamentals",
        coverImgUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=400",
        description: "Mastering problem solving and algorithm optimization.",
        ...AUDIT_FIELDS,
        subtopics: Array.from({ length: 5 }).map((_, sIdx) => ({
          _id: `st-07-${tIdx}-${sIdx}`,
          title: `Pattern ${sIdx + 1}`,
          description: "Solving complex problems efficiently.",
          status: true,
          layout: "grid",
          ...AUDIT_FIELDS,
          materials: [
            {
              _id: `m-07-${tIdx}-${sIdx}-1`,
              title: `${t.title} Conceptual Video`,
              slug: `vid-${t.slug}`,
              category: "video",
              status: true,
              path: "https://www.youtube.com/watch?v=RBSGKlAvoiM",
              difficulty: "medium",
              topic: t.slug,
              ...AUDIT_FIELDS,
            },
            {
              _id: `m-07-${tIdx}-${sIdx}-2`,
              title: "Complexity Cheat Sheet",
              slug: `sheet-${t.slug}`,
              category: "article",
              status: true,
              difficulty: "easy",
              topic: t.slug,
              ...AUDIT_FIELDS,
              content: articleContent[t.slug] || `Essential cheat sheet and reference guide for mastering ${t.title}.`,
              reactions: {
                fire: Math.floor(Math.random() * 50) + 1,
                thumbsUp: Math.floor(Math.random() * 100) + 10,
                thumbsDown: Math.floor(Math.random() * 5),
                heart: Math.floor(Math.random() * 30) + 1
              }
            },
            {
              _id: `m-07-${tIdx}-${sIdx}-3`,
              title: "FAANG Interview Problem",
              slug: `interview-${t.slug}`,
              category: "problem",
              status: true,
              difficulty: "hard",
              topic: t.slug,
              codeQuestion: `cq-07-${tIdx}-${sIdx}`,
              companies: ["Google", "Facebook", "Amazon"],
              ...AUDIT_FIELDS,
            }
          ]
        }))
      }))
    },

    {
      _id: "subj-08",
      title: "System Design & Scalability",
      slug: "system-design",
      status: true,
      score: 4.9,
      coverImgUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
      code: "SUBJ-SYS-08",
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=200",
      ...AUDIT_FIELDS,
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
        code: `TOPIC-08-${tIdx + 1}`,
        heading: "High-Level Architecture",
        subheading: "Scale",
        coverImgUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400",
        description: "Designing systems that scale to millions of users.",
        ...AUDIT_FIELDS,
        subtopics: Array.from({ length: 5 }).map((_, sIdx) => ({
          _id: `st-08-${tIdx}-${sIdx}`,
          title: `Architecture Component ${sIdx + 1}`,
          description: "Distributed components and trade-offs.",
          status: true,
          layout: "list",
          ...AUDIT_FIELDS,
          materials: [
            {
              _id: `m-08-${tIdx}-${sIdx}-1`,
              title: "System Design Breakdown",
              slug: `sd-vid-${t.slug}`,
              category: "video",
              status: true,
              path: "https://www.youtube.com/watch?v=i7S8_hI_SUI",
              difficulty: "hard",
              topic: t.slug,
              ...AUDIT_FIELDS,
            },
            {
              _id: `m-08-${tIdx}-${sIdx}-2`,
              title: "Scalability Whitepaper",
              slug: `whitepaper-${t.slug}`,
              category: "article",
              status: true,
              difficulty: "hard",
              topic: t.slug,
              ...AUDIT_FIELDS,
              content: articleContent[t.slug] || `In-depth analysis and whitepaper discussion on scaling systems using ${t.title}.`,
              reactions: {
                fire: Math.floor(Math.random() * 50) + 1,
                thumbsUp: Math.floor(Math.random() * 100) + 10,
                thumbsDown: Math.floor(Math.random() * 5),
                heart: Math.floor(Math.random() * 30) + 1
              }
            },
            {
              _id: `m-08-${tIdx}-${sIdx}-3`,
              title: "Live Design Challenge",
              slug: `challenge-${t.slug}`,
              category: "problem",
              status: true,
              difficulty: "hard",
              topic: t.slug,
              codeQuestion: `cq-08-${tIdx}-${sIdx}`,
              companies: ["Netflix", "Twitter", "Slack"],
              ...AUDIT_FIELDS,
            }
          ]
        }))
      }))
    },

    {
      _id: "subj-09",
      title: "Testing, QA & Cybersecurity",
      slug: "testing-security",
      status: true,
      score: 4.7,
      coverImgUrl: "https://images.unsplash.com/photo-1563206767-5b1d972b9fb1?auto=format&fit=crop&q=80&w=800",
      code: "SUBJ-SEC-09",
      thumbnail: "https://images.unsplash.com/photo-1563206767-5b1d972b9fb1?auto=format&fit=crop&q=80&w=200",
      ...AUDIT_FIELDS,
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
        code: `TOPIC-09-${tIdx + 1}`,
        heading: "Quality & Protection",
        subheading: "Security",
        coverImgUrl: "https://images.unsplash.com/photo-1563206767-5b1d972b9fb1?auto=format&fit=crop&q=80&w=400",
        description: "Ensuring application reliability and security.",
        ...AUDIT_FIELDS,
        subtopics: Array.from({ length: 5 }).map((_, sIdx) => ({
          _id: `st-09-${tIdx}-${sIdx}`,
          title: `Security Module ${sIdx + 1}`,
          description: "Testing frameworks and security protocols.",
          status: true,
          layout: "list",
          ...AUDIT_FIELDS,
          materials: [
            {
              _id: `m-09-${tIdx}-${sIdx}-1`,
              title: `${t.title} Security Workshop`,
              slug: `sec-vid-${t.slug}`,
              category: "video",
              status: true,
              path: "https://www.youtube.com/watch?v=7r4xVDI2vho",
              difficulty: "hard",
              topic: t.slug,
              ...AUDIT_FIELDS,
            },
            {
              _id: `m-09-${tIdx}-${sIdx}-2`,
              title: "Vulnerability Assessment Lab",
              slug: `lab-${t.slug}`,
              category: "problem",
              status: true,
              difficulty: "medium",
              topic: t.slug,
              codeQuestion: `cq-09-${tIdx}-${sIdx}`,
              companies: ["CrowdStrike", "Okta", "Cloudflare"],
              ...AUDIT_FIELDS,
            },
            {
              _id: `m-09-${tIdx}-${sIdx}-3`,
              title: "Testing Best Practices",
              slug: `art-${t.slug}`,
              category: "article",
              status: true,
              difficulty: "easy",
              topic: t.slug,
              ...AUDIT_FIELDS,
              content: articleContent[t.slug] || `Industry standard best practices and security measures for ${t.title}.`,
              reactions: {
                fire: Math.floor(Math.random() * 50) + 1,
                thumbsUp: Math.floor(Math.random() * 100) + 10,
                thumbsDown: Math.floor(Math.random() * 5),
                heart: Math.floor(Math.random() * 30) + 1
              }
            }
          ]
        }))
      }))
    },

    {
      _id: "subj-10",
      title: "UI/UX & Product Design for Engineers",
      slug: "ui-ux-design",
      status: true,
      score: 4.6,
      coverImgUrl: "https://images.unsplash.com/photo-1586717791821-3f44a5638d4f?auto=format&fit=crop&q=80&w=800",
      code: "SUBJ-UI-10",
      thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a5638d4f?auto=format&fit=crop&q=80&w=200",
      ...AUDIT_FIELDS,
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
        code: `TOPIC-10-${tIdx + 1}`,
        heading: "User-Centric Design",
        subheading: "Product",
        coverImgUrl: "https://images.unsplash.com/photo-1586717791821-3f44a5638d4f?auto=format&fit=crop&q=80&w=400",
        description: "Bridging the gap between design and engineering.",
        ...AUDIT_FIELDS,
        subtopics: Array.from({ length: 5 }).map((_, sIdx) => ({
          _id: `st-10-${tIdx}-${sIdx}`,
          title: `Creative Module ${sIdx + 1}`,
          description: "Practical design implementation.",
          status: true,
          layout: "grid",
          ...AUDIT_FIELDS,
          materials: [
            {
              _id: `m-10-${tIdx}-${sIdx}-1`,
              title: "Design for Non-Designers",
              slug: `design-vid-${t.slug}`,
              category: "video",
              status: true,
              path: "https://www.youtube.com/watch?v=c9Wg6WMLAF4",
              difficulty: "easy",
              topic: t.slug,
              ...AUDIT_FIELDS,
            },
            {
              _id: `m-10-${tIdx}-${sIdx}-2`,
              title: "Style Guide Documentation",
              slug: `guide-${t.slug}`,
              category: "article",
              status: true,
              difficulty: "medium",
              topic: t.slug,
              ...AUDIT_FIELDS,
              content: articleContent[t.slug] || `A comprehensive guide to understanding and implementing ${t.title}.`,
              reactions: {
                fire: Math.floor(Math.random() * 50) + 1,
                thumbsUp: Math.floor(Math.random() * 100) + 10,
                thumbsDown: Math.floor(Math.random() * 5),
                heart: Math.floor(Math.random() * 30) + 1
              }
            },
            {
              _id: `m-10-${tIdx}-${sIdx}-3`,
              title: "Mockup Implementation Challenge",
              slug: `mockup-${t.slug}`,
              category: "problem",
              status: true,
              difficulty: "medium",
              topic: t.slug,
              codeQuestion: `cq-10-${tIdx}-${sIdx}`,
              companies: ["Figma", "Canva", "Adobe"],
              ...AUDIT_FIELDS,
            }
          ]
        }))
      }))
    }
  ]
};