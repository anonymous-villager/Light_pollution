import * as Astronomy from 'astronomy-engine';
import * as THREE from 'three';

export interface CelestialBody {
    id: string;
    name: string;
    position: THREE.Vector3; // x,y,z in Scene Units
    size: number;
    color: string;
    eclipticLongitude?: number; // For Zodiac calculation
    eclipticLatitude?: number;
    description?: string;
    // Metadata for UI
    spectralClass?: string;
    distanceLightYears?: number;
    temperatureK?: number;
    constellation?: string;
}

export const AU_SCALE = 50;
const PROJECTED_RADIUS = 900;

// Body Configuration
const BODIES_CONFIG = [
    { id: 'sun', astronomyBody: Astronomy.Body.Sun, name: 'Sun', color: '#ffcc00', size: 20 },
    { id: 'mercury', astronomyBody: Astronomy.Body.Mercury, name: 'Mercury', color: '#aaaaaa', size: 6 },
    { id: 'venus', astronomyBody: Astronomy.Body.Venus, name: 'Venus', color: '#ffcc99', size: 9 },
    // Earth is at center, don't render it.
    { id: 'moon', astronomyBody: Astronomy.Body.Moon, name: 'Moon', color: '#dddddd', size: 6 },
    { id: 'mars', astronomyBody: Astronomy.Body.Mars, name: 'Mars', color: '#ff4400', size: 8 },
    { id: 'jupiter', astronomyBody: Astronomy.Body.Jupiter, name: 'Jupiter', color: '#dcbba1', size: 16 },
    { id: 'saturn', astronomyBody: Astronomy.Body.Saturn, name: 'Saturn', color: '#d4cfa1', size: 14 },
    { id: 'uranus', astronomyBody: Astronomy.Body.Uranus, name: 'Uranus', color: '#99ccff', size: 10 },
    { id: 'neptune', astronomyBody: Astronomy.Body.Neptune, name: 'Neptune', color: '#3333ff', size: 10 },
];

/**
 * Calculates current Geocentric positions of solar system bodies.
 * All bodies are projected onto a sphere of radius 900.
 */
export const getSolarSystemPositions = (date: Date = new Date()): CelestialBody[] => {
    const time = Astronomy.MakeTime(date);
    const results: CelestialBody[] = [];

    BODIES_CONFIG.forEach(config => {
        // 1. Get Geocentric Vector (Equatorial J2000)
        const vec = Astronomy.GeoVector(config.astronomyBody, time, false);

        // 2. Normalize and Scale
        const dist = Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);

        const ratio = PROJECTED_RADIUS / dist;

        const x = vec.x * ratio;
        const y = vec.y * ratio;
        const z = vec.z * ratio;

        // 3. Convert to Scene Coordinate System (x, z, -y)
        results.push({
            id: config.id,
            name: config.name,
            position: new THREE.Vector3(x, z, -y),
            size: config.size,
            color: config.color,
            description: `Distance: ${dist.toFixed(2)} AU (Projected to ${PROJECTED_RADIUS})`
        });
    });

    return results;
};

/**
 * Calculates points along a Great Circle between two vectors on a sphere.
 */
export const getGreatCirclePoints = (v1: THREE.Vector3, v2: THREE.Vector3, radius: number, segments: number = 32): THREE.Vector3[] => {
    const points: THREE.Vector3[] = [];
    const a = v1.clone().normalize();
    const b = v2.clone().normalize();

    const angle = a.angleTo(b);

    for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const sinA = Math.sin((1 - t) * angle);
        const sinB = Math.sin(t * angle);
        const sinTotal = Math.sin(angle);

        // Avoid division by zero if vectors are identical
        if (sinTotal < 0.0001) {
            points.push(a.clone().multiplyScalar(radius));
            continue;
        }

        const v = a.clone().multiplyScalar(sinA)
            .add(b.clone().multiplyScalar(sinB))
            .divideScalar(sinTotal)
            .normalize()
            .multiplyScalar(radius);

        points.push(v);
    }
    return points;
};

// Re-export for compatibility if needed (though we use Vector3 above)
// Local Sidereal Time Calculation
export const calculateLST = (longitude: number): number => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Approximate LST in hours
    const timeInHours = now.getUTCHours() + now.getUTCMinutes() / 60;
    const lstHours = (100.46 + 0.985647 * dayOfYear + longitude + 15 * timeInHours) % 360 / 15;

    return (lstHours / 24) * Math.PI * 2;
};

/**
 * Converts Equatorial Coordinates (RA in hours, Dec in degrees) to Scene Cartesian.
 * Matches check.json formula (Scene Z = -sin(ra)).
 * x = R * cos(dec) * cos(ra)
 * y = R * sin(dec)
 * z = -R * cos(dec) * sin(ra)
 */
export const convertRaDecToVector3 = (raHours: number, decDeg: number, radius: number): THREE.Vector3 => {
    const raRad = (raHours * 15 * Math.PI) / 180;
    const decRad = (decDeg * Math.PI) / 180;

    const x = radius * Math.cos(decRad) * Math.cos(raRad);
    const y = radius * Math.sin(decRad);
    const z = -radius * Math.cos(decRad) * Math.sin(raRad);

    return new THREE.Vector3(x, y, z);
};

// Fetch Star Data (Procedural Fallback)
export const fetchStarData = async (_latitude: number, _longitude: number): Promise<CelestialBody[]> => {
    const bodies: CelestialBody[] = [];
    const starCount = 2000;

    for (let i = 0; i < starCount; i++) {
        const r = 400 + Math.random() * 200; // Background distance
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        // Random spectral class
        const spectralClasses = ['O', 'B', 'A', 'F', 'G', 'K', 'M'];
        const sClass = spectralClasses[Math.floor(Math.random() * spectralClasses.length)];

        bodies.push({
            id: `star-${i}`,
            name: `HIP ${Math.floor(Math.random() * 100000)}`,
            position: new THREE.Vector3(x, y, z),
            size: Math.random() * 1.5 + 0.5, // Increased from 0.1-0.6
            color: '#ffffff',
            description: `Star type ${sClass}`
        });
    }

    return bodies;
};

export const getObserverLocation = (): Promise<{ latitude: number, longitude: number }> => {
    return Promise.resolve({ latitude: 25.0330, longitude: 121.5654 });
};


// ------------------------------------------------------------------
// STARS.JSON Integration
// ------------------------------------------------------------------

import starsJsonData from '../data/stars.json';

export interface JsonStar {
    id: string;
    ra: number;
    dec: number;
    magnitude: number;
    radius: number; // This might be size
}

export interface JsonConstellation {
    id: string;
    name: string;
    chinese_name: string;
    min_stars: number;
    stars: JsonStar[];
    edges: string[][];
}

// Ensure correct typing for the imported JSON
const CONST_DATA = starsJsonData as {
    meta: any;
    constellations: JsonConstellation[];
};

export interface ProcessedConstellation {
    id: string;
    name: string;
    chineseName: string;
    stars: CelestialBody[];
    lines: THREE.Vector3[][];
}

/**
 * Parses stars.json and returns processed constellations with 3D positions.
 * @param radius Distance from origin (Earth) to place the stars.
 */
export const getConstellations = (radius: number = 2000): ProcessedConstellation[] => {
    return CONST_DATA.constellations.map(c => {
        // 1. Process Stars for this constellation
        const stars = c.stars.map(s => {
            const pos = convertRaDecToVector3(s.ra, s.dec, radius);
            const visualSize = 5;

            return {
                id: s.id,
                name: s.id.charAt(0).toUpperCase() + s.id.slice(1),
                position: pos,
                size: visualSize,
                color: '#ffffff',
                constellation: c.name,
                description: `${c.name} (${c.chinese_name}) - Mag: ${s.magnitude}`,
                eclipticLongitude: 0,
                eclipticLatitude: 0
            } as any; // Cast to any because magnitude isn't in interface yet, or update interface
        });

        // 2. Process Lines (Edges)
        const lines = c.edges.map(edge => {
            const id1 = edge[0];
            const id2 = edge[1];
            const s1 = stars.find(s => s.id === id1);
            const s2 = stars.find(s => s.id === id2);

            if (s1 && s2) {
                return [s1.position, s2.position];
            }
            return null;
        }).filter(Boolean) as THREE.Vector3[][];

        return {
            id: c.id,
            name: c.name,
            chineseName: c.chinese_name,
            stars,
            lines
        };
    });
};

/**
 * Returns a flat list of all stars from constellations for searching/rendering.
 */
export const getAllConstellationStars = (radius: number = 2000): CelestialBody[] => {
    const constellations = getConstellations(radius);
    return constellations.flatMap(c => c.stars);
};
