'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Sapforce3DOrbProps {
  scrollProgress?: number;
  interactive?: boolean;
  className?: string;
}

export default function Sapforce3DOrb({
  scrollProgress = 0,
  interactive = true,
  className = '',
}: Sapforce3DOrbProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef(scrollProgress);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // Group for all elements
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Core Glowing Lime / Iridescent Liquid Sphere
    const coreGeometry = new THREE.SphereGeometry(1.6, 64, 64);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#98ff00'),
      emissive: new THREE.Color('#78d600'),
      emissiveIntensity: 0.85,
      roughness: 0.12,
      metalness: 0.15,
      transmission: 0.5,
      ior: 1.45,
      thickness: 1.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const coreSphere = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(coreSphere);

    // Inner bright core for intense radial radiance
    const innerCoreGeo = new THREE.SphereGeometry(1.1, 32, 32);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#caff33'),
      transparent: true,
      opacity: 0.65,
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    mainGroup.add(innerCore);

    // 2. Outer Chrome / Metallic Cage Ribbons
    const chromeGroup = new THREE.Group();
    mainGroup.add(chromeGroup);

    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e8ecf2'),
      metalness: 0.96,
      roughness: 0.12,
      envMapIntensity: 1.8,
    });

    // Sculpted organic metallic torusknot / outer cages
    const knotGeometry = new THREE.TorusKnotGeometry(1.85, 0.22, 128, 32, 2, 3);
    const chromeCage = new THREE.Mesh(knotGeometry, chromeMaterial);
    chromeGroup.add(chromeCage);

    // Secondary crossing ribbon
    const ribbonGeometry = new THREE.TorusGeometry(2.1, 0.08, 24, 100);
    const ribbon1 = new THREE.Mesh(ribbonGeometry, chromeMaterial);
    ribbon1.rotation.x = Math.PI / 3;
    ribbon1.rotation.y = Math.PI / 4;
    chromeGroup.add(ribbon1);

    // 3. Thin Floating Gyroscopic Orbital Rings
    const ringsGroup = new THREE.Group();
    mainGroup.add(ringsGroup);

    const ringMat1 = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#cbd5e1'),
      metalness: 0.9,
      roughness: 0.2,
    });

    const ringMatLime = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#a8ff1a'),
      emissive: new THREE.Color('#8be600'),
      emissiveIntensity: 0.4,
      metalness: 0.8,
      roughness: 0.2,
    });

    const ring1Geo = new THREE.TorusGeometry(2.6, 0.02, 16, 120);
    const ring1 = new THREE.Mesh(ring1Geo, ringMat1);
    ring1.rotation.x = Math.PI / 2.3;
    ring1.rotation.y = 0.2;
    ringsGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.85, 0.025, 16, 120);
    const ring2 = new THREE.Mesh(ring2Geo, ringMatLime);
    ring2.rotation.x = -Math.PI / 3.2;
    ring2.rotation.z = Math.PI / 6;
    ringsGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(3.1, 0.015, 16, 120);
    const ring3 = new THREE.Mesh(ring3Geo, ringMat1);
    ring3.rotation.x = Math.PI / 4;
    ring3.rotation.y = -Math.PI / 3;
    ringsGroup.add(ring3);

    // 4. Subtle Orbital Lime & White Particles
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.2 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    particleGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color('#b8ff33'),
      size: 0.06,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMaterial);
    mainGroup.add(particles);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(5, 6, 7);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xccff66, 2.2);
    fillLight.position.set(-6, -3, 4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xa6ff00, 3.5, 20);
    rimLight.position.set(0, 0, -3);
    scene.add(rimLight);

    const frontLight = new THREE.PointLight(0xffffff, 1.5, 15);
    frontLight.position.set(0, 3, 5);
    scene.add(frontLight);

    // Mouse Interaction
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = x * 0.45;
      mouseRef.current.targetY = y * 0.35;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Window Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseRef.current.x +=
        (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y +=
        (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Dynamic rotation
      mainGroup.rotation.y = elapsedTime * 0.25 + mouseRef.current.x;
      mainGroup.rotation.x =
        Math.sin(elapsedTime * 0.2) * 0.15 - mouseRef.current.y;

      // Chrome ribbon independent rotation
      chromeCage.rotation.x = elapsedTime * 0.35;
      chromeCage.rotation.y = elapsedTime * 0.45;

      // Ring rotations
      ring1.rotation.z = elapsedTime * 0.3;
      ring2.rotation.y = -elapsedTime * 0.25;
      ring3.rotation.x = elapsedTime * 0.2;

      // Particles orbit
      particles.rotation.y = elapsedTime * 0.08;
      particles.rotation.z = elapsedTime * 0.05;

      // Subtle breathing scale pulse on core
      const pulse = 1 + Math.sin(elapsedTime * 1.5) * 0.035;
      coreSphere.scale.set(pulse, pulse, pulse);
      innerCore.scale.set(pulse, pulse, pulse);

      // Scroll-driven position & scale transition
      const s = scrollRef.current;
      mainGroup.position.y = -s * 2.2;
      mainGroup.position.z = -s * 1.8;
      mainGroup.scale.setScalar(1 - s * 0.22);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      [
        coreGeometry,
        innerCoreGeo,
        knotGeometry,
        ribbonGeometry,
        ring1Geo,
        ring2Geo,
        ring3Geo,
        particleGeo,
      ].forEach((geo) => geo.dispose());

      [
        coreMaterial,
        innerCoreMat,
        chromeMaterial,
        ringMat1,
        ringMatLime,
        particleMaterial,
      ].forEach((mat) => mat.dispose());

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  );
}
