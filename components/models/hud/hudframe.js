import React, { Fragment } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

import { LightningStrike } from 'three-stdlib';

const HUDFrame = () => {

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        lightning.update(time)
    })

    const distance = 9.5;

    const rayParams = {

        sourceOffset: new THREE.Vector3(distance, 1.75, distance),
        destOffset: new THREE.Vector3(distance, -1.75, distance),
        radius0: 0.2,
        radius1: 0.2,
        minRadius: 0.3,
        maxIterations: 7,
        isEternal: true,

        timeScale: 0.7,

        propagationTimeFactor: 0.05,
        vanishingTimeFactor: 0.95,
        subrayPeriod: 3.5,
        subrayDutyCycle: 0.6,
        maxSubrayRecursion: 3,
        ramification: 7,
        recursionProbability: 0.6,

        roughness: 0.8,
        straightness: 0.6
    };

    const lightning = new LightningStrike(rayParams);

    return (
        <Fragment>
            <mesh
                geometry={lightning}
                layers={1}
            >
                <meshBasicMaterial
                    attach="material"
                    color="cyan"
                />
            </mesh>
        </Fragment>
    );
};

export default HUDFrame;