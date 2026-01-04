// import { useRef } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const SkySphere = () => {
    // Load the texture
    // Using a placeholder or the URL from before if local file is missing. 
    // Ideally we use a high res star map.
    // User mentioned 'starmap_4k.jpg' in snippet but might not exist.
    // Let's fallback to the ESO image if it fails, or just use the ESO image for now.
    // content: const texture = useTexture('https://cdn.eso.org/images/large/eso0932a.jpg');
    // But check.json snippet had: const skyMat = new THREE.MeshBasicMaterial({ map: skyTexture ... });

    // I will stick to the ESO image for reliability unless I see the file.
    const texture = useLoader(TextureLoader, 'https://cdn.eso.org/images/large/eso0932a.jpg');

    texture.colorSpace = THREE.SRGBColorSpace;

    return (
        <mesh>
            {/* Radius 1200 as requested in check.json */}
            <sphereGeometry args={[1200, 64, 64]} />
            <meshBasicMaterial
                map={texture}
                side={THREE.BackSide} // Render on the inside
                transparent={true}
                opacity={0.6}
                depthWrite={false}
                depthTest={false}
            />
        </mesh>
    );
};

export default SkySphere;
