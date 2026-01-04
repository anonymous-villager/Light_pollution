import { useState, useEffect } from 'react'; // React hooks
import { CelestialBody, getSolarSystemPositions } from '../services/astronomy';
// import { Billboard, Text, Outlines } from '@react-three/drei';

interface SolarSystemProps {
    onHover?: (data: CelestialBody | null) => void;
    searchTerm?: string;
    onTargetUpdate?: (body: CelestialBody) => void;
    // Keeping other props for compatibility if passed, though optional
    onBodyLoaded?: (count: number) => void;
    targetBody?: CelestialBody | null;
}

const SolarSystem = ({ searchTerm, onTargetUpdate, onHover }: SolarSystemProps) => {
    const [bodies, setBodies] = useState<CelestialBody[]>([]);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    useEffect(() => {
        // Update positions once on load
        setBodies(getSolarSystemPositions(new Date()));
    }, []);

    useEffect(() => {
        if (!searchTerm || !onTargetUpdate || bodies.length === 0) return;
        const found = bodies.find(b => b.name.toLowerCase() === searchTerm.toLowerCase());
        if (found) {
            onTargetUpdate(found);
        }
    }, [searchTerm, bodies, onTargetUpdate]);

    return (
        <group>
            {bodies.map((body) => (
                <mesh
                    key={body.id}
                    position={body.position}
                    onPointerOver={(e) => {
                        e.stopPropagation();
                        setHoveredId(body.id);
                        if (onHover) onHover(body);
                    }}
                    onPointerOut={(e) => {
                        e.stopPropagation();
                        setHoveredId(null);
                        if (onHover) onHover(null);
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onTargetUpdate) onTargetUpdate(body);
                    }}
                >
                    <sphereGeometry args={[body.size, 32, 32]} />
                    <meshStandardMaterial
                        color={body.color}
                        emissive={hoveredId === body.id ? 0x333333 : 0x000000}
                        emissiveIntensity={1}
                        roughness={0.8}
                        metalness={0.2}
                    />
                </mesh>
            ))}
        </group>
    );
};

export default SolarSystem;
