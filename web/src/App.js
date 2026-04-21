import './App.css';
import { useEffect, useState } from 'react';
import { marked } from 'marked';
import { BrowserRouter, Link, Navigate, Route, Routes, useParams } from 'react-router-dom';
import logo from './assets/logo.png';

const BLOG_POST_FILES = [
  {
    fileName: 'cis-blog-1.md',
    date: 'April 2026',
  },
];

const toExcerpt = (markdown) => {
  const lines = markdown
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const firstContentLine = lines.find(
    (line) => !line.startsWith('#') && !line.startsWith('*') && !line.startsWith('_')
  );

  if (!firstContentLine) {
    return 'Read the full post for details.';
  }

  if (firstContentLine.length <= 180) {
    return firstContentLine;
  }

  return `${firstContentLine.slice(0, 177)}...`;
};

const toTitle = (markdown, fallback) => {
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  if (titleMatch?.[1]) {
    return titleMatch[1].trim();
  }

  return fallback;
};

const SiteHeader = () => (
  <header>
    <div className="header-content">
      <div className="logo-container">
        <img src={logo} alt="Certana Intelligent Systems" />
      </div>
      <nav>
        <a href="/#problem">The Problem</a>
        <a href="/#solution">How It Works</a>
        <a href="/#benefits">Benefits</a>
        <Link className="page-nav-link" to="/blog">Blog</Link>
        <Link className="page-nav-link" to="/whitepaper">Whitepaper</Link>
        <a href="/#contact" className="cta-nav">Get Started</a>
      </nav>
    </div>
  </header>
);

const SiteFooter = () => (
  <footer>
    <p>&copy; 2025 Certana Intelligent Systems. All rights reserved.</p>
  </footer>
);

const HomePage = () => (
  <>
    <section className="hero">
      <div className="hero-content">
        <div className="hero-left">
          <div className="tagline">From data to decision – automatically</div>
          <h1>Transforming Disability Claims Processing</h1>
          <p>FormLattice is a HIPAA-compliant AI platform that eliminates friction in disability claims by connecting claimants, physicians, and insurers through intelligent automation.</p>
          <div className="hero-buttons">
            <a href="#contact" className="btn-primary">Request a Demo</a>
            <a href="#solution" className="btn-secondary">Learn More</a>
          </div>
        </div>
        <div className="hero-right">
          <h3>The Impact</h3>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">80%</div>
              <div className="stat-label">Time Saved</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">HIPAA Compliant</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">3</div>
              <div className="stat-label">Stakeholders Connected</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Real-Time Tracking</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="problem-section" id="problem">
      <div className="problem-content">
        <h2>The Broken Bridge in Healthcare</h2>
        <p className="subtitle">Today's disability claims process is rudderless: claimants facing serious medical conditions navigate complex forms through physicians who rarely have a complete view. The result? Fragmented documentation, frustrated stakeholders, and costly delays.</p>

        <div className="problem-grid">
          <div className="problem-card">
            <h3>For Claimants</h3>
            <p>Overwhelming paperwork during already stressful times, with no visibility into claim status or next steps.</p>
          </div>
          <div className="problem-card">
            <h3>For Physicians</h3>
            <p>Hours spent manually reconciling records and filling forms, taking time away from patient care.</p>
          </div>
          <div className="problem-card">
            <h3>For Insurers</h3>
            <p>Incomplete or inconsistent documentation leading to delays, disputes, and increased adjudication costs.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="solution-section" id="solution">
      <div className="solution-content">
        <div className="solution-header">
          <h2>How FormLattice Works</h2>
          <p>Our AI-powered platform acts as the fourth node, seamlessly connecting all stakeholders and automating the entire claims workflow.</p>
        </div>

        <div className="solution-steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Ingest Medical Records</h3>
              <p>Connect to any source or format—fax, EMR, dictation, or paper records. Our system handles structured and unstructured data seamlessly.</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>AI-Powered Extraction</h3>
              <p>Our proprietary LLM engine rapidly parses and extracts relevant clinical data using medical frameworks and context-aware logic.</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Auto-Fill Forms</h3>
              <p>Complex claims forms are automatically populated with clear citations to source records, enabling physicians to review and attest rather than manually search.</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Real-Time Transparency</h3>
              <p>Intuitive dashboards and notifications keep all stakeholders informed, creating accountability and eliminating uncertainty.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="benefits-section" id="benefits">
      <div className="benefits-content">
        <div className="benefits-header">
          <h2>Why Choose FormLattice</h2>
          <p>Precision AI for healthcare and insurance infrastructure</p>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>Speed &amp; Efficiency</h3>
            <p>Reduce claims processing time by up to 80%, allowing physicians to focus on patient care and insurers to make faster decisions.</p>
          </div>

          <div className="benefit-card">
            <h3>Accuracy &amp; Compliance</h3>
            <p>HIPAA-compliant platform with complete audit trails, ensuring accuracy and regulatory compliance at every step.</p>
          </div>

          <div className="benefit-card">
            <h3>Seamless Integration</h3>
            <p>Works with any EMR system or document format. No disruption to existing workflows or infrastructure.</p>
          </div>

          <div className="benefit-card">
            <h3>Better Experience</h3>
            <p>Improved satisfaction for claimants, physicians, and insurers through transparency and reduced administrative burden.</p>
          </div>

          <div className="benefit-card">
            <h3>Cost Reduction</h3>
            <p>Lower operational costs through automation while maintaining the highest standards of accuracy and compliance.</p>
          </div>

          <div className="benefit-card">
            <h3>Scalable Platform</h3>
            <p>Modular architecture built to expand into underwriting, appeals, and other insurance lifecycle phases.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="cta-section" id="contact">
      <h2>Ready to Transform Your Claims Process?</h2>
      <p>Join the healthcare and insurance providers already benefiting from FormLattice's intelligent automation.</p>
      <a href="mailto:hi@certanais.com" className="cta-button">Contact Us Today</a>
    </section>
  </>
);

const BlogPage = ({ blogPosts }) => (
  <section className="page-section">
    <div className="page-content">
      <div className="page-header">
        <h2>Blog Posts</h2>
        <p>Insights on disability claims automation, clinical documentation, and insurance operations.</p>
      </div>

      <div className="blog-grid">
        {blogPosts.map((post) => (
          <article className="blog-card" key={post.slug}>
            <p className="blog-date">{post.date}</p>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <Link className="blog-read-link" to={`/blog/${post.slug}`}>Read post</Link>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const BlogPostPage = ({ blogPosts }) => {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <section className="page-section">
        <div className="page-content">
          <div className="page-header">
            <h2>Post Not Found</h2>
            <p>The blog post you requested is not available.</p>
            <Link className="blog-read-link" to="/blog">Back to all posts</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="page-content">
        <article className="blog-full-post">
          <p className="blog-date">{post.date}</p>
          <div className="blog-markdown" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      </div>
    </section>
  );
};

const WhitepaperPage = () => (
  <section className="page-section whitepaper-page">
    <div className="whitepaper-content">
      <div className="whitepaper-header">
        <h2>Whitepaper</h2>
        <p>Get our latest whitepaper on modernizing disability claims workflows with AI.</p>
      </div>

      <div className="whitepaper-contact-card">
        <a
          className="whitepaper-email-link"
          href="mailto:hi@certanais.com?subject=Whitepaper%20Request&body=Hi%20Certana%20team%2C%0A%0APlease%20send%20me%20the%20latest%20whitepaper.%0A%0AName%3A%0ACompany%3A"
        >
          Email Us for the Whitepaper
        </a>
      </div>
    </div>
  </section>
);

function App() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const loadBlogPosts = async () => {
      const loadedPosts = await Promise.all(
        BLOG_POST_FILES.map(async (postSource) => {
          const response = await fetch(`/blog/${postSource.fileName}`);
          const markdown = await response.text();
          const slug = postSource.fileName.replace('.md', '');

          return {
            slug,
            date: postSource.date,
            title: toTitle(markdown, slug),
            excerpt: toExcerpt(markdown),
            html: marked.parse(markdown),
          };
        })
      );

      setBlogPosts(loadedPosts);
    };

    loadBlogPosts();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <SiteHeader />
        <main className="page-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage blogPosts={blogPosts} />} />
            <Route path="/blog/:slug" element={<BlogPostPage blogPosts={blogPosts} />} />
            <Route path="/whitepaper" element={<WhitepaperPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <SiteFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
