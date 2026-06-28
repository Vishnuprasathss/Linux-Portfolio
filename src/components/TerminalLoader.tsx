import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LinuxBackground from "./LinuxBackground";

interface TerminalLine {
  text: string;
  type: "command" | "output" | "success" | "info" | "ascii";
  delay: number; // ms after previous line
}

const BOOT_SEQUENCE: TerminalLine[] = [
  { text: "GNU GRUB version 2.12", type: "info", delay: 100 },
  { text: "Loading Linux 6.8.0-45-generic ...", type: "info", delay: 180 },
  { text: "Loading initial ramdisk ...", type: "info", delay: 140 },
  { text: "", type: "output", delay: 80 },
  { text: "$ whoami", type: "command", delay: 160 },
  { text: "vishnu", type: "output", delay: 100 },
  { text: "$ hostname", type: "command", delay: 140 },
  { text: "portfolio-server", type: "output", delay: 100 },
  { text: "$ uname -a", type: "command", delay: 140 },
  { text: "Linux portfolio-server 6.8.0-45-generic x86_64 GNU/Linux", type: "output", delay: 120 },
  { text: "", type: "output", delay: 60 },
  { text: "$ systemctl start portfolio.service", type: "command", delay: 180 },
  { text: "[ OK ] Starting React Engine...", type: "success", delay: 150 },
  { text: "[ OK ] Loading 3D environment...", type: "success", delay: 130 },
  { text: "[ OK ] Mounting cube faces...", type: "success", delay: 130 },
  { text: "[ OK ] Initializing skills module...", type: "success", delay: 110 },
  { text: "[ OK ] Compiling projects...", type: "success", delay: 110 },
  { text: "[ OK ] Connecting contact endpoints...", type: "success", delay: 110 },
  { text: "", type: "output", delay: 50 },
  { text: "$ cat /etc/motd", type: "command", delay: 150 },
  { text: "", type: "output", delay: 50 },
  { text: " __     ______  ", type: "ascii", delay: 30 },
  { text: " \\ \\   / /  _ \\ ", type: "ascii", delay: 30 },
  { text: "  \\ \\ / /| |_) |", type: "ascii", delay: 30 },
  { text: "   \\ V / |  __/ ", type: "ascii", delay: 30 },
  { text: "    \\_/  |_|    ", type: "ascii", delay: 30 },
  { text: "", type: "output", delay: 50 },
  { text: "$ ./launch_portfolio.sh", type: "command", delay: 200 },
  { text: "Launching portfolio... ██████████████████ 100%", type: "success", delay: 250 },
  { text: "", type: "output", delay: 80 },
  { text: "[ OK ] Portfolio is live. Welcome!", type: "success", delay: 200 },
];

const TerminalLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [isDone, setIsDone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    let lineIndex = 0;
    let totalDelay = 150; // initial wait

    const showNextLine = () => {
      if (lineIndex >= BOOT_SEQUENCE.length) {
        // All lines shown, wait then fade out
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            setIsDone(true);
            onComplete();
          }, 600);
        }, 300);
        return;
      }

      const line = BOOT_SEQUENCE[lineIndex];
      totalDelay = line.delay;

      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
        lineIndex++;
        showNextLine();
      }, totalDelay);
    };

    showNextLine();
  }, [onComplete]);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [visibleLines]);

  const getLineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "command":
        return "text-green-400";
      case "output":
        return "text-gray-300";
      case "success":
        return "text-emerald-400";
      case "info":
        return "text-gray-500";
      case "ascii":
        return "text-green-500";
    }
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: fadeOut ? 0 : 1 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0a0a0a]/95"
        >
          {/* Live Linux background */}
          <div className="absolute inset-0 z-0">
            <LinuxBackground />
          </div>

          {/* Scanline effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03] z-[1]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)",
            }}
          />

          {/* Terminal window */}
          <div className="w-[90vw] max-w-2xl mx-4 relative z-[2]">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] border border-[#333] border-b-0 rounded-t-lg">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="ml-3 font-mono text-xs text-gray-500">
                vishnu@portfolio-server: ~
              </span>
            </div>

            {/* Terminal body */}
            <div
              ref={terminalRef}
              className="bg-[#0d0d0d] border border-[#333] border-t-0 rounded-b-lg p-4 h-[60vh] max-h-[450px] overflow-y-auto font-mono text-sm leading-relaxed"
            >
              {visibleLines.map((line, i) => (
                <div key={i} className={`${getLineColor(line.type)}`}>
                  {line.text === "" ? (
                    <br />
                  ) : line.type === "command" ? (
                    <span>
                      <span className="text-emerald-600">vishnu@portfolio</span>
                      <span className="text-gray-600">:</span>
                      <span className="text-blue-400">~</span>
                      <span className="text-gray-600">$ </span>
                      <span className="text-gray-200">{line.text.replace("$ ", "")}</span>
                    </span>
                  ) : line.type === "success" ? (
                    <span>
                      {line.text.startsWith("[ OK ]") ? (
                        <>
                          <span className="text-green-500">[</span>
                          <span className="text-green-400 font-bold"> OK </span>
                          <span className="text-green-500">]</span>
                          <span className="text-gray-300">{line.text.replace("[ OK ]", "")}</span>
                        </>
                      ) : (
                        <span>{line.text}</span>
                      )}
                    </span>
                  ) : (
                    <span>{line.text}</span>
                  )}
                </div>
              ))}

              {/* Blinking cursor */}
              {!fadeOut && (
                <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-0.5 align-middle" />
              )}
            </div>
          </div>


        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TerminalLoader;
