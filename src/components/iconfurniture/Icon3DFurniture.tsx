'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Palette,
  Sparkles,
  Sliders,
  Check,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Copy,
  Layers,
} from 'lucide-react';

interface Icon3DFurnitureProps {
  interactive?: boolean;
  className?: string;
}

// Curated Luxury Color Palettes
interface ColorSwatch {
  name: string;
  hex: string;
  category: string;
  roughness?: number;
  metalness?: number;
}

const FABRIC_PALETTE: ColorSwatch[] = [
  { name: 'Signature Olive', hex: '#124903', category: 'Icon Signature', roughness: 0.65, metalness: 0.05 },
  { name: 'Ivory Bouclé', hex: '#E5DEC9', category: 'Warm Neutral', roughness: 0.78, metalness: 0.02 },
  { name: 'Smoked Espresso', hex: '#2B1B14', category: 'Deep Earth', roughness: 0.55, metalness: 0.08 },
  { name: 'Tuscan Terracotta', hex: '#A24936', category: 'Warm Earth', roughness: 0.70, metalness: 0.03 },
  { name: 'Obsidian Noir', hex: '#1B1D1F', category: 'Monochrome', roughness: 0.50, metalness: 0.10 },
  { name: 'Champagne Sand', hex: '#D4B886', category: 'Warm Neutral', roughness: 0.62, metalness: 0.04 },
  { name: 'Royal Navy', hex: '#2C3E50', category: 'Deep Marine', roughness: 0.68, metalness: 0.06 },
  { name: 'Sage Botanical', hex: '#6B8E5F', category: 'Icon Signature', roughness: 0.65, metalness: 0.04 },
  { name: 'Venetian Rose', hex: '#A36B6B', category: 'Warm Earth', roughness: 0.72, metalness: 0.03 },
  { name: 'Amber Cognac', hex: '#8B4513', category: 'Deep Earth', roughness: 0.58, metalness: 0.07 },
];

const WOOD_PALETTE: ColorSwatch[] = [
  { name: 'American Dark Walnut', hex: '#2E1C12', category: 'Hardwood', roughness: 0.40, metalness: 0.05 },
  { name: 'Quarter-Sawn White Oak', hex: '#7A5B3E', category: 'Hardwood', roughness: 0.48, metalness: 0.04 },
  { name: 'Charred Ebonized Ash', hex: '#141414', category: 'Hardwood', roughness: 0.35, metalness: 0.08 },
  { name: 'Natural Scandinavian Beech', hex: '#C2A379', category: 'Hardwood', roughness: 0.52, metalness: 0.03 },
  { name: 'Smoked Chestnut', hex: '#4A3222', category: 'Hardwood', roughness: 0.42, metalness: 0.06 },
  { name: 'Roman Travertine Stone', hex: '#C7BDAB', category: 'Stone', roughness: 0.75, metalness: 0.02 },
];

type TextureSheen = 'matte' | 'satin' | 'lustre' | 'polished';

const SHEEN_PRESETS: { id: TextureSheen; label: string; roughness: number; metalness: number }[] = [
  { id: 'matte', label: 'Matte Velvet', roughness: 0.85, metalness: 0.0 },
  { id: 'satin', label: 'Satin Silk', roughness: 0.55, metalness: 0.05 },
  { id: 'lustre', label: 'Semi-Lustre', roughness: 0.35, metalness: 0.12 },
  { id: 'polished', label: 'Polished Lacquer', roughness: 0.15, metalness: 0.18 },
];

export default function Icon3DFurniture({
  interactive = true,
  className = '',
}: Icon3DFurnitureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);

  // Studio UI State
  const [activeTab, setActiveTab] = useState<'fabric' | 'wood'>('fabric');
  const [fabricColor, setFabricColor] = useState<string>('#124903');
  const [fabricColorName, setFabricColorName] = useState<string>('Signature Olive');
  const [woodColor, setWoodColor] = useState<string>('#2E1C12');
  const [woodColorName, setWoodColorName] = useState<string>('American Dark Walnut');
  const [activeSheen, setActiveSheen] = useState<TextureSheen>('satin');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [copiedHex, setCopiedHex] = useState<boolean>(false);

  // Direct mutable refs for 60-120fps Three.js animation loop
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef({ current: 0, target: 0 });
  const fabricTargetColorRef = useRef(new THREE.Color('#124903'));
  const woodTargetColorRef = useRef(new THREE.Color('#2E1C12'));
  const fabricMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const woodMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  // Apply Fabric Color
  const handleFabricColorChange = useCallback((hex: string, name?: string) => {
    setFabricColor(hex);
    setFabricColorName(name || hex.toUpperCase());
    fabricTargetColorRef.current.set(hex);
  }, []);

  // Apply Wood Color
  const handleWoodColorChange = useCallback((hex: string, name?: string) => {
    setWoodColor(hex);
    setWoodColorName(name || hex.toUpperCase());
    woodTargetColorRef.current.set(hex);
  }, []);

  // Apply Sheen
  const handleSheenChange = useCallback((sheenId: TextureSheen) => {
    setActiveSheen(sheenId);
    const preset = SHEEN_PRESETS.find((p) => p.id === sheenId);
    if (!preset) return;

    if (activeTab === 'fabric') {
      fabricMaterialsRef.current.forEach((mat) => {
        mat.roughness = preset.roughness;
        mat.metalness = preset.metalness;
      });
    } else {
      woodMaterialsRef.current.forEach((mat) => {
        mat.roughness = preset.roughness;
        mat.metalness = preset.metalness;
      });
    }
  }, [activeTab]);

  // Reset to Brand Defaults
  const handleResetDefaults = () => {
    handleFabricColorChange('#124903', 'Signature Olive');
    handleWoodColorChange('#2E1C12', 'American Dark Walnut');
    handleSheenChange('satin');
  };

  // Copy Hex to Clipboard
  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(true);
    setTimeout(() => setCopiedHex(false), 1800);
  };

  // Setup Three.js WebGL Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 7.8);

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
                  fabricMat.roughness = 0.65;
                  fabricMat.metalness = 0.05;
                  fabricMat.envMapIntensity = 1.2;
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
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
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

  const activeColor = activeTab === 'fabric' ? fabricColor : woodColor;
  const activeColorName = activeTab === 'fabric' ? fabricColorName : woodColorName;
  const currentPalette = activeTab === 'fabric' ? FABRIC_PALETTE : WOOD_PALETTE;

  return (
    <div className="relative w-full h-full flex flex-col justify-end">
      {/* Loading Skeleton Pulse */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full border-2 border-[#124903]/30 border-t-[#124903] animate-spin" />
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

      {/* Hidden Native Color Input for Custom Hex Selection */}
      <input
        ref={colorInputRef}
        type="color"
        value={activeColor}
        onChange={(e) => {
          const hex = e.target.value;
          if (activeTab === 'fabric') {
            handleFabricColorChange(hex, 'Custom Fabric');
          } else {
            handleWoodColorChange(hex, 'Custom Hardwood');
          }
        }}
        className="sr-only"
        aria-label="Custom color picker"
      />

      {/* ─── BESPOKE ATELIER 3D COLOR STUDIO (SMART & RESPONSIVE DOCK) ─── */}
      <div className="absolute bottom-4 sm:bottom-7 left-1/2 -translate-x-1/2 z-30 pointer-events-auto w-[94vw] max-w-lg sm:max-w-xl flex flex-col items-center select-none">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.96 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="w-full mb-3 bg-[#161616]/90 backdrop-blur-2xl border border-white/15 rounded-3xl p-4 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.6)] text-white relative overflow-hidden"
            >
              {/* Subtle Luxury Top Accent Line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] transition-colors duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${fabricColor}, transparent)`,
                }}
              />

              {/* Header: Title & Part Tabs (Fabric vs Wood) */}
              <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-white transition-colors duration-300 shadow-xs"
                    style={{ background: activeColor }}
                  >
                    <Palette className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-serif font-bold text-white tracking-wide">
                      ATELIER 3D STUDIO
                    </h4>
                    <p className="text-[10px] text-stone-400 font-mono">
                      Bespoke Finishes & Finetuning
                    </p>
                  </div>
                </div>

                {/* Target Part Switcher */}
                <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-0.5">
                  <button
                    onClick={() => setActiveTab('fabric')}
                    className={`px-3 py-1 text-[11px] font-medium rounded-lg transition-all ${
                      activeTab === 'fabric'
                        ? 'bg-[#124903] text-white shadow-xs font-semibold'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    Upholstery
                  </button>
                  <button
                    onClick={() => setActiveTab('wood')}
                    className={`px-3 py-1 text-[11px] font-medium rounded-lg transition-all ${
                      activeTab === 'wood'
                        ? 'bg-[#124903] text-white shadow-xs font-semibold'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    Wood Frame
                  </button>
                </div>
              </div>

              {/* Curated Color Swatches Grid */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-stone-300 tracking-wide uppercase">
                    {activeTab === 'fabric' ? 'Upholstery Palette' : 'Hardwood Finishes'}
                  </span>
                  <span className="text-[11px] font-mono text-[#124903]">
                    {activeColorName}
                  </span>
                </div>

                <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 sm:gap-2.5">
                  {currentPalette.map((swatch) => {
                    const isSelected = activeColor.toLowerCase() === swatch.hex.toLowerCase();
                    return (
                      <button
                        key={swatch.name}
                        onClick={() => {
                          if (activeTab === 'fabric') {
                            handleFabricColorChange(swatch.hex, swatch.name);
                          } else {
                            handleWoodColorChange(swatch.hex, swatch.name);
                          }
                        }}
                        className="group relative flex flex-col items-center gap-1 focus:outline-none"
                        title={`${swatch.name} (${swatch.hex})`}
                      >
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-md relative ${
                            isSelected
                              ? 'scale-105 ring-2 ring-white ring-offset-2 ring-offset-[#161616]'
                              : 'hover:scale-105 opacity-85 hover:opacity-100'
                          }`}
                          style={{ background: swatch.hex }}
                        >
                          {isSelected && <Check className="w-4 h-4 text-white drop-shadow-md" />}
                        </div>
                        <span className="text-[9px] text-stone-400 group-hover:text-stone-200 truncate max-w-[54px] text-center leading-tight">
                          {swatch.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}

                  {/* Custom Spectrum Trigger Button */}
                  <button
                    onClick={() => colorInputRef.current?.click()}
                    className="group relative flex flex-col items-center gap-1 focus:outline-none"
                    title="Choose any custom color"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-md relative bg-gradient-to-tr from-pink-500 via-amber-400 to-cyan-400 hover:scale-105 p-0.5">
                      <div className="w-full h-full bg-[#1A1A1A] rounded-[14px] flex items-center justify-center text-white">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      </div>
                    </div>
                    <span className="text-[9px] text-amber-300/80 truncate max-w-[54px] text-center leading-tight">
                      Custom
                    </span>
                  </button>
                </div>
              </div>

              {/* Texture Sheen Presets */}
              <div className="space-y-2 mb-4 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-stone-300 tracking-wide uppercase flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-stone-400" />
                    Texture & Lustre
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {SHEEN_PRESETS.find((p) => p.id === activeSheen)?.label}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-1.5">
                  {SHEEN_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handleSheenChange(preset.id)}
                      className={`py-1.5 px-2 rounded-xl text-[10px] font-medium transition-all text-center ${
                        activeSheen === preset.id
                          ? 'bg-white/20 text-white border border-white/30 shadow-xs'
                          : 'bg-white/5 text-stone-400 hover:text-stone-200 border border-transparent'
                      }`}
                    >
                      {preset.label.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Actions Bar (Hex display, Copy, Reset, Done) */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10 gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-xl border border-white/10 text-[11px] font-mono text-stone-300 cursor-pointer transition-colors"
                    onClick={() => handleCopyHex(activeColor)}
                    title="Click to copy HEX code"
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: activeColor }}
                    />
                    <span>{activeColor.toUpperCase()}</span>
                    <Copy className="w-3 h-3 text-stone-500 ml-0.5" />
                  </div>

                  {copiedHex && (
                    <span className="text-[10px] text-[#124903] font-semibold animate-pulse">
                      Copied!
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetDefaults}
                    className="flex items-center gap-1 text-[11px] text-stone-400 hover:text-white px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    title="Reset to brand signature defaults"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span className="hidden sm:inline">Reset</span>
                  </button>

                  <button
                    onClick={() => setIsExpanded(false)}
                    className="px-3.5 py-1 rounded-xl text-[11px] font-semibold bg-[#124903] text-white hover:bg-[#1a6305] transition-colors shadow-xs"
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── COMPACT BOTTOM FLOATING ATELIER CAPSULE ─── */}
        <motion.div
          layout
          className="flex items-center gap-2 sm:gap-3 backdrop-blur-2xl bg-[#141414]/90 border border-white/15 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.45)] text-white hover:border-[#124903]/50 transition-colors"
        >
          {/* Active Color Preview Dot with Pulsing Ring */}
          <div className="relative flex items-center justify-center">
            <div
              className="w-5 h-5 rounded-full shadow-md border border-white/20 transition-colors duration-500"
              style={{ background: fabricColor }}
            />
            <div
              className="absolute inset-[-3px] rounded-full border border-white/30 animate-ping opacity-25 pointer-events-none"
              style={{ borderColor: fabricColor }}
            />
          </div>

          {/* Quick Preset Selector Buttons (3 Key Brand Archetypes) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => handleFabricColorChange('#124903', 'Signature Olive')}
              className={`w-4 h-4 rounded-full transition-transform hover:scale-125 focus:outline-none ${
                fabricColor.toLowerCase() === '#124903'
                  ? 'ring-2 ring-white ring-offset-1 ring-offset-[#141414] scale-110'
                  : 'opacity-70 hover:opacity-100'
              }`}
              style={{ background: '#124903' }}
              title="Signature Olive"
              aria-label="Signature Olive"
            />
            <button
              onClick={() => handleFabricColorChange('#E5DEC9', 'Ivory Bouclé')}
              className={`w-4 h-4 rounded-full transition-transform hover:scale-125 focus:outline-none border border-white/20 ${
                fabricColor.toLowerCase() === '#e5dec9'
                  ? 'ring-2 ring-white ring-offset-1 ring-offset-[#141414] scale-110'
                  : 'opacity-70 hover:opacity-100'
              }`}
              style={{ background: '#E5DEC9' }}
              title="Ivory Bouclé"
              aria-label="Ivory Bouclé"
            />
            <button
              onClick={() => handleFabricColorChange('#2B1B14', 'Smoked Espresso')}
              className={`w-4 h-4 rounded-full transition-transform hover:scale-125 focus:outline-none ${
                fabricColor.toLowerCase() === '#2b1b14'
                  ? 'ring-2 ring-white ring-offset-1 ring-offset-[#141414] scale-110'
                  : 'opacity-70 hover:opacity-100'
              }`}
              style={{ background: '#2B1B14' }}
              title="Smoked Espresso"
              aria-label="Smoked Espresso"
            />
          </div>

          {/* Divider */}
          <div className="h-4 w-px bg-white/20" />

          {/* Active Label & Expand Studio Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-200 hover:text-white transition-colors focus:outline-none"
          >
            <span className="font-serif tracking-wide text-[11px] sm:text-xs">
              {fabricColorName}
            </span>
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-stone-300 ml-0.5">
              {isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <Sliders className="w-3 h-3 text-[#124903]" />
              )}
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
