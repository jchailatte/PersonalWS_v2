/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: engine9 (https://sketchfab.com/engine9)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/rhetorician-a89f035291d843069d73988cc0e25399
title: Rhetorician
*/

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const BinaryRing = (props) => {
    const { nodes, materials } = useGLTF('/models/binaryring.glb');
    const halo1 = useRef();
    const halo2 = useRef();
    const halo3 = useRef();

    useFrame(() => {
        halo1.current.rotation.z = halo1.current.rotation.z - 0.0015;
        halo2.current.rotation.z = halo2.current.rotation.z + 0.002;
        halo3.current.rotation.z = halo3.current.rotation.z + 0.0005;
    });

    return (
        <group
            dispose={null}
            position={props.position}
            rotation={props.rotation}
            scale={props.scale}
        >
            <mesh
                geometry={nodes.nimbus002_0.geometry}
                layers={1}
                ref={halo1}
            >
                <meshStandardMaterial
                    {...materials.Crown}
                    color={props.color}
                    emissive={props.emissive}
                />
            </mesh>
            <mesh
                geometry={nodes.nimbus001_0.geometry}
                layers={1}
                ref={halo2}
            >
                <meshStandardMaterial
                    {...materials.Crown}
                    color={props.color}
                    emissive={props.emissive}
                />
            </mesh>
            <mesh
                geometry={nodes.nimbus003_0.geometry}
                layers={1}
                ref={halo3}
            >
                <meshStandardMaterial
                    {...materials.Crown}
                    color={props.color}
                    emissive={props.emissive}
                />
            </mesh>
        </group>
    );
};

useGLTF.preload('/models/binaryring.glb');

BinaryRing.propTypes = {
    color: PropTypes.string.isRequired,
    emissive: PropTypes.string.isRequired,
    scale: PropTypes.array,
    direction: PropTypes.number,
    rotation: PropTypes.array,
    position: PropTypes.array
};

BinaryRing.defaultProps = {
    scale: [30, 30, 30],
    rotation: [Math.PI / 2, Math.PI , 0],
    color: 'teal',
    emissive: 'blue'
};

export default BinaryRing;
