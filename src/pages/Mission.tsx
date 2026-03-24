import Layout from "@/components/Layout";

// Cloudinary URLs for banner images - update these with actual image URLs
const heroImage = "https://res.cloudinary.com/dqataciy5/image/upload/v1770372479/Our_Mission_2_ag9sgv.png";
const heroImageMobile = "https://res.cloudinary.com/dqataciy5/image/upload/v1770373042/3_2_ndtwij.png";
const focusGlobeImage = "https://res.cloudinary.com/dqataciy5/image/upload/v1770386526/1925_v7zozq.png";

const Mission = () => {
  return (
    <Layout>
      {/* Hero Section - Banner */}
      <section className="relative w-full overflow-hidden">
        {/* Mobile Background - shown only on screens smaller than md (768px) */}
        <div 
          className="block md:hidden w-full relative"
          style={{ 
            backgroundImage: `url(${heroImageMobile})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '180px'
          }}
        >
          <div className="absolute inset-0 flex items-center bg-black/40">
            <div className="container-custom section-padding w-full">
              <h1 className="text-white font-serif text-2xl font-bold">
                Mission and Purpose
              </h1>
            </div>
          </div>
        </div>
        {/* Desktop Background - shown only on md screens and larger (768px+) */}
        <div 
          className="hidden md:block w-full relative"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '180px'
          }}
        >
          <div className="absolute inset-0 flex items-center bg-black/40">
            <div className="container-custom section-padding w-full">
              <h1 className="text-white font-serif text-2xl md:text-3xl lg:text-4xl font-bold">
                Mission and Purpose
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Purpose */}
      <section className="pt-16 pb-12 md:pb-15 bg-background">
        <div className="container-custom section-padding">
          <h2 className="font-serif text-xl md:text-2xl font-bold text-primary mb-8 animate-fade-in" style={{ willChange: "opacity, transform" }}>
            Mission
          </h2>
          
          <p className="font-serif text-base text-foreground leading-relaxed animate-fade-in" style={{ willChange: "opacity, transform" }}>
            To generate the strategic intelligence and foresight required to understand, anticipate, and respond to system-level transitions, major events, and points of strategic consequence affecting the future of nations, regions, and global institutions and enterprises.
          </p>
          
          <div className="border-t border-gray-300 my-6 md:my-8"></div>
          
          <h2 className="font-serif text-xl md:text-2xl font-bold text-primary mb-6 animate-fade-in" style={{ willChange: "opacity, transform" }}>
            Purpose
          </h2>
          
          <p className="font-serif text-base text-foreground leading-relaxed animate-fade-in mb-4" style={{ willChange: "opacity, transform" }}>
            To enable high-stakes decision-making at moments of strategic consequence through strategic intelligence and intervention planning for
          </p>
          <ul className="font-serif text-base text-foreground leading-relaxed animate-fade-in list-disc list-inside space-y-4" style={{ willChange: "opacity, transform" }}>
            <li>Prosperity and wealth creation and in a time of large-scale disruptive change</li>
            <li>Sovereignty and agency amid geopolitical, technological and economic challenges.</li>
            <li>Systemic change to the information age securing peace, prosperity, and freedom in the transition</li>
          </ul>

          <div className="border-t border-gray-300 my-6 md:my-8"></div>

          <div className="animate-fade-in" style={{ willChange: "opacity, transform" }}>
            <h2 className="font-serif text-xl md:text-2xl font-bold text-primary leading-tight mb-8 animate-fade-in" style={{ willChange: "opacity, transform" }}>
              Intervention strategies for one of the most dangerous and exciting transitions in history
            </h2>

            <div className="grid gap-8 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.45fr)] md:gap-0">
              <div className="relative overflow-hidden md:flex md:min-h-[500px] md:items-center md:justify-start md:pr-10 lg:pr-12">
                <div className="absolute inset-y-0 left-0 z-0 w-[96%] overflow-hidden pointer-events-none">
                  <img
                    src={focusGlobeImage}
                    alt=""
                    className="absolute left-[6%] top-1/2 h-[150%] max-w-none -translate-y-1/2 object-contain opacity-[0.05] md:left-[2%] md:h-[158%] lg:left-[0%] lg:h-[164%]"
                  />
                </div>

                <div className="relative z-10 flex w-full max-w-[360px] items-start py-2">
                  <div className="mt-1 mr-5 h-[340px] w-[2px] flex-shrink-0 bg-primary md:mr-6" />
                  <div>
                    <p className="font-serif text-xl md:text-2xl font-bold text-primary mb-2 animate-fade-in" style={{ willChange: "opacity, transform" }}>
                      ISII&apos;s Focus
                    </p>
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-primary leading-tight mb-4 animate-fade-in" style={{ willChange: "opacity, transform" }}>
                      Securing Human Agency and Sovereignty in the Information Era
                    </h3>
                    <p className="font-serif text-base text-foreground leading-relaxed animate-fade-in" style={{ willChange: "opacity, transform" }}>
                      To secure the capacity of human beings, individually and collectively, to make free, informed, and consequential choices about their own lives, societies, and futures.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-primary/20 pt-8 md:border-t-0 md:border-l-[3px] md:border-primary md:pl-10 lg:pl-12 md:pt-0">
                <div className="space-y-8 md:space-y-10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-primary mb-3 animate-fade-in" style={{ willChange: "opacity, transform" }}>
                      The Challenge
                    </h3>
                    <p className="font-serif text-base text-foreground leading-relaxed animate-fade-in" style={{ willChange: "opacity, transform" }}>
                      Power is being redistributed through the capture of economic systems, cognitive infrastructure, and the rules that govern the new era - not only through military force.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-primary mb-3 animate-fade-in" style={{ willChange: "opacity, transform" }}>
                      The Stakes
                    </h3>
                    <p className="font-serif text-base text-foreground leading-relaxed animate-fade-in" style={{ willChange: "opacity, transform" }}>
                      Where human agency erodes - through failure to deliver prosperity, loss of sovereignty to foreign capture, or lagging in technological transition - nations lose the capacity to govern, corporations to compete, and individuals to choose.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-primary mb-4 animate-fade-in" style={{ willChange: "opacity, transform" }}>
                      The Three Levels
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="mt-[0.6rem] h-2.5 w-2.5 flex-shrink-0 bg-primary" />
                        <p className="font-serif text-base text-foreground leading-relaxed animate-fade-in" style={{ willChange: "opacity, transform" }}>
                          <span className="font-bold">Nations</span> - to deliver prosperity, defend sovereignty, and lead their own transition
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-[0.6rem] h-2.5 w-2.5 flex-shrink-0 bg-primary" />
                        <p className="font-serif text-base text-foreground leading-relaxed animate-fade-in" style={{ willChange: "opacity, transform" }}>
                          <span className="font-bold">Corporations</span> - to compete and create value without capture by monopolies or rivals
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-[0.6rem] h-2.5 w-2.5 flex-shrink-0 bg-primary" />
                        <p className="font-serif text-base text-foreground leading-relaxed animate-fade-in" style={{ willChange: "opacity, transform" }}>
                          <span className="font-bold">Individuals</span> - to make free choices and live with dignity
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Mission;
