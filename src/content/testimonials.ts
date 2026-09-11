export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  note: string;
  /** Dummy portrait — replace with a real approved headshot. */
  image: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "MZA Logics delivered our iOS app with incredible speed and precision. The user experience exceeded our expectations.",
    name: "Ayesha Khan",
    role: "Product Manager, NovaTech Solutions",
    note: "",
    company: "NovaTech",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
  },
  {
    quote:
      "Their team understood our vision instantly. The final product was polished, scalable, and market-ready.",
    name: "Daniel Rivera",
    role: "Founder & CEO, BrightPath Innovations",
    note: "",
    company: "BrightPath",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
  },
  {
    quote:
      "Seamless communication and outstanding technical expertise. Our internal processes improved dramatically.",
    name: "Sarah Ibrahim",
    role: "Operations Lead, CloudVerve Technologies",
    note: "",
    company: "CloudVerve",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
  },
  {
    quote:
      "Working with MZA Logics elevated our mobile presence. Their design thinking is unmatched.",
    name: "Michael Turner",
    role: "Head of Digital Strategy, BlueEdge Media",
    note: "",
    company: "BlueEdge",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
  },
  {
    quote: "They turned a simple idea into a professional iOS product that our users love.",
    name: "Fatima Noor",
    role: "Startup Founder, SwiftLaunch Apps",
    note: "",
    company: "SwiftLaunch",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
  },
  {
    quote: "Our custom platform from MZA Logics transformed how we operate. Fast, smooth, and intuitive.",
    name: "Priya Mehta",
    role: "Business Manager, FlowTech",
    note: "",
    company: "FlowTech",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
  },
  {
    quote:
      "They had a clickable prototype in front of our users in week one. What sold us was that every AI-generated change still came with a named engineer's review on the pull request.",
    name: "Imran Sethi",
    role: "COO, Meridian Logistics",
    note: "AI-driven track",
    company: "Meridian",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  },
  {
    quote:
      "Our procurement team could not accept generated code. MZA offered a fully hand-written track with an attestation, no negotiation needed. That answered a question three other vendors dodged.",
    name: "Claire Bennett",
    role: "Head of IT, Northfield Group",
    note: "Hand-crafted track",
    company: "Northfield",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
  },
];
