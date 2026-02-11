import { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";

// Cloudinary URLs for banner images - same as Mission page
const heroImage =
  "https://res.cloudinary.com/dqataciy5/image/upload/v1770372479/Our_Mission_2_ag9sgv.png";
const heroImageMobile =
  "https://res.cloudinary.com/dqataciy5/image/upload/v1770373042/3_2_ndtwij.png";

// Cloudinary URLs for globe images
const globeImage1 =
  "https://res.cloudinary.com/dqataciy5/image/upload/v1770386526/1925_v7zozq.png";
const globeImage2 =
  "https://res.cloudinary.com/dqataciy5/image/upload/v1770386536/1926_q4rq4q.png";
const globeImage3 =
  "https://res.cloudinary.com/dqataciy5/image/upload/v1769084678/image_2_zfw9mn.png";
const geopoliticsImage =
  "https://res.cloudinary.com/dqataciy5/image/upload/v1770198726/Frame_1707483195_ae3e0x.png";
const technologyImage =
  "https://res.cloudinary.com/dqataciy5/image/upload/v1770198764/Frame_1707483195_2_mz7yjs.png";
const capitalImage =
  "https://res.cloudinary.com/dqataciy5/image/upload/v1770198768/Frame_1707483195_3_kausk6.png";

const ABOUT_TABS = [
  { id: "context", label: "Context", href: "#context" },
  { id: "distinctiveness", label: "Distinctiveness", href: "#distinctiveness" },
  {
    id: "strategic-intervention-logic",
    label: "Strategic Intervention Logic",
    href: "#strategic-intervention-logic",
  },
  {
    id: "consequential-decisions",
    label: "Consequential Decisions",
    href: "#consequential-decisions",
  },
  { id: "etymology", label: "On the Name", href: "#etymology" },
] as const;

const NAVBAR_HEIGHT = 80;

const Context = () => {
  const [activeTab, setActiveTab] = useState<(typeof ABOUT_TABS)[number]["id"]>(
    "context",
  );
  const [isTabsPinned, setIsTabsPinned] = useState(false);
  const [tabsHeight, setTabsHeight] = useState(0);

  // prevents scroll listener from overriding immediately after click
  const isManualTabChangeRef = useRef(false);
  const pendingTabRef = useRef<(typeof ABOUT_TABS)[number]["id"] | null>(null);
  const scrollRafRef = useRef<number | null>(null);
  const lastScrollYRef = useRef<number>(0);
  const stableFramesRef = useRef<number>(0);

  const tabsSentinelRef = useRef<HTMLDivElement | null>(null);
  const tabsBarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sentinel = tabsSentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTabsPinned(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: `-${NAVBAR_HEIGHT}px 0px 0px 0px`,
      },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const tabsBar = tabsBarRef.current;
    if (!tabsBar) return;

    const updateHeight = () => setTabsHeight(tabsBar.offsetHeight);
    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(tabsBar);

    window.addEventListener("resize", updateHeight);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  useEffect(() => {
    const updateActiveTab = () => {
      if (isManualTabChangeRef.current) {
        const pendingId = pendingTabRef.current;
        const pendingEl = pendingId ? document.getElementById(pendingId) : null;
        const isAtBottom =
          window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 2;
        const tabsBottom =
          tabsBarRef.current?.getBoundingClientRect().bottom ?? NAVBAR_HEIGHT;

        if (
          (pendingEl && pendingEl.getBoundingClientRect().top <= tabsBottom + 1) ||
          isAtBottom
        ) {
          isManualTabChangeRef.current = false;
          pendingTabRef.current = null;
        } else {
          return;
        }
      }

      let currentSection: (typeof ABOUT_TABS)[number]["id"] = "context";
      let closest = Number.NEGATIVE_INFINITY;
      const tabsBottom =
        tabsBarRef.current?.getBoundingClientRect().bottom ?? NAVBAR_HEIGHT;

      for (const tab of ABOUT_TABS) {
        const section = document.getElementById(tab.id);
        if (!section) continue;

        const distance = section.getBoundingClientRect().top - (tabsBottom + 1);
        if (distance <= 0 && distance > closest) {
          closest = distance;
          currentSection = tab.id;
        }
      }

      const isAtBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      if (isAtBottom) {
        currentSection = ABOUT_TABS[ABOUT_TABS.length - 1].id;
      }

      setActiveTab(currentSection);
    };

    updateActiveTab();
    window.addEventListener("scroll", updateActiveTab, { passive: true });
    window.addEventListener("resize", updateActiveTab);
    return () => {
      window.removeEventListener("scroll", updateActiveTab);
      window.removeEventListener("resize", updateActiveTab);
    };
  }, [tabsHeight]);

  useEffect(() => {
    return () => {
      if (scrollRafRef.current !== null) {
        cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
      }
    };
  }, []);

  const handleTabClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    tabId: (typeof ABOUT_TABS)[number]["id"],
  ) => {
    e.preventDefault();

    // ONLY the clicked tab becomes active
    setActiveTab(tabId);

    // avoid scroll overriding during smooth scroll
    isManualTabChangeRef.current = true;
    stableFramesRef.current = 0;
    pendingTabRef.current = tabId;

    const el = document.getElementById(tabId);
    if (el) {
      const tabsBottom =
        tabsBarRef.current?.getBoundingClientRect().bottom ?? NAVBAR_HEIGHT;
      const top = el.getBoundingClientRect().top + window.scrollY - tabsBottom;
      window.scrollTo({ top, behavior: "smooth" });
    }

    if (scrollRafRef.current !== null) {
      cancelAnimationFrame(scrollRafRef.current);
    }

    const waitForScrollStop = () => {
      const pendingTop = pendingScrollTopRef.current;
      const isAtBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;

      if (
        (pendingTabRef.current &&
          document
            .getElementById(pendingTabRef.current)
            ?.getBoundingClientRect().top <=
            (tabsBarRef.current?.getBoundingClientRect().bottom ??
              NAVBAR_HEIGHT) +
              1) ||
        isAtBottom
      ) {
        isManualTabChangeRef.current = false;
        pendingTabRef.current = null;
        scrollRafRef.current = null;
        return;
      }

      const delta = Math.abs(window.scrollY - lastScrollYRef.current);
      lastScrollYRef.current = window.scrollY;
      if (delta <= 0.5) {
        stableFramesRef.current += 1;
      } else {
        stableFramesRef.current = 0;
      }

      if (stableFramesRef.current >= 8) {
        isManualTabChangeRef.current = false;
        pendingTabRef.current = null;
        scrollRafRef.current = null;
        return;
      }

      scrollRafRef.current = requestAnimationFrame(waitForScrollStop);
    };

    lastScrollYRef.current = window.scrollY;
    scrollRafRef.current = requestAnimationFrame(waitForScrollStop);

    window.setTimeout(() => {
      isManualTabChangeRef.current = false;
      pendingTabRef.current = null;
      if (scrollRafRef.current !== null) {
        cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
      }
    }, 3500);
  };

  return (
    <Layout>
      {/* Hero Section - Banner */}
      <section className="relative w-full overflow-hidden">
        {/* Mobile Background - shown only on screens smaller than md (768px) */}
        <div
          className="block md:hidden w-full relative"
          style={{
            backgroundImage: `url(${heroImageMobile})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "180px",
          }}
        >
          <div className="absolute inset-0 flex items-center bg-black/40">
            <div className="container-custom section-padding w-full">
              <h1 className="text-white font-serif text-2xl font-bold">
                Context
              </h1>
            </div>
          </div>
        </div>

        {/* Desktop Background - shown only on md screens and larger (768px+) */}
        <div
          className="hidden md:block w-full relative"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "180px",
          }}
        >
          <div className="absolute inset-0 flex items-center bg-black/40">
            <div className="container-custom section-padding w-full">
              <h1 className="text-white font-serif text-2xl md:text-3xl lg:text-4xl font-bold">
                Context
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* In-Page Navigation Tabs */}
      <div ref={tabsSentinelRef} className="h-0" aria-hidden />
      <section
        ref={tabsBarRef}
        className={`${
          isTabsPinned ? "fixed inset-x-0 top-[80px] z-40" : "relative"
        } w-full bg-white border-b border-border shadow-sm`}
      >
        <div className="container-custom section-padding py-4 overflow-x-auto">
          <nav
            className="flex min-w-max flex-nowrap gap-3 md:gap-4"
            aria-label="About sections"
          >
            {ABOUT_TABS.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <a
                  key={tab.id}
                  href={tab.href}
                  onClick={(e) => handleTabClick(e, tab.id)}
                  className={[
                    // center alignment inside tab
                    "inline-flex items-center justify-center",
                    // match screenshot-style link classes
                    "text-sm text-primary transition-colors no-underline hover:no-underline",
                    // sizing + spacing (keeps text centered)
                    "h-9 px-3 rounded-md whitespace-nowrap",
                    // highlight only active tab
                    isActive
                      ? "font-semibold bg-primary text-white"
                      : "font-medium",
                    // accessibility/focus
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                  ].join(" ")}
                  aria-current={isActive ? "page" : undefined}
                >
                  {tab.label}
                </a>
              );
            })}
          </nav>
        </div>
      </section>
      {isTabsPinned ? <div aria-hidden style={{ height: tabsHeight }} /> : null}

      {/* Context Section */}
      <section
        id="context"
        className="scroll-mt-44 pt-16 pb-16 md:pb-20 bg-background"
      >
        <div className="container-custom section-padding">
          <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-center">
            {/* Globe image on the left */}
            <div className="flex justify-center md:justify-start">
              <img
                src={globeImage1}
                alt="Globe"
                className="w-full max-w-[300px] h-auto object-contain"
              />
            </div>

            {/* Content on the right */}
            <div>
              <h2
                className="font-serif text-2xl md:text-3xl font-bold text-primary mb-8 animate-fade-in"
                style={{ willChange: "opacity, transform" }}
              >
                Context
              </h2>

              <ol
                className="font-serif text-base text-foreground leading-relaxed animate-fade-in space-y-4 list-decimal list-outside pl-6"
                style={{ willChange: "opacity, transform" }}
              >
                <li>
                  <strong>
                    The world has entered a civilisational transition to a new
                    era
                  </strong>
                  , dismantling the world's political, economic and social
                  architecture in the process
                </li>
                <li>
                  <strong>The transition changes the global flows</strong> of
                  capital, data, energy, climate and people, accelerating
                  fragmentation and exposing vulnerabilities
                </li>
                <li>
                  <strong>A new imperial competition has begun</strong> enabled
                  by traditional military-economic-technological means
                </li>
                <li>
                  <strong>A new form of colonisation is rapidly emerging</strong>{" "}
                  using AI-enabled technology and information platforms - the
                  colonisation of the mind
                </li>
                <li>
                  <strong>
                    America and China have the technology to be colonisers
                  </strong>
                  , and the rest of the world, including their own populations,
                  are set to lose agency
                </li>
                <li>
                  <strong>America's strategy aims at great power and wealth</strong>,
                  deprioritising multilateralism and leadership of the world
                  system
                </li>
                <li>
                  <strong>
                    Finance, economic and trading systems are tools of competition
                  </strong>
                  , allowing for rivals to be weakened and allies to be made to
                  comply
                </li>
                <li>
                  <strong>
                    Delivering national growth and prosperity is the minimum
                    requirement
                  </strong>{" "}
                  for domestic power, but is not sufficient to guarantee it in
                  the face of foreign threats, extreme politics and mass
                  migration
                </li>
                <li>
                  <strong>
                    New strategies are required for national and international
                    security and wealth creation
                  </strong>{" "}
                  leveraging alliances, technology and investment capital flows
                  to forge defences and address shared issues
                </li>
                <li>
                  <strong>
                    The transition, fraught with danger, is also a time of great
                    opportunity
                  </strong>{" "}
                  for power and wealth and for creating a better world that
                  raises
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Distinctiveness Section */}
      <section
        id="distinctiveness"
        className="scroll-mt-44 pt-16 pb-16 md:pb-20 bg-muted"
      >
        <div className="container-custom section-padding">
          <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-center">
            {/* Globe image on the left */}
            <div className="flex justify-center md:justify-start">
              <img
                src={globeImage2}
                alt="Globe"
                className="w-full max-w-[300px] h-auto object-contain"
              />
            </div>

            {/* Content on the right */}
            <div>
              <h2
                className="font-serif text-2xl md:text-3xl font-bold text-primary mb-8 animate-fade-in"
                style={{ willChange: "opacity, transform" }}
              >
                Distinctiveness
              </h2>

              <ul
                className="font-serif text-base text-foreground leading-relaxed animate-fade-in space-y-4 list-disc list-outside pl-6"
                style={{ willChange: "opacity, transform" }}
              >
                <li>
                  <strong>Operates at moments of strategic consequence</strong>,
                  where decisions determine long-term outcomes for nations,
                  institutions, and&nbsp;enterprises
                </li>
                <li>
                  <strong>Provides unusual thinking and ideas</strong> on matters
                  of critical consequence for effective response and and aims at
                  pre-emption
                </li>
                <li>
                  <strong>Integrates intelligence, strategy, and intervention</strong>,
                  creating readiness for execution
                </li>
                <li>
                  <strong>Focuses on system-level transitions</strong>, not
                  discrete policy issues, projects, or sectors
                </li>
                <li>
                  <strong>
                    Supports capital, solution and technology mobilisation
                  </strong>{" "}
                  as strategic instruments, not merely as discrete mechanisms
                </li>
                <li>
                  <strong>
                    Works across sovereign, institutional, and market boundaries
                  </strong>
                  , enabling solutions that no single actor can deliver alone
                </li>
                <li>
                  <strong>Combines long-term foresight with near-term action</strong>,
                  aligning decades-long transitions with immediate decision
                  windows
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ISII's Strategic Intervention Logic Section */}
      <section
        id="strategic-intervention-logic"
        className="scroll-mt-44 pt-16 pb-16 md:pb-20 bg-background"
      >
        <div className="container-custom section-padding">
          <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-center">
            <div className="flex justify-center md:justify-start">
              <img
                src={globeImage3}
                alt="Globe"
                className="w-full max-w-[300px] h-auto object-contain"
              />
            </div>

            <div>
              <h2
                className="font-serif text-2xl md:text-3xl font-bold text-primary mb-8 animate-fade-in"
                style={{ willChange: "opacity, transform" }}
              >
                ISII's Strategic Intervention Logic
              </h2>

              <ul
                className="font-serif text-base text-foreground leading-relaxed animate-fade-in space-y-4 list-disc list-outside pl-6"
                style={{ willChange: "opacity, transform" }}
              >
                <li>
                  <strong>
                    System-level transitions create moments of strategic
                    consequence
                  </strong>{" "}
                  that determine long-term outcomes for nations, institutions,
                  and enterprises
                </li>
                <li>
                  <strong>ISII generates strategic intelligence</strong> to
                  identify these moments and the leverage points within them
                </li>
                <li>
                  <strong>ISII formulates strategies</strong> that align
                  political, economic, technological, and capital dimensions
                </li>
                <li>
                  <strong>ISII executes interventions and programmes</strong>{" "}
                  that form and mobilise allies, capital, and technology across
                  boundaries
                </li>
                <li>
                  <strong>This integrated approach reshapes trajectories</strong>,
                  supporting sovereignty, peace, prosperity, and freedom in the
                  transition to the Information Era
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Arena of Consequential Decisions Section */}
      <section
        id="consequential-decisions"
        className="scroll-mt-44 flex pt-16 pb-16 md:pb-20 bg-[#F2F5F7]"
      >
        <div className="w-1.5 flex-shrink-0 bg-[#F0F8FF]" aria-hidden />
        <div className="flex-1 container-custom section-padding min-w-0">
          <div className="w-full max-w-[1083px] mx-auto mb-12 md:mb-14 space-y-4 text-left">
            <h2 className="font-serif text-[32px] font-bold leading-[1.4] tracking-normal text-primary">
              Arena of Consequential Decisions Facing Leaders
            </h2>
            <p className="font-sans text-xs md:text-sm text-foreground leading-relaxed whitespace-nowrap">
              The most{" "}
              <strong className="font-bold text-foreground">
                consequential decisions
              </strong>{" "}
              of this era now require understanding and operating within a
              complex arena{" "}
              <strong className="font-bold text-foreground">shaped by</strong>{" "}
              the interaction of{" "}
              <strong className="font-bold text-foreground">
                geopolitics, technology, and capital
              </strong>
            </p>
          </div>

          <div className="w-full max-w-[1083px] mx-auto grid grid-cols-1 md:grid-cols-[345px_345px_345px] gap-6 justify-center">
            <div
              className="bg-white flex flex-col w-full md:w-[345px] md:h-[393px] min-w-0 p-6 gap-6 overflow-visible opacity-100"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
            >
              <div className="w-full h-[171px] flex-shrink-0 overflow-hidden">
                <img
                  src={geopoliticsImage}
                  alt="Geopolitics"
                  className="w-full h-full object-cover"
                  width={297}
                  height={171}
                />
              </div>
              <div className="flex flex-col gap-4 min-w-0 flex-none overflow-visible">
                <h3 className="font-sans text-lg font-bold text-primary">
                  Geopolitics
                </h3>
                <p className="font-sans text-[15px] text-foreground leading-[1.35] overflow-visible">
                  The context is being redefined as America's strategy and
                  actions compel rivals, allies, and others to reassess their
                  strategies and assumptions about sovereignty
                </p>
              </div>
            </div>

            <div
              className="bg-white flex flex-col w-full md:w-[345px] md:h-[393px] min-w-0 p-6 gap-6 overflow-visible opacity-100"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
            >
              <div className="w-full h-[171px] flex-shrink-0 overflow-hidden">
                <img
                  src={technologyImage}
                  alt="Technology"
                  className="w-full h-full object-cover"
                  width={297}
                  height={171}
                />
              </div>
              <div className="flex flex-col gap-4 min-w-0 flex-none overflow-visible">
                <h3 className="font-sans text-lg font-bold text-primary">
                  Technology
                </h3>
                <p className="font-sans text-[15px] text-foreground leading-[1.35] overflow-visible">
                  Technology is increasingly assuming a central role in shaping
                  power and wealth, and has become a key determinant of the
                  preservation or erosion of sovereignty
                </p>
              </div>
            </div>

            <div
              className="bg-white flex flex-col w-full md:w-[345px] md:h-[393px] min-w-0 p-6 gap-6 overflow-visible opacity-100"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
            >
              <div className="w-full h-[171px] flex-shrink-0 overflow-hidden">
                <img
                  src={capitalImage}
                  alt="Capital"
                  className="w-full h-full object-cover"
                  width={297}
                  height={171}
                />
              </div>
              <div className="flex flex-col gap-4 min-w-0 flex-none overflow-visible">
                <h3 className="font-sans text-lg font-bold text-primary">
                  Capital
                </h3>
                <p className="font-sans text-[15px] text-foreground leading-[1.35] overflow-visible">
                  Capital allocation, currently deepening economic inequality,
                  is essential to building prosperity today and financing
                  nations' transition to the future era
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Etymology Section */}
      <section
        id="etymology"
        className="scroll-mt-44 pt-16 pb-16 md:pb-20 bg-background"
      >
        <div className="container-custom section-padding">
          <h2
            className="font-serif text-2xl md:text-3xl font-bold text-primary mb-8 animate-fade-in"
            style={{ willChange: "opacity, transform" }}
          >
            On the Name
          </h2>

          <p
            className="font-serif text-base text-foreground leading-relaxed animate-fade-in"
            style={{ willChange: "opacity, transform" }}
          >
            The name <strong>ISII</strong> draws, lightly and intentionally, from the ancient
            Indic idea of the seer (/ˈɪ.si/) - one who perceives emerging reality
            before it becomes obvious. Used metaphorically, it reflects the view
            that strategy begins with clarity of seeing, from which foresight
            flows.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Context;
