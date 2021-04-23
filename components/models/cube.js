/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: tomciomalina (https://sketchfab.com/tomciomalina)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/models/044a6f65abc14b959ff636ce0f37a858
title: Impossible Cube
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const Cube = (props) => {
    const group = useRef()
    const { nodes, materials } = useGLTF('/models/cube.glb')
    return (
        <group
            {...props}
            dispose={null}
            ref={group}
            scale={[0.08, 0.08, 0.08]}
        >
            <group>
                <group>
                    <mesh
                        geometry={nodes['Box045_01_-_Default_0_1'].geometry}
                        layers={1}
                        castShadow
                        receiveShadow
                    >
                        <meshPhongMaterial
                            attach="material"
                            color="black"
                            emissive="#008b8b"
                        />
                    </mesh>
                    <mesh
                        geometry={nodes['Box045_01_-_Default_0_2'].geometry}
                        material={materials['07_-_Default']}
                        castShadow
                        receiveShadow
                    />
                </group>
            </group>
        </group>
    )
}

useGLTF.preload('/models/cube.glb')

export default Cube;