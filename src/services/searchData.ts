// Search data service - aggregates all searchable content from the website

export interface SearchResult {
  type: 'article' | 'person' | 'page';
  title: string;
  description?: string;
  url: string;
  metadata?: {
    date?: string;
    category?: string;
    image?: string;
    roleTitle?: string;
  };
  searchableText: string; // Combined text for searching
}

// People data extracted from PersonProfile.tsx
const peopleData = [
  {
    name: "Ketan Patel",
    title: "Chair, Force for Good\nCEO, Greater Pacific Capital\nFormer Head, Strategic Group, Goldman Sachs",
    slug: "ketan-patel",
    category: "Global Transition Architecture",
    biography: "Ketan Patel is the founder and chairman of 'Force for Good', established in support of the UN Secretary General's roadmap for sustainable development, examining and engaging 125 leading global financial institutions and 100 leading technology companies.\n\nKetan co-founded and leads the investment firm, Greater Pacific Capital (GPC), which invests in high growth enterprises making an impact locally and internationally, profitably and sustainably.\n\nKetan was formerly a Managing Director at Goldman Sachs, heading the Strategic Group, providing strategic counsel to governments and businesses worldwide, including the US, EU, China, India and Japan.\n\nPreviously, he was a partner, and board member at KPMG, leading the Strategy and Business Transformation business. Prior to that he worked at Hewlett-Packard.\n\nKetan is a fellow, member of the board of trustees of the World Academy of Art and Science; senior team member of the Human Security for All campaign of WAAS and UN Trust Fund for Human Security; member of the UN SDSN Senior Working Groups for 'European Green Deal, SDGs' and 'Lancet Commission COVID 19 Green Recovery Task Force on Sustainable Finance'; and member of the board of Jane Goodall Legacy Foundation.\n\nHis research work focuses on great power systems and transitions, the changing world order and the shape of the world to come, sustainability, mass inclusion and the eradication of slums.\n\nKetan is the author of 'The Master Strategist' (Random House, 2005), foreword by Nelson Mandela.\n\nHe grew up in London, and studied Economics at the London School of Economics and Political Science, and is an MBA and ACMA. He holds a post-graduate degree in neuroscience from King's College, London.",
  },
  {
    name: "Glenn Gaffney",
    title: "Former Director, Science and Technology, CIA\nEVP, IQT\nFounder NobleReach",
    slug: "glenn-gaffney",
    category: "Tech Security Transition",
    biography: "NobleReach Foundation is a non-profit working at the intersection of government, academia, and industry to tackle the nation's most pressing security challenges by addressing gaps in U.S. tech and talent. NobleReach is a nonprofit foundation bringing the speed and impact of innovation to scale and purpose, fueling economic growth and strengthening national security. We work across academia, industry, and government to connect top talent to emerging opportunities in technology, science, and innovation. Our goal is to inspire a commitment to public service and build a sustainable pipeline of talent and innovation.\n\nGlenn Gaffney joined the NobleReach team in January 2023 when Emerge was spun out from IQT and merged with NobleReach. He was a co-founder of Emerge while serving as an EVP at In-Q-Tel – a strategic investor in ready soon technology benefiting both the US economy and National Security. Mr Gaffney served at IQT from 2017-2022 and cofounded Emerge in 2021.\n\nEmerge's mission is to establish and maintain the connection between government research and industry, providing the network and commercialization expertise needed to take research from the lab into customer's hands. Working with government-funded researchers and early-stage startups, Emerge facilitates catalytic funding, provides commercialization assistance, and helps recruit experienced entrepreneurs to provide exponential growth.\n\nBefore joining the private sector, Mr. Gaffney served US Intelligence Community for 31 years. His government service included senior positions as the Director of Science and Technology for the Central Intelligence Agency, the Deputy Director of National Intelligence for Collection, and the Associate Director of CIA for Talent. Throughout his career he has led new endeavors in tech development, operations, and analysis to address critical national security challenges.",
  },
  {
    name: "Jon Miller",
    title: "CEO of Integrated Media\nFormer Chairman and CEO of AOL\nNewsCorp Online Media Group",
    slug: "jon-miller",
    category: "Media & Technology Transition",
    biography: "Mr Miller is a senior executive and investor at the intersection of technology and media. Positions held include Chairman and CEO of AOL, INC, Chairman and CEO of News Corp Digital Media Group, President and CEO of USA Interactive (now IAC). He has been a partner in venture capital firm Advancit Capital with Viacom/CBS Chairperson Shari Redstone for the past eight years where he has invested in over 100 companies.\n\nJon has served as a Director of a number of public and private companies including the Boards of BBC News Worldwide, RTL Broadcasting, NY Public Radio, Akamai, Nielsen, First Look Media, Expedia, Trip Advisor and the Interpublic Group.\n\nHe was Executive Producer of Live 8, the largest charity event ever produced and an Advisor on a related follow up initiative, Live Earth. Jon is senior media Advisor to Global Citizen and its upcoming Global Live series of events. He is also an Advisor to the Office of the Vice Provost for Advances in Learning at Harvard University having previously served in this capacity with Harvard/MIT joint venture EdX.\n\nJon has been honored as a UJA 'Media Man of the Year' and has also been awarded the Inaugural Pioneer Prize, Producers Guild of America, the Inaugural Vanguard Award, International Emmy Association, the Digital Power Player of the Year, Hollywood Reporter, and the Monaco Media Festival, Interactive Pioneer Award.",
  },
  {
    name: "Garry Jacobs",
    title: "President, CEO, World Academy of Art & Science\nChairman, World University Consortium",
    slug: "garry-jacobs",
    category: "Peace and Social Transition",
    biography: "Garry Jacobs is an American-born international consultant and researcher on business, economy and social development. He is President & Chief Executive Officer of the World Academy of Art & Science (WAAS), a global think tank founded in 1960 addressing global challenges related to governance, security, economy, finance and development. He is also Chairman of the Board & CEO of World University Consortium​ (WUC), established in 2013 to promote a new paradigm in global higher education​; member of Club of Rome; and President of The Mother's Service Society (MSS), a social science research institute in South India.\n\nGarry consulting experience includes assignments for corporations in USA, Europe and Asia on strategies to promote sustainable corporate growth. He is co-author of two acclaimed business books. The Vital Difference: Unleashing the Powers of Sustained Corporate Success, based on studies of major corporations such as Apple, Intel, Coca Cola, Delta Airlines, Dupont, General Mills, Johnson & Johnson, Marriot and Merck. Peter Drucker wrote in a foreword, \"This book is filled with profound insight – indeed wisdom.\" The Vital Corporation: How American Companies Large and Small Double Profits in Two Years or Less, is based on the authors' consulting work & research in over 30 fast-growing.\n\nHis research projects include reports to the UN on Global Leadership in the 21st century (2020), human security (2021), and strategies to promote peace and global development (1994) as well as a program to create 100 million jobs in India in 10 years (1991). His other writings include more than 150 articles on business, economic, finance, education, peace and global governance.",
  },
  {
    name: "Shaurya Doval",
    title: "Co-founder & Director, India Foundation\nSenior Team Member, GPC\nFounder and MD, Torch Investments",
    slug: "shaurya-doval",
    category: "Development Transition",
    biography: "Shaurya Doval co-founded the Delhi-based think tank, the India Foundation, is involved in India's international outreach to key countries including Japan, the US and UAE, and is an investment manager and former banker.\n\nShaurya started India Foundation, a think tank based in New Delhi, in 2009 on his return from London and has been closely associated with the growth of the Foundation over the last decade and a half. As a Director of India Foundation, Shaurya has sought to contribute to the national discourse and policies of a rising India. India Foundation former members include six former members of the India government. Its security and policy work has engaged multiple nations as part of its Indian Ocean Security Conference. Today, Shaurya is actively spearheading the economic policy initiatives of the think tank.\n\nIn addition, Shaurya has worked with Force for Good on their India initiative focused on mass financial inclusion, which is partnered with the World Academy of Art and Science and is in support of the UN Secretary General's roadmap for the Sustainable Development Goals. He is a member of the senior team at Greater Pacific Capital in London, which is an investment firm focused on making a positive impact profitably, backed by global macro research. He is also the founder and Managing Director at Torch Investments, a multi-family office with public and private market strategies, wherein he leads the global investment business out of Singapore.\n\nShaurya has nearly 25 years of international investment banking experience encompassing over a decade in London and New York with the leveraged finance business of GE Capital and the Investment Banking Division of Morgan Stanley. He has also worked in Corporate Finance Advisory at Arthur Andersen in India. He has a BA Economics (Hons) alumnus of the prestigious Hindu College (Delhi University), is a qualified Chartered Accountant from the Institute of Chartered Accountants of India (ICAI), and MBAs from London Business School and Booth School, University of Chicago. He is a recipient of the 'Udyog Ratna Award' in 2012 for his contribution to the growth of the Indian power sector.\n\nShaurya was the Eisenhower Fellow from India for 2015. He was also selected in 2023 by the Japanese Government as part of their 'STEP' program for Ministers and recognized individuals to represent India. He is also one of the 7-member International Advisory Board (IAB) to the Crown Prince of Bahrain. In 2024, Shaurya became a Fellow of the World Academy of Arts and Science (WAAS).",
  },
];

// Static page content - includes full text from all pages
const pageContent = [
  {
    title: "Home",
    description: "Institute for Strategic Intelligence and Intervention (ISII)",
    url: "/",
    content: "ISII Institute for Strategic Intelligence and Intervention aims to understand and support in shaping and responding to system-level transitions, major events, and strategic turning points affecting nations, regions, and global structures. Its mission is to generate the strategic intelligence required for high-stakes decision-making, and to design and execute interventions that stabilise environments, reposition sovereigns, mobilise capital and technology, and enable societies to transition securely and prosperously into the Information Era. Our Capabilities Pivotal Thinking Generating strategic intelligence to understand transitions, shocks, inflection points across geopolitics, technology, economics, climate and society. Strategic Counsel Supporting governments, blocs and institutions as they navigate structural change. Programmes Executing interventions to stabilise environments, mobilise capital and technology, and convert gaps into engines of prosperity.",
  },
  {
    title: "About Us",
    description: "About the Institute for Strategic Intelligence and Intervention",
    url: "/about",
    content: "About Us Our Mission Mission Statement The Institute for Strategic Intelligence and Intervention (ISII) aims to understand and support in shaping and responding to system-level transitions, major events, and strategic turning points affecting nations, regions, and global structures. Its mission is to generate the strategic intelligence required for high-stakes decision-making, and to design and execute interventions that stabilise environments, reposition sovereigns, mobilise capital and technology, and enable societies to transition securely and prosperously into the Information Era. People",
  },
  {
    title: "Mission Statement",
    description: "The Institute for Strategic Intelligence and Intervention (ISII) aims to understand and support in shaping and responding to system-level transitions, major events, and strategic turning points affecting nations, regions, and global structures.",
    url: "/about/mission",
    content: "Our Mission Mission Statement The Institute for Strategic Intelligence and Intervention (ISII) aims to understand and support in shaping and responding to system-level transitions, major events, and strategic turning points affecting nations, regions, and global structures. Its mission is to generate the strategic intelligence required for high-stakes decision-making, and to design and execute interventions that stabilise environments, reposition sovereigns, mobilise capital and technology, and enable societies to transition securely and prosperously into the Information Era. The Institute for Strategic Intelligence and Intervention is an initiative of the F4G Group.",
  },
  {
    title: "People",
    description: "Meet the team at ISII",
    url: "/about/people",
    content: "People",
  },
  {
    title: "Pivotal Thinking",
    description: "Generating strategic intelligence to understand transitions, shocks, and inflection points across geopolitics, technology, economics, climate and society.",
    url: "/capabilities/pivotal-thinking",
    content: "Pivotal Thinking Generating strategic intelligence to understand transitions, shocks, and inflection points across geopolitics, technology, economics, climate and society. Selected Pivotal Thinking",
  },
  {
    title: "Content Library",
    description: "Selected Pivotal Thinking articles and publications",
    url: "/capabilities/pivotal-thinking/content-library",
    content: "Selected Pivotal Thinking",
  },
  {
    title: "Strategic Counsel",
    description: "Supporting governments, blocs and institutions as they navigate structural change.",
    url: "/capabilities/strategic-counsel",
    content: "Strategic Counsel Key Areas of Counsel Growth and prosperity, and capital allocation for global themes. Sovereignty, AI, strategic technologies, and strategic international coalitions. Strategy and mobilisation for the transition to the Information Era. Intractable Problems The Institute draws on its team's unusual thinking and extensive networks to address seemingly intractable problems on a case-by-case basis. Previous issues handled by the team have spanned national security, media, strategy, finance and environment. These tend to address sensitive and mission critical matters.",
  },
  {
    title: "Growth and Prosperity",
    description: "Strategic counsel on growth and prosperity, and capital allocation for global themes.",
    url: "/capabilities/strategic-counsel/growth-and-prosperity",
    content: "Growth and Prosperity Building Growth, Prosperity, and Systems of Enterprise Core question: How does the nation renew its economic engine, broaden prosperity, and create a system of enterprise for prosperity at home and abroad? Focus of strategic counsel: A 100-day plan of 100 initiatives to drive national prosperity, Transition of mass populations to middle-class prosperity, Democratised finance and capital mobilisation, Entrepreneurism and SME development and ecosystems, Modernised industrial and resources strategy, Human, social and environmental capital and security, A World Investment Plan to drive domestic & international growth and prosperity. Why this is imperative: Nations that do not deliver growth and prosperity cannot delivery stability or preserve their freedoms.",
  },
  {
    title: "Securing Sovereignty",
    description: "Strategic counsel on sovereignty, AI, strategic technologies, and strategic international coalitions.",
    url: "/capabilities/strategic-counsel/securing-sovereignty",
    content: "Securing Sovereignty Securing and Advancing Sovereignty Through Offensive and Defensive Strategies Core question: How does the nation protect itself from subordination and build the capabilities and alliances to shape the global order? Focus of strategic counsel: AI sovereignty, retaining autonomy and avoiding cognitive capture, Energy, resource, space, cyber, and critical-infrastructure security, Resilient supply chains and financial sovereignty, The alliance web to defend position, buy scale, and advance national agenda, Leading in foundational technologies and commanding strategic resources and information ecosystems, Building a new multilateralism. Why this is imperative: Sovereignty today is at threat from allies, rivals and technology platforms.",
  },
  {
    title: "Mobilising Transition",
    description: "Strategy and mobilisation for the transition to the Information Era.",
    url: "/capabilities/strategic-counsel/mobilising-transition",
    content: "Mobilising Transition Designing the National Transition Strategy for the Information Era Core question: How does the nation rebuild its systems - technology, energy, infrastructure, finance, institutions - to function and lead in the Information Age? Focus of strategic counsel: Transitioning from industrial to information-era systems, AI and breakthrough technologies strategy (19 core techs), AI strategy for value, growth, and development, Industrial transition for all sectors, Energy, supply chains, and national infrastructure security, Adapting institutions for the transition. Why this is imperative: Each nation stands to lose every political, social and economic power structure and delivery system in transition.",
  },
  {
    title: "Programmes",
    description: "Executing interventions to stabilise environments, mobilise capital and technology, and convert gaps into engines of prosperity.",
    url: "/capabilities/programmes",
    content: "Programmes Prioritised Programmes Mass financial inclusion services, focused on the financial systems layer, and internationalisation of mass inclusion. A.I. enabled growth (development) bank through the roll-up of NBFCs to build a global financial institution through targeted acquisitions and partnerships beginning in India to roll out of mass financial inclusion platforms and solutions. Digital technologies focused on the cognitive systems layer, unlocking human potential through experiences, education, enlightenment. Delivering mass education, experiences and enlightenment to liberate minds and raise human consciousness, the enlightenment of the 21st century combining eastern and western definitions. Pipeline Programmes The National Transition Project: Transitioning the Nation to the Information Era. The Prosperity Initiative: Building Engines of Enterprise, Growth and Share. The National Sovereignty Security Programme: Guarding and Protecting Sovereignty Across All Domains. The World Investment Plan: Creating a Global Investment Boom by Turning Needs into Opportunities via Systems of Enterprise, Growth and Shared Prosperity. Intractable Problems: Tackling Society's Toughest Challenges Requiring Bold, Cross-Sector, System-Level Solutions.",
  },
  {
    title: "Projects and Intervention",
    description: "Experience in projects and interventions across various domains",
    url: "/capabilities/experience",
    content: "Projects and Intervention Projects and Intervention Experience (Selected Areas) Highly sensitive state-level challenges, creating stabilising frameworks across security, governance, climate, and regional systems. Transition architectures, guiding sovereign shifts into the Information Era across major world powers. Sovereign and private capital allocation strategy, mass capital allocation strategies based on thematics. AI and Technology strategy, converting development gaps into profitable, scalable engines of prosperity. Economic and industrial systems, strengthening national competitiveness, productivity, and long-term growth across continents. Human security and societal resilience, reshaping education, inclusion, and workforce adaptation for technological disruption.",
  },
  {
    title: "Privacy Policy",
    description: "Client Privacy Policy for ISII",
    url: "/privacy-policy",
    content: "Client Privacy Policy Last updated: January 15, 2026 Institute for Strategic Intelligence and Intervention (ISII, we or us our) respects your privacy and is committed to protecting your personal data (Your Data). This notice, last updated on January 15, 2026, is to help you understand what data we collect, why we collect it and what we do with Your Data when you instruct us to provide our services to you. It is important that you read this notice together with any other privacy policy we may provide on specific occasions when we are collecting or processing Your Data so that you are fully aware of how and why we are using Your Data. This notice supplements the other notices or policies and is not intended to override them. This notice is not intended for children. We do not collect data relating to children except where it is provided by you in the nature of an instruction with us. Important information about who we are ISII is a controller for the purposes of processing Your Data under your retainer with us and is responsible for all personal data received and held by ISII. We have appointed a Privacy Officer who is responsible for overseeing questions in relation to this notice. If you have any questions about this notice, including any requests to exercise your legal rights, please contact the Privacy Officer using the details set out below. During the provision of our services to you we will retain Your Data to perform the contract. We are required by law to retain specific categories of Your Data for certain periods after you cancel your contract with us and comply at all times with anti-money laundering regulations. Please see our current Data Retention Policy in our Website Privacy Policy. Please note that our Data Retention Policy may be amended from time to time. We will take all reasonable steps to destroy or erase Your Data that we no longer require in accordance with our applicable Data Retention Policy. This includes requiring third parties to delete such data where applicable. Controller The Company is the controller and responsible for Your Data. We have appointed a privacy officer (Privacy Officer) who is responsible for overseeing questions in relation to this policy. If you have any questions about this policy, including any requests to exercise Your legal rights, please contact the Privacy Officer using the details set out below: Full name of legal entity: Greater Pacific Capital LLP Name or title of Privacy Officer: Lesley Whittle Email address: lesley.whittle@forcegood.org Postal address: 38 Wigmore Street, London, W1U 2RU Telephone number: +44 207 535 1690 If you have any queries, concerns or complaints about the use of Your Data by us, please raise them with the Privacy Officer. If this does not resolve the problem to your satisfaction, or, if you prefer to raise the issue with somebody else, then please speak to our client care officer, Gary Varley (Compliance Officer), who will deal with your complaint. You have the right to make a complaint at any time to the Information Commissioner's Office (ICO), the UK supervisory authority for data protection issues (www.ico.org.uk). We would, however, appreciate the chance to deal with your concerns before you approach the ICO so please contact us in the first instance. Changes to the notice and your duty to inform us of the changes This version was last updated on January 15, 2026. It is important that the personal data we hold about you is accurate and current. Please keep us informed if Your Data changes during your relationship with us. The Data We Collect About You Personal data or personal information means any information about an individual from which that person can be identified which includes not only individuals in their personal or private capacity but also directors and owners of bodies corporate. It does not include data where a person's identity has been removed (anonymous data). We may collect, use, store and transfer different kinds of data about you which we have grouped together as follows: Identity Details includes first name, maiden name, last name, username or similar identifier, marital status, title, date of birth and gender. Contact Details includes billing address, home address, email address and telephone numbers. Financial Details includes bank account and payment card details. Matter Details includes any information you provide to us for the Performance of the Contract. For example, the investigation brief, results and related information or any other information concerning circumstance for the Performance of the Contract. Transaction Details includes details about payments to and from you and other details of services you have purchased from us. Marketing and Communications Details includes your preferences in receiving marketing from us and our third parties and your communication preferences. We also collect and use Aggregated Data such as statistical or demographic data for internal purposes. Aggregated Data may be derived from Your Data but is not considered personal data in law as this data does not directly or indirectly reveal your identity. However, if we combine or connect Aggregated Data with Your Data so that it can directly or indirectly identify you, we treat the combined data as personal data which will be used in accordance with this notice. We may be required to collect Special Categories of Your Data (this includes details about your race or ethnicity, religious or philosophical beliefs, sex life, sexual orientation, political opinions, trade union membership, information about your health and genetic and biometric data for example; finger prints) including information about criminal convictions and offences for the provision of our services. This will be in the Performance of a Contract. Unless we are required to collect Special Categories of Your Data for the Performance of a Contract, we will not collect this data without your express consent. If you or any third party fails to provide required data Where we need to collect Your Data (or any other person's data) by reason of our legal obligations or for the Performance of a Contract and that data is not provided when requested, we may not be able to provide our services under our Contract. In this case, we may have to cancel the Contract, but we will notify you if this is the case at the time. How we use your data We will only use Your Data when the law allows us to and in accordance with our obligations to our clients. Most commonly, we will use Your Data in the following circumstances: In anticipation of and in connection with the Performance of the Contract. Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests. Where we need to comply with a legal or regulatory obligation. See Purposes for which we will use your data to find out more about the types of lawful basis that we will rely on to process your personal data. Generally, we do not rely on consent as a legal basis for processing Your Data other than in relation to sending direct marketing communications to you most commonly via email. You have the right to withdraw consent to marketing at any time by using the unsubscribe button in any email communication or emailing the Privacy Officer at lesley.whittle@forcegood.org. Purposes for which we will use your data We set out, in the below table, a description of all the ways we plan to use Your Data, and which of the legal bases we rely on to do so. We have also identified what our legitimate interests are where appropriate. Note that we may process Your Data for more than one lawful ground depending on the specific purpose for which we are using Your Data. Please email lesley.whittle@forcegood.org if you need details about the specific legal ground we are relying on to process Your Data where more than one ground has been set out in the table below. Marketing We strive to provide you with choices regarding certain personal data uses, particularly around marketing and advertising. We have established the following personal data control mechanisms: Promotional offers from us We may use your Identity and Contact Data to form a view on what we think you may want or need, or what may be of interest to you. This is how we decide which products, services and offers may be relevant for you (we call this marketing). We will only do so with your Consent. You will receive marketing communications from us if you have given your Consent for us to use Your Data in this way. You have the right of Opting-Out at any time as described below. Third party marketing We will get your express opt-in consent before we share Your Data with any company outside ISII for marketing purposes. Opting out You can ask us or third parties to stop sending you marketing messages at any time by emailing lesley.whittle@forcegood.org or by clicking on an email unsubscribe link. Where you opt out of receiving these marketing messages, this will not apply to personal data provided to us as a result of a service purchase, warranty registration, product/service experience or other transactions. Cookies You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of our website may become inaccessible or not function properly. Change of Purpose We will only use Your Data for the purposes for which we collected it, unless we reasonably consider that we need to use it for another reason and that reason is compatible with the original purpose. If you wish to get an explanation as to how the processing for the new purpose is compatible with the original purpose, please email lesley.whittle@forcegood.org. If we need to use Your Data for an unrelated purpose, we will notify you and we will explain the legal basis which allows us to do so. Please note that we may process Your Data without your knowledge or consent, in compliance with the above rules, where this is required or permitted by law. Disclosure of Your Data We may have to share Your Data with the parties set out below for the purposes set out in Purposes for which we will use your data above. Information sent using the contact entry forms on the team and contact page of our website are received by partners and staff of ISII and a partner of our affiliated office in Dubai. Internal Third Parties as set out in the Glossary. External Third Parties as set out in the Glossary. Third parties to whom we may choose to sell, transfer, or merge parts of our business or our assets. Alternatively, we may seek to acquire other businesses or merge with them. If a change happens to our business, then the new owners may use Your Data in the same way as set out in this notice. We require all third parties to respect the security of Your Data and to treat it in accordance with the law. We do not allow our third-party service providers to use Your Data for their own purposes and only permit them to process Your Data for specified purposes and in accordance with our instructions. International Transfers We may share Your Data with the Group where necessary in relation to the Performance of the Contract. This will involve transferring Your Data outside the EEA. Some of our external third parties are based outside the EEA so their processing of Your Data will involve a transfer of data outside the EEA. Whenever we transfer Your Data out of the EEA, we ensure a similar degree of protection is afforded to it by ensuring at least one of the following safeguards is implemented: We will only transfer Your Data to countries that have been deemed to provide an adequate level of protection for personal data by the European Commission. Where we use certain service providers, we may use specific contracts approved by the European Commission which give personal data the same protection it has in Europe. Where we use providers based in the US, we may transfer data to them if they are part of the EU-US Privacy Shield Framework which requires them to provide similar protection to personal data shared between the Europe and the US. Please email lesley.whittle@forcegood.org if you would like further information on the specific mechanism used by us when transferring Your Data out of the EEA. Data Security We have put in place appropriate security measures to prevent Your Data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to Your Data to those employees, agents, contractors and other third parties who have a business need to know. They will only process Your Data on our instructions and they are subject to a duty of confidentiality. We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so. Data Retention How long will you use my personal data for? We will only retain Your Data for as long as necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements. To determine the appropriate retention period for Your Data, we consider the amount, nature, and sensitivity of the personal data, the potential risk of harm from unauthorised use or disclosure of Your Data, the purposes for which we process Your Data and whether we can achieve those purposes through other means, and the applicable legal requirements. During the provision of our services to you we will retain Your Data to perform the contract. We are required by law to retain specific categories of Your Data for certain periods after you cancel your contract with us and comply at all times with anti-money laundering regulations. Please see our current Data Retention Policy in our Website Privacy Policy. Please note that our Data Retention Policy may be amended from time to time. We will take all reasonable steps to destroy or erase Your Data that we no longer require in accordance with our applicable Data Retention Policy. This includes requiring third parties to delete such data where applicable. Your Legal Rights In certain circumstances, you have the following rights under data protection laws in relation to Your Data. You have the right to: Request access to Your Data (commonly known as a data subject access request). This enables you to receive a copy of the Your Data we hold about you and to check that we are lawfully processing it. Request correction of the personal data that we hold about you. This enables you to have any incomplete or inaccurate data we hold about you corrected, though we may need to verify the accuracy of the new data you provide to us. Request erasure of Your Data. This enables you to ask us to delete or remove Your Data where there is no good reason for us continuing to process it. You also have the right to ask us to delete or remove Your Data where you have successfully exercised your right to object to processing (see below), where we may have processed your information unlawfully or where we are required to erase Your Data to comply with local law. Note, however, that we may not always be able to comply with your request of erasure for specific legal reasons which will be notified to you, if applicable, at the time of your request. Object to processing of Your Data where we are relying on a legitimate interest (or those of a third party) and there is something about your particular situation which makes you want to object to processing on this ground as you feel it impacts on your fundamental rights and freedoms. You also have the right to object where we are processing Your Data for direct marketing purposes. In some cases, we may demonstrate that we have compelling legitimate grounds to process your information which override your rights and freedoms. Request restriction of processing of Your Data. This enables you to ask us to suspend the processing of Your Data in the following scenarios: if you want us to establish the data's accuracy; where our use of the data is unlawful but you do not want us to erase it; where you need us to hold the data even if we no longer require it as you need it to establish, exercise or defend legal claims; or you have objected to our use of Your Data but we need to verify whether we have overriding legitimate grounds to use it. Request the transfer of Your Data to you or to a third party. We will provide to you, or a third party you have chosen, Your Data in a structured, commonly used, machine-readable format. Note that this right only applies to automated information which you initially provided consent for us to use or where we used the information to perform a contract with you. Withdraw consent at any time where we are relying on consent to process Your Data. However, this will not affect the lawfulness of any processing carried out before you withdraw your consent. If you withdraw your consent, we may not be able to provide certain products or services to you. We will advise you if this is the case at the time you withdraw your consent. If you wish to exercise any of the rights set out above, please email lesley.whittle@forcegood.org. No Fee Usually Required You will not have to pay a fee to access Your Data (or to exercise any of the other rights). However, we may charge a reasonable fee if your request is clearly unfounded, repetitive or excessive. Alternatively, we may refuse to comply with your request in these circumstances. What we may need from you We may need to request specific information from you to help us confirm your identity and ensure your right to access Your Data (or to exercise any of your other rights). This is a security measure to ensure that personal data is not disclosed to any person who has no right to receive it. We may also contact you to ask you for further information in relation to your request to speed up our response. Time Limit to Respond We try to respond to all legitimate requests within one month. Occasionally it may take us longer than a month if your request is particularly complex or you have made a number of requests. In this case, we will notify you and keep you updated. Glossary Lawful bases: Legitimate Interest means the interest of our business in conducting and managing our business to enable us to give you the best service/product and the best and most secure experience. We make sure we consider and balance any potential impact on you (both positive and negative) and your rights before we process Your Data for our legitimate interests. We do not use Your Data for activities where our interests are overridden by the impact on you (unless we have your consent or are otherwise required or permitted to by law). You can obtain further information about how we assess our legitimate interests against any potential impact on you in respect of specific activities by emailing lesley.whittle@forcegood.org. Performance of the Contract means processing Your Data where in connection with our obligations under our contract of retainer to which you are a party or to take steps at your request before entering into such a contract. Comply with a legal or regulatory obligation means processing Your Data where it is necessary for compliance with a legal or regulatory obligation that we are subject to. Consent means processing Your Data where you have given us clear consent to do so for a specific purpose. Third parties: Internal Third Parties means offices of ISII acting as joint controllers or processors and who are based in countries such as India. External Third Parties means service providers acting as processors based in the UK who provide IT and system administration or other services.",
  },
];

// Convert people data to search results
const getPeopleSearchResults = (): SearchResult[] => {
  return peopleData.map((person) => ({
    type: 'person' as const,
    title: person.name,
    description: person.title.replace(/\n/g, ' '),
    url: `/about/people/${person.slug}`,
    metadata: {
      category: person.category,
      roleTitle: person.title.split('\n')[0],
    },
    searchableText: `${person.name} ${person.title} ${person.category} ${person.biography}`.toLowerCase(),
  }));
};

// Convert page content to search results
const getPageSearchResults = (): SearchResult[] => {
  return pageContent.map((page) => ({
    type: 'page' as const,
    title: page.title,
    description: page.description,
    url: page.url,
    searchableText: `${page.title} ${page.description} ${page.content}`.toLowerCase(),
  }));
};

// Article interface for type safety
interface Article {
  title: string;
  date: string;
  pdfUrl: string;
  imageUrl?: string;
}

// Convert articles to search results
export const getArticleSearchResults = (articles: Article[]): SearchResult[] => {
  return articles.map((article) => ({
    type: 'article' as const,
    title: article.title,
    description: article.date,
    url: article.pdfUrl,
    metadata: {
      date: article.date,
      image: article.imageUrl,
    },
    searchableText: `${article.title} ${article.date}`.toLowerCase(),
  }));
};

// Build complete search index
export const buildSearchIndex = (articles: Article[] = []): SearchResult[] => {
  const peopleResults = getPeopleSearchResults();
  const pageResults = getPageSearchResults();
  const articleResults = getArticleSearchResults(articles);
  
  return [...peopleResults, ...pageResults, ...articleResults];
};

// Search function
export const searchContent = (query: string, searchIndex: SearchResult[]): SearchResult[] => {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  for (const item of searchIndex) {
    if (item.searchableText.includes(searchTerm) || 
        item.title.toLowerCase().includes(searchTerm) ||
        (item.description && item.description.toLowerCase().includes(searchTerm))) {
      results.push(item);
    }
  }

  // Sort results by relevance (title matches first, then description, then content)
  results.sort((a, b) => {
    const aTitleMatch = a.title.toLowerCase().includes(searchTerm);
    const bTitleMatch = b.title.toLowerCase().includes(searchTerm);
    
    if (aTitleMatch && !bTitleMatch) return -1;
    if (!aTitleMatch && bTitleMatch) return 1;
    
    const aDescMatch = a.description?.toLowerCase().includes(searchTerm);
    const bDescMatch = b.description?.toLowerCase().includes(searchTerm);
    
    if (aDescMatch && !bDescMatch) return -1;
    if (!aDescMatch && bDescMatch) return 1;
    
    return 0;
  });

  // Return all results without limits
  return results;
};

