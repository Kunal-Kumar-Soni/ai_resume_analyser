import Image from "next/image";

import { cn } from "@/lib/utils";

import { Marquee } from "../ui/marquee";

const reviews = [
  {
    name: "Rohit Singh",
    username: "Software Engineer",
    body: "The resume feedback felt personalized and well matched to my job role. The suggestions were clear, practical, and useful for improving my resume.",
    img: "https://media.istockphoto.com/id/543653998/photo/thumbs-up.jpg?s=2048x2048&w=is&k=20&c=c012xQqclOoifYZeFHyGPUURdSUV4Sr7TXII9eQI6S8=",
  },

  {
    name: "Neha Verma",
    username: "HR Executive",
    body: "From a recruiter’s perspective, the resume analysis felt accurate and relevant. It highlighted strengths clearly and pointed out common gaps that candidates often miss.",
    img: "https://images.unsplash.com/photo-1696960181436-1b6d9576354e?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    name: "Amit Sharma",
    username: "Frontend Developer",
    body: "This platform helped improve my resume structure and overall clarity. The AI suggestions were practical, easy to follow, and didn’t feel generic or overcomplicated.",
    img: "https://media.istockphoto.com/id/1397127604/photo/asian-businessman-portrait-looking-at-camera-smiling-and-laughing.jpg?s=2048x2048&w=is&k=20&c=rACBrsu0PEDmrgQDpMAfohfJN7cFVHkpIBwl9qF0lCY=",
  },
  {
    name: "Priya Mehta",
    username: "Data Analyst",
    body: "The insights helped me tailor my resume for analytics roles. It pointed out missing skills and improved keyword usage, which made the resume more relevant.",
    img: "https://images.unsplash.com/photo-1634316887741-93ff860c6854?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    name: "Rahul Kapoor",
    username: "Product Manager",
    body: "The AI suggestions helped me focus more on impact and achievements. It improved how my responsibilities were presented and made the resume stronger overall.",
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
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "bg-card/10 border-gray-950/10 hover:bg-gray-950/5",
        // dark styles
        "dark:bg-card/70 dark:border-gray-50/10 dark:hover:bg-gray-50/8",
      )}
    >
      <blockquote className="mb-6 text-sm">&quot;{body}&quot;</blockquote>
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          width="32"
          height="32"
          alt=""
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
    </figure>
  );
};

export default function Testimonials() {
  return (
    <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center overflow-hidden">
      <h2 className="font-plusJakartaSans mb-15 text-3xl font-black tracking-tighter md:text-5xl">
        What Our User <span className="text-primary">Say</span>
      </h2>
      <Marquee pauseOnHover className="[--duration:30s]">
        {reviews.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
    </div>
  );
}
