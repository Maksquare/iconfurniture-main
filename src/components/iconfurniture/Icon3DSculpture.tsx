'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Icon3DSculptureProps {
  scrollProgress?: number;
  interactive?: boolean;
  className?: string;
}

export default function Icon3DSculpture({
  scrollProgress = 0,
  interactive = true,
  className = '',
}: Icon3DSculptureProps) {
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
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Group for all elements
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Core Glowing Warm Amber / Champagne Crystal Sphere
    const coreGeometry = new THREE.SphereGeometry(1.55, 64, 64);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#d4a373'),
      emissive: new THREE.Color('#9a6b43'),
      emissiveIntensity: 0.65,
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.6,
      ior: 1.5,
      thickness: 1.4,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
    });
    const coreSphere = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(coreSphere);

    // Inner Radiant Warm Core
    const innerCoreGeo = new THREE.SphereGeometry(1.05, 32, 32);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#fefae0'),
      transparent: true,
      opacity: 0.55,
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    mainGroup.add(innerCore);

    // 2. Sculpted Brushed Brass / Champagne Chrome Metallic Cage Ribbons
    const brassGroup = new THREE.Group();
    mainGroup.add(brassGroup);

    const brassMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e6ccb2'),
      metalness: 0.94,
      roughness: 0.16,
      envMapIntensity: 2.0,
    });

    // Sculpted organic architectural torusknot
    const knotGeometry = new THREE.TorusKnotGeometry(1.85, 0.2, 128, 32, 2, 3);
    const brassCage = new THREE.Mesh(knotGeometry, brassMaterial);
    brassGroup.add(brassCage);

    // Secondary subtle crossing ribbon
    const ribbonGeometry = new THREE.TorusGeometry(2.15, 0.07, 24, 100);
    const ribbon1 = new THREE.Mesh(ribbonGeometry, brassMaterial);
    ribbon1.rotation.x = Math.PI / 3;
    ribbon1.rotation.y = Math.PI / 4;
    brassGroup.add(ribbon1);

    // 3. Thin Floating Gyroscopic Orbital Rings (Polished Gold & Silver)
    const ringsGroup = new THREE.Group();
    mainGroup.add(ringsGroup);

    const ringMatGold = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#dda15e'),
      emissive: new THREE.Color('#bc6c25'),
      emissiveIntensity: 0.35,
      metalness: 0.9,
      roughness: 0.15,
    });

    const ringMatSilver = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e9ecef'),
      metalness: 0.92,
      roughness: 0.12,
    });

    const ring1Geo = new THREE.TorusGeometry(2.6, 0.02, 16, 120);
    const ring1 = new THREE.Mesh(ring1Geo, ringMatGold);
    ring1.rotation.x = Math.PI / 2.3;
    ring1.rotation.y = 0.2;
    ringsGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.88, 0.022, 16, 120);
    const ring2 = new THREE.Mesh(ring2Geo, ringMatSilver);
    ring2.rotation.x = -Math.PI / 3.2;
    ring2.rotation.z = Math.PI / 6;
    ringsGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(3.15, 0.015, 16, 120);
    const ring3 = new THREE.Mesh(ring3Geo, ringMatGold);
    ring3.rotation.x = Math.PI / 4;
    ring3.rotation.y = -Math.PI / 3;
    ringsGroup.add(ring3);

    // 4. Subtle Orbital Warm Stardust Particles
    const particleCount = 65;
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
      color: new THREE.Color('#faedcd'),
      size: 0.055,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMaterial);
    mainGroup.add(particles);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xfff8f0, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(5, 6, 7);
    scene.add(keyLight);

    const warmFillLight = new THREE.DirectionalLight(0xffddaa, 2.0);
    warmFillLight.position.set(-6, -3, 4);
    scene.add(warmFillLight);

    const amberRimLight = new THREE.PointLight(0xd4a373, 3.2, 20);
    amberRimLight.position.set(0, 0, -3);
    scene.add(amberRimLight);

    const topLight = new THREE.PointLight(0xfff1e6, 1.8, 15);
    topLight.position.set(0, 3, 5);
    scene.add(topLight);

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
      mainGroup.rotation.y = elapsedTime * 0.22 + mouseRef.current.x;
      mainGroup.rotation.x =
        Math.sin(elapsedTime * 0.18) * 0.14 - mouseRef.current.y;

      // Brass ribbon independent rotation
      brassCage.rotation.x = elapsedTime * 0.3;
      brassCage.rotation.y = elapsedTime * 0.38;

      // Ring rotations
      ring1.rotation.z = elapsedTime * 0.25;
      ring2.rotation.y = -elapsedTime * 0.22;
      ring3.rotation.x = elapsedTime * 0.18;

      // Particles orbit
      particles.rotation.y = elapsedTime * 0.07;
      particles.rotation.z = elapsedTime * 0.04;

      // Subtle breathing scale pulse on core
      const pulse = 1 + Math.sin(elapsedTime * 1.4) * 0.03;
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
        brassMaterial,
        ringMatGold,
        ringMatSilver,
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
