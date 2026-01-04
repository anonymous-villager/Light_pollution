import * as THREE from 'three';
import { Billboard, Text } from '@react-three/drei';
import { AU_SCALE } from '../services/astronomy';

export const ZODIAC_SIGNS = [
    { name: 'Aries', start: 0, end: 30, color: '#ff0000' },
    { name: 'Taurus', start: 30, end: 60, color: '#00ff00' },
    { name: 'Gemini', start: 60, end: 90, color: '#ffff00' },
    { name: 'Cancer', start: 90, end: 120, color: '#c0c0c0' },
    { name: 'Leo', start: 120, end: 150, color: '#ffa500' },
    { name: 'Virgo', start: 150, end: 180, color: '#0000ff' },
    { name: 'Libra', start: 180, end: 210, color: '#00ffff' },
    { name: 'Scorpio', start: 210, end: 240, color: '#800080' },
    { name: 'Sagittarius', start: 240, end: 270, color: '#ff00ff' },
    { name: 'Capricorn', start: 270, end: 300, color: '#a52a2a' },
    { name: 'Aquarius', start: 300, end: 330, color: '#008080' },
    { name: 'Pisces', start: 330, end: 360, color: '#000080' },
];

const ZodiacRing = () => {
    // Radius of the Zodiac ring (should be larger than the farthest planet usually, or symbolic)
    // Neptune is ~30 AU.
    const radius = 35 * AU_SCALE;
    const thickness = 2 * AU_SCALE;

    return (
        <group>
            {/* Note: In our SolarSystem, Z is "back". Flat plane is XZ. Y is Up.
                 So we need to rotate the XY Ring to be horizontal.
                 Rotation [-Pi/2, 0, 0] rotates top to back.
             */}

            {ZODIAC_SIGNS.map((sign) => {
                const startRad = (sign.start * Math.PI) / 180;
                const lengthRad = (30 * Math.PI) / 180;

                return (
                    <group key={sign.name}>
                        {/* The Ring Segment - Visual Only */}
                        <mesh rotation={[-Math.PI / 2, 0, 0]}> {/* Lay flat on XZ */}
                            <ringGeometry args={[radius, radius + thickness, 32, 1, startRad, lengthRad]} />
                            <meshBasicMaterial color={sign.color} transparent opacity={0.3} side={THREE.DoubleSide} />
                        </mesh>

                        {/* The Border Lines - Optional */}

                        {/* Text Label */}
                        <group
                            position={[
                                (radius + thickness * 2) * Math.cos(startRad + lengthRad / 2),
                                0,
                                -(radius + thickness * 2) * Math.sin(startRad + lengthRad / 2) // Z is -sin for standard angle mapping in XZ? 
                                // In standard math: x = r cos t, y = r sin t.
                                // In 3D XZ (Y-up): x = r cos t, z = -r sin t (if 0 is +X and 90 is -Z)
                            ]}
                        >
                            <Billboard follow={true}>
                                <Text
                                    fontSize={AU_SCALE * 2}
                                    color={sign.color}
                                    anchorX="center"
                                    anchorY="middle"
                                >
                                    {sign.name}
                                </Text>
                            </Billboard>
                        </group>
                    </group>
                );
            })}
        </group>
    );
};

export default ZodiacRing;
