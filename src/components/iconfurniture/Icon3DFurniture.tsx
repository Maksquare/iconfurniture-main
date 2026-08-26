'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Direct mutable refs for 60-120fps Three.js animation loop
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef({ current: 0, target: 0 });
  const fabricTargetColorRef = useRef(new THREE.Color('#E5DEC9'));
  const woodTargetColorRef = useRef(new THREE.Color('#C7BDAB'));
  const fabricMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const woodMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  // Setup Three.js WebGL Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    
    // Dynamic camera positioning based on aspect ratio to guarantee perfect framing on mobile portrait & desktop
    const updateCameraForViewport = (w: number, h: number) => {
      const aspect = w / h;
      camera.aspect = aspect;
      if (aspect < 0.75) {
        // Mobile portrait: lift chair up and zoom out slightly so legs stay clear of bottom controls
        camera.position.set(0, 0.75, 10.4);
      } else if (aspect < 1.1) {
        // Tablet / square screen
        camera.position.set(0, 0.55, 9.0);
      } else {
        // Desktop landscape
        camera.position.set(0, 0.35, 7.8);
      }
      camera.updateProjectionMatrix();
    };
    updateCameraForViewport(width, height);

    // 2. High Efficiency WebGL Renderer
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

    // 3. Hierarchy Groups
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    const chairGroup = new THREE.Group();
    chairGroup.rotation.y = -Math.PI / 6.5;
    chairGroup.rotation.x = 0.06;
    masterGroup.add(chairGroup);

    // Reset material refs
    fabricMaterialsRef.current = [];
    woodMaterialsRef.current = [];

    // 4. Load Real GLB 3D Chair Model
    const loader = new GLTFLoader();
    const glbUrl = '/models/dining_chair_241120.glb';

    loader.load(
      glbUrl,
      (gltf) => {
        const model = gltf.scene;

        // Auto-center geometry bounding box
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);

        model.position.x = -center.x;
        model.position.y = -center.y;
        model.position.z = -center.z;

        // Scale to fit viewport (~3.0 units)
        const maxDim = Math.max(size.x, size.y, size.z);
        const scaleFactor = maxDim > 0 ? 3.0 / maxDim : 1;
        model.scale.setScalar(scaleFactor);

        // Assign and configure materials
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

            materials.forEach((mat) => {
              if (mat instanceof THREE.MeshStandardMaterial) {
                const matName = (mat.name || '').toLowerCase();

                if (
                  matName.includes('fabric') ||
                  matName.includes('cloth') ||
                  matName.includes('leather') ||
                  matName.includes('seat')
                ) {
                  const fabricMat = mat.clone();
                  fabricMat.color.set(fabricTargetColorRef.current);
                  fabricMat.roughness = 0.78;
                  fabricMat.metalness = 0.02;
                  fabricMat.envMapIntensity = 1.15;
                  mesh.material = fabricMat;
                  fabricMaterialsRef.current.push(fabricMat);
                } else if (
                  matName.includes('wood') ||
                  matName.includes('leg') ||
                  matName.includes('frame')
                ) {
                  const woodMat = mat.clone();
                  woodMat.color.set(woodTargetColorRef.current);
                  woodMat.roughness = 0.45;
                  woodMat.metalness = 0.05;
                  woodMat.envMapIntensity = 1.0;
                  mesh.material = woodMat;
                  woodMaterialsRef.current.push(woodMat);
                } else {
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

    // 5. Studio Ground Contact Shadow Plinth (Soft luxury showroom floor shadow)
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shadowCtx = shadowCanvas.getContext('2d');
    if (shadowCtx) {
      const gradient = shadowCtx.createRadialGradient(128, 128, 0, 128, 128, 120);
      gradient.addColorStop(0, 'rgba(20, 18, 15, 0.45)');
      gradient.addColorStop(0.35, 'rgba(30, 25, 20, 0.22)');
      gradient.addColorStop(0.7, 'rgba(40, 35, 30, 0.06)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      shadowCtx.fillStyle = gradient;
      shadowCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(3.8, 3.8);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.85,
    });
    const groundShadow = new THREE.Mesh(shadowGeo, shadowMat);
    groundShadow.rotation.x = -Math.PI / 2;
    groundShadow.position.y = -1.55;
    masterGroup.add(groundShadow);

    // 6. Ambient Floating Warm Micro-Particles
    const particleCount = 36;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.2 + Math.random() * 2.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color('#f6bd60'),
      size: 0.045,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMaterial);
    masterGroup.add(particles);

    // 7. Studio Lights
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

    // 8. Event Listeners
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
        updateCameraForViewport(w, h);
        renderer.setSize(w, h);
      }, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // 9. Ultra-Smooth Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      if (scrollRef.current.current > 1.45 && scrollRef.current.target > 1.45) {
        return;
      }

      // Smooth Mouse Lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Smooth Scroll Lerp
      scrollRef.current.current += (scrollRef.current.target - scrollRef.current.current) * 0.08;
      const s = scrollRef.current.current;

      // Color Smooth Interpolation (Fabric & Wood)
      fabricMaterialsRef.current.forEach((mat) => {
        mat.color.lerp(fabricTargetColorRef.current, 0.08);
      });
      woodMaterialsRef.current.forEach((mat) => {
        mat.color.lerp(woodTargetColorRef.current, 0.08);
      });

      // Natural Dynamic Chair Float & Parallax
      chairGroup.rotation.y = -Math.PI / 6.5 + elapsedTime * 0.1 + mouseRef.current.x * 0.65;
      chairGroup.rotation.x = 0.06 + Math.sin(elapsedTime * 0.7) * 0.03 - mouseRef.current.y * 0.4;
      chairGroup.position.y = Math.sin(elapsedTime * 1.1) * 0.08;

      // Ambient Particles Orbit
      particles.rotation.y = elapsedTime * 0.03;

      // Scroll Transitions
      masterGroup.position.y = -s * 2.5;
      masterGroup.position.z = -s * 2.2;
      masterGroup.scale.setScalar(Math.max(1 - s * 0.24, 0.001));

      if (renderer.domElement) {
        const opacity = Math.max(1 - s * 0.95, 0);
        renderer.domElement.style.opacity = opacity.toFixed(2);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(animationFrameId);

      [shadowGeo, particleGeo].forEach((geo) => geo.dispose());
      [shadowMat, shadowTexture, particleMaterial].forEach((res) => res.dispose());

      fabricMaterialsRef.current.forEach((mat) => mat.dispose());
      woodMaterialsRef.current.forEach((mat) => mat.dispose());

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  return (
    <div className="relative w-full h-full flex flex-col justify-end">
      {/* Loading Skeleton Pulse */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full border-2 border-[#869e32]/30 border-t-[#869e32] animate-spin" />
        </div>
      )}

      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={containerRef}
        className={`w-full h-full pointer-events-none select-none transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        aria-hidden="true"
      />
    </div>
  );
}
