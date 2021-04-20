import React, { Fragment, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

import { LightningStrike } from 'three-stdlib';

const distance = 9.5;
const height = 1.75;

const generalLightningProps = {
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

const directions = [
    {
        sourceOffset: new THREE.Vector3(distance, height, distance),
        destOffset: new THREE.Vector3(distance, -height, distance),
    },
    {
        sourceOffset: new THREE.Vector3(-distance, height, distance),
        destOffset: new THREE.Vector3(-distance, -height, distance),
    },
    {
        sourceOffset: new THREE.Vector3(distance, height, -distance),
        destOffset: new THREE.Vector3(distance, -height, -distance),
    },
    {
        sourceOffset: new THREE.Vector3(-distance, height, -distance),
        destOffset: new THREE.Vector3(-distance, -height, -distance),
    },
    {
        sourceOffset: new THREE.Vector3(height, distance, distance),
        destOffset: new THREE.Vector3(-height, distance, distance),
    },
    {
        sourceOffset: new THREE.Vector3(height, -distance, distance),
        destOffset: new THREE.Vector3(-height, -distance, distance),
    },
    {
        sourceOffset: new THREE.Vector3(height, distance, -distance),
        destOffset: new THREE.Vector3(-height, distance, -distance),
    },
    {
        sourceOffset: new THREE.Vector3(height, -distance, -distance),
        destOffset: new THREE.Vector3(-height, -distance, -distance),
    },
    {
        sourceOffset: new THREE.Vector3(distance, distance, height),
        destOffset: new THREE.Vector3(distance, distance, -height),
    },
    {
        sourceOffset: new THREE.Vector3(-distance, distance, height),
        destOffset: new THREE.Vector3(-distance, distance, -height),
    },
    {
        sourceOffset: new THREE.Vector3(distance, -distance, height),
        destOffset: new THREE.Vector3(distance, -distance, -height),
    },
    {
        sourceOffset: new THREE.Vector3(-distance, -distance, height),
        destOffset: new THREE.Vector3(-distance, -distance, -height),
    }
];

const HUDFrame = () => {

    const lightnings = useMemo(() =>
        directions.map((props) =>
            new LightningStrike({
                ...props,
                ...generalLightningProps
            })
        )
        , []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        lightnings.forEach((lightning) => {
            lightning.update(time);
        })
    })

    return (
        <Fragment>
            {lightnings.map((lightningGeom) => (
                <mesh
                    geometry={lightningGeom}
                    key={lightningGeom.uuid}
                    layers={1}
                >
                    <meshBasicMaterial
                        attach="material"
                        color="cyan"
                    />
                </mesh>
            ))}
        </Fragment>
    );
};

export default HUDFrame;