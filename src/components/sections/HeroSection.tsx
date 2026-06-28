import { motion } from "framer-motion";
import { ChevronRight, Code, Terminal } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="w-full h-1 bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-scan-line" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center pt-8 md:pt-16"
      >


        <div className="flex items-center justify-center gap-3 mb-6">
          <Terminal className="w-6 h-6 text-primary" />
          <span className="font-mono text-sm text-muted-foreground tracking-wider">
            LINUX &amp; FULL STACK DEVELOPER
          </span>
          <Code className="w-6 h-6 text-primary" />
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-bold mb-4 tracking-tight">
          <span className="text-foreground">VISHNU</span>
          <span className="gradient-text text-glow"> PRASATH S S</span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-mono text-lg text-muted-foreground max-w-lg mx-auto mb-8"
        >
          Deploying solutions from kernel to cloud.
          <br />
          Crafting code that runs everywhere.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          <div className="flex items-center gap-2 px-6 py-3 border border-primary bg-primary/10 box-glow hover:bg-primary/20 transition-all duration-300 cursor-pointer group">
            <span className="font-mono text-sm text-primary">./view_work.sh</span>
            <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-primary/50" />
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-primary/50" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-primary/50" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-primary/50" />
    </div>
  );
};

export default HeroSection;
