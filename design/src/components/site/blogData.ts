export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  cover: string;
  content: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "buying-residential-plot-gurgaon-2025",
    title: "Buying a Residential Plot in Gurgaon: 2025 Buyer's Guide",
    excerpt:
      "Sectors, price trends, RERA checks and what to verify before booking â€” a practical playbook for first-time plot buyers in Gurgaon.",
    category: "Buying Guide",
    date: "May 8, 2026",
    readTime: "6 min read",
    author: "Rohit Singh",
    cover:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
    content: [
      "Gurgaon's plotted residential market has matured rapidly. With new sectors opening along the Dwarka Expressway and SPR, buyers now have more options than ever â€” but also more noise to filter through.",
      "Start with the basics: confirm the RERA registration number, ask for the title chain, and verify whether the colony is licensed by DTCP Haryana. A clean title and DTCP licence are non-negotiable.",
      "Next, walk the plot. Look at the road width, drainage, and how close the nearest sector road is. A plot that looks great on paper can feel very different on-site.",
      "Finally, plan for total cost â€” registry, stamp duty, EDC/IDC, and boundary wall â€” not just the listed price. Most first-time buyers under-estimate the cost of construction-ready handover by 8â€“12%.",
    ],
  },
  {
    slug: "sohna-vs-jhajjar-where-to-invest",
    title: "Sohna vs Jhajjar: Where Should You Invest in 2026?",
    excerpt:
      "Both micro-markets are heating up. We compare connectivity, price points, and the kind of buyer each one suits best.",
    category: "Market Insights",
    date: "Apr 22, 2026",
    readTime: "5 min read",
    author: "Rohit Singh",
    cover:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80",
    content: [
      "Sohna sits along the KMP Expressway and the upcoming Sohna Elevated Corridor â€” making it a 25-minute drive to Golf Course Extension. That proximity drives premium pricing.",
      "Jhajjar, on the other hand, is the budget-friendly play. Plots are 30â€“45% cheaper, with strong upside as the AIIMS-2 corridor and KMP industrial belt continue to scale.",
      "If you're an end-user planning to build within 2 years, Sohna usually wins. If you're a long-horizon investor with a 5â€“7 year view, Jhajjar offers better entry pricing.",
    ],
  },
  {
    slug: "rera-checklist-before-booking-plot",
    title: "The RERA Checklist Every Plot Buyer Should Run",
    excerpt:
      "Seven checks you can do in 30 minutes that will save you from the most common plot-buying mistakes.",
    category: "Legal & RERA",
    date: "Mar 14, 2026",
    readTime: "4 min read",
    author: "Rohit Singh",
    cover:
      "https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=1600&q=80",
    content: [
      "RERA was introduced to protect plot and apartment buyers from misrepresentation. But the protections only kick in if you actually verify the listing.",
      "Start at haryanarera.gov.in. Search by project name and confirm the registration number on the listing matches the official record.",
      "Check the approved layout plan. The plot number, dimensions, and orientation should match what the seller is showing you. Any deviation is a red flag.",
      "Finally, ask for the latest quarterly progress report filed with RERA. It tells you the developer's actual delivery track record â€” not just marketing claims.",
    ],
  },
  {
    slug: "plot-loan-vs-home-loan-explained",
    title: "Plot Loan vs Home Loan: Which One Do You Actually Need?",
    excerpt:
      "Interest rates, tenure, tax benefits and LTV â€” the practical differences buyers should know before applying.",
    category: "Finance",
    date: "Feb 26, 2026",
    readTime: "5 min read",
    author: "Rohit Singh",
    cover:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80",
    content: [
      "A plot loan funds the land purchase only. A home loan funds construction on land you already own â€” or a ready-to-move home.",
      "Plot loans typically have 0.25â€“0.50% higher interest, shorter tenure (15â€“20 years), and a lower LTV cap (70â€“75%). You'll need to bring more money to the table.",
      "If you plan to construct within 2â€“3 years, a composite loan (plot + construction) gives you the tax benefits of a home loan plus a single EMI.",
    ],
  },
  {
    slug: "questions-to-ask-before-site-visit",
    title: "10 Questions to Ask Before Your First Plot Site Visit",
    excerpt:
      "Skip the small talk. These ten questions will tell you in 15 minutes whether a plot is worth pursuing.",
    category: "Buying Guide",
    date: "Jan 30, 2026",
    readTime: "4 min read",
    author: "Rohit Singh",
    cover:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80",
    content: [
      "Walking a site without a plan is how buyers get oversold. Show up with a written list of questions and tick them off one by one.",
      "Ask about the title chain, the RERA number, EDC/IDC payment status, and the registered sale-deed timeline. If the seller hesitates on any of these, walk away.",
      "Then ask the practical questions: Is the boundary marked? Where is the nearest paved approach road? When is the next price revision?",
    ],
  },
  {
    slug: "why-corner-and-park-facing-plots-cost-more",
    title: "Why Corner and Park-Facing Plots Cost More (and When They're Worth It)",
    excerpt:
      "Premiums explained â€” when paying extra makes financial sense and when it's purely emotional.",
    category: "Market Insights",
    date: "Jan 12, 2026",
    readTime: "3 min read",
    author: "Rohit Singh",
    cover:
      "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1600&q=80",
    content: [
      "Corner plots typically command a 8â€“12% premium because they offer two open sides, better ventilation, and more flexible facade design.",
      "Park-facing plots add another 5â€“10% on top â€” the open green view and lower neighbour density genuinely affect resale value.",
      "If you're building to live in long-term, the premium usually pays itself back. If you're flipping in 2â€“3 years, the math is tighter.",
    ],
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
