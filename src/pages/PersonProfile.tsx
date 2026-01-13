import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import NotFound from "./NotFound";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// This should match the people data from People.tsx
const peopleData = [
  {
    name: "Ketan Patel",
    title: "Chair, Force for Good\nCEO, Greater Pacific Capital\nFormer Head, Strategic Group, Goldman Sachs",
    image: "https://res.cloudinary.com/dqataciy5/image/upload/v1768300213/2062_zy5udw.png",
    slug: "ketan-patel",
    category: "Global Transition Architecture",
    drawingOn: [
      "100 leading financial institutions strategies",
      "125 leading technology company strategies"
    ],
    biography: "Ketan Patel is the founder and chairman of 'Force for Good', established in support of the UN Secretary General's roadmap for sustainable development, examining and engaging 125 leading global financial institutions and 100 leading technology companies.\n\nKetan co-founded and leads the investment firm, Greater Pacific Capital (GPC), which invests in high growth enterprises making an impact locally and internationally, profitably and sustainably.\n\nKetan was formerly a Managing Director at Goldman Sachs, heading the Strategic Group, providing strategic counsel to governments and businesses worldwide, including the US, EU, China, India and Japan.\n\nPreviously, he was a partner, and board member at KPMG, leading the Strategy and Business Transformation business. Prior to that he worked at Hewlett-Packard.\n\nKetan is a fellow, member of the board of trustees of the World Academy of Art and Science; senior team member of the Human Security for All campaign of WAAS and UN Trust Fund for Human Security; member of the UN SDSN Senior Working Groups for 'European Green Deal, SDGs' and 'Lancet Commission COVID 19 Green Recovery Task Force on Sustainable Finance'; and member of the board of Jane Goodall Legacy Foundation.\n\nHis research work focuses on great power systems and transitions, the changing world order and the shape of the world to come, sustainability, mass inclusion and the eradication of slums.\n\nKetan is the author of 'The Master Strategist' (Random House, 2005), foreword by Nelson Mandela.\n\nHe grew up in London, and studied Economics at the London School of Economics and Political Science, and is an MBA and ACMA. He holds a post-graduate degree in neuroscience from King's College, London.",
  },
  {
    name: "Glenn Gaffney",
    title: "Former Director, Science and Technology, CIA\nEVP, IQT\nFounder NobleReach",
    image: "https://res.cloudinary.com/dqataciy5/image/upload/v1768293957/Glenn_jogrhw.jpg",
    slug: "glenn-gaffney",
    category: "Tech Security Transition",
    drawingOn: [
      "Major US science and technology labs and experts",
      "International network of science and tech expertise"
    ],
    biography: "NobleReach Foundation is a non-profit working at the intersection of government, academia, and industry to tackle the nation's most pressing security challenges by addressing gaps in U.S. tech and talent. NobleReach is a nonprofit foundation bringing the speed and impact of innovation to scale and purpose, fueling economic growth and strengthening national security. We work across academia, industry, and government to connect top talent to emerging opportunities in technology, science, and innovation. Our goal is to inspire a commitment to public service and build a sustainable pipeline of talent and innovation.\n\nGlenn Gaffney joined the NobleReach team in January 2023 when Emerge was spun out from IQT and merged with NobleReach. He was a co-founder of Emerge while serving as an EVP at In-Q-Tel – a strategic investor in ready soon technology benefiting both the US economy and National Security. Mr Gaffney served at IQT from 2017-2022 and cofounded Emerge in 2021.\n\nEmerge's mission is to establish and maintain the connection between government research and industry, providing the network and commercialization expertise needed to take research from the lab into customer's hands. Working with government-funded researchers and early-stage startups, Emerge facilitates catalytic funding, provides commercialization assistance, and helps recruit experienced entrepreneurs to provide exponential growth.\n\nBefore joining the private sector, Mr. Gaffney served US Intelligence Community for 31 years. His government service included senior positions as the Director of Science and Technology for the Central Intelligence Agency, the Deputy Director of National Intelligence for Collection, and the Associate Director of CIA for Talent. Throughout his career he has led new endeavors in tech development, operations, and analysis to address critical national security challenges.",
  },
  {
    name: "Jon Miller",
    title: "CEO of Integrated Media\nFormer Chairman and CEO of AOL\nNewsCorp Online Media Group",
    image: "https://res.cloudinary.com/dqataciy5/image/upload/v1767874514/image_20_jqhgll.png",
    slug: "jon-miller",
    category: "Media & Technology Transition",
    drawingOn: [
      "Major mass mobilisation platforms",
      "Leading new media platforms"
    ],
    biography: "Mr Miller is a senior executive and investor at the intersection of technology and media. Positions held include Chairman and CEO of AOL, INC, Chairman and CEO of News Corp Digital Media Group, President and CEO of USA Interactive (now IAC). He has been a partner in venture capital firm Advancit Capital with Viacom/CBS Chairperson Shari Redstone for the past eight years where he has invested in over 100 companies.\n\nJon has served as a Director of a number of public and private companies including the Boards of BBC News Worldwide, RTL Broadcasting, NY Public Radio, Akamai, Nielsen, First Look Media, Expedia, Trip Advisor and the Interpublic Group.\n\nHe was Executive Producer of Live 8, the largest charity event ever produced and an Advisor on a related follow up initiative, Live Earth. Jon is senior media Advisor to Global Citizen and its upcoming Global Live series of events. He is also an Advisor to the Office of the Vice Provost for Advances in Learning at Harvard University having previously served in this capacity with Harvard/MIT joint venture EdX.\n\nJon has been honored as a UJA 'Media Man of the Year' and has also been awarded the Inaugural Pioneer Prize, Producers Guild of America, the Inaugural Vanguard Award, International Emmy Association, the Digital Power Player of the Year, Hollywood Reporter, and the Monaco Media Festival, Interactive Pioneer Award.",
  },
  {
    name: "Garry Jacobs",
    title: "President, CEO, World Academy of Art & Science\nChairman, World University Consortium",
    image: "https://res.cloudinary.com/dqataciy5/image/upload/v1768300215/2066_fsynfy.png",
    slug: "garry-jacobs",
    category: "Peace and Social Transition",
    drawingOn: [
      "800 leading scientists and scholars",
      "5 key programmes of peaceful social change"
    ],
    biography: "Garry Jacobs is an American-born international consultant and researcher on business, economy and social development. He is President & Chief Executive Officer of the World Academy of Art & Science (WAAS), a global think tank founded in 1960 addressing global challenges related to governance, security, economy, finance and development. He is also Chairman of the Board & CEO of World University Consortium​ (WUC), established in 2013 to promote a new paradigm in global higher education​; member of Club of Rome; and President of The Mother's Service Society (MSS), a social science research institute in South India.\n\nGarry consulting experience includes assignments for corporations in USA, Europe and Asia on strategies to promote sustainable corporate growth. He is co-author of two acclaimed business books. The Vital Difference: Unleashing the Powers of Sustained Corporate Success, based on studies of major corporations such as Apple, Intel, Coca Cola, Delta Airlines, Dupont, General Mills, Johnson & Johnson, Marriot and Merck. Peter Drucker wrote in a foreword, \"This book is filled with profound insight – indeed wisdom.\" The Vital Corporation: How American Companies Large and Small Double Profits in Two Years or Less, is based on the authors' consulting work & research in over 30 fast-growing.\n\nHis research projects include reports to the UN on Global Leadership in the 21st century (2020), human security (2021), and strategies to promote peace and global development (1994) as well as a program to create 100 million jobs in India in 10 years (1991). His other writings include more than 150 articles on business, economic, finance, education, peace and global governance.",
  },
  {
    name: "Shaurya Doval",
    title: "Co-founder & Director, India Foundation\nSenior Team Member, GPC\nFounder and MD, Torch Investments",
    image: "https://res.cloudinary.com/dqataciy5/image/upload/v1768299980/2065_2_k6cymo.png",
    slug: "shaurya-doval",
    category: "Development Transition",
    drawingOn: [
      "Development and social economics work",
      "Asia and Middle East network"
    ],
    biography: "Shaurya Doval co-founded the Delhi-based think tank, the India Foundation, is involved in India's international outreach to key countries including Japan, the US and UAE, and is an investment manager and former banker.\n\nShaurya started India Foundation, a think tank based in New Delhi, in 2009 on his return from London and has been closely associated with the growth of the Foundation over the last decade and a half. As a Director of India Foundation, Shaurya has sought to contribute to the national discourse and policies of a rising India. India Foundation former members include six former members of the India government. Its security and policy work has engaged multiple nations as part of its Indian Ocean Security Conference. Today, Shaurya is actively spearheading the economic policy initiatives of the think tank.\n\nIn addition, Shaurya has worked with Force for Good on their India initiative focused on mass financial inclusion, which is partnered with the World Academy of Art and Science and is in support of the UN Secretary General's roadmap for the Sustainable Development Goals. He is a member of the senior team at Greater Pacific Capital in London, which is an investment firm focused on making a positive impact profitably, backed by global macro research. He is also the founder and Managing Director at Torch Investments, a multi-family office with public and private market strategies, wherein he leads the global investment business out of Singapore.\n\nShaurya has nearly 25 years of international investment banking experience encompassing over a decade in London and New York with the leveraged finance business of GE Capital and the Investment Banking Division of Morgan Stanley. He has also worked in Corporate Finance Advisory at Arthur Andersen in India. He has a BA Economics (Hons) alumnus of the prestigious Hindu College (Delhi University), is a qualified Chartered Accountant from the Institute of Chartered Accountants of India (ICAI), and MBAs from London Business School and Booth School, University of Chicago. He is a recipient of the 'Udyog Ratna Award' in 2012 for his contribution to the growth of the Indian power sector.\n\nShaurya was the Eisenhower Fellow from India for 2015. He was also selected in 2023 by the Japanese Government as part of their 'STEP' program for Ministers and recognized individuals to represent India. He is also one of the 7-member International Advisory Board (IAB) to the Crown Prince of Bahrain. In 2024, Shaurya became a Fellow of the World Academy of Arts and Science (WAAS).",
  },
];

const PersonProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const person = peopleData.find(p => p.slug === slug);

  if (!person) {
    return <NotFound />;
  }

  // Get other team members (exclude current person)
  const otherMembers = peopleData.filter(p => p.slug !== slug);

  return (
    <Layout>
      <section className="pt-8 md:pt-16 pb-16 min-h-screen" style={{ backgroundColor: '#f4f5f7' }}>
        <div className="container-custom section-padding">
          {/* Back Link */}
          <Link 
            to="/about/people" 
            className="text-primary hover:text-primary/80 mb-8 inline-block transition-colors"
          >
            ← Back to People
          </Link>

          {/* Main Profile Section */}
          <div className="grid md:grid-cols-5 gap-8 md:gap-12 mb-16">
            {/* Large Headshot */}
            <div className="w-full md:col-span-2">
              <div className="aspect-square overflow-hidden bg-muted rounded-lg max-w-sm">
                {person.image ? (
                  <img 
                    src={person.image} 
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <span className="text-muted-foreground/40">No photo available</span>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col md:col-span-3">
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
                {person.name}
              </h1>
              
              <div className="text-xs md:text-sm text-muted-foreground mb-6">
                {person.title.split('\n').map((line, index) => (
                  <p key={index} className={index > 0 ? 'mt-0' : ''}>{line}</p>
                ))}
              </div>

              {/* Biography */}
              {person.biography && (
                <div className="text-sm md:text-base text-foreground leading-relaxed space-y-4">
                  {person.biography.split('\n\n').map((paragraph, index) => (
                    paragraph.trim() && (
                      <p key={index}>{paragraph.trim()}</p>
                    )
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Other Team Members Section */}
          {otherMembers.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">
                Other Members
              </h2>
              
              <div className="flex justify-center items-center">
                <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-6xl">
                  {otherMembers.map((member) => (
                    <Link key={member.slug} to={`/about/people/${member.slug}`} className="block">
                      <div className="flex flex-col items-center text-center w-[200px] cursor-pointer transition-transform duration-300 hover:scale-105">
                        {/* Square Headshot */}
                        <div className="w-full aspect-square mb-4 overflow-hidden bg-muted rounded-lg">
                          {member.image ? (
                            <img 
                              src={member.image} 
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-muted">
                              <span className="text-muted-foreground/40 text-xs">photo</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Name */}
                        <h3 className="font-serif text-lg text-primary font-bold">
                          {member.name}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default PersonProfile;
