import { useEffect, useRef } from "react";

interface BackgroundProps {
  color?: {
    hover: string;
    idle: string;

    active: string;
    activeInterpolate: boolean;

    outline: string;
  };
  squareSize?: number;
}

type Coordinate = { x: number, y: number };

const Background: React.FC<BackgroundProps> = ({
  color = {
    hover: "#f5675d",
    idle: "#fff",

    active: "#f5675d",
    activeInterpolate: true,
    
    outline: "#b5b5b5"
  },
  squareSize = 40
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const requestRef = useRef<number | null>(null);
  const numSquaresX = useRef<number>(0);
  const numSquaresY = useRef<number>(0);
  const hoveredSquare = useRef<Coordinate | null>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      numSquaresX.current = Math.ceil(canvas.width / squareSize);
      numSquaresY.current = Math.ceil(canvas.height / squareSize);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const drawSquares = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let x = 0; x < canvas.width; x += squareSize) {
        for (let y = 0; y < canvas.height; y += squareSize) {

          if (hoveredSquare.current &&
            Math.floor(x / squareSize) === hoveredSquare.current.x &&
            Math.floor(y / squareSize) === hoveredSquare.current.y
          ) {
            ctx.fillStyle = color.hover
            ctx.strokeRect(x, y, squareSize, squareSize);
          }

          ctx.strokeStyle = color.outline;
          ctx.strokeRect(x, y, squareSize, squareSize);
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mX = e.clientX - rect.left;
      const mY = e.clientY - rect.top;

      const hoveredSquareX = Math.floor(mX / squareSize);
      const hoveredSquareY = Math.floor(mY / squareSize);
      
      if (!hoveredSquare.current ||
        hoveredSquare.current.x !== hoveredSquareX ||
        hoveredSquare.current.y !== hoveredSquareY
      ) {
        hoveredSquare.current = { x: hoveredSquareX, y: hoveredSquareY };
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      hoveredSquare.current = null;
    }

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    drawSquares();
  }, [color, squareSize]);

  
  
  return (
    <canvas ref={canvasRef} className="square-canvas"></canvas>
  )
}

export default Background;