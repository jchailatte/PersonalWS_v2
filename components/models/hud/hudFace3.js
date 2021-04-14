import { Fragment, useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';


import HUDLogo from './hudLogo';
import SVGExtrude from '@/components/three/svgExtrude';

const logoPosition = [0, 0, -10];
const logoRotation = [0, Math.PI, 0];

const material = () => <meshPhongMaterial
    attach="material"
    color="black"
    emissive="cyan"
    shininess={1}
/>;

const HUDFace1 = () => {
    const upperCircle = useRef();
    const lowerCircle = useRef();

    const logo = useLoader(THREE.TextureLoader, "/graphics/general/logo.png");

    useFrame(() => {
        if (upperCircle.current != null) {
            upperCircle.current.rotation.z = upperCircle.current.rotation.z + 0.01;
        }
        if (lowerCircle.current != null) {
            lowerCircle.current.rotation.z = lowerCircle.current.rotation.z - 0.01;
        }
    })

    return (
        <Fragment>
            <mesh
                position={[0, 0, -9.5]}
            >
                <planeGeometry
                    args={[16, 16]}
                    attach="geometry"
                />
                <meshPhongMaterial
                    attach="material"
                    color="black"
                    opacity={0.5}
                    side={THREE.DoubleSide}
                    transparent={true}
                />
            </mesh>
            <group
                position={logoPosition}
                rotation={logoRotation}
            >
                <SVGExtrude
                    groupProps={{
                        position: [0, 0, 0.5],
                        scale: [0.1, 0.1, 0.1]
                    }}
                    layer={1}
                    material={material}
                    recenter={true}
                    ref={upperCircle}
                    url={'/svgs/hud/hudcircle1.svg'}
                />
                <SVGExtrude
                    groupProps={{
                        scale: [0.1, 0.1, 0.1]
                    }}
                    layer={1}
                    material={material}
                    recenter={true}
                    ref={lowerCircle}
                    url={'/svgs/hud/hudcircle2.svg'}
                />
                <mesh>
                    <planeGeometry
                        args={[5, 5]}
                        attach="geometry"
                    />
                    <meshStandardMaterial
                        attach="material"
                        map={logo}
                        side={THREE.DoubleSide}
                        transparent
                    />
                </mesh>
            </group>

        </Fragment >
    )

}


export default HUDFace1;