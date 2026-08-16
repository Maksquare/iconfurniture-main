'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

interface Icon3DFurnitureProps {
  interactive?: boolean;
  className?: string;
}

export default function Icon3DFurniture({
  interactive = true,
  className = '',
}: Icon3DFurnitureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentColor, setCurrentColor] = useState<'olive' | 'ivory' | 'walnut'>('olive');
  
  // Direct mutable refs for 60-120fps animation loop without React state overhead
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef({ current: 0, target: 0 });
  const colorTargetRef = useRef(new THREE.Color('#859F3C'));
  const upholsteryMatRef = useRef<THREE.MeshStandardMaterial | null>(null);

  // Color preset palette — Dining Table Wood & Stone Finishes
  const colorPresets = {
    olive: { hex: '#859F3C', roughness: 0.58, metalness: 0.04, label: 'Olive Hardwood' },
    ivory: { hex: '#d6cfc2', roughness: 0.82, metalness: 0.01, label: 'Ivory Travertine' },
    walnut: { hex: '#2c1a0e', roughness: 0.40, metalness: 0.08, label: 'Dark Walnut' },
  };

  const handleColorChange = useCallback((color: 'olive' | 'ivory' | 'walnut') => {
    setCurrentColor(color);
    colorTargetRef.current.set(colorPresets[color].hex);
    if (upholsteryMatRef.current) {
      upholsteryMatRef.current.roughness = colorPresets[color].roughness;
      upholsteryMatRef.current.metalness = colorPresets[color].metalness;
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, High-Efficiency Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 8.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
      precision: 'mediump', // Optimized for mobile and desktop GPU memory bandwidth
    });

    renderer.setSize(width, height);
    // Clamp DPR to 1.6 max to prevent GPU fill-rate choke on 3K/4K/Retina displays
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 2. Master & Chair Groups
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    const chairGroup = new THREE.Group();
    chairGroup.rotation.y = -Math.PI / 7;
    chairGroup.rotation.x = 0.08;
    masterGroup.add(chairGroup);

    // 3. Optimized Lightweight Materials
    const upholsteryMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colorPresets[currentColor].hex),
      roughness: colorPresets[currentColor].roughness,
      metalness: colorPresets[currentColor].metalness,
    });
    upholsteryMatRef.current = upholsteryMaterial;

    const walnutMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#321e12'),
      roughness: 0.35,
      metalness: 0.05,
    });

    const brassMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e0b06b'),
      metalness: 0.9,
      roughness: 0.22,
    });

    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e8ecf2'),
      metalness: 0.94,
      roughness: 0.12,
    });

    // 4. Compressed Geometry Construction (Reduced draw-call & vertex overhead)
    // A. Main Seat Cushion (Curved Lofted Seat)
    const seatGeo = new THREE.CylinderGeometry(1.35, 1.3, 0.42, 32);
    seatGeo.scale(1, 1, 1.08);
    const seatMesh = new THREE.Mesh(seatGeo, upholsteryMaterial);
    seatMesh.position.y = -0.1;
    chairGroup.add(seatMesh);

    // Top Comfort Cushion
    const innerCushionGeo = new THREE.CylinderGeometry(1.22, 1.22, 0.18, 28);
    innerCushionGeo.scale(1, 1, 1.04);
    const innerCushion = new THREE.Mesh(innerCushionGeo, upholsteryMaterial);
    innerCushion.position.y = 0.14;
    chairGroup.add(innerCushion);

    // B. Embracing Curved Backrest
    const backrestGeo = new THREE.TorusGeometry(1.32, 0.36, 18, 44, Math.PI * 1.15);
    const backrestMesh = new THREE.Mesh(backrestGeo, upholsteryMaterial);
    backrestMesh.rotation.x = Math.PI / 2 + 0.15;
    backrestMesh.rotation.z = Math.PI * 0.92;
    backrestMesh.position.set(0, 0.72, 0.14);
    chairGroup.add(backrestMesh);

    // Ergonomic Lumbar Pill
    const lumbarGeo = new THREE.CapsuleGeometry(0.3, 1.05, 12, 18);
    const lumbarMesh = new THREE.Mesh(lumbarGeo, upholsteryMaterial);
    lumbarMesh.rotation.z = Math.PI / 2;
    lumbarMesh.rotation.x = 0.2;
    lumbarMesh.position.set(0, 0.42, -0.68);
    chairGroup.add(lumbarMesh);

    // C. Underseat Base Plinth
    const basePlinthGeo = new THREE.CylinderGeometry(1.15, 1.05, 0.14, 24);
    const basePlinth = new THREE.Mesh(basePlinthGeo, walnutMaterial);
    basePlinth.position.y = -0.36;
    chairGroup.add(basePlinth);

    // D. 4 Tapered Walnut Legs with Brass Ferrules
    const legPositions = [
      { x: -0.82, z: 0.72, rotX: 0.18, rotZ: 0.2 },
      { x: 0.82, z: 0.72, rotX: 0.18, rotZ: -0.2 },
      { x: -0.76, z: -0.72, rotX: -0.22, rotZ: 0.18 },
      { x: 0.76, z: -0.72, rotX: -0.22, rotZ: -0.18 },
    ];

    const legGeo = new THREE.CylinderGeometry(0.062, 0.1, 1.25, 12);
    const ferruleGeo = new THREE.CylinderGeometry(0.063, 0.072, 0.26, 12);

    legPositions.forEach((pos) => {
      const legGroup = new THREE.Group();
      legGroup.position.set(pos.x, -0.42, pos.z);
      legGroup.rotation.x = pos.rotX;
      legGroup.rotation.z = pos.rotZ;

      const legMesh = new THREE.Mesh(legGeo, walnutMaterial);
      legMesh.position.y = -0.62;
      legGroup.add(legMesh);

      const ferruleMesh = new THREE.Mesh(ferruleGeo, brassMaterial);
      ferruleMesh.position.y = -1.12;
      legGroup.add(ferruleMesh);

      chairGroup.add(legGroup);
    });

    // E. Floating Gyroscopic Motion Rings (Reduced segments for high-FPS performance)
    const ringsGroup = new THREE.Group();
    masterGroup.add(ringsGroup);

    const ring1Geo = new THREE.TorusGeometry(2.85, 0.02, 10, 64);
    const ring1 = new THREE.Mesh(ring1Geo, brassMaterial);
    ring1.rotation.x = Math.PI / 2.4;
    ring1.rotation.y = 0.25;
    ringsGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(3.15, 0.018, 10, 64);
    const ring2 = new THREE.Mesh(ring2Geo, chromeMaterial);
    ring2.rotation.x = -Math.PI / 3.1;
    ring2.rotation.z = Math.PI / 5;
    ringsGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(3.45, 0.015, 10, 64);
    const ring3 = new THREE.Mesh(ring3Geo, brassMaterial);
    ring3.rotation.x = Math.PI / 3.8;
    ring3.rotation.y = -Math.PI / 3.2;
    ringsGroup.add(ring3);

    // F. Ambient Floating Warm Stardust Particles
    const particleCount = 48; // Compressed for minimal vertex shader load
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 2.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color('#f6bd60'),
      size: 0.055,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false, // Performance boost
    });

    const particles = new THREE.Points(particleGeo, particleMaterial);
    masterGroup.add(particles);

    // G. Lighting Setup (Optimized with minimal point light attenuation)
    const ambientLight = new THREE.AmbientLight(0xfff8f0, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const warmFillLight = new THREE.DirectionalLight(0xffe8d6, 1.8);
    warmFillLight.position.set(-6, -2, 4);
    scene.add(warmFillLight);

    const rimLight = new THREE.PointLight(0xd4a373, 2.8, 16);
    rimLight.position.set(0, 2, -3.5);
    scene.add(rimLight);

    // 5. Passive High-Performance Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = x * 0.45;
      mouseRef.current.targetY = y * 0.3;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const winH = window.innerHeight || 800;
      scrollRef.current.target = Math.min(Math.max(scrollY / winH, 0), 1.6);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial scroll position
    handleScroll();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // 6. Ultra-Smooth 60-120fps Animation Loop with Delta Time & Lerp Interpolation
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsedTime = clock.getElapsedTime();

      // Skip heavy operations if user has scrolled far down past the 3D showcase
      if (scrollRef.current.current > 1.45 && scrollRef.current.target > 1.45) {
        return;
      }

      // Smooth Mouse Lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Smooth Frame-Rate-Independent Scroll Lerp (Eliminates all scroll stutter/lag)
      scrollRef.current.current += (scrollRef.current.target - scrollRef.current.current) * 0.08;
      const s = scrollRef.current.current;

      // Color Smooth Interpolation
      if (upholsteryMaterial) {
        upholsteryMaterial.color.lerp(colorTargetRef.current, 0.1);
      }

      // Dynamic Chair Parallax & Natural Breathing Float
      chairGroup.rotation.y = -Math.PI / 7 + elapsedTime * 0.12 + mouseRef.current.x * 0.7;
      chairGroup.rotation.x = 0.08 + Math.sin(elapsedTime * 0.7) * 0.035 - mouseRef.current.y * 0.45;
      chairGroup.position.y = Math.sin(elapsedTime * 1.1) * 0.1;

      // Ring Rotations
      ring1.rotation.z = elapsedTime * 0.18;
      ring2.rotation.y = -elapsedTime * 0.15;
      ring3.rotation.x = elapsedTime * 0.12;

      // Stardust Particles Gentle Orbit
      particles.rotation.y = elapsedTime * 0.05;

      // Scroll Transitions (Position, Depth & Opacity)
      masterGroup.position.y = -s * 2.5;
      masterGroup.position.z = -s * 2.2;
      masterGroup.scale.setScalar(Math.max(1 - s * 0.24, 0.001));

      // Fade canvas out gracefully when scrolled down
      if (renderer.domElement) {
        const opacity = Math.max(1 - s * 0.95, 0);
        renderer.domElement.style.opacity = opacity.toFixed(2);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 7. Complete Memory & GPU Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(animationFrameId);

      [
        seatGeo,
        innerCushionGeo,
        backrestGeo,
        lumbarGeo,
        basePlinthGeo,
        legGeo,
        ferruleGeo,
        ring1Geo,
        ring2Geo,
        ring3Geo,
        particleGeo,
      ].forEach((geo) => geo.dispose());

      [
        upholsteryMaterial,
        walnutMaterial,
        brassMaterial,
        chromeMaterial,
        particleMaterial,
      ].forEach((mat) => mat.dispose());

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  return (
    <div className="relative w-full h-full">
      <div
        ref={containerRef}
        className={`w-full h-full pointer-events-none select-none transition-opacity duration-300 ${className}`}
        aria-hidden="true"
      />

      {/* Floating 3D Wood Finish Switcher Capsule */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex items-center gap-2.5 backdrop-blur-md px-4 py-2 rounded-full border shadow-lg transition-all duration-500"
        style={{
          background:
            currentColor === 'olive'
              ? 'rgba(133,159,60,0.12)'
              : currentColor === 'ivory'
              ? 'rgba(214,207,194,0.18)'
              : 'rgba(44,26,14,0.18)',
          borderColor:
            currentColor === 'olive'
              ? 'rgba(133,159,60,0.4)'
              : currentColor === 'ivory'
              ? 'rgba(180,170,155,0.4)'
              : 'rgba(133,159,60,0.3)',
        }}
      >
        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mr-0.5 pl-0.5 select-none">
          Wood Finish:
        </span>

        {/* Olive Hardwood */}
        <button
          onClick={() => handleColorChange('olive')}
          className="relative w-5 h-5 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 focus:outline-none"
          style={{ background: '#859F3C' }}
          title="Olive Hardwood (Brand Signature)"
          aria-label="Olive Hardwood"
        >
          {currentColor === 'olive' && (
            <span
              className="absolute inset-[-3px] rounded-full border-2 border-[#859F3C] shadow-[0_0_8px_rgba(133,159,60,0.7)] transition-all duration-300"
            />
          )}
        </button>

        {/* Ivory Travertine */}
        <button
          onClick={() => handleColorChange('ivory')}
          className="relative w-5 h-5 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 focus:outline-none border border-stone-300"
          style={{ background: '#d6cfc2' }}
          title="Ivory Travertine"
          aria-label="Ivory Travertine"
        >
          {currentColor === 'ivory' && (
            <span
              className="absolute inset-[-3px] rounded-full border-2 border-[#859F3C] shadow-[0_0_8px_rgba(133,159,60,0.7)] transition-all duration-300"
            />
          )}
        </button>

        {/* Dark Walnut */}
        <button
          onClick={() => handleColorChange('walnut')}
          className="relative w-5 h-5 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 focus:outline-none"
          style={{ background: '#2c1a0e' }}
          title="Dark Walnut"
          aria-label="Dark Walnut"
        >
          {currentColor === 'walnut' && (
            <span
              className="absolute inset-[-3px] rounded-full border-2 border-[#859F3C] shadow-[0_0_8px_rgba(133,159,60,0.7)] transition-all duration-300"
            />
          )}
        </button>

        {/* Live active label */}
        <span
          className="ml-1 text-[10px] font-semibold uppercase tracking-wider transition-all duration-300 select-none"
          style={{ color: '#859F3C' }}
        >
          {colorPresets[currentColor].label}
        </span>
      </div>
    </div>
  );
}
