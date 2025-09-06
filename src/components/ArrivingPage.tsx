import React, { useRef, useEffect, useState } from 'react';
// The error "Cannot find module 'three'..." suggests that the type definitions are missing.
// Please run `npm install @types/three` or `yarn add @types/three` to fix this.
import * as THREE from 'three';

/**
 * The PortfolioSite component is defined outside of PortfolioLanding to prevent it from being
 * recreated on every render of the parent component. This is a standard React best practice
 * that improves performance and prevents unexpected state loss.
 */
const PortfolioSite = ({ onReplay }: { onReplay: () => void }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
    <div className="absolute inset-0 bg-black/20"></div>
    <div className="relative z-10 container mx-auto px-6 py-20">
      <div className="text-center mb-20">
        <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
          Welcome to My Portfolio
        </h1>
        <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Crafting extraordinary digital experiences with precision, creativity, and cutting-edge technology
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-10 mb-20">
        <div className="group bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">⚡</span>
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-4 text-cyan-400">Frontend Mastery</h3>
          <p className="text-gray-300 text-lg leading-relaxed">Creating lightning-fast, responsive interfaces that captivate users and deliver exceptional experiences across all devices.</p>
        </div>

        <div className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🎬</span>
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-4 text-purple-400">3D Cinematics</h3>
          <p className="text-gray-300 text-lg leading-relaxed">Bringing ideas to life with immersive 3D worlds, smooth animations, and cinematic experiences that leave lasting impressions.</p>
        </div>

        <div className="group bg-gradient-to-br from-pink-500/10 to-rose-500/10 backdrop-blur-lg rounded-2xl p-8 border border-pink-500/20 hover:border-pink-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">✨</span>
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-4 text-pink-400">Design Innovation</h3>
          <p className="text-gray-300 text-lg leading-relaxed">Designing intuitive interfaces that seamlessly blend functionality with stunning aesthetics and user-centered experiences.</p>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onReplay}
          className="group relative bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-4 px-12 rounded-2xl transition-all duration-500 transform hover:scale-110 text-xl shadow-2xl"
        >
          <span className="relative z-10">Replay Intro</span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
        </button>
      </div>
    </div>
  </div>
);

const PortfolioLanding = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number | null>(null);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);

  const handleSkip = () => {
    // Immediately transition to the portfolio view
    setIntroFinished(true);
    setShowPortfolio(true);
  };

  useEffect(() => {
    if (!mountRef.current || introFinished) return;

    const mount = mountRef.current;

    // Enhanced scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000011);
    scene.fog = new THREE.Fog(0x000011, 20, 100);

    // Camera with better perspective
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 8, 15);
    camera.lookAt(0, 2, 0);

    // Enhanced renderer with better settings
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputEncoding = THREE.sRGBEncoding;
    mount.appendChild(renderer.domElement);

    // Futuristic ground with grid pattern
    const groundGroup = new THREE.Group();
    
    // Main ground
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x001122,
      transparent: true,
      opacity: 0.8,
      shininess: 100
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    groundGroup.add(ground);

    // Grid lines
    const gridHelper = new THREE.GridHelper(100, 50, 0x00ffff, 0x003366);
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.3;
    groundGroup.add(gridHelper);

    scene.add(groundGroup);

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.4);
    scene.add(ambientLight);

    // Key light (dramatic)
    const keyLight = new THREE.DirectionalLight(0x4080ff, 2);
    keyLight.position.set(10, 20, 10);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 4096;
    keyLight.shadow.mapSize.height = 4096;
    keyLight.shadow.camera.near = 0.1;
    keyLight.shadow.camera.far = 50;
    keyLight.shadow.camera.left = -20;
    keyLight.shadow.camera.right = 20;
    keyLight.shadow.camera.top = 20;
    keyLight.shadow.camera.bottom = -20;
    scene.add(keyLight);

    // Rim light
    const rimLight = new THREE.DirectionalLight(0xff4080, 1);
    rimLight.position.set(-10, 10, -10);
    scene.add(rimLight);

    // Point lights for atmosphere
    const pointLight1 = new THREE.PointLight(0x00ffff, 1, 30);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff0080, 0.8, 25);
    pointLight2.position.set(-8, 3, -5);
    scene.add(pointLight2);

    // Particle system for atmosphere
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 50;
      particlePositions[i * 3 + 1] = Math.random() * 20 + 5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Dramatic light beam
    const beamGeometry = new THREE.ConeGeometry(3, 25, 16, 1, true);
    const beamMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00ffff, 
      transparent: true, 
      opacity: 0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    const lightBeam = new THREE.Mesh(beamGeometry, beamMaterial);
    lightBeam.position.set(0, 15, 0);
    lightBeam.rotation.x = Math.PI;
    scene.add(lightBeam);

    // Create detailed anime character
    const characterGroup = new THREE.Group();
    
    // Body with better proportions
    const bodyGeometry = new THREE.BoxGeometry(1.2, 1.8, 0.6);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2a4d6b,
      shininess: 30,
      specular: 0x111111
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 1.8;
    body.castShadow = true;
    characterGroup.add(body);

    // Chest detail
    const chestGeometry = new THREE.BoxGeometry(1.0, 0.3, 0.65);
    const chestMaterial = new THREE.MeshPhongMaterial({ color: 0x1a3a5b });
    const chest = new THREE.Mesh(chestGeometry, chestMaterial);
    chest.position.y = 2.2;
    chest.castShadow = true;
    characterGroup.add(chest);

    // Head with better shape
    const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffdbac,
      shininess: 10
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 3.2;
    head.scale.set(1, 1.1, 1);
    head.castShadow = true;
    characterGroup.add(head);

    // Hair with spiky anime style
    const hairGroup = new THREE.Group();
    
    // Base hair
    const baseHairGeometry = new THREE.SphereGeometry(0.52, 16, 16);
    const hairMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1a1a2e,
      shininess: 80
    });
    const baseHair = new THREE.Mesh(baseHairGeometry, hairMaterial);
    baseHair.position.y = 3.25;
    baseHair.scale.set(1, 1.2, 1);
    baseHair.castShadow = true;
    hairGroup.add(baseHair);

    // Hair spikes
    for (let i = 0; i < 8; i++) {
      const spikeGeometry = new THREE.ConeGeometry(0.1, 0.4, 6);
      const spike = new THREE.Mesh(spikeGeometry, hairMaterial);
      const angle = (i / 8) * Math.PI * 2;
      spike.position.x = Math.cos(angle) * 0.4;
      spike.position.z = Math.sin(angle) * 0.4;
      spike.position.y = 3.6;
      spike.rotation.x = Math.random() * 0.3 - 0.15;
      spike.rotation.z = Math.random() * 0.3 - 0.15;
      spike.castShadow = true;
      hairGroup.add(spike);
    }
    
    characterGroup.add(hairGroup);

    // Anime-style eyes
    const eyeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const eyeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x00ff88,
      emissive: 0x002211
    });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.18, 3.25, 0.42);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.18, 3.25, 0.42);
    characterGroup.add(leftEye);
    characterGroup.add(rightEye);

    // Eye pupils
    const pupilGeometry = new THREE.SphereGeometry(0.04, 8, 8);
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(-0.18, 3.25, 0.46);
    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.set(0.18, 3.25, 0.46);
    characterGroup.add(leftPupil);
    characterGroup.add(rightPupil);

    // Arms with better proportions
    const armGeometry = new THREE.BoxGeometry(0.4, 1.2, 0.4);
    const armMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffdbac,
      shininess: 10
    });
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.9, 1.8, 0);
    leftArm.rotation.z = 0.2;
    leftArm.castShadow = true;
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.9, 1.8, 0);
    rightArm.rotation.z = -0.2;
    rightArm.castShadow = true;
    characterGroup.add(leftArm);
    characterGroup.add(rightArm);

    // Shoulder pads
    const shoulderGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const shoulderMaterial = new THREE.MeshPhongMaterial({ color: 0x2a4d6b });
    const leftShoulder = new THREE.Mesh(shoulderGeometry, shoulderMaterial);
    leftShoulder.position.set(-0.7, 2.4, 0);
    leftShoulder.castShadow = true;
    const rightShoulder = new THREE.Mesh(shoulderGeometry, shoulderMaterial);
    rightShoulder.position.set(0.7, 2.4, 0);
    rightShoulder.castShadow = true;
    characterGroup.add(leftShoulder);
    characterGroup.add(rightShoulder);

    // Legs with better shape
    const legGeometry = new THREE.BoxGeometry(0.5, 1.4, 0.5);
    const legMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1a1a2e,
      shininess: 20
    });
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.35, 0.5, 0);
    leftLeg.castShadow = true;
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.35, 0.5, 0);
    rightLeg.castShadow = true;
    characterGroup.add(leftLeg);
    characterGroup.add(rightLeg);

    // Boots
    const bootGeometry = new THREE.BoxGeometry(0.6, 0.3, 0.8);
    const bootMaterial = new THREE.MeshPhongMaterial({ color: 0x0a0a0a });
    const leftBoot = new THREE.Mesh(bootGeometry, bootMaterial);
    leftBoot.position.set(-0.35, -0.15, 0.1);
    leftBoot.castShadow = true;
    const rightBoot = new THREE.Mesh(bootGeometry, bootMaterial);
    rightBoot.position.set(0.35, -0.15, 0.1);
    rightBoot.castShadow = true;
    characterGroup.add(leftBoot);
    characterGroup.add(rightBoot);

    characterGroup.position.set(0, 25, 0); // Start high up
    scene.add(characterGroup);

    // Futuristic gun with more detail
    const gunGroup = new THREE.Group();
    
    // Main gun body
    const gunBodyGeometry = new THREE.BoxGeometry(1.2, 0.25, 0.15);
    const gunBodyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x333366,
      shininess: 100,
      specular: 0x666699
    });
    const gunBody = new THREE.Mesh(gunBodyGeometry, gunBodyMaterial);
    gunGroup.add(gunBody);

    // Gun details
    const detailGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.18);
    const detailMaterial = new THREE.MeshPhongMaterial({ color: 0x666699 });
    const detail1 = new THREE.Mesh(detailGeometry, detailMaterial);
    detail1.position.set(0.2, 0.08, 0);
    gunGroup.add(detail1);

    // Barrel
    const barrelGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 12);
    const barrelMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x666699,
      shininess: 150
    });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(0.8, 0, 0);
    gunGroup.add(barrel);

    // Muzzle
    const muzzleGeometry = new THREE.CylinderGeometry(0.06, 0.04, 0.1, 8);
    const muzzleMaterial = new THREE.MeshPhongMaterial({ color: 0x444477 });
    const muzzle = new THREE.Mesh(muzzleGeometry, muzzleMaterial);
    muzzle.rotation.z = Math.PI / 2;
    muzzle.position.set(1.15, 0, 0);
    gunGroup.add(muzzle);

    // Scope
    const scopeGeometry = new THREE.CylinderGeometry(0.06, 0.06, 0.4, 12);
    const scopeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x444477,
      shininess: 80
    });
    const scope = new THREE.Mesh(scopeGeometry, scopeMaterial);
    scope.rotation.z = Math.PI / 2;
    scope.position.set(0.2, 0.15, 0);
    gunGroup.add(scope);

    // Scope lenses
    const lensGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.02, 12);
    const lensMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x88ccff,
      transparent: true,
      opacity: 0.8
    });
    const lens1 = new THREE.Mesh(lensGeometry, lensMaterial);
    lens1.rotation.z = Math.PI / 2;
    lens1.position.set(0.39, 0.15, 0);
    const lens2 = new THREE.Mesh(lensGeometry, lensMaterial);
    lens2.rotation.z = Math.PI / 2;
    lens2.position.set(0.01, 0.15, 0);
    gunGroup.add(lens1);
    gunGroup.add(lens2);

    gunGroup.position.set(0.8, 2.0, 0);
    gunGroup.rotation.y = -0.1;
    gunGroup.visible = false;
    characterGroup.add(gunGroup);

    let animationStarted = false;
    const animationTimings = {
      lightRayDuration: 1.5,
      landingDuration: 2.5,
      cameraMoveDuration: 6.0,
      gunAppearDuration: 2.5,
      aimingDuration: 3.0,
      flashDelay: 300,
      autoStartDelay: 1500,
    };
    const timeline = { time: 0, phase: 'waiting' };

    // Start animation function
    const startAnimation = () => {
      if (animationStarted) return;
      animationStarted = true;
      timeline.phase = 'lightRay';
      timeline.time = 0;
    };

    // Enhanced animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      if (!animationStarted) return;
      // Animate particles
      if (particles) { // particles is always defined here, but keeping for safety
        particles.rotation.y += 0.001;
        const positions = particles.geometry.attributes.position.array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += 0.01;
          if (positions[i] > 25) positions[i] = 0;
        }
        particles.geometry.attributes.position.needsUpdate = true;
      }

      timeline.time += 0.016;
      const t = timeline.time;

      // Phase 1: Dramatic light beam appears
      if (timeline.phase === 'lightRay' && t < animationTimings.lightRayDuration) {
        lightBeam.material.opacity = Math.min(t * 0.8, 0.6);
        keyLight.intensity = 2 + t * 3;
        pointLight1.intensity = 1 + t * 2;
      }
      // Phase 2: Character lands with impact
      else if (timeline.phase === 'lightRay' && t >= animationTimings.lightRayDuration) {
        timeline.phase = 'landing';
        timeline.time = 0;
      }
      else if (timeline.phase === 'landing' && t < animationTimings.landingDuration) {
        const progress = t / animationTimings.landingDuration;
        const easeOut = 1 - Math.pow(1 - progress, 4);
        characterGroup.position.y = 25 - (easeOut * 25);
        // Landing impact at the end
        if (progress > 0.8) {
          const impactIntensity = (progress - 0.8) * 5;
          pointLight2.intensity = 0.8 + impactIntensity;
        }
        // Fade out light beam
        lightBeam.material.opacity = 0.6 * (1 - progress);
      }
      // Phase 3: Dynamic camera movement
      else if (timeline.phase === 'landing' && t >= animationTimings.landingDuration) {
        timeline.phase = 'cameraMove';
        timeline.time = 0;
      }
      else if (timeline.phase === 'cameraMove' && t < animationTimings.cameraMoveDuration) {
        const progress = t / animationTimings.cameraMoveDuration;
        const angle = progress * Math.PI * 2.5; // More dramatic rotation
        const radius = 12 - progress * 3; // Zoom in gradually
        camera.position.x = Math.sin(angle) * radius;
        camera.position.z = Math.cos(angle) * radius;
        camera.position.y = 8 + Math.sin(progress * Math.PI * 2) * 3;
        camera.lookAt(0, 2, 0);
      }
      // Phase 4: Gun materializes with effects
      else if (timeline.phase === 'cameraMove' && t >= animationTimings.cameraMoveDuration) {
        timeline.phase = 'gunAppear';
        timeline.time = 0;
        camera.position.set(0, 3, 8);
        camera.lookAt(0, 2, 0);
      }
      else if (timeline.phase === 'gunAppear' && t < animationTimings.gunAppearDuration) {
        const progress = t / animationTimings.gunAppearDuration;
        // Raise right arm smoothly
        rightArm.rotation.z = -0.2 - (progress * 1.8);
        rightArm.rotation.x = progress * 0.3;
        // Gun appears with particle effect
        if (progress > 0.3) {
          gunGroup.visible = true;
          const gunProgress = (progress - 0.3) / 0.7;
          const scale = gunProgress;
          gunGroup.scale.set(scale, scale, scale);
          
          // Add blue glow effect
          pointLight1.position.set(0.8, 2, 0);
          pointLight1.intensity = 1 + gunProgress * 2;
        }
      }
      // Phase 5: Dramatic turn and aim
      else if (timeline.phase === 'gunAppear' && t >= animationTimings.gunAppearDuration) {
        timeline.phase = 'aiming';
        timeline.time = 0;
      }
      else if (timeline.phase === 'aiming' && t < animationTimings.aimingDuration) {
        const progress = t / animationTimings.aimingDuration;
        const smoothTurn = progress * progress * (3 - 2 * progress); // Smooth ease
        characterGroup.rotation.y = smoothTurn * Math.PI;
        // Camera follows slightly
        camera.position.x = Math.sin(smoothTurn * 0.3) * 2;
      }
      // Phase 6: Final shot with dramatic flash
      else if (timeline.phase === 'aiming' && t >= animationTimings.aimingDuration) {
        timeline.phase = 'flash';
        // Massive flash effect
        scene.background = new THREE.Color(0xffffff);
        keyLight.intensity = 15;
        pointLight1.intensity = 10;
        pointLight2.intensity = 10;
        // Screen flash effect
        renderer.setClearColor(0xffffff, 1);
        setTimeout(() => {
          setIntroFinished(true);
          setShowPortfolio(true);
        }, animationTimings.flashDelay);
      }
      
      renderer.render(scene, camera);
    };

    animate();

    // Auto-start after 1.5 seconds
    const autoStart = setTimeout(startAnimation, animationTimings.autoStartDelay);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      clearTimeout(autoStart);
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      // --- Enhanced Cleanup ---
      // Traverse the scene and dispose of all geometries and materials to prevent memory leaks.
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry?.dispose();
          // Handle both single and array of materials
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material?.dispose();
          }
        }
      });
      particleGeometry.dispose();
      particleMaterial.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [introFinished]);

  if (showPortfolio) {
    return <PortfolioSite onReplay={() => {
      setShowPortfolio(false);
      setIntroFinished(false);
    }} />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      <div ref={mountRef} className="w-full h-full" />
      
      {/* This overlay is shown before the animation starts. */}
      {!introFinished && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
          <p className="text-white text-2xl animate-pulse mb-8">Loading Experience...</p>
          <button
            onClick={handleSkip}
            className="px-6 py-2 text-lg text-cyan-300 border border-cyan-300 rounded-lg transition-colors duration-300 hover:bg-cyan-300/20"
          >
            Skip Intro
          </button>
        </div>
      )}
    </div>
  );
};

export default PortfolioLanding;