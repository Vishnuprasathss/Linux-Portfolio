import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Linkedin, Instagram, Github, Mail } from "lucide-react";
import CubeFace from "./CubeFace";
import AboutSection from "./sections/AboutSection";
import SkillsSection from "./sections/SkillsSection";
import ExperienceSection from "./sections/ExperienceSection";
import ProjectsSection from "./sections/ProjectsSection";
import AchievementsSection from "./sections/AchievementsSection";
import ContactSection from "./sections/ContactSection";
import LinuxBackground from "./LinuxBackground";
import ImageShowcase from "./ImageShowcase";

type FaceType = "front" | "right" | "back" | "left" | "top" | "bottom";

const CubePortfolio = () => {
  const [currentFace, setCurrentFace] = useState<FaceType>("front");
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, depth: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const faces: FaceType[] = ["front", "left", "back", "top", "bottom", "right"];
  const faceLabels: Record<FaceType, string> = {
    front: "whoami",
    back: "history",
    left: "cat skills",
    right: "mail",
    top: "ls projects",
    bottom: "grep awards",
  };

  // Section IDs for mobile scroll navigation
  const sectionIds: Record<FaceType, string> = {
    front: "section-about",
    left: "section-skills",
    back: "section-experience",
    top: "section-projects",
    bottom: "section-achievements",
    right: "section-contact",
  };

  useEffect(() => {
    const updateSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      const w = mobile
        ? Math.min(window.innerWidth * 0.92, 420)
        : Math.min(window.innerWidth * 0.85, 800);
      const h = mobile
        ? Math.min(window.innerHeight * 0.55, 400)
        : Math.min(window.innerHeight * 0.75, 600);
      const d = h; // Depth equals height so Top/Bottom match Front/Back, and Left/Right are larger
      setDimensions({ width: w, height: h, depth: d });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const getContainerTranslateZ = (): number => {
    switch (currentFace) {
      case 'front':
      case 'back':
        return dimensions.depth / 2;
      case 'left':
      case 'right':
        return dimensions.width / 2;
      case 'top':
      case 'bottom':
        return dimensions.height / 2;
      default:
        return 0;
    }
  };

  const getRotation = (): string => {
    const rotations: Record<FaceType, string> = {
      front: "rotateY(0deg) rotateX(0deg)",
      right: "rotateY(-90deg) rotateX(0deg)",
      back: "rotateY(-180deg) rotateX(0deg)",
      left: "rotateY(90deg) rotateX(0deg)",
      top: "rotateX(-90deg) rotateY(0deg)",
      bottom: "rotateX(90deg) rotateY(0deg)",
    };
    return rotations[currentFace];
  };

  const navigateTo = (face: FaceType) => {
    if (face === currentFace || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentFace(face);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const navigateHorizontal = (direction: "left" | "right") => {
    const horizontalFaces: FaceType[] = ["front", "right", "back", "left"];
    const currentIndex = horizontalFaces.indexOf(currentFace);
    if (currentIndex === -1) {
      navigateTo("front");
      return;
    }
    const newIndex = direction === "right"
      ? (currentIndex + 1) % 4
      : (currentIndex - 1 + 4) % 4;
    navigateTo(horizontalFaces[newIndex]);
  };

  const navigateVertical = (direction: "up" | "down") => {
    if (direction === "up") {
      if (currentFace === "bottom") navigateTo("front");
      else if (currentFace === "front") navigateTo("top");
    } else if (direction === "down") {
      if (currentFace === "top") navigateTo("front");
      else if (currentFace === "front") navigateTo("bottom");
    }
  };

  // Keyboard navigation (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't navigate if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'input' || target.tagName.toLowerCase() === 'textarea') {
        return;
      }

      if (isTransitioning) return;
      switch (e.key) {
        case "ArrowLeft":
          navigateHorizontal("left");
          break;
        case "ArrowRight":
          navigateHorizontal("right");
          break;
        case "ArrowUp":
          navigateVertical("up");
          break;
        case "ArrowDown":
          navigateVertical("down");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentFace, isTransitioning, isMobile]);

  // Scroll to section on mobile
  const scrollToSection = (face: FaceType) => {
    const el = document.getElementById(sectionIds[face]);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (dimensions.width === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-background text-foreground font-mono">
        Loading 3D Environment...
      </div>
    );
  }

  // ===========================
  // MOBILE LAYOUT — Vertical scrolling
  // ===========================
  if (isMobile) {
    const mobileSections = [
      { id: sectionIds.front, label: faceLabels.front, component: <AboutSection /> },
      { id: sectionIds.left, label: faceLabels.left, component: <SkillsSection /> },
      { id: sectionIds.back, label: faceLabels.back, component: <ExperienceSection /> },
      { id: sectionIds.top, label: faceLabels.top, component: <ProjectsSection /> },
      { id: sectionIds.bottom, label: faceLabels.bottom, component: <AchievementsSection /> },
      { id: sectionIds.right, label: faceLabels.right, component: <ContactSection /> },
    ];

    return (
      <div className="relative w-full min-h-screen bg-background">
        {/* Live Linux background elements */}
        <LinuxBackground />

        {/* Sticky header: VP.dev branding + navigation */}
        <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
          {/* VP.dev branding row */}
          <div className="flex items-center px-3 pt-2 pb-1 select-none">
            <div className="relative">
              {/* Glow layer */}
              <span
                aria-hidden="true"
                className="text-[0.7rem]"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                  color: "#22c55e",
                  filter: "blur(8px)",
                  opacity: 0.5,
                }}
              >
                VP.dev
              </span>
              {/* Visible text */}
              <span
                className="text-[0.7rem]"
                style={{
                  position: "relative",
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                  background: "linear-gradient(135deg, #22c55e, #4ade80, #16a34a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                VP.dev
              </span>
            </div>
          </div>

          {/* Navigation row — below VP.dev */}
          <nav className="flex items-center gap-1 px-1.5 pb-1.5 overflow-x-auto scrollbar-hide">
            <span className="flex items-center px-1.5 font-mono text-[10px] text-primary/70 select-none shrink-0">$</span>
            {faces.map((face) => (
              <button
                key={face}
                onClick={() => scrollToSection(face)}
                className="px-2 py-1 font-mono text-[9px] tracking-wider transition-all duration-300 rounded-sm whitespace-nowrap shrink-0 text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent active:bg-primary/15 active:text-primary active:border-primary/40"
              >
                {faceLabels[face]}
              </button>
            ))}
          </nav>
        </header>

        {/* All sections stacked vertically — boxed layout */}
        <main className="relative z-10 px-3 py-4 space-y-4">
          {mobileSections.map((section) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative w-full bg-card/60 backdrop-blur-sm border border-border/60 rounded-lg overflow-hidden"
            >
              {/* Section label header */}
              <div className="flex items-center gap-2 px-4 py-2 border-b border-border/40 bg-card/40">
                <span className="font-mono text-[10px] text-primary/50 select-none">$</span>
                <span className="font-mono text-[10px] text-primary/70 tracking-widest uppercase">
                  {section.label}
                </span>
                <div className="flex-1" />
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-destructive/50" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                  <div className="w-2 h-2 rounded-full bg-primary/50" />
                </div>
              </div>

              {/* Section content */}
              <div className="w-full">
                {section.component}
              </div>
            </motion.section>
          ))}

          {/* Image Showcase — boxed */}
          <div className="relative w-full bg-card/60 backdrop-blur-sm border border-border/60 rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border/40 bg-card/40">
              <span className="font-mono text-[10px] text-primary/50 select-none">$</span>
              <span className="font-mono text-[10px] text-primary/70 tracking-widest uppercase">
                gallery
              </span>
              <div className="flex-1" />
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-destructive/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-primary/50" />
              </div>
            </div>
            <div className="py-6">
              <ImageShowcase />
            </div>
          </div>

          {/* Mobile social links */}
          <div className="flex items-center justify-center gap-4 py-4">
            <a href="https://www.linkedin.com/in/s-s-vishnu-prasath-401449298" target="_blank" rel="noopener noreferrer" className="p-3 bg-card/80 backdrop-blur border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-all duration-300">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/wanderlust__149/" target="_blank" rel="noopener noreferrer" className="p-3 bg-card/80 backdrop-blur border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-all duration-300">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-card/80 backdrop-blur border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-all duration-300">
              <Github className="w-5 h-5" />
            </a>
            <a href="mailto:vishnuprasathss.info@gmail.com" className="p-3 bg-card/80 backdrop-blur border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-all duration-300">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full flex items-center justify-center py-2 bg-card/80 backdrop-blur border-t border-border/40">
          <p className="font-mono text-[9px] text-muted-foreground/60 tracking-wide">
            © 2025 Vishnu Prasath S S. Built with React &amp; TypeScript.
          </p>
        </footer>
      </div>
    );
  }

  // ===========================
  // DESKTOP LAYOUT — 3D Cube (unchanged)
  // ===========================
  return (
    <div className="relative w-full h-screen flex flex-row bg-background overflow-hidden">

      {/* VP.dev branding — top left */}
      <div className="fixed top-4 left-4 z-50 select-none" style={{ position: "fixed" }}>
        {/* Glow layer */}
        <span
          aria-hidden="true"
          className="text-[1.35rem]"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            letterSpacing: "0.04em",
            color: "#22c55e",
            filter: "blur(8px)",
            opacity: 0.5,
          }}
        >
          VP.dev
        </span>
        {/* Visible text */}
        <span
          className="text-[1.35rem]"
          style={{
            position: "relative",
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            letterSpacing: "0.04em",
            background: "linear-gradient(135deg, #22c55e, #4ade80, #16a34a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          VP.dev
        </span>
      </div>

      {/* Live Linux background elements */}
      <LinuxBackground />

      {/* ===== LEFT SIDE: Cube ===== */}
      <div className="relative flex-[3] flex flex-col items-center justify-center min-w-0 w-full">

        {/* Social Media Sidebar */}
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
          <a href="https://www.linkedin.com/in/s-s-vishnu-prasath-401449298" target="_blank" rel="noopener noreferrer" className="p-3 bg-card/80 backdrop-blur border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-all duration-300">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://www.instagram.com/wanderlust__149/" target="_blank" rel="noopener noreferrer" className="p-3 bg-card/80 backdrop-blur border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-all duration-300">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-card/80 backdrop-blur border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-all duration-300">
            <Github className="w-5 h-5" />
          </a>
          <a href="mailto:vishnuprasathss.info@gmail.com" className="p-3 bg-card/80 backdrop-blur border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-all duration-300">
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Navigation tabs — terminal style */}
        <nav className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 p-1.5 bg-card/90 backdrop-blur border border-border rounded-sm">
          <span className="flex items-center px-2 font-mono text-xs text-primary/70 select-none shrink-0">$</span>
          {faces.map((face) => (
            <button
              key={face}
              onClick={() => navigateTo(face)}
              className={`px-2 py-1.5 font-mono text-[11px] tracking-wider transition-all duration-300 rounded-sm whitespace-nowrap shrink-0 ${currentFace === face
                ? "bg-primary/15 text-primary border border-primary/40"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent"
                }`}
            >
              {faceLabels[face]}
            </button>
          ))}
        </nav>

        {/* 3D Cube Container */}
        <div
          className="cube-container relative"
          style={{ width: dimensions.width, height: dimensions.height }}
        >
          <div
            className="cube absolute w-full h-full transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateZ(-${getContainerTranslateZ()}px) ${getRotation()}`,
            }}
          >
            <CubeFace position="front" width={dimensions.width} height={dimensions.height} depth={dimensions.depth} isActive={currentFace === "front"} isTransitioning={isTransitioning}>
              <AboutSection />
            </CubeFace>
            <CubeFace position="back" width={dimensions.width} height={dimensions.height} depth={dimensions.depth} isActive={currentFace === "back"} isTransitioning={isTransitioning}>
              <ExperienceSection />
            </CubeFace>
            <CubeFace position="left" width={dimensions.width} height={dimensions.height} depth={dimensions.depth} isActive={currentFace === "left"} isTransitioning={isTransitioning}>
              <SkillsSection />
            </CubeFace>
            <CubeFace position="right" width={dimensions.width} height={dimensions.height} depth={dimensions.depth} isActive={currentFace === "right"} isTransitioning={isTransitioning}>
              {(!isTransitioning && currentFace === "right") ? null : <ContactSection />}
            </CubeFace>
            <CubeFace position="top" width={dimensions.width} height={dimensions.height} depth={dimensions.depth} isActive={currentFace === "top"} isTransitioning={isTransitioning}>
              <ProjectsSection />
            </CubeFace>
            <CubeFace position="bottom" width={dimensions.width} height={dimensions.height} depth={dimensions.depth} isActive={currentFace === "bottom"} isTransitioning={isTransitioning}>
              <AchievementsSection />
            </CubeFace>
          </div>
        </div>

        {/* Flattened Proxy Layer — Bypasses 3D CSS overflow/scroll/input bugs */}
        {!isTransitioning && (() => {
          const faceContent: Record<FaceType, JSX.Element> = {
            front: <AboutSection />,
            left: <SkillsSection />,
            back: <ExperienceSection />,
            right: <ContactSection />,
            top: <ProjectsSection />,
            bottom: <AchievementsSection />,
          };
          // Compute the visible face size for the current face
          let proxyWidth: number, proxyHeight: number;
          switch (currentFace) {
            case 'front': case 'back':
              proxyWidth = dimensions.width; proxyHeight = dimensions.height; break;
            case 'left': case 'right':
              proxyWidth = dimensions.depth; proxyHeight = dimensions.height; break;
            case 'top': case 'bottom':
              proxyWidth = dimensions.width; proxyHeight = dimensions.depth; break;
          }
          return (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-background border border-border overflow-y-auto overflow-x-hidden pointer-events-auto rounded-sm"
              style={{ width: proxyWidth, height: proxyHeight }}
            >
              {faceContent[currentFace]}
            </div>
          );
        })()}

        {/* Arrow navigation */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          <button
            onClick={() => navigateHorizontal("left")}
            disabled={isTransitioning}
            className="p-2.5 border border-border bg-card hover:border-primary hover:bg-primary/10 transition-all duration-300 disabled:opacity-50 rounded-sm"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>

          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => navigateVertical("up")}
              disabled={isTransitioning || currentFace === "top"}
              className="p-2.5 border border-border bg-card hover:border-primary hover:bg-primary/10 transition-all duration-300 disabled:opacity-30 rounded-sm"
              aria-label="Up"
            >
              <ChevronUp className="w-4 h-4 text-foreground" />
            </button>
            <button
              onClick={() => navigateVertical("down")}
              disabled={isTransitioning || currentFace === "bottom"}
              className="p-2.5 border border-border bg-card hover:border-primary hover:bg-primary/10 transition-all duration-300 disabled:opacity-30 rounded-sm"
              aria-label="Down"
            >
              <ChevronDown className="w-4 h-4 text-foreground" />
            </button>
          </div>

          <button
            onClick={() => navigateHorizontal("right")}
            disabled={isTransitioning}
            className="p-2.5 border border-border bg-card hover:border-primary hover:bg-primary/10 transition-all duration-300 disabled:opacity-50 rounded-sm"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>
        </div>

        {/* Current section indicator */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFace}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 font-mono text-xs text-muted-foreground tracking-widest"
          >
            <span className="text-primary/60">vishnu@portfolio</span><span className="text-muted-foreground/60">:</span><span className="text-primary/80">~</span><span className="text-muted-foreground/60">$</span> {faceLabels[currentFace]}
          </motion.div>
        </AnimatePresence>

        {/* Keyboard hint */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] text-muted-foreground/40">
          ← ↑ ↓ → to navigate
        </div>

      </div>{/* END left side */}

      {/* ===== RIGHT SIDE: Image Showcase ===== */}
      <div className="relative flex-[1.5] flex items-center justify-center border-l border-border/30 min-w-[260px] max-w-[380px] z-10">
        <ImageShowcase />
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center py-2 bg-card/80 backdrop-blur border-t border-border/40">
        <p className="font-mono text-[11px] text-muted-foreground/60 tracking-wide">
          © 2025 Vishnu Prasath S S. Built with React &amp; TypeScript.
        </p>
      </footer>
    </div>
  );
};

export default CubePortfolio;
