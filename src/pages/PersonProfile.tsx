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
    title: "Chair, Force for Good; CEO, Greater Pacific Capital; Former Head, Strategic Group, Goldman Sachs",
    image: "https://res.cloudinary.com/dqataciy5/image/upload/v1767874523/image_17_ib3vam.png",
    slug: "ketan-patel",
    category: "Global Transition Architecture",
    drawingOn: [
      "100 leading financial institutions strategies",
      "125 leading technology company strategies"
    ],
    biography: "Ketan Patel is Chair of Force for Good and CEO of Greater Pacific Capital. He previously served as Head of the Strategic Group at Goldman Sachs. With extensive experience in financial institutions and technology companies, he brings deep insights into global transition architecture and strategic planning.",
  },
  {
    name: "Glenn Gaffney",
    title: "Former Director, Science and Technology, CIA; EVP, IQT; Founder NobleReach",
    image: "https://res.cloudinary.com/dqataciy5/image/upload/v1767874514/image_18_a1swd8.png",
    slug: "glenn-gaffney",
    category: "Tech Security Transition",
    drawingOn: [
      "Major US science and technology labs and experts",
      "International network of science and tech expertise"
    ],
    biography: "Glenn Gaffney is the former Director of Science and Technology at the CIA and served as Executive Vice President at IQT. He is the founder of NobleReach, leveraging his expertise in technology security and intelligence to drive innovation in national security and technology transition.",
  },
  {
    name: "Jon Miller",
    title: "CEO of Integrated Media, Former Chairman and CEO of AOL; NewsCorp Online Media Group",
    image: "https://res.cloudinary.com/dqataciy5/image/upload/v1767874514/image_20_jqhgll.png",
    slug: "jon-miller",
    category: "Media & Technology Transition",
    drawingOn: [
      "Major mass mobilisation platforms",
      "Leading new media platforms"
    ],
    biography: "Jon Miller is CEO of Integrated Media and previously served as Chairman and CEO of AOL and led NewsCorp's Online Media Group. He has extensive experience in media transformation and digital platforms, driving innovation in how information and content are distributed and consumed globally.",
  },
  {
    name: "Garry Jacobs",
    title: "President, CEO, World Academy of Art & Science; Chairman, World University Consortium",
    image: "https://res.cloudinary.com/dqataciy5/image/upload/v1767874515/image_23_vvib3c.png",
    slug: "garry-jacobs",
    category: "Peace and Social Transition",
    drawingOn: [
      "800 leading scientists and scholars",
      "5 key programmes of peaceful social change"
    ],
    biography: "Garry Jacobs is President and CEO of the World Academy of Art & Science and Chairman of the World University Consortium. He brings together leading scientists and scholars from around the world to address critical challenges in peace, social transition, and human development through collaborative research and policy initiatives.",
  },
  {
    name: "Shaurya Doval",
    title: "Founder India Foundation, Zeus Capital, Morgan Stanley, GE",
    image: "https://res.cloudinary.com/dqataciy5/image/upload/v1767874516/image_26_b0ilzr.png",
    slug: "shaurya-doval",
    category: "Development Transition",
    drawingOn: [
      "Development and social economics work",
      "Asia and Middle East network"
    ],
    biography: "Shaurya Doval is the founder of India Foundation and has extensive experience with Zeus Capital, Morgan Stanley, and GE. He focuses on development and social economics, leveraging his network across Asia and the Middle East to drive economic growth and social progress in developing regions.",
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
      <section className="py-16 bg-white min-h-screen">
        <div className="container-custom section-padding">
          {/* Back Link */}
          <Link 
            to="/about/people" 
            className="text-primary hover:text-primary/80 mb-8 inline-block transition-colors"
          >
            ← Back to People
          </Link>

          {/* Main Profile Section */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
            {/* Large Headshot */}
            <div className="w-full">
              <div className="aspect-square overflow-hidden bg-muted rounded-lg">
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
            <div className="flex flex-col">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
                {person.name}
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-6">
                {person.title}
              </p>

              {/* Biography */}
              {person.biography && (
                <div className="text-base md:text-lg text-foreground leading-relaxed space-y-4">
                  <p>{person.biography}</p>
                </div>
              )}
            </div>
          </div>

          {/* Other Team Members Section */}
          {otherMembers.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">
                Other Team Members
              </h2>
              
              <div className="relative px-8 md:px-12">
                <Carousel
                  opts={{
                    align: "start",
                    loop: false,
                  }}
                  className="w-full"
                >
                  <CarouselPrevious className="left-0 bg-primary text-white border-primary hover:bg-primary/90" />
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {otherMembers.map((member) => (
                      <CarouselItem key={member.slug} className="pl-2 md:pl-4 basis-auto">
                        <Link to={`/about/people/${member.slug}`} className="block">
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
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselNext className="right-0 bg-primary text-white border-primary hover:bg-primary/90" />
                </Carousel>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default PersonProfile;
