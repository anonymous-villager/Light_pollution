import { useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Scene from './components/Scene'
import UIOverlay from './components/UIOverlay'
import CameraController from './components/CameraController'
import { CelestialBody } from './services/astronomy'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

function App() {
    const [showCelestialGrid, setShowCelestialGrid] = useState(false);
    const [showZodiacStars, setShowZodiacStars] = useState(true);
    const [hoveredBody, setHoveredBody] = useState<CelestialBody | null>(null);
    const [targetBody, setTargetBody] = useState<CelestialBody | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    // Visuals
    const [pollutionStrength, setPollutionStrength] = useState(0.6);

    const controlsRef = useRef<OrbitControlsImpl>(null);

    return (
        <>
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <color attach="background" args={['#050510']} />

                <CameraController targetBody={targetBody} controlsRef={controlsRef} />

                <Scene
                    showCelestialGrid={showCelestialGrid}
                    showZodiacStars={showZodiacStars}
                    onHoverStar={setHoveredBody}
                    searchTerm={searchTerm}
                    onTargetUpdate={setTargetBody}
                    pollutionStrength={pollutionStrength}
                />

                <OrbitControls
                    ref={controlsRef}
                    makeDefault
                    enableZoom={true}
                    enablePan={false}
                    zoomSpeed={0.5}
                    rotateSpeed={0.5}
                    minDistance={0.1}
                    maxDistance={2000}
                />
            </Canvas>

            <UIOverlay
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
                showCelestialGrid={showCelestialGrid}
                setShowCelestialGrid={setShowCelestialGrid}
                showZodiacStars={showZodiacStars}
                setShowZodiacStars={setShowZodiacStars}
                activeBody={hoveredBody || targetBody}
                targetBody={targetBody}
                pollutionStrength={pollutionStrength}
                onPollutionChange={setPollutionStrength}
            />
        </>
    )
}

export default App
