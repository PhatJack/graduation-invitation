import { useEffect, useRef, useMemo } from "react"
import * as THREE from "three"

// Autumn leaf SVG paths (varied shapes)
const LEAF_PATHS = [
  "M10,1 C14,1 20,5 20,12 C20,18 14,22 10,22 C6,22 0,18 0,12 C0,5 6,1 10,1 Z",
  "M10,0 C10,0 20,6 18,14 C16,20 10,22 10,22 C10,22 4,20 2,14 C0,6 10,0 10,0 Z",
  "M10,2 Q18,0 20,10 Q22,18 10,22 Q-2,18 0,10 Q2,0 10,2 Z",
  "M10,0 L20,8 L16,20 L4,20 L0,8 Z",
  "M10,1 C16,1 22,6 20,13 C18,19 12,22 10,22 C8,22 2,19 0,13 C-2,6 4,1 10,1 Z",
]
const LEAF_COLORS = [
  "#d97706",
  "#b45309",
  "#dc2626",
  "#ea580c",
  "#ca8a04",
  "#a16207",
  "#c2410c",
]

interface Leaf {
  id: number
  x: number
  size: number
  delay: number
  duration: number
  driftX: number
  rotation: number
  rotationSpeed: number
  color: string
  path: string
  opacity: number
}

interface ScrollIntroProps {
  name: string
  onOpen: () => void
  isOpening: boolean
}

export function ScrollIntro({ name, onOpen, isOpening }: ScrollIntroProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const isOpeningRef = useRef(false)

  // Generate leaves once
  const leaves = useMemo<Leaf[]>(() => {
    return Array.from({ length: 26 }, (_, i) => ({
      id: i,
      x: Math.random() * 70 - 8, // start -8% … 62% → room to drift right
      size: 14 + Math.random() * 18,
      delay: Math.random() * 14,
      duration: 9 + Math.random() * 10,
      driftX: 100 + Math.random() * 200, // total rightward travel (px)
      rotation: Math.random() * 360,
      rotationSpeed:
        (Math.random() > 0.5 ? 1 : -1) * (200 + Math.random() * 400),
      color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
      path: LEAF_PATHS[Math.floor(Math.random() * LEAF_PATHS.length)],
      opacity: 0.55 + Math.random() * 0.4,
    }))
  }, [])

  useEffect(() => {
    isOpeningRef.current = isOpening
  }, [isOpening])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // --- Scene & Camera ---
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 0, 9)

    const resize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()

    // --- Lights ---
    scene.add(new THREE.AmbientLight(0xfff8e1, 2.0))
    const sun = new THREE.DirectionalLight(0xfff1b0, 3.0)
    sun.position.set(4, 6, 9)
    scene.add(sun)
    const fill = new THREE.DirectionalLight(0xb45309, 0.8)
    fill.position.set(-3, -2, 4)
    scene.add(fill)
    const rim = new THREE.DirectionalLight(0xffe8b0, 0.6)
    rim.position.set(0, -6, -4)
    scene.add(rim)

    // --- Scroll group ---
    const group = new THREE.Group()
    scene.add(group)

    // Parchment cylinder (horizontal)
    const parchMat = new THREE.MeshStandardMaterial({
      color: 0xfdf0d0,
      roughness: 0.82,
      metalness: 0,
    })
    const parch = new THREE.Mesh(
      new THREE.CylinderGeometry(0.65, 0.65, 3.5, 64),
      parchMat
    )
    parch.rotation.z = Math.PI / 2
    group.add(parch)

    // Edge rings at each end of parchment
    const edgeMat = new THREE.MeshStandardMaterial({
      color: 0xc8a06a,
      roughness: 0.9,
    })
    ;[-1.75, 1.75].forEach((x) => {
      const e = new THREE.Mesh(
        new THREE.TorusGeometry(0.65, 0.02, 8, 64),
        edgeMat
      )
      e.position.x = x
      group.add(e)
    })

    // Wooden handles + knobs
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x6b3410,
      roughness: 0.65,
      metalness: 0.04,
    })
    const knobMat = new THREE.MeshStandardMaterial({
      color: 0x3d1a00,
      roughness: 0.5,
      metalness: 0.2,
    })
    ;[-1, 1].forEach((side) => {
      const xH = side * 2.15
      // Handle cylinder
      const h = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.18, 0.68, 24),
        woodMat
      )
      h.rotation.z = Math.PI / 2
      h.position.x = xH
      group.add(h)
      // Thin rod extension
      const r = new THREE.Mesh(
        new THREE.CylinderGeometry(0.065, 0.065, 0.38, 12),
        woodMat
      )
      r.rotation.z = Math.PI / 2
      r.position.x = xH + side * 0.55
      group.add(r)
      // Knob disc
      const k = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25, 0.25, 0.09, 24),
        knobMat
      )
      k.rotation.z = Math.PI / 2
      k.position.x = xH + side * 0.38
      group.add(k)
    })

    // Red ribbon
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0x8b0000,
      roughness: 0.7,
      transparent: true,
      opacity: 1,
    })
    const ribbon = new THREE.Mesh(
      new THREE.TorusGeometry(0.67, 0.036, 8, 64),
      ribbonMat
    )
    group.add(ribbon)

    // Wax seal
    const sealMat = new THREE.MeshStandardMaterial({
      color: 0xcc1500,
      roughness: 0.4,
      metalness: 0.25,
    })
    const seal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.11, 0.11, 0.06, 16),
      sealMat
    )
    seal.position.set(0, 0.68, 0)
    group.add(seal)

    // --- Floating particles ---
    const pCount = 140
    const pPos = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 18
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 14
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 4
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({
      color: 0xd4a017,
      size: 0.05,
      transparent: true,
      opacity: 0.45,
    })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // --- Animation ---
    let raf: number
    let t = 0
    let openProgress = 0

    const tick = () => {
      raf = requestAnimationFrame(tick)
      t += 0.016

      if (isOpeningRef.current) {
        openProgress = Math.min(openProgress + 0.018, 1)
        group.rotation.z += 0.22
        group.rotation.y += 0.08
        group.scale.setScalar(Math.max(1 - openProgress * 1.15, 0.001))
        ribbonMat.opacity = Math.max(1 - openProgress * 3.5, 0)
      } else {
        group.rotation.y = Math.sin(t * 0.45) * 0.28
        group.position.y = Math.sin(t * 0.65) * 0.13
        group.rotation.z = Math.sin(t * 0.3) * 0.045
      }

      particles.rotation.y += 0.0008
      particles.rotation.x += 0.0003
      renderer.render(scene, camera)
    }
    tick()

    window.addEventListener("resize", resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      renderer.dispose()
      if (mount.contains(renderer.domElement))
        mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#fdf6e3_0%,#fef9ee_50%,#fdf0d0_100%)]">
      {/* Falling leaves */}
      <style>{`
        @keyframes leaf-fall {
          0%   { top: -60px; opacity: 0; }
          5%   { opacity: var(--leaf-opacity); }
          90%  { opacity: var(--leaf-opacity); }
          100% { top: 110%; opacity: 0; }
        }
        /* Diagonal drift left→right with two built-in gust surges */
        @keyframes leaf-diagonal {
          0%   { transform: translateX(0px); }
          10%  { transform: translateX(calc(var(--drift) * 0.08)); }
          28%  { transform: translateX(calc(var(--drift) * 0.38)); }
          34%  { transform: translateX(calc(var(--drift) * 0.68)); }
          42%  { transform: translateX(calc(var(--drift) * 0.52)); }
          58%  { transform: translateX(calc(var(--drift) * 0.65)); }
          66%  { transform: translateX(calc(var(--drift) * 0.96)); }
          74%  { transform: translateX(calc(var(--drift) * 0.80)); }
          90%  { transform: translateX(calc(var(--drift) * 0.93)); }
          100% { transform: translateX(var(--drift)); }
        }
        @keyframes leaf-spin {
          from { transform: rotate(var(--rot-start)); }
          to   { transform: rotate(var(--rot-end)); }
        }
        /* Wind gust line sweeping left → right */
        .leaf-wrap {
          position: absolute;
          top: -60px;
          animation:
            leaf-fall var(--fall-dur) var(--fall-delay) linear infinite,
            leaf-diagonal var(--fall-dur) var(--fall-delay) ease-in-out infinite;
        }
        .leaf-inner {
          animation: leaf-spin var(--spin-dur) linear infinite;
          transform-origin: center;
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 z-0">

        {leaves.map((leaf) => (
          <div
            key={leaf.id}
            className="leaf-wrap"
            style={
              {
                left: `${leaf.x}%`,
                "--fall-dur": `${leaf.duration}s`,
                "--fall-delay": `${leaf.delay}s`,
                "--drift": `${leaf.driftX}px`,
                "--leaf-opacity": leaf.opacity,
              } as React.CSSProperties
            }
          >
            <div
              className="leaf-inner"
              style={
                {
                  "--rot-start": `${leaf.rotation}deg`,
                  "--rot-end": `${leaf.rotation + leaf.rotationSpeed}deg`,
                  "--spin-dur": `${Math.abs(leaf.rotationSpeed) / 120}s`,
                } as React.CSSProperties
              }
            >
              <svg
                width={leaf.size}
                height={leaf.size}
                viewBox="0 0 22 22"
                className="block filter-[drop-shadow(0_1px_2px_rgba(0,0,0,0.18))]"
              >
                <path d={leaf.path} fill={leaf.color} />
                {/* Leaf vein */}
                <line
                  x1="10"
                  y1="2"
                  x2="10"
                  y2="21"
                  stroke="rgba(0,0,0,0.15)"
                  strokeWidth="0.8"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
      {/* Three.js canvas */}
      <div ref={mountRef} className="relative z-10 h-65 w-full shrink-0" />

      {/* Intro text */}
      <div className="relative z-10 -mt-1 flex flex-col items-center gap-3 px-4 sm:px-10 text-center">
        <p className="m-0 text-[11px] tracking-[0.3em] text-amber-700 uppercase">
          ✦ Thư Mời ✦
        </p>
        <h1 className="m-0 font-sans text-3xl sm:text-4xl text-amber-900">
          Lễ Trao Bằng Tốt Nghiệp
        </h1>
        <div className="h-px w-45 bg-linear-to-r from-transparent via-amber-700 to-transparent" />
        <p className="m-0 text-[0.85rem] text-amber-800">Thân mời:</p>
        <p
          style={{ fontFamily: "'Dancing Script', cursive" }}
          className="m-0 text-4xl font-bold tracking-tight text-amber-900"
        >
          {name}
        </p>
      </div>

      {/* Open button */}
      <button
        onClick={onOpen}
        disabled={isOpening}
        className="relative z-10 mt-7 cursor-pointer rounded-full border border-[rgba(180,83,9,0.15)] bg-[linear-gradient(135deg,#b45309,#d97706_55%,#f59e0b)] px-10 py-3 text-[0.75rem] font-bold tracking-[0.22em] text-amber-50 uppercase shadow-[0_4px_24px_rgba(180,83,9,0.4),inset_0_1px_0_rgba(255,255,255,0.12)] transition-opacity outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        ✦ &nbsp;Mở Thư Mời&nbsp; ✦
      </button>
    </div>
  )
}
