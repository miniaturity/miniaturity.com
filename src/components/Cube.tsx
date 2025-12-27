import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { type Mesh } from 'three';
import { Box } from '@react-three/drei';

interface RotatingCubeProps {
  size: [number, number, number];
  speed: number;
  opacity?: number;
}

const RotatingCube: React.FC<RotatingCubeProps> = ({ size, speed, opacity = 1 }) => {
  const cubeRef = useRef<Mesh>(null);
  const rotationSpeed = useRef<number>(speed);

  useFrame(() => {
    if (cubeRef.current) {
        cubeRef.current.rotation.x += rotationSpeed.current;
        cubeRef.current.rotation.y += rotationSpeed.current;
    }
  });

  return (
    <Box ref={cubeRef} args={size}>
      <meshBasicMaterial color="red" 
      wireframe 
      wireframeLinecap='round' 
      opacity={opacity}
      transparent={opacity < 1}
      />
    </Box>
  );
};


export const Cube: React.FC = () => {
  return (
    <Canvas>
      <group>
        <RotatingCube size={[1, 1, 1]} speed={0.005}/>
        <RotatingCube size={[2, 2, 2]} speed={0.003} opacity={0.2}/>
        <RotatingCube size={[4, 4, 4]} speed={0.001} opacity={0.1}/>
      </group>
    </Canvas>
  );
};
