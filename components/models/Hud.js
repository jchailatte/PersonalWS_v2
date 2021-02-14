import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { Text, Line, Plane } from '@react-three/drei';

import SVGExtrude from '../three/SVGExtrude';

const horizontalVertices = 20;
const verticalVertices = 40;

//potential colors:
// cyan, slate gray, white, dark cyan ( 008b8b)

//rmber to optimize geometries and materials later either with useMemo or useResource

const Screen = (props) => {
    //note: the psuedo-wireframe effect is only working with react-three-fiber@5.3.17 atm
    return (
        <React.Fragment>
            <mesh position={[0, 0, 0]}>
                <planeGeometry attach="geometry" args={[verticalVertices - 1, horizontalVertices - 1]} />
                <meshPhongMaterial attach="material" color="cyan" depthTest={false} />
            </mesh>
            <SVGExtrude position={[-verticalVertices / 2, -horizontalVertices / 2, 0]} scale={[.08, .055, .05]} url={'/svgs/hud/border.svg'} />
        </React.Fragment>
    )
}

const HUDCorner = (props) => {
    const corner1 = useRef();
    const corner2 = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (corner1.current != null) {
            corner1.current.position.x = corner1.current.position.x + Math.sin(time) / 80;
            corner1.current.position.y = corner1.current.position.y + Math.sin(time) / 80;
        }
        if (corner2.current != null) {
            corner2.current.position.x = corner2.current.position.x - Math.sin(time) / 80;
            corner2.current.position.y = corner2.current.position.y - Math.sin(time) / 80;
        }
    })

    return (
        <React.Fragment>
            <SVGExtrude position={[-5, -13, -1]} scale={[-.1, .1, .1]} url={'/svgs/hud/hudcorner1.svg'} color="#008b8b" layer={1} depth={10} ref={corner1} />
            <SVGExtrude position={[5, 13, -1]} scale={[.1, -.1, .1]} url={'/svgs/hud/hudcorner1.svg'} color="#008b8b" layer={1} depth={10} ref={corner2} />
        </React.Fragment>
    )
}

const HUDCircle = (props) => {

    const circle1 = useRef();
    const circle2 = useRef();

    useFrame((state)=>{
        const time = state.clock.getElapsedTime();

        if(circle1.current != null) {
            circle1.current.rotation.z = circle1.current.rotation.z + 0.01;
        }
    })

    return (
        <React.Fragment>
            <SVGExtrude position={[9, 0, 0]} scale={[0.1, 0.1, 0.1]} url={'/svgs/hud/hudcircle0.svg'} layer={1} ref={circle1}/>
            <SVGExtrude position={[10.5, 1.5, 2]} scale={[.1, .1, .1]} url={'/svgs/hud/hudcircle2.svg'} layer={1} />
        </React.Fragment>

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
        <React.Fragment>
            <Lattice />
            <Screen />
            <HUDCorner />
            <HUDCircle />
        </React.Fragment>
    )
}

export default Hud;