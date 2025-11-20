import { db, initializeDatabase } from '../db/database.js';
import { UserModel } from '../models/userModel.js';
import { BlogModel } from '../models/blogModel.js';
import { CommentModel } from '../models/commentModel.js';

const blogData = [
  {
    title: 'Getting Started with TypeScript',
    excerpt: 'Learn the fundamentals of TypeScript and how it can improve your JavaScript development workflow.',
    content: `
      <h2>Introduction to TypeScript</h2>
      <p>TypeScript has revolutionized the way we write JavaScript by adding static typing to the language. In this comprehensive guide, we'll explore the key features that make TypeScript essential for modern web development.</p>

      <h3>Why TypeScript?</h3>
      <ul>
        <li><strong>Type Safety:</strong> Catch errors at compile time rather than runtime</li>
        <li><strong>Better IDE Support:</strong> Enhanced autocomplete and intelligent code suggestions</li>
        <li><strong>Improved Code Quality:</strong> Self-documenting code with explicit types</li>
        <li><strong>Easier Refactoring:</strong> Confidently make changes with compiler support</li>
      </ul>

      <h3>Basic Types</h3>
      <p>TypeScript provides several basic types including string, number, boolean, array, tuple, enum, and more.</p>

      <h3>Interfaces and Type Aliases</h3>
      <p>Interfaces and type aliases allow you to define custom types that describe the shape of objects.</p>

      <h3>Conclusion</h3>
      <p>TypeScript is a powerful tool that can significantly improve your development experience. Start small by adding it to a new project and gradually adopt more features as you become comfortable.</p>
    `,
    category: 'Programming',
    tags: ['TypeScript', 'JavaScript', 'Tutorial'],
    status: 'published' as const
  },
  {
    title: 'Modern React Patterns in 2024',
    excerpt: 'Explore the latest patterns and best practices for building scalable React applications.',
    content: `
      <h2>React Development in 2024</h2>
      <p>React continues to evolve with new patterns and best practices. Let's explore the most important patterns you should know for building modern React applications.</p>

      <h3>1. Server Components</h3>
      <p>React Server Components allow you to build components that render on the server, reducing bundle size and improving initial load times.</p>

      <h3>2. Custom Hooks</h3>
      <p>Custom hooks are the building blocks of reusable React logic. They allow you to extract component logic into reusable functions.</p>

      <h3>3. Context with useReducer</h3>
      <p>Combining Context API with useReducer provides a powerful state management solution for complex applications.</p>

      <h3>4. Error Boundaries</h3>
      <p>Error boundaries catch JavaScript errors in component trees and display fallback UI instead of crashing the entire app.</p>

      <h3>Best Practices</h3>
      <ul>
        <li>Keep components small and focused</li>
        <li>Use TypeScript for type safety</li>
        <li>Implement proper error handling</li>
        <li>Optimize performance with React.memo and useMemo</li>
      </ul>
    `,
    category: 'Web Development',
    tags: ['React', 'JavaScript', 'Tutorial'],
    status: 'published' as const
  },
  {
    title: 'Building RESTful APIs with Express and Node.js',
    excerpt: 'A comprehensive guide to building scalable and maintainable REST APIs using Express.js.',
    content: `
      <h2>RESTful API Development</h2>
      <p>Express.js is the most popular Node.js framework for building web applications and APIs. This guide covers everything you need to know to build production-ready APIs.</p>

      <h3>Setting Up Your Project</h3>
      <p>Start by initializing a new Node.js project and installing Express along with essential middleware.</p>

      <h3>Routing</h3>
      <p>Express provides a robust routing system that makes it easy to organize your API endpoints.</p>

      <h3>Middleware</h3>
      <p>Middleware functions are the backbone of Express applications. They have access to the request and response objects and can modify them or terminate the request-response cycle.</p>

      <h3>Error Handling</h3>
      <p>Proper error handling is crucial for building reliable APIs. Express provides built-in error handling middleware.</p>

      <h3>Authentication</h3>
      <p>Implementing JWT-based authentication provides a secure way to protect your API endpoints.</p>

      <h3>Testing</h3>
      <p>Writing tests for your API ensures reliability and makes refactoring safer.</p>
    `,
    category: 'Programming',
    tags: ['Node.js', 'JavaScript', 'Tutorial'],
    status: 'published' as const
  },
  {
    title: 'CSS Grid vs Flexbox: When to Use Which',
    excerpt: 'Understanding the differences between CSS Grid and Flexbox and when to use each layout system.',
    content: `
      <h2>Modern CSS Layout Systems</h2>
      <p>CSS Grid and Flexbox are two powerful layout systems that have transformed how we build web layouts. Understanding when to use each is key to efficient CSS development.</p>

      <h3>Flexbox: One-Dimensional Layouts</h3>
      <p>Flexbox is designed for one-dimensional layouts, either in a row or a column. It excels at:</p>
      <ul>
        <li>Navigation bars</li>
        <li>Card layouts</li>
        <li>Aligning items within a container</li>
        <li>Equal height columns</li>
      </ul>

      <h3>CSS Grid: Two-Dimensional Layouts</h3>
      <p>CSS Grid is designed for two-dimensional layouts, with rows and columns. It's perfect for:</p>
      <ul>
        <li>Page layouts</li>
        <li>Complex grid systems</li>
        <li>Overlapping elements</li>
        <li>Magazine-style layouts</li>
      </ul>

      <h3>Using Them Together</h3>
      <p>The most powerful approach is combining both. Use Grid for the overall page layout and Flexbox for component internals.</p>

      <h3>Browser Support</h3>
      <p>Both CSS Grid and Flexbox have excellent browser support. You can use them confidently in production.</p>
    `,
    category: 'Web Development',
    tags: ['CSS', 'Design', 'Tutorial'],
    status: 'published' as const
  },
  {
    title: 'Database Design Best Practices',
    excerpt: 'Essential principles for designing efficient and scalable database schemas.',
    content: `
      <h2>Database Design Fundamentals</h2>
      <p>Good database design is the foundation of any robust application. This guide covers the essential principles you need to know.</p>

      <h3>Normalization</h3>
      <p>Normalization is the process of organizing data to reduce redundancy. Understanding the normal forms (1NF, 2NF, 3NF) is crucial.</p>

      <h3>Relationships</h3>
      <p>Understanding different types of relationships (one-to-one, one-to-many, many-to-many) helps you model your data effectively.</p>

      <h3>Indexing</h3>
      <p>Proper indexing can dramatically improve query performance. However, over-indexing can slow down write operations.</p>

      <h3>Data Types</h3>
      <p>Choose appropriate data types for each column. This affects both storage efficiency and query performance.</p>

      <h3>Denormalization</h3>
      <p>Sometimes, controlled denormalization is necessary for performance. Know when to break normalization rules.</p>

      <h3>Common Pitfalls</h3>
      <ul>
        <li>Over-normalization leading to complex queries</li>
        <li>Not planning for future growth</li>
        <li>Ignoring foreign key constraints</li>
        <li>Poor naming conventions</li>
      </ul>
    `,
    category: 'Programming',
    tags: ['Database', 'Tutorial'],
    status: 'published' as const
  },
  {
    title: 'Microservices Architecture Explained',
    excerpt: 'Understanding microservices architecture, its benefits, and challenges in modern application development.',
    content: `
      <h2>Introduction to Microservices</h2>
      <p>Microservices architecture has become increasingly popular for building scalable, maintainable applications. Let's explore what it is and when to use it.</p>

      <h3>What Are Microservices?</h3>
      <p>Microservices are small, independent services that work together to form a complete application. Each service focuses on a specific business capability.</p>

      <h3>Benefits</h3>
      <ul>
        <li><strong>Scalability:</strong> Scale individual services independently</li>
        <li><strong>Flexibility:</strong> Use different technologies for different services</li>
        <li><strong>Resilience:</strong> Failure in one service doesn't bring down the entire system</li>
        <li><strong>Team Organization:</strong> Teams can work independently on different services</li>
      </ul>

      <h3>Challenges</h3>
      <ul>
        <li>Increased operational complexity</li>
        <li>Distributed system challenges</li>
        <li>Data consistency across services</li>
        <li>Testing complexity</li>
      </ul>

      <h3>When to Use Microservices</h3>
      <p>Microservices are not always the right choice. Consider them when you have a large team, need independent scaling, or require high availability.</p>
    `,
    category: 'Technology',
    tags: ['Architecture', 'Microservices'],
    status: 'published' as const
  },
  {
    title: 'Web Performance Optimization Techniques',
    excerpt: 'Practical strategies to improve your website loading speed and overall performance.',
    content: `
      <h2>Optimizing Web Performance</h2>
      <p>Website performance directly impacts user experience and SEO rankings. Here are proven techniques to make your site faster.</p>

      <h3>1. Image Optimization</h3>
      <p>Images are often the largest assets on a page. Use modern formats like WebP, implement lazy loading, and serve responsive images.</p>

      <h3>2. Code Splitting</h3>
      <p>Split your JavaScript bundles to load only what's needed for each page. This reduces initial load time significantly.</p>

      <h3>3. Caching Strategies</h3>
      <p>Implement proper caching headers and consider using a CDN for static assets.</p>

      <h3>4. Minimize HTTP Requests</h3>
      <p>Combine files where possible and use CSS sprites for small images.</p>

      <h3>5. Server-Side Rendering</h3>
      <p>SSR can improve initial page load and SEO for React applications.</p>

      <h3>Measuring Performance</h3>
      <p>Use tools like Lighthouse, WebPageTest, and Chrome DevTools to measure and track performance metrics.</p>

      <h3>Core Web Vitals</h3>
      <p>Focus on Google's Core Web Vitals: LCP, FID, and CLS for better SEO and user experience.</p>
    `,
    category: 'Web Development',
    tags: ['Performance', 'Guide'],
    status: 'published' as const
  },
  {
    title: 'GraphQL vs REST: A Complete Comparison',
    excerpt: 'An in-depth comparison of GraphQL and REST API architectures to help you choose the right approach.',
    content: `
      <h2>API Design: GraphQL vs REST</h2>
      <p>Both GraphQL and REST are popular approaches for building APIs. Let's compare them to help you make an informed decision.</p>

      <h3>REST APIs</h3>
      <p>REST has been the standard for years. It's simple, well-understood, and has great tooling support.</p>
      <p><strong>Pros:</strong></p>
      <ul>
        <li>Simple and well-established</li>
        <li>Great caching support</li>
        <li>Easier to learn</li>
      </ul>
      <p><strong>Cons:</strong></p>
      <ul>
        <li>Over-fetching or under-fetching data</li>
        <li>Multiple round trips needed</li>
        <li>Versioning challenges</li>
      </ul>

      <h3>GraphQL</h3>
      <p>GraphQL provides a more flexible approach where clients can request exactly what they need.</p>
      <p><strong>Pros:</strong></p>
      <ul>
        <li>Get exactly what you need</li>
        <li>Single endpoint</li>
        <li>Strong typing</li>
        <li>Real-time updates with subscriptions</li>
      </ul>
      <p><strong>Cons:</strong></p>
      <ul>
        <li>Steeper learning curve</li>
        <li>More complex caching</li>
        <li>Potential for expensive queries</li>
      </ul>

      <h3>Which to Choose?</h3>
      <p>Consider your use case, team expertise, and specific requirements. REST is great for simple, cacheable APIs, while GraphQL shines in complex, data-intensive applications.</p>
    `,
    category: 'Programming',
    tags: ['GraphQL', 'REST', 'API'],
    status: 'published' as const
  },
  {
    title: 'Security Best Practices for Web Applications',
    excerpt: 'Essential security measures every web developer should implement to protect their applications.',
    content: `
      <h2>Web Application Security</h2>
      <p>Security should be a top priority in web development. Here are essential practices to protect your applications and users.</p>

      <h3>1. Authentication and Authorization</h3>
      <p>Implement strong authentication using proven libraries. Never roll your own crypto. Use JWT, OAuth, or session-based auth appropriately.</p>

      <h3>2. Input Validation</h3>
      <p>Always validate and sanitize user input on both client and server side. Never trust user input.</p>

      <h3>3. XSS Prevention</h3>
      <p>Cross-Site Scripting (XSS) is a common vulnerability. Use Content Security Policy and escape user-generated content.</p>

      <h3>4. CSRF Protection</h3>
      <p>Implement CSRF tokens for state-changing operations. Most frameworks provide built-in protection.</p>

      <h3>5. SQL Injection Prevention</h3>
      <p>Always use parameterized queries or ORMs. Never concatenate user input into SQL queries.</p>

      <h3>6. HTTPS Everywhere</h3>
      <p>Use HTTPS for all pages. Set up HSTS headers to enforce secure connections.</p>

      <h3>7. Dependency Management</h3>
      <p>Keep dependencies updated and audit them regularly for known vulnerabilities.</p>

      <h3>Security Headers</h3>
      <p>Implement security headers like X-Content-Type-Options, X-Frame-Options, and CSP.</p>
    `,
    category: 'Technology',
    tags: ['Security', 'Best Practices'],
    status: 'published' as const
  },
  {
    title: 'Docker for Developers: A Practical Guide',
    excerpt: 'Learn how to use Docker to create consistent development environments and streamline deployment.',
    content: `
      <h2>Getting Started with Docker</h2>
      <p>Docker has revolutionized how we develop and deploy applications. This guide will help you understand Docker and start using it effectively.</p>

      <h3>What is Docker?</h3>
      <p>Docker is a platform for developing, shipping, and running applications in containers. Containers package an application with all its dependencies.</p>

      <h3>Key Concepts</h3>
      <ul>
        <li><strong>Images:</strong> Read-only templates for creating containers</li>
        <li><strong>Containers:</strong> Running instances of images</li>
        <li><strong>Dockerfile:</strong> Instructions for building images</li>
        <li><strong>Docker Compose:</strong> Tool for defining multi-container applications</li>
      </ul>

      <h3>Benefits</h3>
      <ul>
        <li>Consistent environments across development and production</li>
        <li>Easy dependency management</li>
        <li>Simplified deployment</li>
        <li>Better resource utilization</li>
      </ul>

      <h3>Best Practices</h3>
      <ul>
        <li>Use official base images</li>
        <li>Keep images small</li>
        <li>Use .dockerignore</li>
        <li>Don't run as root</li>
        <li>Use multi-stage builds</li>
      </ul>

      <h3>Docker Compose</h3>
      <p>Docker Compose simplifies working with multi-container applications. Define your entire stack in a single YAML file.</p>
    `,
    category: 'Technology',
    tags: ['Docker', 'DevOps', 'Tutorial'],
    status: 'published' as const
  },
  {
    title: 'Understanding JavaScript Closures',
    excerpt: 'A deep dive into one of JavaScript\'s most powerful and misunderstood features.',
    content: `
      <h2>JavaScript Closures Explained</h2>
      <p>Closures are a fundamental concept in JavaScript that every developer should understand. Let's demystify this powerful feature.</p>

      <h3>What is a Closure?</h3>
      <p>A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned.</p>

      <h3>How Closures Work</h3>
      <p>When a function is created, it maintains a reference to its lexical environment. This allows it to access variables from its outer scope.</p>

      <h3>Common Use Cases</h3>
      <ul>
        <li><strong>Data Privacy:</strong> Creating private variables and methods</li>
        <li><strong>Event Handlers:</strong> Maintaining state in callbacks</li>
        <li><strong>Partial Application:</strong> Creating specialized functions</li>
        <li><strong>Module Pattern:</strong> Organizing code into modules</li>
      </ul>

      <h3>Potential Pitfalls</h3>
      <ul>
        <li>Memory leaks if not careful</li>
        <li>Confusion with 'this' keyword</li>
        <li>Loop variable issues (solved with let/const)</li>
      </ul>

      <h3>Practical Examples</h3>
      <p>Closures are used extensively in modern JavaScript frameworks and libraries. Understanding them is key to writing effective JavaScript code.</p>
    `,
    category: 'Programming',
    tags: ['JavaScript', 'Tutorial'],
    status: 'published' as const
  },
  {
    title: 'Machine Learning Basics for Web Developers',
    excerpt: 'An introduction to machine learning concepts and how to integrate ML models into web applications.',
    content: `
      <h2>ML for Web Developers</h2>
      <p>Machine learning is becoming increasingly accessible to web developers. This guide introduces key concepts and practical applications.</p>

      <h3>What is Machine Learning?</h3>
      <p>Machine learning is a subset of AI that enables systems to learn and improve from experience without being explicitly programmed.</p>

      <h3>Types of Machine Learning</h3>
      <ul>
        <li><strong>Supervised Learning:</strong> Learning from labeled data</li>
        <li><strong>Unsupervised Learning:</strong> Finding patterns in unlabeled data</li>
        <li><strong>Reinforcement Learning:</strong> Learning through trial and error</li>
      </ul>

      <h3>ML in the Browser</h3>
      <p>TensorFlow.js and other libraries make it possible to run ML models directly in the browser.</p>

      <h3>Common Use Cases</h3>
      <ul>
        <li>Image recognition</li>
        <li>Natural language processing</li>
        <li>Recommendation systems</li>
        <li>Anomaly detection</li>
      </ul>

      <h3>Getting Started</h3>
      <p>Start with pre-trained models and transfer learning before building custom models from scratch.</p>

      <h3>Ethics and Bias</h3>
      <p>Be aware of potential biases in ML models and consider ethical implications when deploying ML systems.</p>
    `,
    category: 'Technology',
    tags: ['Machine Learning', 'AI'],
    status: 'draft' as const
  }
];

const comments = [
  { content: 'Great article! Very helpful for beginners.', authorName: 'Alice Johnson' },
  { content: 'Thanks for the detailed explanation. This cleared up a lot of confusion.', authorName: 'Bob Smith' },
  { content: 'Could you elaborate more on the performance implications?', authorName: 'Carol Williams' },
  { content: 'Excellent examples! I\'ll definitely try this in my next project.', authorName: 'David Brown' },
  { content: 'This is exactly what I was looking for. Bookmarked!', authorName: 'Emma Davis' },
  { content: 'Well written and easy to follow. Keep up the good work!', authorName: 'Frank Miller' },
  { content: 'I have a question about the third example. Can you clarify?', authorName: 'Grace Wilson' },
  { content: 'Fantastic tutorial! Helped me understand the concept finally.', authorName: 'Henry Taylor' },
];

async function seed() {
  console.log('Starting database seed...');

  // Initialize database
  initializeDatabase();

  // Create a test admin user
  try {
    const admin = UserModel.create('admin', 'admin123');
    console.log(`Created admin user: ${admin.username}`);

    // Create blogs
    console.log('\nCreating blog posts...');
    const createdBlogs = [];
    for (const blog of blogData) {
      const created = BlogModel.create(blog, admin.id);
      createdBlogs.push(created);
      console.log(`- Created blog: "${created.title}" (${created.status})`);
    }

    // Add some views and likes to blogs
    console.log('\nAdding views and likes...');
    for (let i = 0; i < createdBlogs.length; i++) {
      const blog = createdBlogs[i];
      const views = Math.floor(Math.random() * 500) + 50;
      const likes = Math.floor(Math.random() * 100) + 10;

      for (let v = 0; v < views; v++) {
        BlogModel.incrementViews(blog.id);
      }
      for (let l = 0; l < likes; l++) {
        BlogModel.incrementLikes(blog.id);
      }

      console.log(`- Added ${views} views and ${likes} likes to "${blog.title}"`);
    }

    // Add comments to published blogs
    console.log('\nAdding comments...');
    const publishedBlogs = createdBlogs.filter(b => b.status === 'published');
    for (const blog of publishedBlogs) {
      const numComments = Math.floor(Math.random() * 4) + 1;
      for (let i = 0; i < numComments; i++) {
        const comment = comments[Math.floor(Math.random() * comments.length)];
        CommentModel.create({
          blogId: blog.id,
          content: comment.content,
          authorName: comment.authorName
        });
      }
      console.log(`- Added ${numComments} comments to "${blog.title}"`);
    }

    // Add some author comments
    const firstBlog = publishedBlogs[0];
    if (firstBlog) {
      CommentModel.create({
        blogId: firstBlog.id,
        content: 'Thank you all for the feedback! I\'m glad this was helpful.',
        authorName: 'Admin'
      }, true);
      console.log(`- Added author comment to "${firstBlog.title}"`);
    }

    console.log('\n✅ Database seeded successfully!');
    console.log(`\nCreated:`);
    console.log(`- 1 admin user (username: admin, password: admin123)`);
    console.log(`- ${createdBlogs.length} blog posts (${createdBlogs.filter(b => b.status === 'published').length} published, ${createdBlogs.filter(b => b.status === 'draft').length} draft)`);
    console.log(`- Multiple comments and engagement metrics`);

  } catch (error: any) {
    if (error.message?.includes('UNIQUE constraint failed')) {
      console.error('\n❌ Error: Admin user already exists. Run "npm run reset" first to clear the database.');
    } else {
      console.error('\n❌ Error seeding database:', error);
    }
    process.exit(1);
  }
}

seed();
