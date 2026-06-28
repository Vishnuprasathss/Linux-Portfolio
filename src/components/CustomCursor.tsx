import { useEffect, useRef } from "react";

const TERMINAL_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789$>_~/.|#@!%^&*{}[]";

const CustomCursor = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let particles: any[] = [];
        let mouse = { x: -100, y: -100 };
        let prevMouse = { x: -100, y: -100 };
        let isMoving = false;
        let timeoutId: any;
        let frameCount = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const onMouseMove = (e: MouseEvent) => {
            prevMouse.x = mouse.x;
            prevMouse.y = mouse.y;
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            isMoving = true;

            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => { isMoving = false; }, 120);

            // Spawn matrix character trail particles
            const speed = Math.sqrt(
                Math.pow(mouse.x - prevMouse.x, 2) +
                Math.pow(mouse.y - prevMouse.y, 2)
            );

            const numChars = Math.min(Math.floor(speed / 8), 4);
            for (let i = 0; i < numChars; i++) {
                const char = TERMINAL_CHARS[Math.floor(Math.random() * TERMINAL_CHARS.length)];
                particles.push({
                    type: "char",
                    x: mouse.x + (Math.random() * 16 - 8),
                    y: mouse.y + (Math.random() * 16 - 8),
                    vy: Math.random() * 1.5 + 0.5, // falls down like matrix
                    vx: Math.random() * 0.6 - 0.3,
                    life: 1,
                    char,
                    fontSize: Math.random() * 6 + 10,
                    brightness: Math.random() * 0.5 + 0.5,
                });
            }

            // Spawn command prompt echo particle (less frequent)
            if (Math.random() > 0.85) {
                const prompts = ["$", ">", "~", "#", "_", "│", "┤", "├", "└", "┐"];
                particles.push({
                    type: "prompt",
                    x: mouse.x + (Math.random() * 24 - 12),
                    y: mouse.y + (Math.random() * 24 - 12),
                    vy: Math.random() * 0.5 + 0.2,
                    vx: Math.random() * 0.4 - 0.2,
                    life: 1,
                    char: prompts[Math.floor(Math.random() * prompts.length)],
                    fontSize: Math.random() * 4 + 14,
                });
            }
        };

        window.addEventListener("mousemove", onMouseMove);

        const animate = () => {
            frameCount++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // === Main cursor: Terminal block cursor ===
            const blink = Math.sin(frameCount * 0.1) > -0.3; // blink effect
            if (blink) {
                // Block cursor glow (outer)
                ctx.shadowBlur = 20;
                ctx.shadowColor = "#22c55e";
                ctx.fillStyle = "rgba(34, 197, 94, 0.15)";
                ctx.fillRect(mouse.x - 8, mouse.y - 10, 16, 20);

                // Block cursor (inner)
                ctx.shadowBlur = 12;
                ctx.shadowColor = "#4ade80";
                ctx.fillStyle = "rgba(74, 222, 128, 0.85)";
                ctx.fillRect(mouse.x - 5, mouse.y - 8, 10, 16);

                // Underscore line at bottom
                ctx.shadowBlur = 8;
                ctx.shadowColor = "#86efac";
                ctx.fillStyle = "#86efac";
                ctx.fillRect(mouse.x - 6, mouse.y + 9, 12, 2);
            }

            // Scanline ring (subtle CRT effect)
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 18, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(34, 197, 94, ${0.08 + Math.sin(frameCount * 0.05) * 0.04})`;
            ctx.lineWidth = 1;
            ctx.shadowBlur = 0;
            ctx.stroke();

            // Tiny dot at exact cursor position
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = "#d1fae5";
            ctx.shadowBlur = 6;
            ctx.shadowColor = "#22c55e";
            ctx.fill();

            // === Particles ===
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];

                if (p.type === "char") {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life -= 0.018;

                    if (p.life <= 0) {
                        particles.splice(i, 1);
                        continue;
                    }

                    const alpha = p.life * p.brightness;
                    const green = Math.floor(150 + p.brightness * 105);
                    ctx.font = `${p.fontSize}px "Courier New", "Fira Code", monospace`;
                    ctx.fillStyle = `rgba(0, ${green}, 0, ${alpha})`;
                    ctx.shadowBlur = 4;
                    ctx.shadowColor = `rgba(34, 197, 94, ${alpha * 0.5})`;
                    ctx.fillText(p.char, p.x, p.y);

                } else if (p.type === "prompt") {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life -= 0.012;

                    if (p.life <= 0) {
                        particles.splice(i, 1);
                        continue;
                    }

                    const alpha = p.life * 0.7;
                    ctx.font = `bold ${p.fontSize}px "Courier New", "Fira Code", monospace`;
                    ctx.fillStyle = `rgba(134, 239, 172, ${alpha})`;
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = `rgba(74, 222, 128, ${alpha * 0.6})`;
                    ctx.fillText(p.char, p.x, p.y);
                }
            }

            // Reset shadow
            ctx.shadowBlur = 0;

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-[9999]"
            style={{ mixBlendMode: 'screen' }}
        />
    );
};

export default CustomCursor;
