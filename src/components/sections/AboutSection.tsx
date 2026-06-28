import { motion } from "framer-motion";
import { User, MapPin, Download } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const roles = [
  "Linux Developer",
  "Full Stack Developer",
  "Frontend Engineer",
  "Backend Developer",
];

const useTypewriter = (words: string[], typingSpeed = 100, deletingSpeed = 60, pauseDuration = 1800) => {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      // Typing
      const next = currentWord.slice(0, displayText.length + 1);
      setDisplayText(next);
      if (next === currentWord) {
        // Pause before deleting
        setTimeout(() => setIsDeleting(true), pauseDuration);
        return;
      }
    } else {
      // Deleting
      const next = currentWord.slice(0, displayText.length - 1);
      setDisplayText(next);
      if (next === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        return;
      }
    }
  }, [displayText, wordIndex, isDeleting, words, pauseDuration]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, typingSpeed, deletingSpeed]);

  return displayText;
};

const AboutSection = () => {
  const typedRole = useTypewriter(roles);

  const stats = [
    { label: "Years Experience", value: "0" },
    { label: "Projects Completed", value: "5+" },
  ];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start p-4 md:p-8 overflow-y-auto">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <User className="w-6 h-6 text-primary" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            <span className="text-primary/60 font-mono text-2xl">$ </span>whoami
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-4">
          <div className="flex flex-col items-center shrink-0">
            <div className="w-32 h-32 md:w-64 md:h-64 rounded-lg overflow-hidden border-2 border-primary/50 relative group">
              <div className="absolute inset-0 bg-primary/20 group-hover:opacity-0 transition-opacity z-10 mix-blend-overlay" />
              <img 
                src="/VP%20Profile.jpeg" 
                alt="Profile" 
                className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500"
                onError={(e) => {
                  e.currentTarget.src = "/profile.jpg";
                }}
              />
              {/* Active indicator */}
              <div className="absolute bottom-2 right-2 z-20 flex items-center gap-1.5 px-2 py-1 rounded-full bg-background/80 backdrop-blur border border-green-500/40">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="font-mono text-[9px] text-green-400 tracking-wide">Active</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="space-y-1">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Vishnu Prasath S S</h2>
              <h3 className="font-mono text-lg md:text-xl font-bold text-primary h-8 flex items-center">
                <span>{typedRole}</span>
                <span
                  className="inline-block w-[2px] h-5 bg-primary ml-0.5"
                  style={{ animation: "blink 1s step-end infinite" }}
                />
              </h3>
            </div>
            <p className="font-mono text-[10px] md:text-xs text-muted-foreground leading-relaxed">
              Aspiring Full-Stack Developer with a strong foundation in front-end and back-end
technologies. Skilled in JavaScript, Python, and Java, with hands-on experience in
React and Node.js. Passionate about building clean, efficient, and user-focused web
applications, and eager to grow through collaboration and continuous learning.
            </p>
          </div>
        </div>

        {/* Download CV */}
        <div className="flex justify-center mb-6">
          <a
            href="/Vishnu Prasath S S.pdf"
            download
            className="flex items-center gap-2 px-5 py-2.5 bg-primary/10 border border-primary/40 rounded-md font-mono text-xs text-primary hover:bg-primary/20 hover:border-primary/60 transition-all duration-300 group"
          >
            <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            Download CV
          </a>
        </div>

        {/* Location + Stats — all in one row */}
        <div className="flex flex-wrap justify-center items-stretch gap-4">
          <div className="flex items-center gap-2 px-4 py-3 bg-card border border-border hover:border-primary/50 transition-colors">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm text-foreground">Tiruppur, Tamilnadu</span>
          </div>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              className="text-center px-6 py-3 bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <span className="font-display text-xl font-bold gradient-text text-glow">{stat.value}</span>
              <span className="font-mono text-xs text-muted-foreground ml-2">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutSection;
