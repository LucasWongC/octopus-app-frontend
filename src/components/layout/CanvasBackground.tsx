"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";
import { useScroll, useTime, useTransform } from "framer-motion";
import { degreesToRadians, mix, progress } from "popmotion";

const color = "#28293d";

const Icosahedron = () => (
  <mesh rotation-x={0.35}>
    <icosahedronGeometry args={[1, 0]} />
    <meshBasicMaterial wireframe color={color} />
  </mesh>
);

const Star = ({ p }: { p: number }) => {
  const ref = useRef<any | null>(null);

  useLayoutEffect(() => {
    const distance = mix(2, 4.5, Math.random());
    const yAngle = mix(
      degreesToRadians(80),
      degreesToRadians(100),
      Math.random()
    );
    const xAngle = degreesToRadians(360) * p;
    ref.current!.position.setFromSphericalCoords(distance, yAngle, xAngle);
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.05, 0.05, 0.05]} />
      <meshBasicMaterial wireframe color={color} />
    </mesh>
  );
};

function Scene({ numStars = 100, isFixed = false }) {
  const gl = useThree((state) => state.gl);
  const { scrollYProgress, scrollY } = useScroll();
  const yAngle = useTransform(
    scrollYProgress,
    [0, 1],
    [0.001, degreesToRadians(180)]
  );
  const distance = useTransform(scrollYProgress, [0, 1], [7, 3]);
  const time = useTime();

  useFrame(({ camera }) => {
    camera.position.setFromSphericalCoords(
      isFixed ? 7 : distance.get(),
      yAngle.get(),
      time.get() * 0.0005
    );
    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
  });

  useLayoutEffect(() => {
    gl.setPixelRatio(0.2);
    scrollY.onChange(() => {
      gl.setPixelRatio(0.2);
    });
  }, [gl, scrollY]);

  const stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push(<Star p={progress(0, numStars, i)} />);
  }

  return (
    <>
      <Icosahedron />
      {stars.map((star, i) => (
        <group key={i}>{star}</group>
      ))}
    </>
  );
}

export default function CanvasBackground({ isFixed = false }) {
  return (
    <div className="z-10 fixed top-0 right-0 left-0 bottom-0 opacity-20">
      <Canvas gl={{ antialias: false }}>
        <Scene isFixed={isFixed} />
      </Canvas>
    </div>
  );
}
