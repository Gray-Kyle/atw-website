// src/static-data/portfolios.ts
export interface PortfolioItem {
  id: number;
  title: string;
  slug: string;
  name?: string;
  backgroundImage: string;
  logoImage: string;
  image: string; // Background image for the portfolio item
  link: string; // Internal portfolio page URL (e.g., /portfolio/ifloorplan)
  featured: boolean;
  createdAt: string; // Start date
  completedAt?: string; // End date (optional)
  client?: string; // Client name
  liveUrl?: string; // External live site URL (e.g., https://ifloorplan.com/)
  description?: string; // Short overview
  shortDescription?: string; // Short description for the portfolio item
  challenge?: string; // Main problem faced
  solutions?: string[]; // How you solved it
  results?: string[]; // Outcome or impact
  technologies?: string[]; // Tech stack
  teamSize?: number; // Number of team members (optional)
}

export const portfolios: PortfolioItem[] = [
  {
    id: 1,
    title: "iFloorPlan",
    slug: "ifloorplan",
    image: "/images/portfolio/iFloorPlan/iFloorPlanBg.avif",
    backgroundImage: "/images/portfolio/iFloorPlan/iFloorPlanLayouts.png",
    logoImage: "/images/portfolio/iFloorPlan/iFloorPlanLogo.png",
    link: "/portfolio/ifloorplan",
    featured: true,
    createdAt: "2024-06-15",
    completedAt: "2024-12-20",
    client: "iFloorPlan Inc.",
    liveUrl: "https://ifloorplan.com/",
    description:
      "Intuitive online platform designed to assist real estate professionals, architects, and homeowners in creating detailed floor plans with ease. The platform offers a user-friendly interface that allows users to design, edit, and share floor plans without the need for specialized software or extensive technical knowledge.",
    shortDescription:
      "Property marketing platform with interactive floor plans and virtual tours",
    challenge:
      "Real estate agents needed an easy way to create and share interactive floor plans without technical expertise.",
    solutions: [
      "User-Friendly Design Tools: An intuitive drag-and-drop interface that simplifies the floor plan creation process.",
      "Accessibility: A web-based platform that eliminates the need for software installation, making it accessible from any device with internet connectivity.​",
      "Cost-Effective Solutions: Affordable pricing models that cater to individuals and businesses of all sizes.​",
      "Collaboration Features: Options to share and collaborate on floor plans, enhancing teamwork and client engagement.",
    ],
    results: [
      "Empowered numerous users to create professional-grade floor plans without prior design experience.​",
      "Reduced the time and resources required for floor plan creation, increasing productivity for real estate professionals and designers.​",
      "Enhanced client presentations and property listings through high-quality visual representations.",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "AWS", "Mapbox"],
    teamSize: 4,
  },
  {
    id: 2,
    title: "SportsBot",
    slug: "sportsbot",
    image: "/images/portfolio/sportsbot/sportsbot_background2.avif",
    backgroundImage: "/images/portfolio/sportsbot/sportsbot_background.png",
    logoImage: "/images/portfolio/sportsbot/sportsbot_logo.png",
    link: "/portfolio/sportsbot",
    featured: false,
    createdAt: "2023-05-01",
    completedAt: "2023-09-15",
    client: "SportsBot LLC",
    liveUrl: "https://sportsbot.io",
    description:
      "Innovative platform designed to revolutionize fan engagement in the sports industry. By leveraging artificial intelligence and chatbot technology, SportsBot.io offers sports organizations a dynamic way to interact with fans, providing real-time updates, personalized content, and interactive experiences across various digital platforms.",
    shortDescription:
      "AI-powered sports analytics and real-time game predictions",
    challenge:
      "Delivering real-time updates and information across multiple platforms, Personalizing content to cater to diverse fan interests, Managing high volumes of fan interactions during peak times",
    solutions: [
      "AI-Powered Chatbots: Automated bots that provide instant responses to fan inquiries, deliver live game updates, and share personalized content.",
      "Multi-Platform Integration: Seamless integration with websites, mobile apps, and social media platforms to ensure consistent fan engagement.",
      "Scalable Infrastructure: Robust backend systems capable of handling large volumes of interactions without compromising performance.",
      "Analytics Dashboard: Insights into fan behavior and engagement metrics to inform content strategies and improve user experiences.",
    ],
    results: [
      "Increased fan retention rates and positive feedback on the interactive experiences offered.",
      "Enhanced fan retention rates and positive feedback on the interactive experiences offered.",
      "Provided valuable data analytics to sports organizations, aiding in strategic decision-making.",
    ],
    technologies: ["React", "Node.js", "WebSocket", "AWS"],
    teamSize: 3,
  },
  {
    id: 3,
    title: "PlayerProps AI",
    slug: "playerprops-ai",
    image: "/images/portfolio/playerprops-ai/PP1.png",
    backgroundImage: "/images/portfolio/playerprops-ai/PP1.png",
    logoImage: "/images/portfolio/playerprops-ai/PPlogo.png",
    link: "/portfolio/playerprops-ai",
    featured: true,
    createdAt: "2024-08-10",
    completedAt: "2025-02-01",
    client: "PlayerProps Inc.",
    liveUrl: "https://playerprops.ai/",
    description:
      "Advanced platform that leverages artificial intelligence to provide users with data-driven insights for player prop betting. By analyzing vast amounts of sports data, the platform aims to assist bettors in making informed decisions, enhancing their betting strategies and potential returns.",
    shortDescription: "Machine learning platform for sports betting analytics",
    challenge:
      "Overwhelming volumes of data to analyze manually, Difficulty in identifying valuable betting opportunities, Lack of real-time insights to inform timely decisions",
    solutions: [
      "AI-Powered Analytics: Utilizing machine learning algorithms to process and interpret complex sports data, identifying trends and patterns that inform betting opportunities.",
      "User-Friendly Interface: An intuitive platform that presents insights in a clear and accessible manner, catering to both novice and experienced bettors.",
      "Real-Time Updates: Providing timely information to help users make informed decisions quickly, adapting to the dynamic nature of sports events.",
      "Personalized Recommendations: Tailoring insights based on user preferences and betting history, enhancing the overall user experience.",
    ],
    results: [
      "Enhanced users' ability to make data-informed betting decisions.",
      "Improved user engagement through interactive and insightful features.",
      "Contributed to more strategic betting approaches among its user base.",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "TensorFlow",
      "Tailwind CSS",
      "MongoDB",
    ],
    teamSize: 5,
  },
  {
    id: 4,
    title: "Roof Quotes",
    slug: "roofquotes",
    image:
      "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=2340&q=80",
    backgroundImage: "/images/portfolio/roofquotes/roofquotes_background.png",
    logoImage: "/images/portfolio/roofquotes/roofquotes_logo.png",
    link: "/portfolio/roofquotes",
    featured: false,
    createdAt: "2024-03-01",
    completedAt: "2024-07-20",
    client: "Roof Quotes LLC",
    liveUrl: "https://roofquotes.com/",
    description:
      "Innovative online platform that streamlines the process of obtaining roofing estimates. By connecting homeowners with a network of vetted local roofing contractors, the platform ensures users receive up to five competitive, contract-ready quotes within 24 hours. This approach eliminates the traditional hassles of sourcing and comparing roofing services.",
    shortDescription:
      "Automated roofing cost estimation and contractor matching",
    challenge:
      "Homeowners often face challenges when seeking roofing services, including:​ Lack of transparency in pricing, Difficulty in finding reputable contractors, Time-consuming processes to gather multiple quotes",
    solutions: [
      "User-Friendly Interface: An intuitive platform where homeowners can input their requirements and receive multiple quotes.",
      "Vetted Contractors: A network of licensed and insured roofing professionals ensures quality and reliability.",
      "Efficient Matching System: Advanced algorithms match homeowners with suitable contractors based on location, project scope, and other criteria.",
      "Comprehensive Support: The platform assists with measurements, permit acquisition, and payment processing, allowing contractors to focus on delivering quality roofing services.",
    ],
    results: [
      "Facilitated thousands of roofing projects across various regions.",
      "Reduced the average time for homeowners to receive multiple quotes from days to hours.",
      "Enhanced customer satisfaction by ensuring transparency and quality in roofing services.",
      "Expanded its services to new markets, including the Chattanooga metro area, enabling more homeowners to find the best local roofers.",
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "AWS"],
    teamSize: 3,
  },
  {
    id: 5,
    title: "Weekmeals",
    slug: "weekmeals",
    image: "/images/portfolio/weekmeals/weekmeals_background2.avif",
    backgroundImage: "/images/portfolio/weekmeals/weekmeals_background.png",
    logoImage: "/images/portfolio/weekmeals/weekmeals_logo.png",
    link: "/portfolio/weekmeals",
    featured: false,
    createdAt: "2024-09-15",
    completedAt: "2025-01-10",
    client: "Bet Karma Co.",
    liveUrl: "https://school.weekmeals.co",
    description:
      "Online educational platform designed to help nutrition coaches grow their businesses. Their flagship course, Blueprint: Getting Clients, offers a step-by-step process to acquire 3–15 paying clients within 14 days, focusing on creating pricing packages for recurring revenue and branded content.",
    shortDescription: "Meal planning and grocery delivery service",
    challenge:
      "Many nutrition coaches struggle with attracting and retaining clients, often lacking structured business strategies and marketing skills. This gap hinders their ability to generate consistent income and grow their practice.​",
    solutions: [
      "Weekmeals School developed a comprehensive, easy-to-follow online course that requires just 30 minutes per day over two weeks.",
      "​Step-by-step video tutorials",
      "Guidance on creating effective pricing packages",
      "Strategies for developing branded content",
      "Personal onboarding support",
    ],
    results: [
      "Over 100 coaches have successfully completed the program, each gaining between 3 to 15 new clients within the 14-day timeframe. The course's efficiency and effectiveness have made it a valuable resource for nutrition professionals seeking to enhance their client base and revenue.",
    ],
    technologies: [
      "React.js",
      "TypeScript",
      "GraphQL",
      "AWS",
      "PostgreSQL",
      "Django",
    ],
    teamSize: 4,
  },
  {
    id: 6,
    title: "WCRA Rodeo",
    slug: "wcra-rodeo",
    image: "/images/portfolio/wcra/wcra_background.png",
    backgroundImage: "/images/portfolio/wcra/wcra_background.png",
    logoImage: "/images/portfolio/wcra/wcra_logo.png",
    link: "/portfolio/wcra-rodeo",
    featured: false,
    createdAt: "2022-11-01",
    completedAt: "2024-03-05",
    client: "World Champions Rodeo Alliance",
    liveUrl: "https://wcrarodeo.com/",
    description:
      "The World Champions Rodeo Alliance (WCRA) is a professional sport and entertainment entity established to develop and advance the sport of rodeo by aligning all levels of competition. Since its inception in May 2018, WCRA and its partners have awarded over $18.2 million to rodeo athletes. The organization produces major events, such as the Women's Rodeo World Championship and Rodeo Corpus Christi, offering substantial payouts and opportunities for competitors.",
    shortDescription:
      "Event management platform for professional rodeo competitions",
    challenge:
      "Traditional rodeo structures often require athletes to travel extensively to sanctioned events, with no guarantee of significant payouts. This model can be financially and physically taxing, limiting opportunities for many competitors.",
    solutions: [
      "WCRA introduced a revolutionary approach by allowing athletes to nominate any approved rodeo event as a qualifier through their Virtual Rodeo Qualifier (VRQ) system. This system enables athletes to earn points based on performance, rather than dollars won, providing a more accessible and equitable pathway to major events. Additionally, WCRA's partnership with PBR and the production of high-payout events have created new earning opportunities for athletes.",
    ],
    results: [
      "Over $18.2 million awarded to athletes since May 2018.",
      "Introduction of major events with substantial payouts, such as the $1 million Kid Rock’s Rock N Rodeo.",
      "Enhanced accessibility for athletes to qualify for major events through the VRQ system.",
    ],
    technologies: ["Next.js", "Tailwind CSS", "Stripe", "PostgreSQL"],
    teamSize: 3,
  },
  {
    id: 10,
    title: "NomadicML",
    slug: "nomadicml",
    image: "/images/portfolio/nomadicml/nomadicml-background.png",
    backgroundImage: "/images/portfolio/nomadicml/nomadicml-background.png",
    logoImage: "/images/portfolio/nomadicml/nomadicml-logo.png",
    link: "/portfolio/nomadicml",
    featured: true,
    createdAt: "2025-03-01",
    completedAt: "2025-08-20",
    client: "NomadicML Inc.",
    liveUrl: "https://www.nomadicml.com/",
    description:
      "Advanced Video AI Agents platform that leverages cutting-edge artificial intelligence to create intelligent video processing solutions. The platform enables automated video analysis, content generation, and interactive video experiences through sophisticated AI agents.",
    shortDescription: "Video AI Agents platform for automated video processing and content generation",
    challenge:
      "Traditional video processing requires extensive manual intervention and lacks intelligent automation capabilities. Businesses need scalable solutions for video content analysis, generation, and interactive experiences.",
    solutions: [
      "AI-Powered Video Agents: Intelligent agents that can analyze, process, and generate video content automatically.",
      "Real-Time Processing: Advanced algorithms that enable real-time video analysis and content generation.",
      "Interactive Video Experiences: AI agents that can create dynamic, personalized video content based on user interactions.",
      "Scalable Architecture: Cloud-based infrastructure that can handle large volumes of video processing requests efficiently.",
    ],
    results: [
      "Enabled businesses to automate video processing workflows, reducing manual effort by 80%.",
      "Improved video content quality and consistency through AI-driven optimization.",
      "Enhanced user engagement through interactive video experiences and personalized content.",
      "Scaled to process thousands of video assets simultaneously with high accuracy and reliability.",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Python",
      "TensorFlow",
      "OpenCV",
      "AWS",
      "Docker",
    ],
    teamSize: 4,
  },
];
