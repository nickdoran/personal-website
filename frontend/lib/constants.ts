export const SITE = {
    name: "Nick Doran",
    title: "Nick Doran — Builder, Developer, Entrepreneur",
    description:
        "Full-stack developer and founder of Doran Digital. Building software that solves real problems.",
    url: "https://nickdoran.dev",
    github: "https://github.com/nickdoran",
    linkedin: "https://linkedin.com/in/nicklas-doran",
    email: "nickdoran6@gmail.com",
};

export const NAV_LINKS = [
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/#projects" },
    { label: "Experience", href: "/#experience" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/#contact" },
] as const;

export interface Project {
    title: string;
    description: string;
    tech: string[];
    repo?: string;
    live?: string;
    featured: boolean;
}

export const PROJECTS: Project[] = [
    {
        title: "Screenshot to Calendar",
        description:
            "AI-powered tool that extracts event details from screenshots and creates Google Calendar events automatically. Uses OCR and structured data extraction to parse dates, times, and locations from any image.",
        tech: [
            "Python",
            "OpenAI Vision API",
            "Google Calendar API",
            "OAuth 2.0",
            "FastAPI",
        ],
        repo: "https://github.com/nickdoran/screenshot-event",
        featured: true,
    },
    {
        title: "Authentication and Authorization Application",
        description:
            "Full-stack login and signup web page using JWT tokens (access token). Also features password hashing using bcrypt.",
        tech: [
            "Next.js",
            "TypeScript",
            "FastAPI",
            "POSTGRESQL",
            "Tailwind CSS",
        ],
        repo: "https://github.com/nickdoran/login-signup-website",
        featured: true,
    },
];

export interface Experience {
    role: string;
    company: string;
    period: string;
    description: string[];
    current?: boolean;
}

export const EXPERIENCE: Experience[] = [
    {
        role: "Founder",
        company: "Doran Digital",
        period: "2025 — Present",
        description: [
            "Founded a web development agency serving local businesses in the Greater Lansing area",
            "Design, develop, and deploy custom websites optimized for performance and conversions",
            "Manage end-to-end client relationships from discovery to launch and ongoing maintenance",
        ],
        current: true,
    },
    {
        role: "Student",
        company: "Saint Norbert College",
        period: "2024-2025",
        description: [
            "Freshmen who studied computer science the first semester, and business administration the second semester",
            "Part of the Men's Golf Team",
        ],
        current: false,
    },
    {
        role: "Student",
        company: "Michigan State University",
        period: "2025 — Present",
        description: [
            "Sophomore looking to get into the Eli Broad College of Business",
            "Management major with Entrepreneurship & Innovation minor",
            "4.0 GPA",
        ],
        current: true,
    },
];
