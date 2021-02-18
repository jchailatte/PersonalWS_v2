import React, { Fragment, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader, useUpdate } from 'react-three-fiber';
import { Text, Line, Plane, Billboard } from '@react-three/drei';

import SVGExtrude from '../three/SVGExtrude';

const horizontalVertices = 20;
const verticalVertices = 40;

//potential colors:
// cyan, slate gray, white, dark cyan ( 008b8b)

//rmber to optimize geometries and materials later either with useMemo or useResource

const Screen = (props) => {
    //note: the psuedo-wireframe effect is only working with react-three-fiber@5.3.17 atm
    return (
        <Fragment>
            <mesh position={[0, 0, 0]}>
                <planeGeometry attach="geometry" args={[verticalVertices - 1, horizontalVertices - 1]} />
                <meshPhongMaterial attach="material" color="cyan" depthTest={false} />
            </mesh>
            <SVGExtrude position={[0, 0, 0]} scale={[.0825, .055, .05]} url={'/svgs/hud/border.svg'} recenter={true} >
                <meshBasicMaterial attach="material" color="cyan" />
            </SVGExtrude>
        </Fragment>
    )
}

const HUDCorner = (props) => {
    const corner1 = useRef();
    const corner2 = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const wave = Math.sin(time) / 100;

        if (corner1.current != null) {
            corner1.current.position.x = corner1.current.position.x + wave;
            corner1.current.position.y = corner1.current.position.y + wave;
        }
        if (corner2.current != null) {
            corner2.current.position.x = corner2.current.position.x - wave;
            corner2.current.position.y = corner2.current.position.y - wave;
        }
    })

    return (
        <Fragment>
            <SVGExtrude position={[-5, -12, -1]} scale={[-0.1, 0.1, 0.1]} url={'/svgs/hud/hudcorner1.svg'} layer={1} depth={10} ref={corner1} >
                <meshBasicMaterial attach="material" color="#008b8b" />
            </SVGExtrude>
            <SVGExtrude position={[5, 12, -1]} scale={[0.1, -0.1, 0.1]} url={'/svgs/hud/hudcorner1.svg'} layer={1} depth={10} ref={corner2} >
                <meshBasicMaterial attach="material" color="#008b8b" />
            </SVGExtrude>
        </Fragment>
    )
}

const HUDCircle = (props) => {
    const circle1 = useRef();
    const circle2 = useRef();

    const logo = useLoader(THREE.TextureLoader, '/graphics/general/logo.png')

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (circle1.current != null) {
            circle1.current.rotation.z = circle1.current.rotation.z + 0.01;
        }
        if (circle2.current != null) {
            circle2.current.rotation.z = circle2.current.rotation.z - 0.01;
        }
    })

    return (
        <Fragment>
            <SVGExtrude position={[15, 5, 0]} scale={[0.1, 0.1, 0.1]} url={'/svgs/hud/hudcircle0.svg'} layer={1} recenter={true} ref={circle1} >
                <meshBasicMaterial attach="material" color="cyan" />
            </SVGExtrude>
            <SVGExtrude position={[15, 5, 1]} scale={[0.1, 0.1, 0.1]} url={'/svgs/hud/hudcircle2.svg'} layer={1} recenter={true} ref={circle2} >
                <meshBasicMaterial attach="material" color="cyan" />
            </SVGExtrude>
            <Billboard position={[15, 5, 0.5]} follow={true} args={[5, 5]} lockX={true} lockY={true}>
                <meshStandardMaterial attach="material" map={logo} transparent />
            </Billboard>
        </Fragment>

    )
}

const HUDTitle = (props) => {
    return (
        <Fragment>
            <Text
                color="cyan"
                fontSize={2}
                anchorX="center"
                anchorY="center"
                position={[-10, 10, 0.1]}
            >
                Jonathan Chai
            </Text>
        </Fragment>
    )
}

const Lattice = (props) => {
    const data = useMemo(() => {
        return new Array(horizontalVertices + 1).fill().map((_, i) => ({
            points: [[verticalVertices / 2, i - horizontalVertices / 2, -1], [-verticalVertices / 2, i - horizontalVertices / 2, -1]],
        })).concat(new Array(verticalVertices + 1).fill().map((_, i) => ({
            points: [[i - verticalVertices / 2, horizontalVertices / 2, -1], [i - verticalVertices / 2, -horizontalVertices / 2, -1]],
        })))
    }, []);
    return data.map((props, i) => <Line key={i} {...props} lineWidth={0.5} color="cyan" layers={1} />)
}

const Hud = (props) => {
    return (
        <Fragment>
            <Lattice />
            <Screen />
            <HUDCorner />
            <HUDCircle />
            <HUDTitle />
        </Fragment>
    )
}

export default Hud;