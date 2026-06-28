import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ShowcaseItem {
  image: string;
  label: string;
  badge: string;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    image: "/achieve 14.jpeg",
    label: "Deveops Intern at Zoho Corporation",
    badge: " Intern",
  },
  {
    image: "/achieve 1.jpeg",
    label: "Attendee in Kurukshetra'26 at Anna University,Chennai",
    badge: "🎫 Attendee",
  },
  {
    image: "/achieve 2.jpeg",
    label: "Info session about AI usage for 10th and 12 th students - TQI Volunteering",
    badge: "Volunteering",
  },
  {
    image: "/achieve 3.jpeg",
    label: "Hackathon winner — India Tech Summit:innovate 2k26 by GSA",
    badge: "🏅 Winner",
  },
  {
    image: "/achieve 4.jpeg",
    label: "Winner - Poster Design challenge - Quantum Computing week",
    badge: "Winner",
  },
  {
    image: "/achieve 5.jpeg",
    label: "1st Runner Up - Vibex 1.0 Hackathon organised by Google Developer Groups",
    badge: "Runner Up",
  },
  {
    image: "/achieve 6.jpeg",
    label: "Poster Designing winner - Quantum Computing week",
    badge: "🏅 Winner",
  },
  {
    image: "/achieve 7.jpeg",
    label: "Volunteer - Youth Red Cross on Campus",
    badge: "Volunteer",
  },
  {
    image: "/achieve 9.jpeg",
    label: "Volunteer - Vidtyarthi Vigyan Manthan 2025",
    badge: "Volunteer",
  },
  {
    image: "/achieve 11.jpeg",
    label: "Dev Fest 2025 - Google Developer Groups",
    badge: "🎫 Attendee",
  },
  {
    image: "/achieve 10.jpeg",
    label: "Attendee - Devfest 2025 Salem",
    badge: "🎫 Attendee",
  },
  {
    image: "/achieve 13.jpeg",
    label: "Attendee - Microsoft Agentverse Workshop",
    badge: "🎫 Attendee",
  },
  {
    image: "/achieve 12.jpeg",
    label: "Volunteer - International Space Week 2025 Organised by ISRO",
    badge: "Volunteer",
  },
  {
    image: "/achieve 15.jpeg",
    label: "Cyber Hackathon 2K26",
    badge: "Winner",
  },
];

const ImageShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SHOWCASE_ITEMS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const item = SHOWCASE_ITEMS[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-5 px-4">
      {/* Terminal-style header */}
      <div className="font-mono text-xs text-primary/60 tracking-widest uppercase">
        <span className="text-primary/40">$</span> gallery --achievements
      </div>

      {/* Image container */}
      <div className="relative w-full max-w-[280px] aspect-[3/4] rounded-lg overflow-hidden border border-border/60 bg-card/40 backdrop-blur shadow-2xl shadow-primary/5">
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-lg border border-primary/20 z-10 pointer-events-none" />
        <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-b from-primary/10 via-transparent to-primary/5 z-10 pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={item.image}
            alt={item.label}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.08, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* Badge overlay */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`badge-${currentIndex}`}
            className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur border border-primary/30 font-mono text-[10px] text-primary tracking-wide"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {item.badge}
          </motion.div>
        </AnimatePresence>

        {/* Bottom gradient overlay for text readability */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background/90 via-background/40 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Description */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`desc-${currentIndex}`}
          className="text-center max-w-[280px]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <p className="font-mono text-xs text-foreground/90 leading-relaxed">
            {item.label}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="flex gap-2 mt-1">
        {SHOWCASE_ITEMS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-400 ${
              i === currentIndex
                ? "bg-primary w-4"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Show image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageShowcase;
