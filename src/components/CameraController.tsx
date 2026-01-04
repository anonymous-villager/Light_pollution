import { useFrame, useThree } from '@react-three/fiber';
import React from 'react';
import { CelestialBody } from '../services/astronomy';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

interface CameraControllerProps {
    targetBody: CelestialBody | null;
    controlsRef: React.RefObject<OrbitControlsImpl>;
}

const CameraController = ({ targetBody, controlsRef }: CameraControllerProps) => {
    const { camera } = useThree();
    const prevTargetRef = React.useRef<string | null>(null);

    useFrame(() => {
        if (!controlsRef.current) return;
        const controls = controlsRef.current;

        // Ensure controls orbit around the center (Earth)
        controls.target.set(0, 0, 0);

        if (targetBody && targetBody.id !== prevTargetRef.current) {
            prevTargetRef.current = targetBody.id;

            // To look at the target from Earth (Center):
            // We place the camera on the opposite side of the center.
            // Vector: Earth -> Target = targetBody.position
            // Camera Position = -1 * (Earth->Target).normalized * distance

            const currentDist = camera.position.length() || 0.1;
            const newPos = targetBody.position.clone().normalize().multiplyScalar(-currentDist);

            camera.position.copy(newPos);
            // controls.update() is usually called by the OrbitControls component loop, 
            // but updating position manually might require a manual update or it will pick up next frame.
            controls.update();
        }
    });

    return null;
};

export default CameraController;
