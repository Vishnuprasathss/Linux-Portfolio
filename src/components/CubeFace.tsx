import { ReactNode } from "react";

interface CubeFaceProps {
  children: ReactNode;
  position: "front" | "back" | "left" | "right" | "top" | "bottom";
  width: number;
  height: number;
  depth: number;
  isActive: boolean;
  isTransitioning?: boolean;
}

const CubeFace = ({ children, position, width, height, depth, isActive, isTransitioning }: CubeFaceProps) => {
  let faceWidth, faceHeight, translateZValue;

  switch (position) {
    case 'front':
    case 'back':
      faceWidth = width;
      faceHeight = height;
      translateZValue = depth / 2;
      break;
    case 'left':
    case 'right':
      faceWidth = depth;
      faceHeight = height;
      translateZValue = width / 2;
      break;
    case 'top':
    case 'bottom':
      faceWidth = width;
      faceHeight = depth;
      translateZValue = height / 2;
      break;
  }

  const transforms: Record<string, string> = {
    front: `translateZ(${translateZValue}px)`,
    back: `rotateY(180deg) translateZ(${translateZValue}px)`,
    left: `rotateY(-90deg) translateZ(${translateZValue}px)`,
    right: `rotateY(90deg) translateZ(${translateZValue}px)`,
    top: `rotateX(90deg) translateZ(${translateZValue}px)`,
    bottom: `rotateX(-90deg) translateZ(${translateZValue}px)`,
  };

  const isHidden = !isActive && !isTransitioning;

  return (
    <div
      className={`cube-face absolute bg-background border border-border transition-opacity duration-500 ${isActive ? 'pointer-events-auto opacity-100 z-10 overflow-y-auto overflow-x-hidden' : 'pointer-events-none opacity-50 z-0 overflow-hidden'} ${isHidden ? 'invisible' : 'visible'}`}
      style={{ 
        width: `${faceWidth}px`, 
        height: `${faceHeight}px`,
        left: `${(width - faceWidth) / 2}px`,
        top: `${(height - faceHeight) / 2}px`,
        transform: transforms[position] 
      }}
    >
      {children}
    </div>
  );
};

export default CubeFace;
