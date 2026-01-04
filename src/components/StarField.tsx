import { useEffect, useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
// import { Line } from '@react-three/drei';
import { CelestialBody, fetchStarData, getObserverLocation, calculateLST } from '../services/astronomy';

interface StarFieldProps {
    showCelestialGrid: boolean;
    pollutionStrength?: number;
}

const StarField = ({ showCelestialGrid, pollutionStrength = 0 }: StarFieldProps) => {
    const [bodies, setBodies] = useState<CelestialBody[]>([]);
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const groupRef = useRef<THREE.Group>(null);

    // ... (Init logic remains same)

    useEffect(() => {
        const init = async () => {
            try {
                // ... (Observer & rotation logic)
                const { latitude, longitude } = await getObserverLocation();
                const lst = calculateLST(longitude);
                if (groupRef.current) {
                    groupRef.current.rotation.y = lst;
                    groupRef.current.rotation.x = THREE.MathUtils.degToRad(latitude - 90);
                }

                // Fetch ONLY stars, no fallback planets
                const starData = await fetchStarData(latitude, longitude);
                const starsOnly = starData.filter((b: CelestialBody) => !['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(b.id[0]));

                setBodies(starsOnly);

            } catch (err) {
                console.error("Failed to load star data", err);
            }
        };
        init();
    }, []);

    // Static Instance Update (Run once)
    useEffect(() => {
        if (!meshRef.current || bodies.length === 0) return;

        const tempObject = new THREE.Object3D();
        const color = new THREE.Color();

        for (let i = 0; i < bodies.length; i++) {
            const body = bodies[i];
            tempObject.position.copy(body.position);
            const scale = body.size * (0.8 + Math.random() * 0.4);
            tempObject.scale.set(scale, scale, scale);
            tempObject.updateMatrix();
            meshRef.current.setMatrixAt(i, tempObject.matrix);

            const variant = Math.random();
            let c = '#ffffff';
            if (variant > 0.8) c = '#aaaaff';
            else if (variant > 0.6) c = '#ffddaa';
            else if (variant > 0.9) c = '#ffcccc';
            meshRef.current.setColorAt(i, color.set(c));
        }

        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;

    }, [bodies]);

    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y -= 0.005 * delta;
        }
    });

    return (
        <group ref={groupRef}>
            {bodies.length > 0 && (
                <instancedMesh
                    ref={meshRef}
                    args={[undefined, undefined, bodies.length]}
                    frustumCulled={false}
                >
                    <sphereGeometry args={[1, 6, 6]} />
                    <meshBasicMaterial
                        toneMapped={false}
                        vertexColors
                        depthWrite={false}
                        transparent
                        opacity={1 - pollutionStrength}
                    />
                </instancedMesh>
            )}

            {showCelestialGrid && (
                <mesh>
                    {/* Radius 880 as requested in check.json */}
                    <sphereGeometry args={[880, 64, 64]} />
                    <meshBasicMaterial
                        color={0x4466ff}
                        wireframe={true}
                        transparent={true}
                        opacity={0.35}
                        depthWrite={false}
                    />
                </mesh>
            )}
        </group>
    );
};

export default StarField;
