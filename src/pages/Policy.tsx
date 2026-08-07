import { useEffect, useState } from 'react';

const POLICY_SECTIONS = [
  { id: 'data-collection', title: 'What information do we collect?' },
  { id: 'data-usage', title: 'How do we use your information?' },
  { id: 'tracking', title: 'Do we use cookies and other tracking technologies?' },
  { id: 'retention', title: 'How long do we keep your information?' },
  { id: 'security', title: 'How do we keep your information safe?' },
  { id: 'rights', title: 'What are your privacy rights?' },
  { id: 'contact', title: 'How can you contact us about this policy?' },
];

function PolicyHeader() {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-center border-b border-sg2-border-subtle bg-sg2-bg-card/95 backdrop-blur">
      <div className="flex min-h-[64px] w-full max-w-[1280px] items-center justify-between px-sg2-lg sm:px-sg2-xl">
        <div className="flex items-center gap-sg2-sm">
          <svg className="text-sg2-primary-100" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z" />
            <circle cx="12" cy="11" r="3" fill="currentColor" stroke="none" />
          </svg>
          <span className="text-sg2-h3 font-bold tracking-tight text-sg2-text-heading">Enterprise</span>
        </div>
        <div className="flex items-center gap-sg2-xl">
          <div className="hidden flex-col items-end sm:flex">
            <div className="flex items-center gap-sg2-xs text-sg2-caption font-semibold text-sg2-text-tertiary">
              Client Support <span className="text-sg2-primary-100">→</span>
            </div>
            <a href="tel:+18003568933" className="text-sg2-body-sm font-bold text-sg2-text-heading hover:text-sg2-primary-100">1-800-356-8933</a>
          </div>
          <a href="#contact" className="inline-flex min-h-[44px] items-center rounded-sg2-sm bg-sg2-primary-100 px-sg2-lg text-sg2-body-sm font-semibold text-sg2-white transition-colors hover:bg-sg2-primary-120">
            Contact Us
          </a>
        </div>
      </div>
    </header>
  );
}

export default function Policy() {
  const [activeSection, setActiveSection] = useState(POLICY_SECTIONS[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const sections = POLICY_SECTIONS.map((s) => document.getElementById(s.id));
      const scrollPos = window.scrollY + 120; // offset for topbar

      let currentId = POLICY_SECTIONS[0].id;
      for (const section of sections) {
        if (section && section.offsetTop <= scrollPos) {
          currentId = section.id;
        }
      }
      setActiveSection(currentId);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-sg2-bg-page font-sans text-sg2-text-primary">
      <PolicyHeader />
      
      {/* Page Title Bar */}
      <div className="flex w-full justify-center border-b border-sg2-border-subtle bg-sg2-bg-card py-sg2-md">
        <div className="flex w-full max-w-[1280px] items-center px-sg2-lg sm:px-sg2-xl">
          <p className="text-sg2-h4 font-semibold tracking-tight text-sg2-text-heading">Privacy Policy</p>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1280px] items-start gap-sg2-3xl px-sg2-lg py-sg2-3xl sm:px-sg2-xl">
        <aside className="sticky top-[88px] hidden h-fit w-[280px] shrink-0 flex-col gap-sg2-sm lg:flex">
          <nav className="flex flex-col gap-sg2-xs" aria-label="Privacy policy sections">
            {POLICY_SECTIONS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`rounded-r-sg2-lg border-l-2 px-sg2-md py-sg2-sm text-sg2-body-sm leading-5 transition-colors ${
                  activeSection === item.id
                    ? 'border-sg2-primary-100 bg-sg2-primary-30 font-semibold text-sg2-primary-100'
                    : 'border-transparent text-sg2-text-secondary hover:bg-sg2-gray-100 hover:text-sg2-text-primary'
                }`}
              >
                {item.title}
              </a>
            ))}
          </nav>
        </aside>

        <main className="flex min-w-0 max-w-[56rem] flex-1 flex-col pb-sg2-4xl lg:px-sg2-xl">
          <div id="privacy-policy" className="flex scroll-mt-[120px] flex-col items-start justify-center pb-sg2-xl">
            <h1 className="mb-sg2-md text-sg2-h1 font-bold tracking-tight text-sg2-text-heading md:text-sg2-display">
              We care about your privacy
            </h1>
            <p className="w-full text-sg2-body-lg leading-7 text-sg2-text-secondary">
              Your privacy is important to us at Enterprise. We respect your privacy regarding any information we may collect from you across our website.
            </p>
          </div>

          <div className="mb-sg2-3xl flex flex-col gap-sg2-md text-sg2-body-md leading-7 text-sg2-text-secondary">
            <p>
              This Privacy Policy explains how Enterprise ("we," "us," or "our") collects, uses, and discloses your information when you use our website, products, and services.
            </p>
            <p>
              By accessing or using our services, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy.
            </p>
          </div>

          <section id="data-collection" className="scroll-mt-[120px] border-t border-sg2-border-subtle pt-sg2-2xl">
            <h2 className="mb-sg2-md text-sg2-h3 font-semibold tracking-tight text-sg2-text-heading">
              What information do we collect?
            </h2>
            <div className="flex flex-col gap-sg2-md text-sg2-body-md leading-7 text-sg2-text-secondary">
              <p>
                We collect information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, or otherwise when you contact us. The personal information that we collect depends on the context of your interactions with us and the website, the choices you make, and the products and features you use.
              </p>
              <ul className="flex list-disc flex-col gap-sg2-sm pl-sg2-xl marker:text-sg2-primary-100">
                <li><strong>Personal Data:</strong> Names, email addresses, phone numbers, and other contact details.</li>
                <li><strong>Payment Data:</strong> Data necessary to process your payment if you make purchases, such as your payment instrument number and the security code associated with your payment instrument.</li>
                <li><strong>Usage Data:</strong> We automatically collect certain information when you visit, use, or navigate the website. This information does not reveal your specific identity but may include device and usage information, such as your IP address, browser and device characteristics, operating system, and language preferences.</li>
              </ul>
            </div>
          </section>

          <section id="data-usage" className="mt-sg2-3xl scroll-mt-[120px] border-t border-sg2-border-subtle pt-sg2-2xl">
            <h2 className="mb-sg2-md text-sg2-h3 font-semibold tracking-tight text-sg2-text-heading">
              How do we use your information?
            </h2>
            <div className="flex flex-col gap-sg2-md text-sg2-body-md leading-7 text-sg2-text-secondary">
              <p>
                We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
              </p>
              <ul className="flex list-disc flex-col gap-sg2-sm pl-sg2-xl marker:text-sg2-primary-100">
                <li>To facilitate account creation and logon process.</li>
                <li>To send you marketing and promotional communications.</li>
                <li>To fulfill and manage your orders.</li>
                <li>To request feedback and to contact you about your use of our website.</li>
                <li>To protect our Services from fraudulent activities.</li>
              </ul>
            </div>
          </section>

          <section id="tracking" className="mt-sg2-3xl scroll-mt-[120px] border-t border-sg2-border-subtle pt-sg2-2xl">
            <h2 className="mb-sg2-md text-sg2-h3 font-semibold tracking-tight text-sg2-text-heading">
              Do we use cookies and other tracking technologies?
            </h2>
            <div className="flex flex-col gap-sg2-md text-sg2-body-md leading-7 text-sg2-text-secondary">
              <p>
                We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
              </p>
            </div>
          </section>
          
          <section id="retention" className="mt-sg2-3xl scroll-mt-[120px] border-t border-sg2-border-subtle pt-sg2-2xl">
            <h2 className="mb-sg2-md text-sg2-h3 font-semibold tracking-tight text-sg2-text-heading">
              How long do we keep your information?
            </h2>
            <div className="flex flex-col gap-sg2-md text-sg2-body-md leading-7 text-sg2-text-secondary">
              <p>
                We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).
              </p>
            </div>
          </section>

          <section id="security" className="mt-sg2-3xl scroll-mt-[120px] border-t border-sg2-border-subtle pt-sg2-2xl">
            <h2 className="mb-sg2-md text-sg2-h3 font-semibold tracking-tight text-sg2-text-heading">
              How do we keep your information safe?
            </h2>
            <div className="flex flex-col gap-sg2-md text-sg2-body-md leading-7 text-sg2-text-secondary">
              <p>
                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
              </p>
            </div>
          </section>

          <section id="rights" className="mt-sg2-3xl scroll-mt-[120px] border-t border-sg2-border-subtle pt-sg2-2xl">
            <h2 className="mb-sg2-md text-sg2-h3 font-semibold tracking-tight text-sg2-text-heading">
              What are your privacy rights?
            </h2>
            <div className="flex flex-col gap-sg2-md text-sg2-body-md leading-7 text-sg2-text-secondary">
              <p>
                In some regions, such as the European Economic Area (EEA) and United Kingdom (UK), you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.
              </p>
              <p>
                If you are a resident in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority.
              </p>
            </div>
          </section>

          <section id="contact" className="mt-sg2-3xl scroll-mt-[120px] border-t border-sg2-border-subtle pt-sg2-2xl">
            <h2 className="mb-sg2-md text-sg2-h3 font-semibold tracking-tight text-sg2-text-heading">
              How can you contact us about this policy?
            </h2>
            <div className="flex flex-col gap-sg2-md text-sg2-body-md leading-7 text-sg2-text-secondary">
              <p>
                If you have questions or comments about this notice, you may email us at privacy@enterprise.com or by post to:
              </p>
            </div>
            
            <div className="mt-sg2-xl grid grid-cols-1 gap-sg2-lg sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col gap-sg2-lg rounded-sg2-lg border border-sg2-border-subtle bg-sg2-bg-card p-sg2-lg shadow-sg2-xs">
                <div className="flex flex-col gap-sg2-xs">
                  <div className="text-sg2-caption font-semibold uppercase tracking-wider text-sg2-text-tertiary">Company Name</div>
                  <div className="text-sg2-body-sm font-medium text-sg2-text-primary">Enterprise Inc.</div>
                </div>
                <div className="flex flex-col gap-sg2-xs">
                  <div className="text-sg2-caption font-semibold uppercase tracking-wider text-sg2-text-tertiary">Address</div>
                  <div className="text-sg2-body-sm text-sg2-text-primary">123 Corporate Blvd, San Francisco, CA</div>
                </div>
              </div>
              <div className="flex flex-col gap-sg2-lg rounded-sg2-lg border border-sg2-border-subtle bg-sg2-bg-card p-sg2-lg shadow-sg2-xs">
                <div className="flex flex-col gap-sg2-xs">
                  <div className="text-sg2-caption font-semibold uppercase tracking-wider text-sg2-text-tertiary">Contact Person</div>
                  <div className="text-sg2-body-sm font-medium text-sg2-text-primary">Privacy Officer</div>
                </div>
                <div className="flex flex-col gap-sg2-xs">
                  <div className="text-sg2-caption font-semibold uppercase tracking-wider text-sg2-text-tertiary">Phone</div>
                  <a href="tel:+18003568933" className="text-sg2-body-sm text-sg2-primary-100 hover:underline">+1 (800) 356-8933</a>
                </div>
              </div>
              <div className="flex flex-col gap-sg2-lg rounded-sg2-lg border border-sg2-border-subtle bg-sg2-bg-card p-sg2-lg shadow-sg2-xs">
                <div className="flex flex-col gap-sg2-xs">
                  <div className="text-sg2-caption font-semibold uppercase tracking-wider text-sg2-text-tertiary">Email</div>
                  <a href="mailto:privacy@enterprise.com" className="break-all text-sg2-body-sm font-medium text-sg2-primary-100 hover:underline">privacy@enterprise.com</a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <footer className="flex w-full flex-col items-center font-sans text-sg2-white">
        {/* Top Section */}
        <div className="flex w-full justify-center bg-sg2-supporting-indigo-100 py-sg2-2xl">
          <div className="flex w-full max-w-[1280px] flex-col items-start justify-between gap-sg2-xl px-sg2-lg sm:px-sg2-xl md:flex-row md:items-center">
            <div className="flex flex-col gap-sg2-xs">
              <h3 className="text-sg2-h4 font-semibold tracking-tight">Join our newsletter</h3>
              <p className="text-sg2-body-sm text-sg2-gray-300">We'll send you a helpful update once per week. No spam.</p>
            </div>
            <div className="flex w-full flex-col gap-sg2-sm sm:flex-row md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                aria-label="Email address"
                className="min-h-[44px] w-full rounded-sg2-sm border border-sg2-border-default bg-sg2-white px-sg2-md text-sg2-body-sm text-sg2-gray-900 outline-none transition-shadow placeholder:text-sg2-text-placeholder focus:border-sg2-primary-100 focus:ring-2 focus:ring-sg2-primary-30 md:w-[280px]"
              />
              <button className="min-h-[44px] rounded-sg2-sm bg-sg2-primary-100 px-sg2-xl text-sg2-body-sm font-semibold transition-colors hover:bg-sg2-primary-120">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex w-full justify-center bg-sg2-gray-950 pb-sg2-xl pt-sg2-3xl">
          <div className="flex w-full max-w-[1280px] flex-col px-sg2-lg sm:px-sg2-xl">
            {/* Links and Logo Row */}
            <div className="grid grid-cols-1 gap-sg2-2xl pb-sg2-3xl md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
              <div className="flex flex-col gap-sg2-lg lg:pr-sg2-2xl">
                <div className="text-sg2-h1 font-bold tracking-tight">LOGO</div>
                <p className="max-w-[280px] text-sg2-body-sm leading-6 text-sg2-gray-300">
                  Design amazing digital experiences that create more happy in the world.
                </p>
              </div>

              <div className="flex flex-col gap-sg2-lg lg:ml-auto">
                <h4 className="text-sg2-body-md font-semibold text-sg2-white">Solutions</h4>
                <ul className="flex flex-col gap-sg2-md text-sg2-body-sm text-sg2-gray-300">
                  <li><a href="#" className="transition-colors hover:text-sg2-white">Managed Services</a></li>
                  <li><a href="#" className="transition-colors hover:text-sg2-white">IT consulting & Advisory</a></li>
                  <li><a href="#" className="transition-colors hover:text-sg2-white">Cyber Security</a></li>
                  <li><a href="#" className="transition-colors hover:text-sg2-white">Web Development</a></li>
                </ul>
              </div>

              <div className="flex flex-col gap-sg2-lg md:pt-[40px] lg:ml-auto">
                <ul className="flex flex-col gap-sg2-md text-sg2-body-sm text-sg2-gray-300">
                  <li><a href="#" className="transition-colors hover:text-sg2-white">Mobile Development</a></li>
                  <li><a href="#" className="transition-colors hover:text-sg2-white">Cloud Services</a></li>
                  <li><a href="#" className="transition-colors hover:text-sg2-white">Network Connectivity</a></li>
                  <li><a href="#" className="transition-colors hover:text-sg2-white">ERP Solutions</a></li>
                </ul>
              </div>

              <div className="flex flex-col gap-sg2-lg lg:ml-auto">
                <h4 className="text-sg2-body-md font-semibold text-sg2-white">Company</h4>
                <ul className="flex flex-col gap-sg2-md text-sg2-body-sm text-sg2-gray-300">
                  <li><a href="#" className="transition-colors hover:text-sg2-white">About us</a></li>
                  <li><a href="#" className="transition-colors hover:text-sg2-white">Why us</a></li>
                  <li><a href="#" className="transition-colors hover:text-sg2-white">Team</a></li>
                  <li><a href="#" className="transition-colors hover:text-sg2-white">Careers</a></li>
                </ul>
              </div>
            </div>

            {/* Contact and Social Row */}
            <div className="flex flex-col items-start justify-between gap-sg2-2xl border-y border-white/10 py-sg2-2xl md:flex-row md:items-center">
              <div className="flex flex-col gap-sg2-xl text-sg2-body-sm text-sg2-gray-300 md:flex-row md:gap-sg2-3xl">
                <div className="flex flex-col gap-sg2-xs">
                  <div>New York, NY 10018</div>
                  <div>Seventh Ave, 20th Floor</div>
                </div>
                <div className="flex flex-col gap-sg2-xs">
                  <a href="mailto:office@enterprise.com" className="hover:text-sg2-white">E: office@enterprise.com</a>
                  <a href="tel:+18003568933" className="hover:text-sg2-white">T: 1-800-356-8933</a>
                </div>
              </div>
              <div className="flex items-center gap-sg2-sm text-sg2-white">
                <a href="#" className="flex h-[44px] w-[44px] items-center justify-center rounded-sg2-full transition-colors hover:bg-white/10 hover:text-sg2-gray-300" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                </a>
                <a href="#" className="flex h-[44px] w-[44px] items-center justify-center rounded-sg2-full transition-colors hover:bg-white/10 hover:text-sg2-gray-300" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" className="flex h-[44px] w-[44px] items-center justify-center rounded-sg2-full transition-colors hover:bg-white/10 hover:text-sg2-gray-300" aria-label="X">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="flex h-[44px] w-[44px] items-center justify-center rounded-sg2-full transition-colors hover:bg-white/10 hover:text-sg2-gray-300" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>

            {/* Copyright Row */}
            <div className="flex flex-col-reverse items-start justify-between gap-sg2-md pt-sg2-2xl text-sg2-body-sm text-sg2-gray-400 md:flex-row md:items-center">
              <div>© 2026. All rights reserved.</div>
              <div className="flex gap-sg2-xl">
                <a href="#" className="transition-colors hover:text-sg2-white">Terms & Conditions</a>
                <a href="/policy" className="transition-colors hover:text-sg2-white">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
