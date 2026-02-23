import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function StarBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (!mountRef.current) return;
    mountRef.current.appendChild(renderer.domElement);

    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 3000;

    const positions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 1000;
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );

    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.7,
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      stars.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
}
