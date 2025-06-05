"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const scene = new THREE.Scene();

    // 背景色 + 景深霧化效果
    const backgroundColor = 0xffffff;
    scene.background = new THREE.Color(backgroundColor);
    scene.fog = new THREE.Fog(backgroundColor, 2, 6); // 漸層起始、結束距離

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    // 建立粒子幾何
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 6; // X
      positions[i3 + 1] = (Math.random() - 0.5) * 6; // Y
      positions[i3 + 2] = Math.random() * -5; // Z (遠近)
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x111111,
      size: 0.015,
      transparent: true,
      opacity: 0.9, // 半透明粒子
      depthWrite: true, // 不遮擋其他粒子
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 響應式調整
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.001;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
