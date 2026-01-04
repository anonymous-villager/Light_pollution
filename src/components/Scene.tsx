import { EffectComposer, Bloom } from '@react-three/postprocessing';
import StarField from './StarField';

import SolarSystem from './SolarSystem';
import { ConstellationStars } from './ConstellationStars';
import ZodiacRing from './ZodiacRing';
import SkySphere from './SkySphere';
import { useEffect, Suspense } from 'react';
import { CelestialBody } from '../services/astronomy';

interface SceneProps {
    showCelestialGrid: boolean;
    showZodiacStars: boolean;
    searchTerm?: string;
    onHoverStar: (data: CelestialBody | null) => void;
    onTargetUpdate?: (body: CelestialBody) => void;
    // onBodiesLoaded removed, split into specific setters

    targetBody?: CelestialBody | null;
    pollutionStrength?: number; // 2. Update SceneProps to include pollutionStrength
}

const Scene = ({
    showCelestialGrid,
    showZodiacStars,
    searchTerm,
    onHoverStar,
    onTargetUpdate,
    targetBody,
    pollutionStrength
}: SceneProps) => {

    useEffect(() => {
        console.log("Web3D Scene Mounted");
    }, []);

    return (
        <>
            <ambientLight intensity={1.5} />

            {/* Static Background Stars */}
            <StarField
                showCelestialGrid={showCelestialGrid}
                pollutionStrength={pollutionStrength}
            />

            {/* Zodiac Ring */}
            <ZodiacRing />

            {/* Constellation Stars (from stars.json) */}
            <ConstellationStars
                onHover={onHoverStar}
                visible={showZodiacStars}
                searchTerm={searchTerm}
                onTargetUpdate={onTargetUpdate}
                pollutionStrength={pollutionStrength}
            />

            {/* Dynamic Solar System (Client-Side) */}
            <SolarSystem
                onHover={onHoverStar}
                onTargetUpdate={onTargetUpdate}
                searchTerm={searchTerm}
                targetBody={targetBody}
            />

            <Suspense fallback={null}>
                <SkySphere />
            </Suspense>

            <EffectComposer>
                <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={1.5} />
            </EffectComposer>
        </>
    );
};

export default Scene;
