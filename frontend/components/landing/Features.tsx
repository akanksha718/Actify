import {
    Brain,
    MapPin,
    Users,
    Bell,
    BarChart3,
    Zap,
    MessageCircle ,
} from "lucide-react";

const features = [
    {
        icon: Brain,
        title: "AI Issue Detection",
        description:
            "Automatically detect potholes, garbage dumps, leaks, and damaged infrastructure.",
    },
    {
        icon: MapPin,
        title: "Real-Time Tracking",
        description:
            "Track reported issues on an interactive city map.",
    },
    {
        icon: Users,
        title: "Community Validation",
        description:
            "Citizens can verify reports and increase reporting accuracy.",
    },
    {
        icon: Zap,
        title: "Fast Resolution",
        description:
            "Automatically prioritize critical civic issues.",
    },
    {
        icon: Bell,
        title: "Smart Notifications",
        description:
            "Receive instant updates whenever issue status changes.",
    },
    {
        icon: BarChart3,
        title: "Analytics Dashboard",
        description:
            "Get insights into recurring civic problems and response times.",
    },
    {
        icon: MessageCircle,
        title: "AI-Powered Chatbot",
        description:"Ask questions about civic issues and get instant responses.",

    },
];

export default function Features() {
    return (
        <section id="features" className="py-10 bg-black">
            <div className="absolute inset-0 ">
                <div className="absolute  left-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
            </div>
            <div className="container mx-auto px-6">
                <div className="text-center">
                    <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-800 to-purple-400 bg-clip-text text-transparent">
                        Powerful Features
                    </h2>

                    <p className="mt-4 text-white">
                        Everything needed to build smarter and safer communities.
                    </p>
                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="rounded-2xl border p-6 shadow-sm transition hover:shadow-lg"
                        >
                            <feature.icon className="h-10 w-10 text-blue-600" />

                            <h3 className="mt-4 text-xl font-semibold text-white">
                                {feature.title}
                            </h3>

                            <p className="mt-2 text-muted-foreground ">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}