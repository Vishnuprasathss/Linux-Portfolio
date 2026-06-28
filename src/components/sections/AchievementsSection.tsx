import { motion } from "framer-motion";
import { Trophy, Award, Star } from "lucide-react";

const AchievementsSection = () => {
  const achievements = [
    {
      title: "Winner - Cyber Hackathon 2k26",
      category: "Prize",
      date: "May 2026",
      description: "Won First place out of 30+ teams for building an solution for Security purposes.",
      icon: <Trophy className="w-5 h-5 text-yellow-500" />,
      image: "/achieve 15.jpeg"
    },
    {
      title: "1st RunnerUp - Vibex 1.0 Hackathon",
      category: "Prize",
      date: "Oct 2026",
      description: "Won Second place out of 50+ teams for building an AI-powered accessibility tool.",
      icon: <Trophy className="w-5 h-5 text-yellow-500" />,
      image: "/achieve 5.jpeg"
    },
    {
      title: "Top 5 in 4 hours mini hackathon",
      category: "Participation",
      date: "Aug 2026",
      description: "Particpated in hackathon organized by KGiSL Institute of Technology.",
      icon: <Award className="w-5 h-5 text-primary" />,
      image: "/achieve 16.jpeg"
    },
    {
      title: "Winner in India TechSummit hackathon",
      category: "Hackathon",
      date: "March 2026",
      description: "Selected for round 2 in India's biggest Hackathon conducted by Google Student Ambassador India.",
      icon: <Award className="w-5 h-5 text-primary" />,
      image: "/achieve 3.jpeg"
    },
    {
      title: "Winner in Poster Design Challenge",
      category: "Hackathon",
      date: "Feb 2026",
      description: "Won First place in poster design challenge in Quantum Computing Week.",
      icon: <Award className="w-5 h-5 text-primary" />,
      image: "/achieve 4.jpeg"
    },
    {
      title: "Top 50 in Mega Project Expo",
      category: "Project Expo",
      date: "Nov 2025",
      description:"Got selected to present my project in Mega Project Expo among 500+ projects.",
      icon: <Star className="w-5 h-5 text-purple-500" />,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop"
    }
  ];

  return (
    <div className="relative w-full h-full flex flex-col p-4 md:p-8 overflow-y-auto">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-5xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <Trophy className="w-6 h-6 text-primary" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-wider">
            <span className="text-primary/60 font-mono text-2xl">$ </span>grep <span className="gradient-text">awards</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-card border border-border group overflow-hidden hover:border-primary/50 transition-colors flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden bg-muted">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm border border-border px-3 py-1 flex items-center gap-2 rounded-full">
                  {item.icon}
                  <span className="font-mono text-xs font-bold">{item.category}</span>
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-mono text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {item.title}
                  </h3>
                </div>
                <span className="font-mono text-xs text-primary mb-3 block">
                  {item.date}
                </span>
                <p className="font-mono text-sm text-muted-foreground flex-grow">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AchievementsSection;
