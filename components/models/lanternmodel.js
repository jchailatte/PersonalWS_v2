/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Bansheeva (https://sketchfab.com/Bansheeva)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/lanterns-lowpoly-models-homework-11-e7d36f6ce9824228b787204591f6f356
title: Lanterns lowpoly models homework 11
*/

import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useFrame } from 'react-three-fiber'
import { useGLTF, Octahedron } from '@react-three/drei'

//potentially memoize lanterns(with usememo or react.memo) or instance it maybe? 

const Lantern = (props) => {
    const { nodes, materials } = useGLTF('/models/lantern.glb')
    const group = useRef()
    const color = "teal";

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        group.current.rotation.y = group.current.rotation.y + (0.01 * props.rotation);
        group.current.position.y = group.current.position.y + Math.sin(time + (props.yOffset * 60)) / 30;
    })

    return (
        <group ref={group} position={[props.x, props.y, props.z]}>
            <pointLight
                distance={100}
                intensity={1}
                color="white"
                layers={1}
            />
            <Octahedron
                position={[0, 0.5, 0]}
                scale={[0.5, 1, 0.5]}
                layers={1}
            >
                <meshLambertMaterial
                    color="white"
                    emissive="white"
                    attach="material"
                />
            </Octahedron>
            <mesh
                geometry={nodes.JapaneseLantern_paper_0.geometry}
                position={[0, 0.66, 0]}
                layers={1}
            >
                <meshStandardMaterial
                    {...materials.paper}
                    emissive={color}
                    color={color}
                    transparent={true}
                    opacity={0.3}
                />
            </mesh>
            <mesh
                material={materials.goldenrope}
                geometry={nodes.JapaneseLantern_goldenrope_0.geometry}
                position={[0, 1.35, 0]}
            />
            <mesh
                material={materials.redrope}
                geometry={nodes.JapaneseLantern_redrope_0.geometry}
                position={[0, 1.28, 0]}
                layers={1}
            />
            <mesh
                material={materials.lambert1}
                geometry={nodes.JapaneseLantern_lambert1_0.geometry}
                position={[0, 1.49, 0]}
            />
            <mesh
                material={materials.wood}
                geometry={nodes.JapaneseLantern_wood_0.geometry}
                position={[0, 0.84, 0]}
            />
        </group>
    )
};

useGLTF.preload('/models/lantern.glb')

Lantern.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    z: PropTypes.number.isRequired
}

export default Lantern;