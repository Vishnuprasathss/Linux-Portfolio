import { useEffect, useState, useRef } from "react";

// Pool of realistic Linux terminal commands & kernel messages
const LINUX_LINES = [
  "$ sudo systemctl start nginx",
  "$ grep -r 'TODO' ./src",
  "$ docker ps --format '{{.Names}}'",
  "$ cat /proc/cpuinfo | head -5",
  "$ chmod +x deploy.sh",
  "$ ssh user@192.168.1.42",
  "[ OK ] Started GNOME Display Manager",
  "$ git log --oneline -5",
  "$ df -h /dev/sda1",
  "$ top -bn1 | head -3",
  "$ uname -a",
  "Linux kernel 6.8.0-45-generic",
  "$ ls -la /etc/nginx/",
  "$ journalctl -u sshd --no-pager",
  "$ curl -s https://api.github.com",
  "$ awk '{print $1}' access.log | sort | uniq -c",
  "[ OK ] Reached target Graphical Interface",
  "$ pacman -Syu --noconfirm",
  "$ vim /etc/hosts",
  "$ ping -c 4 8.8.8.8",
  "$ systemctl status postgresql",
  "$ tail -f /var/log/syslog",
  "$ make -j$(nproc)",
  "$ lsblk --fs",
  "$ ip addr show eth0",
  "$ htop",
  "$ ps aux | grep node",
  "$ crontab -l",
  "$ tar -czf backup.tar.gz /home/vishnu",
  "$ npm run build && npm start",
];

interface FloatingLine {
  id: number;
  text: string;
  x: number;       // percentage
  y: number;       // percentage
  opacity: number;
  speed: number;    // px per frame
  fontSize: number;
  direction: "left" | "right";
}

let nextId = 0;

const LinuxBackground = () => {
  const [lines, setLines] = useState<FloatingLine[]>([]);
  const frameRef = useRef<number>(0);
  const linesRef = useRef<FloatingLine[]>([]);

  // Keep ref in sync for animation loop
  useEffect(() => {
    linesRef.current = lines;
  }, [lines]);

  // Spawn a new floating line
  const spawnLine = () => {
    const direction = Math.random() > 0.5 ? "left" : "right";
    const line: FloatingLine = {
      id: nextId++,
      text: LINUX_LINES[Math.floor(Math.random() * LINUX_LINES.length)],
      x: direction === "right" ? -30 : 110,
      y: 5 + Math.random() * 90,
      opacity: 0.25 + Math.random() * 0.15,
      speed: 0.015 + Math.random() * 0.025,
      fontSize: 10 + Math.floor(Math.random() * 3),
      direction,
    };
    return line;
  };

  // Initialize lines
  useEffect(() => {
    const initial: FloatingLine[] = [];
    for (let i = 0; i < 12; i++) {
      const line = spawnLine();
      // Spread them across the screen initially
      line.x = Math.random() * 100;
      initial.push(line);
    }
    setLines(initial);
  }, []);

  // Animation loop
  useEffect(() => {
    let running = true;

    const tick = () => {
      if (!running) return;

      setLines((prev) => {
        let updated = prev.map((l) => ({
          ...l,
          x: l.direction === "right" ? l.x + l.speed : l.x - l.speed,
        }));

        // Remove off-screen lines
        updated = updated.filter((l) =>
          l.direction === "right" ? l.x < 130 : l.x > -40
        );

        // Respawn to keep count around 12
        while (updated.length < 12) {
          updated.push(spawnLine());
        }

        return updated;
      });

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none" aria-hidden="true">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `linear-gradient(hsl(142 72% 42% / 0.4) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(142 72% 42% / 0.4) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating terminal lines */}
      {lines.map((line) => (
        <div
          key={line.id}
          className="absolute whitespace-nowrap font-mono"
          style={{
            left: `${line.x}%`,
            top: `${line.y}%`,
            opacity: line.opacity,
            fontSize: `${line.fontSize}px`,
            color: line.text.startsWith("$")
              ? "hsl(142 72% 42%)"
              : line.text.startsWith("[")
              ? "hsl(142 50% 60%)"
              : "hsl(142 20% 50%)",
            textShadow: "0 0 8px hsl(142 72% 42% / 0.2)",
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        >
          {line.text}
        </div>
      ))}

      {/* Corner terminal decorations */}
      <div className="absolute top-3 left-14 font-mono text-[10px] text-primary/40 leading-tight">
        <div>PID&nbsp;&nbsp;USER&nbsp;&nbsp;&nbsp;%CPU&nbsp;&nbsp;COMMAND</div>
        <div>1&nbsp;&nbsp;&nbsp;&nbsp;root&nbsp;&nbsp;&nbsp;0.0&nbsp;&nbsp;&nbsp;/sbin/init</div>
        <div>42&nbsp;&nbsp;&nbsp;vishnu&nbsp;1.2&nbsp;&nbsp;&nbsp;node server.js</div>
      </div>

      <div className="absolute bottom-3 left-14 font-mono text-[10px] text-primary/25 leading-tight">
        <div>Filesystem&nbsp;&nbsp;Size&nbsp;&nbsp;Used&nbsp;&nbsp;Avail</div>
        <div>/dev/sda1&nbsp;&nbsp;&nbsp;256G&nbsp;&nbsp;89G&nbsp;&nbsp;&nbsp;167G</div>
      </div>

      <div className="absolute top-3 right-4 font-mono text-[10px] text-primary/25 leading-tight text-right">
        <div>uptime: 42d 7h 13m</div>
        <div>load: 0.42 0.38 0.31</div>
      </div>

      <div className="absolute bottom-3 right-4 font-mono text-[10px] text-primary/25 leading-tight text-right">
        <div>eth0: 192.168.1.42</div>
        <div>kernel: 6.8.0-45-generic</div>
      </div>
    </div>
  );
};

export default LinuxBackground;
