/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Hannes Delbeke (https://sketchfab.com/han)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/models/15c79bb2fc1147128039fe4ff90fd5a0
title: Fantasy Sky Background
*/

import React, { useRef } from 'react'
import { useFrame } from 'react-three-fiber'
import { useGLTF } from '@react-three/drei/useGLTF'

export default function Model(props) {
    const group = useRef()
    const { nodes, materials } = useGLTF('/models/fantasysky.glb')

    useFrame(() => {
        group.current.rotation.y += 0.001
    })

    return (
        <group ref={group} {...props} dispose={null}>
            <mesh
                material={materials.Material__25__background_JPG_002}
                geometry={nodes.Object001.geometry}
                scale={[1000, 1000, 1000]}
            />
        </group>
    )
}

useGLTF.preload('/models/fantasysky.glb')