import { motion } from "framer-motion";
import { Cpu, Database, Cloud, Palette, AppWindowMacIcon, SendToBack, BotMessageSquare } from "lucide-react";

const SkillsSection = () => {
  const skillCategories = [
    {
      icon: Palette,
      title: "Frontend",
      skills: ["React", "Tailwind CSS", "HTML", "CSS", "JavaScript"],
    },
    {
      icon: AppWindowMacIcon,
      title: "UI / UX",
      skills: ["Figma", "Canva", "Adobe XD", "Adobe Illustrator"],
    },
    {
      icon: SendToBack,
      title: "Backend",
      skills: ["Node.js", "Python", "Java", "Django"],
    },
    {
      icon: Database,
      title: "Database",
      skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
    },
    {
      icon: Cloud,
      title: "Networking",
      skills: ["TCP/IP", "DNS", "HTTP/HTTPS", "REST APIs"],
    },
    {
      icon: Cpu,
      title: "App Development",
      skills: ["Flutter", "Android Studio"],
    },
    {
      icon: BotMessageSquare,
      title: "AI Tools",
      skills: ["Antigravity", "Claude", "Open AI", "Gemini", "Firebase"],
    },
  ];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start p-4 md:p-8 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-3xl"
      >
        <div className="flex items-center gap-3 mb-6 justify-center">
          <Cpu className="w-6 h-6 text-primary" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            <span className="text-primary/60 font-mono text-2xl">$ </span>cat <span className="gradient-text">skills</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="p-4 bg-card border border-border hover:border-primary/50 transition-all duration-300 group flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 border border-primary/30 group-hover:box-glow transition-all">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 font-mono text-[10px] md:text-xs bg-secondary border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-4 w-px h-32 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-1/4 right-4 w-px h-32 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
    </div>
  );
};

export default SkillsSection;
