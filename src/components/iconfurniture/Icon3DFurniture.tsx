'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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
  const [isLoading, setIsLoading] = useState(true);

  // Direct mutable refs for 60-120fps animation loop without React state overhead
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef({ current: 0, target: 0 });
  const colorTargetRef = useRef(new THREE.Color('#859F3C'));
  const fabricMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const woodMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  // Color preset palette — Luxury Dining Chair Finishes
  const colorPresets = {
    olive: {
      fabricHex: '#859F3C',
      fabricRoughness: 0.65,
      fabricMetalness: 0.05,
      woodHex: '#3a2414',
      label: 'Olive Signature',
    },
    ivory: {
      fabricHex: '#d8d1c5',
      fabricRoughness: 0.75,
      fabricMetalness: 0.02,
      woodHex: '#4a3220',
      label: 'Ivory Bouclé',
    },
    walnut: {
      fabricHex: '#34251a',
      fabricRoughness: 0.55,
      fabricMetalness: 0.08,
      woodHex: '#22140a',
      label: 'Dark Walnut',
    },
  };

  const handleColorChange = useCallback((color: 'olive' | 'ivory' | 'walnut') => {
    setCurrentColor(color);
    colorTargetRef.current.set(colorPresets[color].fabricHex);
    fabricMaterialsRef.current.forEach((mat) => {
      mat.roughness = colorPresets[color].fabricRoughness;
      mat.metalness = colorPresets[color].fabricMetalness;
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, High-Efficiency Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 7.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
      precision: 'highp',
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 2. Master & Chair Groups
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    const chairGroup = new THREE.Group();
    chairGroup.rotation.y = -Math.PI / 6.5;
    chairGroup.rotation.x = 0.06;
    masterGroup.add(chairGroup);

    // Reset material refs
    fabricMaterialsRef.current = [];
    woodMaterialsRef.current = [];

    // 3. Load Real GLB 3D Chair Model
    const loader = new GLTFLoader();
    const glbUrl = '/models/dining_chair_241120.glb';

    loader.load(
      glbUrl,
      (gltf) => {
        const model = gltf.scene;

        // Compute Bounding Box to scale & center the model accurately
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);

        // Center geometry
        model.position.x = -center.x;
        model.position.y = -center.y;
        model.position.z = -center.z;

        // Normalize scale to fit nicely in the viewport (~2.8 units tall)
        const maxDim = Math.max(size.x, size.y, size.z);
        const scaleFactor = maxDim > 0 ? 3.0 / maxDim : 1;
        model.scale.setScalar(scaleFactor);

        // Enhance materials & store refs for live finish switching
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            const materials = Array.isArray(mesh.material)
              ? mesh.material
              : [mesh.material];

            materials.forEach((mat) => {
              if (mat instanceof THREE.MeshStandardMaterial) {
                const matName = (mat.name || '').toLowerCase();

                if (matName.includes('fabric') || matName.includes('cloth') || matName.includes('leather') || matName.includes('seat')) {
                  // Clone so we can tint cleanly
                  const fabricMat = mat.clone();
                  fabricMat.color.set(colorPresets[currentColor].fabricHex);
                  fabricMat.roughness = colorPresets[currentColor].fabricRoughness;
                  fabricMat.metalness = colorPresets[currentColor].fabricMetalness;
                  fabricMat.envMapIntensity = 1.2;
                  mesh.material = fabricMat;
                  fabricMaterialsRef.current.push(fabricMat);
                } else if (matName.includes('wood') || matName.includes('leg') || matName.includes('frame')) {
                  const woodMat = mat.clone();
                  woodMat.roughness = 0.4;
                  woodMat.metalness = 0.05;
                  woodMat.envMapIntensity = 1.0;
                  mesh.material = woodMat;
                  woodMaterialsRef.current.push(woodMat);
                } else {
                  // General default standard material
                  const customMat = mat.clone();
                  customMat.roughness = 0.55;
                  mesh.material = customMat;
                  fabricMaterialsRef.current.push(customMat);
                }
              }
            });
          }
        });

        const modelWrapper = new THREE.Group();
        modelWrapper.add(model);
        // Slightly offset chair so front seat faces camera invitingly
        modelWrapper.rotation.y = 0.15;
        chairGroup.add(modelWrapper);

        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.error('Error loading GLB chair model:', error);
        setIsLoading(false);
      }
    );

    // 4. Luxury Aesthetic Enhancements (Brass Rings & Stardust Particles)
    const brassMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e0b06b'),
      metalness: 0.92,
      roughness: 0.2,
    });

    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e8ecf2'),
      metalness: 0.95,
      roughness: 0.1,
    });

    // Floating Gyroscopic Orbit Rings
    const ringsGroup = new THREE.Group();
    masterGroup.add(ringsGroup);

    const ring1Geo = new THREE.TorusGeometry(2.9, 0.018, 10, 64);
    const ring1 = new THREE.Mesh(ring1Geo, brassMaterial);
    ring1.rotation.x = Math.PI / 2.3;
    ring1.rotation.y = 0.22;
    ringsGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(3.2, 0.015, 10, 64);
    const ring2 = new THREE.Mesh(ring2Geo, chromeMaterial);
    ring2.rotation.x = -Math.PI / 3.2;
    ring2.rotation.z = Math.PI / 5.2;
    ringsGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(3.5, 0.014, 10, 64);
    const ring3 = new THREE.Mesh(ring3Geo, brassMaterial);
    ring3.rotation.x = Math.PI / 3.6;
    ring3.rotation.y = -Math.PI / 3.1;
    ringsGroup.add(ring3);

    // Ambient Stardust Particles
    const particleCount = 52;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color('#f6bd60'),
      size: 0.052,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMaterial);
    masterGroup.add(particles);

    // 5. Studio Lighting Setup (Rich Luxury Warm & Crisp Key Lights)
    const ambientLight = new THREE.AmbientLight(0xfff9f2, 2.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const warmFillLight = new THREE.DirectionalLight(0xffecd6, 1.9);
    warmFillLight.position.set(-6, -2, 4);
    scene.add(warmFillLight);

    const topSoftLight = new THREE.DirectionalLight(0xffffff, 1.4);
    topSoftLight.position.set(0, 8, 2);
    scene.add(topSoftLight);

    const rimLight = new THREE.PointLight(0xd4a373, 2.6, 16);
    rimLight.position.set(0, 2, -3.5);
    scene.add(rimLight);

    // 6. Interactive Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = x * 0.42;
      mouseRef.current.targetY = y * 0.28;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const winH = window.innerHeight || 800;
      scrollRef.current.target = Math.min(Math.max(scrollY / winH, 0), 1.6);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

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

    // 7. Ultra-Smooth 60-120fps Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Skip heavy operations if user has scrolled past
      if (scrollRef.current.current > 1.45 && scrollRef.current.target > 1.45) {
        return;
      }

      // Smooth Mouse Lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Smooth Frame-Rate-Independent Scroll Lerp
      scrollRef.current.current += (scrollRef.current.target - scrollRef.current.current) * 0.08;
      const s = scrollRef.current.current;

      // Color Smooth Interpolation
      fabricMaterialsRef.current.forEach((mat) => {
        mat.color.lerp(colorTargetRef.current, 0.08);
      });

      // Dynamic Chair Parallax & Natural Breathing Float
      chairGroup.rotation.y = -Math.PI / 6.5 + elapsedTime * 0.1 + mouseRef.current.x * 0.65;
      chairGroup.rotation.x = 0.06 + Math.sin(elapsedTime * 0.7) * 0.03 - mouseRef.current.y * 0.4;
      chairGroup.position.y = Math.sin(elapsedTime * 1.1) * 0.08;

      // Ring Rotations
      ring1.rotation.z = elapsedTime * 0.16;
      ring2.rotation.y = -elapsedTime * 0.13;
      ring3.rotation.x = elapsedTime * 0.11;

      // Stardust Particles Gentle Orbit
      particles.rotation.y = elapsedTime * 0.04;

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

    // 8. Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(animationFrameId);

      [ring1Geo, ring2Geo, ring3Geo, particleGeo].forEach((geo) => geo.dispose());
      [brassMaterial, chromeMaterial, particleMaterial].forEach((mat) => mat.dispose());

      fabricMaterialsRef.current.forEach((mat) => mat.dispose());
      woodMaterialsRef.current.forEach((mat) => mat.dispose());

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  return (
    <div className="relative w-full h-full">
      {/* Loading Skeleton Pulse */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full border-2 border-[#859F3C]/30 border-t-[#859F3C] animate-spin" />
        </div>
      )}

      <div
        ref={containerRef}
        className={`w-full h-full pointer-events-none select-none transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        aria-hidden="true"
      />

      {/* Floating 3D Wood & Upholstery Finish Switcher Capsule */}
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
          Finish:
        </span>

        {/* Olive Signature */}
        <button
          onClick={() => handleColorChange('olive')}
          className="relative w-5 h-5 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 focus:outline-none"
          style={{ background: '#859F3C' }}
          title="Olive Signature (Brand Finish)"
          aria-label="Olive Signature"
        >
          {currentColor === 'olive' && (
            <span className="absolute inset-[-3px] rounded-full border-2 border-[#859F3C] shadow-[0_0_8px_rgba(133,159,60,0.7)] transition-all duration-300" />
          )}
        </button>

        {/* Ivory Bouclé */}
        <button
          onClick={() => handleColorChange('ivory')}
          className="relative w-5 h-5 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 focus:outline-none border border-stone-300"
          style={{ background: '#d8d1c5' }}
          title="Ivory Bouclé"
          aria-label="Ivory Bouclé"
        >
          {currentColor === 'ivory' && (
            <span className="absolute inset-[-3px] rounded-full border-2 border-[#859F3C] shadow-[0_0_8px_rgba(133,159,60,0.7)] transition-all duration-300" />
          )}
        </button>

        {/* Dark Walnut */}
        <button
          onClick={() => handleColorChange('walnut')}
          className="relative w-5 h-5 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 focus:outline-none"
          style={{ background: '#34251a' }}
          title="Dark Walnut"
          aria-label="Dark Walnut"
        >
          {currentColor === 'walnut' && (
            <span className="absolute inset-[-3px] rounded-full border-2 border-[#859F3C] shadow-[0_0_8px_rgba(133,159,60,0.7)] transition-all duration-300" />
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
