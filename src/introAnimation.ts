import * as THREE from 'three';

export class IntroAnimation {
  private mount: HTMLDivElement;
  private onFinish: () => void;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private animationId: number | null = null;
  private autoStartTimeout: NodeJS.Timeout | null = null;

  constructor(mount: HTMLDivElement, onFinish: () => void) {
    this.mount = mount;
    this.onFinish = onFinish;
  }

  public init() {
    // Enhanced scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#faf4ed');
    this.scene.fog = new THREE.Fog('#faf4ed', 20, 100);

    // Camera with better perspective
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 8, 15);
    this.camera.lookAt(0, 2, 0);

    // Enhanced renderer with better settings
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.mount.appendChild(this.renderer.domElement);

    // Futuristic ground with grid pattern
    const groundGroup = new THREE.Group();
    
    // Main ground
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color('#fffaf3'),
      transparent: true,
      opacity: 0.8,
      shininess: 100
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    groundGroup.add(ground);

    // Grid lines
    const gridHelper = new THREE.GridHelper(100, 50, new THREE.Color('#907aa9'), new THREE.Color('#d7827e'));
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.3;
    groundGroup.add(gridHelper);

    this.scene.add(groundGroup);

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(new THREE.Color('#907aa9'), 0.4);
    this.scene.add(ambientLight);

    // Key light (dramatic)
    const keyLight = new THREE.DirectionalLight(new THREE.Color('#d7827e'), 2);
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
    this.scene.add(keyLight);

    // Rim light
    const rimLight = new THREE.DirectionalLight(new THREE.Color('#ea9d34'), 1);
    rimLight.position.set(-10, 10, -10);
    this.scene.add(rimLight);

    // Point lights for atmosphere
    const pointLight1 = new THREE.PointLight(new THREE.Color('#56949f'), 1, 30);
    pointLight1.position.set(5, 5, 5);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(new THREE.Color('#b42318'), 0.8, 25);
    pointLight2.position.set(-8, 3, -5);
    this.scene.add(pointLight2);

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
      color: new THREE.Color('#56949f'),
      size: 0.1,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    this.scene.add(particles);

    // Dramatic light beam
    const beamGeometry = new THREE.ConeGeometry(3, 25, 16, 1, true);
    const beamMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#56949f'),
      transparent: true, 
      opacity: 0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    const lightBeam = new THREE.Mesh(beamGeometry, beamMaterial);
    lightBeam.position.set(0, 15, 0);
    lightBeam.rotation.x = Math.PI;
    this.scene.add(lightBeam);

    // Create detailed anime character
    const characterGroup = new THREE.Group();
    
    // Body with better proportions
    const bodyGeometry = new THREE.BoxGeometry(1.2, 1.8, 0.6);
    const bodyMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color('#286983'),
      shininess: 30,
      specular: 0x111111
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 1.8;
    body.castShadow = true;
    characterGroup.add(body);

    // Chest detail
    const chestGeometry = new THREE.BoxGeometry(1.0, 0.3, 0.65);
    const chestMaterial = new THREE.MeshPhongMaterial({ color: new THREE.Color('#575279') });
    const chest = new THREE.Mesh(chestGeometry, chestMaterial);
    chest.position.y = 2.2;
    chest.castShadow = true;
    characterGroup.add(chest);

    // Head with better shape
    const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color('#f2e9e1'),
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
      color: new THREE.Color('#575279'),
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
      color: new THREE.Color('#56949f'),
      emissive: new THREE.Color('#286983')
    });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.18, 3.25, 0.42);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.18, 3.25, 0.42);
    characterGroup.add(leftEye);
    characterGroup.add(rightEye);

    // Eye pupils
    const pupilGeometry = new THREE.SphereGeometry(0.04, 8, 8);
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('#575279') });
    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(-0.18, 3.25, 0.46);
    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.set(0.18, 3.25, 0.46);
    characterGroup.add(leftPupil);
    characterGroup.add(rightPupil);

    // Arms with better proportions
    const armGeometry = new THREE.BoxGeometry(0.4, 1.2, 0.4);
    const armMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color('#f2e9e1'),
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
    const shoulderMaterial = new THREE.MeshPhongMaterial({ color: new THREE.Color('#286983') });
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
      color: new THREE.Color('#575279'),
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
    const bootMaterial = new THREE.MeshPhongMaterial({ color: new THREE.Color('#797593') });
    const leftBoot = new THREE.Mesh(bootGeometry, bootMaterial);
    leftBoot.position.set(-0.35, -0.15, 0.1);
    leftBoot.castShadow = true;
    const rightBoot = new THREE.Mesh(bootGeometry, bootMaterial);
    rightBoot.position.set(0.35, -0.15, 0.1);
    rightBoot.castShadow = true;
    characterGroup.add(leftBoot);
    characterGroup.add(rightBoot);

    characterGroup.position.set(0, 25, 0); // Start high up
    this.scene.add(characterGroup);

    // Futuristic gun with more detail
    const gunGroup = new THREE.Group();
    
    // Main gun body
    const gunBodyGeometry = new THREE.BoxGeometry(1.2, 0.25, 0.15);
    const gunBodyMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color('#797593'),
      shininess: 100,
      specular: new THREE.Color('#9893a5')
    });
    const gunBody = new THREE.Mesh(gunBodyGeometry, gunBodyMaterial);
    gunGroup.add(gunBody);

    // Gun details
    const detailGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.18);
    const detailMaterial = new THREE.MeshPhongMaterial({ color: new THREE.Color('#9893a5') });
    const detail1 = new THREE.Mesh(detailGeometry, detailMaterial);
    detail1.position.set(0.2, 0.08, 0);
    gunGroup.add(detail1);

    // Barrel
    const barrelGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 12);
    const barrelMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color('#9893a5'),
      shininess: 150
    });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(0.8, 0, 0);
    gunGroup.add(barrel);

    // Muzzle
    const muzzleGeometry = new THREE.CylinderGeometry(0.06, 0.04, 0.1, 8);
    const muzzleMaterial = new THREE.MeshPhongMaterial({ color: new THREE.Color('#797593') });
    const muzzle = new THREE.Mesh(muzzleGeometry, muzzleMaterial);
    muzzle.rotation.z = Math.PI / 2;
    muzzle.position.set(1.15, 0, 0);
    gunGroup.add(muzzle);

    // Scope
    const scopeGeometry = new THREE.CylinderGeometry(0.06, 0.06, 0.4, 12);
    const scopeMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color('#797593'),
      shininess: 80
    });
    const scope = new THREE.Mesh(scopeGeometry, scopeMaterial);
    scope.rotation.z = Math.PI / 2;
    scope.position.set(0.2, 0.15, 0);
    gunGroup.add(scope);

    // Scope lenses
    const lensGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.02, 12);
    const lensMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color('#56949f'),
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
      document.getElementById('loading-overlay')?.classList.add('opacity-0');
      if (animationStarted) return;
      animationStarted = true;
      timeline.phase = 'lightRay';
      timeline.time = 0;
    };

    // Enhanced animation loop
    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      if (!animationStarted) return;
      // Animate particles
      if (particles) { // particles is always defined here, but keeping for safety
        particles.rotation.y += 0.001;
        const positions = particles.geometry.attributes.position.array as Float32Array;
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
        (lightBeam.material as THREE.MeshBasicMaterial).opacity = Math.min(t * 0.8, 0.6);
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
        (lightBeam.material as THREE.MeshBasicMaterial).opacity = 0.6 * (1 - progress);
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
        this.camera.position.x = Math.sin(angle) * radius;
        this.camera.position.z = Math.cos(angle) * radius;
        this.camera.position.y = 8 + Math.sin(progress * Math.PI * 2) * 3;
        this.camera.lookAt(0, 2, 0);
      }
      // Phase 4: Gun materializes with effects
      else if (timeline.phase === 'cameraMove' && t >= animationTimings.cameraMoveDuration) {
        timeline.phase = 'gunAppear';
        timeline.time = 0;
        this.camera.position.set(0, 3, 8);
        this.camera.lookAt(0, 2, 0);
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
        this.camera.position.x = Math.sin(smoothTurn * 0.3) * 2;
      }
      // Phase 6: Final shot with dramatic flash
      else if (timeline.phase === 'aiming' && t >= animationTimings.aimingDuration) {
        timeline.phase = 'flash';
        // Massive flash effect
        this.scene.background = new THREE.Color('#faf4ed');
        keyLight.intensity = 15;
        pointLight1.intensity = 10;
        pointLight2.intensity = 10;
        // Screen flash effect
        this.renderer.setClearColor('#faf4ed', 1);
        setTimeout(() => {
          this.onFinish();
        }, animationTimings.flashDelay);
      }
      
      this.renderer.render(this.scene, this.camera);
    };

    animate();

    // Auto-start after 1.5 seconds
    this.autoStartTimeout = setTimeout(startAnimation, animationTimings.autoStartDelay);

    window.addEventListener('resize', this.handleResize);
  }

  private handleResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  public cleanup() {
    if (this.autoStartTimeout) {
      clearTimeout(this.autoStartTimeout);
    }
    window.removeEventListener('resize', this.handleResize);
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    // --- Enhanced Cleanup ---
    // Traverse the scene and dispose of all geometries and materials to prevent memory leaks.
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry?.dispose();
        // Handle both single and array of materials
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose());
        } else {
          object.material?.dispose();
        }
      }
      if (object instanceof THREE.Points) {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material?.dispose();
          }
      }
    });

    if (this.mount.contains(this.renderer.domElement)) {
      this.mount.removeChild(this.renderer.domElement);
    }
    this.renderer.dispose();
  }
}