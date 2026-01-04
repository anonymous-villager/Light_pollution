import { useMemo, useEffect, useState } from 'react';
import { Line } from '@react-three/drei';
import { getConstellations, CelestialBody, getGreatCirclePoints } from '../services/astronomy';
import { ZODIAC_SIGNS } from './ZodiacRing';

interface ConstellationStarsProps {
    onHover: (data: CelestialBody | null) => void;
    visible?: boolean;
    searchTerm?: string;
    onTargetUpdate?: (body: CelestialBody) => void;
    pollutionStrength?: number;
}

const STAR_DISTANCE = 1100;

export const ConstellationStars = ({
    onHover,
    visible = true,
    searchTerm,
    onTargetUpdate,
    pollutionStrength = 0
}: ConstellationStarsProps) => {

    const constellations = useMemo(() => {
        // Get base constellations (stars + edges)
        const rawConstellations = getConstellations(STAR_DISTANCE);

        // Process edges into curved lines
        return rawConstellations.map(c => {
            const curvedLines = c.lines.map(pair => {
                // Pair is [Start, End]. Convert to Great Circle Arc.
                if (pair.length >= 2) {
                    return getGreatCirclePoints(pair[0], pair[1], STAR_DISTANCE);
                }
                return pair;
            });

            // Find zodiac color
            const zodiacMatch = ZODIAC_SIGNS.find(z => z.name === c.name);
            const lineColor = zodiacMatch ? zodiacMatch.color : '#88ccff';

            return {
                ...c,
                lines: curvedLines,
                lineColor
            };
        });
    }, []);

    // Local state for hover highlight
    const [hoveredStarId, setHoveredStarId] = useState<string | null>(null);

    // Search Logic
    useEffect(() => {
        if (!searchTerm || !onTargetUpdate) return;

        const term = searchTerm.toLowerCase().trim();
        if (!term) return;

        // 1. Search for a specific Star
        for (const c of constellations) {
            const foundStar = c.stars.find(s => s.name.toLowerCase() === term || s.id.toLowerCase() === term);
            if (foundStar) {
                onTargetUpdate(foundStar);
                return;
            }
        }

        // 2. Search for a Constellation (Name or Chinese Name)
        // If found, target the first star (Alpha) of that constellation
        const foundConstellation = constellations.find(c =>
            c.name.toLowerCase() === term ||
            c.chineseName === term || // Exact match for Chinese usually
            c.chineseName.includes(term) // Or partial match
        );

        if (foundConstellation && foundConstellation.stars.length > 0) {
            // Target the first star as a proxy for the constellation location
            onTargetUpdate(foundConstellation.stars[0]);
        }

    }, [searchTerm, constellations, onTargetUpdate]);

    if (!visible) return null;

    return (
        <group>
            {constellations.map((c) => (
                <group key={c.id}>
                    {/* Constellation Lines */}
                    {c.lines.map((pts, i) => (
                        <Line
                            key={`${c.id}-line-${i}`}
                            points={pts}
                            color={c.lineColor}
                            lineWidth={1}
                            transparent
                            opacity={0.8 * (1 - pollutionStrength)}
                            depthWrite={false} // Depth write false as requested
                        />
                    ))}

                    {/* Stars */}
                    {c.stars.map((star) => (
                        <mesh
                            key={star.id}
                            position={star.position}
                            onPointerOver={(e) => {
                                e.stopPropagation();
                                setHoveredStarId(star.id);
                                onHover(star);
                            }}
                            onPointerOut={() => {
                                setHoveredStarId(null);
                                onHover(null);
                            }}
                        >
                            <sphereGeometry args={[star.size, 8, 8]} />
                            <meshStandardMaterial
                                color={star.color}
                                toneMapped={false}
                                transparent
                                opacity={1 - pollutionStrength}
                                depthWrite={false} // Depth write false as requested
                                emissive={hoveredStarId === star.id ? 0x333333 : 0x000000}
                                emissiveIntensity={1}
                            />
                        </mesh>
                    ))}
                </group>
            ))}
        </group>
    );
};
