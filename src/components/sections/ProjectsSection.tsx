import { motion } from "framer-motion";
import { FolderGit2, ExternalLink, Github } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      title: "DataPulse - AI Powered Log Analyzer",
      description: "AI-powered log analyzer with AI debug assistant to analyze log files and generate automated insights.",
      tech: ["HTML", "CSS", "Java", "Fast API","Spring Boot","Mongo DB","Post Man"],
      github: "https://github.com",
      link: "https://example.com"
    },
    {
      title: "Grow Up - Skill Gap Analyzer",
      description: "Web Application which analyzes your resume and maps the skill with the role selected .Generate an detailed analysis and Give a Roadmap to start your learning from Scratch.",
      tech: ["HTML", "CSS", "JavaScript", "React", "Java","Spring Boot","MongoDB"],
      github: "https://github.com/Vishnuprasathss/career-skill-gap-analyzer",
      link: "https://example.com"
    },
    {
      title: "HealEd - Mental Health Support System",
      description: "AI-powered mental health support platform with personalized therapy recommendations for UG and PG students.",
      tech: ["HTML", "CSS", "Python", "TensorFlow","Django" ,"MongoDB"],
      github: "https://github.com",
      link: "https://example.com"
    },
    {
      title: "Agent Installation Automation tool",
      description: "Automated tool for seamless deployment of monitoring agents across multiple servers.",
      tech: ["Python", "Bash", "Json"],
      github: "https://github.com/Vishnuprasathss/Linux-Agent-Installation-Automation-Tool.git",
      link: "https://github.com/Vishnuprasathss/Linux-Agent-Installation-Automation-Tool.git"
    },
    {
      title: "Tax Calculation Application",
      description: "A Simple tax calculation application built with Java and Spring Boot.",
      tech: ["Java", "Spring Boot", "MySQL"],
      github: "https://github.com"
    },
  ];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start p-4 md:p-8 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-3xl"
      >
        <div className="flex items-center gap-3 mb-8 justify-center">
          <FolderGit2 className="w-6 h-6 text-primary" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            <span className="text-primary/60 font-mono text-2xl">$ </span>ls <span className="gradient-text">projects/</span>
          </h2>
        </div>

        <div className="space-y-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 * index, duration: 0.5 }}
              className="p-5 bg-card border border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-3">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
              <p className="font-mono text-sm text-muted-foreground mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 font-mono text-xs border border-primary/30 text-primary bg-primary/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectsSection;
 