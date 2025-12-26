import { useEffect, useRef } from "react";

interface BackgroundProps {
  wave?: {

  }
  color?: {
    hover: string;
    idle: string;
    active: string;
    outline: string;
    hoverOutline: string;
  };
  hoverField?: number; 
  squareSize?: number;
  fadeDuration?: number;
  hoverScale?: number;
  waveSpeed?: number;
  pulseFadeDuration?: number;
  defaultOpacity?: number;
}

type Square = { x: number, y: number };
type ActiveSquare = { 
  x: number, 
  y: number,
  opacity: number, 
  scale: number, 
  activatedAt?: number
};

const Background: React.FC<BackgroundProps> = ({
  color = {
    hover: "#f5675d",
    idle: "#fff",
    active: "#f5675d",
    outline: "rgba(181, 181, 181, 0)",
    hoverOutline: "#f5675d"
  },
  hoverField = 1,
  squareSize = 40,
  fadeDuration = 500,
  hoverScale = 1.25,
  waveSpeed = 50,
  pulseFadeDuration = 100,
  defaultOpacity = 0.7
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeSquares = useRef<Map<string, ActiveSquare>>(new Map());
  const hoveredSquare = useRef<Square | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastFrameTime = useRef<number>(Date.now());
  const mouseDown = useRef<boolean>(false);
  const lastMouseDown = useRef<number>(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawSquares();
    };

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 };
    };

    const drawSquares = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rgb = hexToRgb(color.hover);

      for (let x = 0; x < canvas.width; x += squareSize) {
        for (let y = 0; y < canvas.height; y += squareSize) {
          const squareX = Math.floor(x / squareSize);
          const squareY = Math.floor(y / squareSize);

          const key = `${squareX},${squareY}`;

          const isHovered = hoveredSquare.current &&
            squareX === hoveredSquare.current.x &&
            squareY === hoveredSquare.current.y;

          const activeSquare = activeSquares.current.get(key);

          if (isHovered || (activeSquare && activeSquare.opacity > 0)) {
            const scale = isHovered ? 
            mouseDown.current ? (hoverScale * 5) / 6 : hoverScale 
            : (activeSquare?.scale || 1);

            const opacity = isHovered ?
            mouseDown.current ? (defaultOpacity * 4) / 5 : defaultOpacity : (activeSquare?.opacity || 0);

            ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;

            const cx = x - ((squareSize * scale) - squareSize) / 2;
            const cy = y - ((squareSize * scale) - squareSize) / 2;
            ctx.fillRect(cx, cy, squareSize * scale, squareSize * scale);
          } else {
            ctx.strokeStyle = color.outline;
            ctx.strokeRect(x, y, squareSize, squareSize);
          }
        }
      }
    };

    const animate = () => {
      const now = Date.now();
      const deltaTime = now - lastFrameTime.current;
      lastFrameTime.current = now;

      const fadeSpeed = 1 / fadeDuration * deltaTime;
      const pulseFadeSpeed = 1 / pulseFadeDuration * deltaTime;
      let needsRedraw = false;

      activeSquares.current.forEach((square, key) => {
        const isCurrentlyHovered = hoveredSquare.current &&
          square.x === hoveredSquare.current.x &&
          square.y === hoveredSquare.current.y;

        if (!isCurrentlyHovered) {
          const fadeRate = square.activatedAt !== undefined ? pulseFadeSpeed : fadeSpeed;

          square.scale = Math.max(1, square.scale - fadeRate);
          square.opacity = Math.max(0, square.opacity - fadeRate);
          needsRedraw = true;

          if (square.opacity <= 0) {
            activeSquares.current.delete(key);
          }
        }
      });

      if (needsRedraw) {
        drawSquares();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mX = e.clientX - rect.left;
      const mY = e.clientY - rect.top;

      if (mX < 0 || mX > canvas.width || mY < 0 || mY > canvas.height) {
        hoveredSquare.current = null;
        drawSquares();
        return;
      }

      const hoveredSquareX = Math.floor(mX / squareSize);
      const hoveredSquareY = Math.floor(mY / squareSize);
      
      if (!hoveredSquare.current ||
        hoveredSquare.current.x !== hoveredSquareX ||
        hoveredSquare.current.y !== hoveredSquareY
      ) {
        hoveredSquare.current = { x: hoveredSquareX, y: hoveredSquareY };
        
        const radiusSquared = hoverField * hoverField;
        
        for (let dy = -hoverField; dy <= hoverField; dy++) {
          for (let dx = -hoverField; dx <= hoverField; dx++) {
            if (dx * dx + dy * dy <= radiusSquared) {
              const key = `${hoveredSquareX + dx},${hoveredSquareY + dy}`;
              activeSquares.current.set(key, { 
                x: hoveredSquareX + dx, 
                y: hoveredSquareY + dy, 
                opacity: 1,
                scale: hoverScale
              });
            }
          }
        }
        
        drawSquares();
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (!hoveredSquare.current || Date.now() - lastMouseDown.current <= 300) return;

      const rect = canvas.getBoundingClientRect();
      const mX = e.clientX - rect.left;
      const mY = e.clientY - rect.top;

      if (mX < 0 || mX > canvas.width || mY < 0 || mY > canvas.height) {
        return;
      }

      lastMouseDown.current = Date.now();
      const origin = { ...hoveredSquare.current };
      const maxRadius = Math.min(20, Math.ceil(Math.max(canvas.width, canvas.height) / squareSize));
      let currentRadius = 0;
      let lastPulseTime = Date.now();

      const pulse = () => {
        const now = Date.now();
        const deltaTime = now - lastPulseTime;
        lastPulseTime = now;

        const progress = Math.min(currentRadius / maxRadius, 0.9);
        const easingFactor = 1 - Math.pow(progress, 3);
        
        const squaresPerMs = (1 / waveSpeed) * easingFactor;
        currentRadius += squaresPerMs * deltaTime;
        
        if (currentRadius > maxRadius + 5) {
          return; 
        }

        const innerRadius = Math.max(0, currentRadius - 2); 
        const outerRadiusSquared = currentRadius * currentRadius;
        const innerRadiusSquared = innerRadius * innerRadius;
        const opacity = 1 / Math.max(1, Math.log(currentRadius));

        for (let x = origin.x - Math.ceil(currentRadius); x <= origin.x + Math.ceil(currentRadius); x++) {
          for (let y = origin.y - Math.ceil(currentRadius); y <= origin.y + Math.ceil(currentRadius); y++) {
            const dx = x - origin.x;
            const dy = y - origin.y;
            const distSquared = dx * dx + dy * dy;
            
            if (distSquared <= outerRadiusSquared && distSquared >= innerRadiusSquared) {
              const key = `${x},${y}`;
              activeSquares.current.set(key, { 
                x, 
                y, 
                opacity: opacity / currentRadius,
                scale: 1,
                activatedAt: now
              });
            }
          }
        }
        
        drawSquares();
        requestAnimationFrame(pulse);
      };
      
      pulse();
      mouseDown.current = true;
    };

    const handleMouseUp = () => {
      mouseDown.current = false;
      drawSquares();
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [color, squareSize, fadeDuration, hoverScale, pulseFadeDuration, waveSpeed, hoverField, defaultOpacity]);

  return (
    <canvas ref={canvasRef} className="square-canvas"></canvas>
  );
};

export default Background;