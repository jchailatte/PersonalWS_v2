/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei/useGLTF'

export default function Model(props) {
    const group = useRef()
    const { nodes, materials } = useGLTF('/models/lantern.glb')
    return (
        <group ref={group} {...props} dispose={null}>
            <mesh
                material={materials.paper}
                geometry={nodes.JapaneseLantern_paper_0.geometry}
                position={[-0.07, 0.66, -0.31]}
            />
            <mesh
                material={materials.goldenrope}
                geometry={nodes.JapaneseLantern_goldenrope_0.geometry}
                position={[-0.06, 1.35, -0.3]}
            />
            <mesh
                material={materials.redrope}
                geometry={nodes.JapaneseLantern_redrope_0.geometry}
                position={[-0.06, 1.28, -0.3]}
            />
            <mesh
                material={materials.lambert1}
                geometry={nodes.JapaneseLantern_lambert1_0.geometry}
                position={[-0.06, 1.49, -0.3]}
            />
            <mesh
                material={materials.wood}
                geometry={nodes.JapaneseLantern_wood_0.geometry}
                position={[-0.06, 0.84, -0.3]} 
            />
        </group>
    )
}

useGLTF.preload('/models/lantern.glb')
