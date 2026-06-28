import { motion } from "framer-motion";
import { GraduationCap, Briefcase, School, Container, FolderCode } from "lucide-react";

const ExperienceSection = () => {
  const experiences = [
    {
      title: "Embedded System Engineer Intern",
      company: "Nuclei Technology, Karur",
      period: "Nov 2025 - Feb 2026",
      description: "Currently working on projects related to IoT based Smart Home Automation using Arduino and Raspberry Pi.",
      icon: <FolderCode className="w-5 h-5 text-primary" />
    },
    {
      title: "DevOps Engineer Intern",
      company: "Zoho Corporation",
      period: "July 2025 - August 2025",
      description: "DevOps intern in the server monitoring team. Worked in Site24x7 Agent Development Team.",
      icon: <Container className="w-5 h-5 text-primary" />
    },
    {
      title: "BTech in Information Technology",
      company: "Paavai Engineering College, Namakkal",
      period: "2023 - 2027",
      description: "Currently pursuing Btech in Information Technology with a CGPA of 7.84",
      icon: <GraduationCap className="w-5 h-5 text-primary" />
    },
    {
      title: "Higher Secondary School",
      company: "Shri Ganga Higher Secondary School, Erode",
      period: "2021 - 2023",
      description: "Completed my Computer Science Group in Higher Secondary School with a percentage of 80.33.",
      icon: <School className="w-5 h-5 text-primary" />
    },
    {
      title: "Secondary School",
      company: "Shri Ganga Matriculation School, Erode",
      period: "2020 - 2021",
      description: "Completed my SSLC in Shri Ganga Matriculation School with a percentage of 99.99.",
      icon: <School className="w-5 h-5 text-primary" />
    }
  ];

  return (
    <div className="relative w-full h-full flex flex-col p-4 md:p-8 overflow-y-auto">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <Briefcase className="w-6 h-6 text-primary" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-wider">
            <span className="text-primary/60 font-mono text-2xl">$ </span>history
          </h2>
        </div>

        <div className="relative border-l border-primary/30 ml-4 md:ml-6 space-y-8 pb-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="relative pl-8 md:pl-10"
            >
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              
              <div className="bg-card border border-border p-5 hover:border-primary/50 transition-colors group">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                  <div className="flex items-center gap-2">
                    {exp.icon}
                    <h3 className="font-mono text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {exp.title}
                    </h3>
                  </div>
                  <span className="font-mono text-sm text-primary/80 bg-primary/10 px-3 py-1 rounded-full w-fit whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
                <h4 className="font-mono text-md text-muted-foreground mb-3">
                  {exp.company}
                </h4>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ExperienceSection;
