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
    <div className="sticky top-0 z-50 flex w-full items-center justify-center bg-[#f2f7fc] py-[12px] shadow-sm">
      <div className="flex w-full max-w-[1440px] items-center justify-between px-xl">
        <div className="flex items-center gap-sm">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z" />
            <circle cx="12" cy="11" r="3" fill="#2563eb" stroke="none" />
          </svg>
          <span className="text-[24px] font-bold text-[#0f172a] tracking-tight">Enterprise</span>
        </div>
        <div className="flex items-center gap-[24px]">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-[4px] text-[11px] font-semibold text-gray-500">
              Client Support <span className="text-blue-600">→</span>
            </div>
            <div className="text-[15px] font-bold text-[#0f172a]">1-800-356-8933</div>
          </div>
          <button className="rounded bg-[#0b33b0] px-[20px] py-[10px] text-[14px] font-medium text-white transition-colors hover:bg-[#123fc7]">
            Contact Us
          </button>
        </div>
      </div>
    </div>
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
    <div className="min-h-screen bg-bg-layout font-sans text-text-primary">
      <PolicyHeader />
      
      {/* Page Title Bar */}
      <div className="flex w-full justify-center bg-white border-b border-gray-200 py-lg">
        <div className="flex w-full max-w-[1440px] items-center px-xl">
          <h1 className="text-[24px] font-bold tracking-tight text-gray-13">Privacy Policy</h1>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1440px] items-start gap-2xl px-xl py-3xl">
        <aside className="sticky top-[100px] hidden h-fit w-[260px] shrink-0 flex-col gap-sm lg:flex">
          <nav className="flex flex-col gap-xs">
            {POLICY_SECTIONS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`rounded-r-md border-l-2 px-md py-[10px] text-[13px] transition-colors ${
                  activeSection === item.id
                    ? 'border-primary-6 bg-primary-0 font-medium text-primary-6'
                    : 'border-transparent text-text-secondary hover:bg-gray-2 hover:text-text-primary'
                }`}
              >
                {item.title}
              </a>
            ))}
          </nav>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col gap-2xl pb-3xl px-xl md:px-3xl">
          <div id="privacy-policy" className="flex scroll-mt-[100px] flex-col items-start justify-center pb-xl">
            <h1 className="mb-md text-[42px] font-semibold tracking-tight text-gray-13 md:text-[48px]">
              We care about your privacy
            </h1>
            <p className="w-full text-[18px] leading-relaxed text-text-secondary">
              Your privacy is important to us at Untitled. We respect your privacy regarding any information we may collect from you across our website.
            </p>
          </div>

          <div className="mb-xl text-[16px] leading-relaxed text-text-secondary">
            <p className="mb-md">
              This Privacy Policy explains how Enterprise ("we," "us," or "our") collects, uses, and discloses your information when you use our website, products, and services.
            </p>
            <p>
              By accessing or using our services, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy.
            </p>
          </div>

          <section id="data-collection" className="scroll-mt-[100px]">
            <h2 className="mb-md text-[24px] font-semibold tracking-tight text-gray-13">
              What information do we collect?
            </h2>
            <div className="flex flex-col gap-md text-[16px] leading-relaxed text-text-secondary">
              <p>
                We collect information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, or otherwise when you contact us. The personal information that we collect depends on the context of your interactions with us and the website, the choices you make, and the products and features you use.
              </p>
              <ul className="list-disc pl-xl flex flex-col gap-sm">
                <li><strong>Personal Data:</strong> Names, email addresses, phone numbers, and other contact details.</li>
                <li><strong>Payment Data:</strong> Data necessary to process your payment if you make purchases, such as your payment instrument number and the security code associated with your payment instrument.</li>
                <li><strong>Usage Data:</strong> We automatically collect certain information when you visit, use, or navigate the website. This information does not reveal your specific identity but may include device and usage information, such as your IP address, browser and device characteristics, operating system, and language preferences.</li>
              </ul>
            </div>
          </section>

          <section id="data-usage" className="scroll-mt-[100px] mt-xl">
            <h2 className="mb-md text-[24px] font-semibold tracking-tight text-gray-13">
              How do we use your information?
            </h2>
            <div className="flex flex-col gap-md text-[16px] leading-relaxed text-text-secondary">
              <p>
                We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
              </p>
              <ul className="list-disc pl-xl flex flex-col gap-sm">
                <li>To facilitate account creation and logon process.</li>
                <li>To send you marketing and promotional communications.</li>
                <li>To fulfill and manage your orders.</li>
                <li>To request feedback and to contact you about your use of our website.</li>
                <li>To protect our Services from fraudulent activities.</li>
              </ul>
            </div>
          </section>

          <section id="tracking" className="scroll-mt-[100px] mt-xl">
            <h2 className="mb-md text-[24px] font-semibold tracking-tight text-gray-13">
              Do we use cookies and other tracking technologies?
            </h2>
            <div className="flex flex-col gap-md text-[16px] leading-relaxed text-text-secondary">
              <p>
                We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
              </p>
            </div>
          </section>
          
          <section id="retention" className="scroll-mt-[100px] mt-xl">
            <h2 className="mb-md text-[24px] font-semibold tracking-tight text-gray-13">
              How long do we keep your information?
            </h2>
            <div className="flex flex-col gap-md text-[16px] leading-relaxed text-text-secondary">
              <p>
                We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).
              </p>
            </div>
          </section>

          <section id="security" className="scroll-mt-[100px] mt-xl">
            <h2 className="mb-md text-[24px] font-semibold tracking-tight text-gray-13">
              How do we keep your information safe?
            </h2>
            <div className="flex flex-col gap-md text-[16px] leading-relaxed text-text-secondary">
              <p>
                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
              </p>
            </div>
          </section>

          <section id="rights" className="scroll-mt-[100px] mt-xl">
            <h2 className="mb-md text-[24px] font-semibold tracking-tight text-gray-13">
              What are your privacy rights?
            </h2>
            <div className="flex flex-col gap-md text-[16px] leading-relaxed text-text-secondary">
              <p>
                In some regions, such as the European Economic Area (EEA) and United Kingdom (UK), you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.
              </p>
              <p>
                If you are a resident in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority.
              </p>
            </div>
          </section>

          <section id="contact" className="scroll-mt-[100px] mt-3xl">
            <h2 className="mb-lg text-[24px] font-semibold tracking-tight text-gray-13">
              How can you contact us about this policy?
            </h2>
            <div className="flex flex-col gap-md text-[16px] leading-relaxed text-text-secondary">
              <p>
                If you have questions or comments about this notice, you may email us at privacy@enterprise.com or by post to:
              </p>
            </div>
            
            <div className="mt-2xl grid grid-cols-1 gap-xl sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col gap-lg rounded-lg border border-gray-4 bg-gray-1 p-xl">
                <div className="flex flex-col gap-xs">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">Company Name</div>
                  <div className="text-[14px] font-medium text-text-primary">Enterprise Inc.</div>
                </div>
                <div className="flex flex-col gap-xs">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">Address</div>
                  <div className="text-[14px] text-text-primary">123 Corporate Blvd, San Francisco, CA</div>
                </div>
              </div>
              <div className="flex flex-col gap-lg rounded-lg border border-gray-4 bg-gray-1 p-xl">
                <div className="flex flex-col gap-xs">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">Contact Person</div>
                  <div className="text-[14px] font-medium text-text-primary">Privacy Officer</div>
                </div>
                <div className="flex flex-col gap-xs">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">Phone</div>
                  <div className="text-[14px] text-text-primary">+1 (800) 356-8933</div>
                </div>
              </div>
              <div className="flex flex-col gap-lg rounded-lg border border-gray-4 bg-gray-1 p-xl">
                <div className="flex flex-col gap-xs">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">Email</div>
                  <div className="text-[14px] font-medium text-text-primary">privacy@enterprise.com</div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <footer className="flex w-full flex-col items-center font-sans text-white">
        {/* Top Section */}
        <div className="flex w-full justify-center bg-[#071d60] py-3xl">
          <div className="flex w-full max-w-[1440px] flex-col items-start justify-between gap-xl px-xl md:flex-row md:items-center">
            <div className="flex flex-col gap-xs">
              <h3 className="text-[20px] font-semibold tracking-tight">Join our newsletter</h3>
              <p className="text-[14px] text-gray-300">We'll send you a nice letter once per week. No spam.</p>
            </div>
            <div className="flex w-full gap-sm md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full rounded bg-white px-md py-[11px] text-[14px] text-gray-900 outline-none md:w-[280px]"
              />
              <button className="rounded bg-[#0433c4] px-xl py-[11px] text-[14px] font-medium transition-colors hover:bg-[#073ee8]">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex w-full justify-center bg-[#051136] pb-xl pt-4xl">
          <div className="flex w-full max-w-[1440px] flex-col px-xl">
            {/* Links and Logo Row */}
            <div className="grid grid-cols-1 gap-2xl pb-4xl md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
              <div className="flex flex-col gap-lg pr-2xl">
                <div className="text-[36px] font-bold tracking-tight">LOGO</div>
                <p className="max-w-[280px] text-[13px] leading-relaxed text-gray-300">
                  Design amazing digital experiences that create more happy in the world.
                </p>
              </div>

              <div className="flex flex-col gap-lg lg:ml-auto">
                <h4 className="text-[16px] font-medium text-white">Solutions</h4>
                <ul className="flex flex-col gap-md text-[13px] text-gray-300">
                  <li><a href="#" className="transition-colors hover:text-white">Managed Services</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">IT consulting & Advisory</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Cyber Security</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Web Development</a></li>
                </ul>
              </div>

              <div className="mt-md flex flex-col gap-lg pt-[42px] md:mt-0 lg:ml-auto">
                <ul className="flex flex-col gap-md text-[13px] text-gray-300">
                  <li><a href="#" className="transition-colors hover:text-white">Mobile Development</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Cloud Services</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Network Connectivity</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">ERP Solutions</a></li>
                </ul>
              </div>

              <div className="flex flex-col gap-lg lg:ml-auto">
                <h4 className="text-[16px] font-medium text-white">Company</h4>
                <ul className="flex flex-col gap-md text-[13px] text-gray-300">
                  <li><a href="#" className="transition-colors hover:text-white">About us</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Why us</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Team</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Careers</a></li>
                </ul>
              </div>
            </div>

            {/* Contact and Social Row */}
            <div className="flex flex-col items-start justify-between gap-2xl border-y border-[#18274d] py-2xl md:flex-row md:items-center">
              <div className="flex flex-col gap-2xl text-[13px] text-gray-300 md:flex-row md:gap-4xl">
                <div className="flex flex-col gap-xs">
                  <div>New York, NY 10018</div>
                  <div>Seventh Ave, 20th Floor</div>
                </div>
                <div className="flex flex-col gap-xs">
                  <div>E: office@tecnologia.com</div>
                  <div>T: 1-800-356-8933</div>
                </div>
              </div>
              <div className="flex items-center gap-xl text-white">
                <a href="#" className="hover:text-gray-300 transition-colors" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors" aria-label="X">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>

            {/* Copyright Row */}
            <div className="flex flex-col-reverse items-start justify-between gap-md pt-2xl text-[13px] text-gray-400 md:flex-row md:items-center">
              <div>© 2026. All rights reserved.</div>
              <div className="flex gap-2xl">
                <a href="#" className="transition-colors hover:text-white">Terms & Conditions</a>
                <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
