import { cn } from "@/lib/utils";
import { Marquee } from "../ui/marquee";

const reviews = [
  {
    name: "Rohit Singh",
    username: "Software Engineer",
    body: "The resume feedback felt personalized and relevant to my job role. It’s a great tool for freshers and working professionals.",
    img: "https://media.istockphoto.com/id/543653998/photo/thumbs-up.jpg?s=2048x2048&w=is&k=20&c=c012xQqclOoifYZeFHyGPUURdSUV4Sr7TXII9eQI6S8=",
  },
  {
    name: "Neha Verma",
    username: "HR Executive",
    body: "I found the resume analysis very accurate from a recruiter’s perspective. It highlights strengths clearly and improves weak areas.",
    img: "https://images.unsplash.com/photo-1696960181436-1b6d9576354e?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Amit Sharma",
    username: "Frontend Developer",
    body: "This platform helped me improve my resume clarity and structure. The AI suggestions were practical and easy to apply.",
    img: "https://media.istockphoto.com/id/1397127604/photo/asian-businessman-portrait-looking-at-camera-smiling-and-laughing.jpg?s=2048x2048&w=is&k=20&c=rACBrsu0PEDmrgQDpMAfohfJN7cFVHkpIBwl9qF0lCY=",
  },
  {
    name: "Priya Mehta",
    username: "Data Analyst",
    body: "The insights helped me tailor my resume for analytics roles. It clearly pointed out missing skills and improved keyword relevance.",
    img: "https://images.unsplash.com/photo-1634316887741-93ff860c6854?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Rahul Kapoor",
    username: "Product Manager",
    body: "The AI-driven suggestions made my resume more impact-focused. It helped me highlight achievements instead of just responsibilities.",
    img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=880&auto=format&fit=crop",
  },
];

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative p-4 border rounded-xl w-64 h-full overflow-hidden cursor-pointer",
        // light styles
        "border-gray-950/10 bg-card/10 hover:bg-gray-950/5",
        // dark styles
        "dark:border-gray-50/10 dark:bg-card/70 dark:hover:bg-gray-50/8"
      )}
    >
      <blockquote className="mb-6 text-sm">"{body}"</blockquote>
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="font-medium dark:text-white text-sm">{name}</figcaption>
          <p className="font-medium dark:text-white/40 text-xs">{username}</p>
        </div>
      </div>
    </figure>
  );
};

export default function Testimonials() {
  return (
    <div className="relative flex flex-col justify-center items-center mx-auto my-10 max-w-7xl overflow-hidden">
      <h2 className="mb-4 font-plusJakartaSans font-black text-3xl md:text-5xl tracking-tighter">
        What Our User <span className="text-primary">Say</span>
      </h2>
      <Marquee pauseOnHover className="[--duration:30s]">
        {reviews.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="left-0 absolute inset-y-0 bg-linear-to-r from-background w-1/4 pointer-events-none"></div>
      <div className="right-0 absolute inset-y-0 bg-linear-to-l from-background w-1/4 pointer-events-none"></div>
    </div>
  );
}
