import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { Text, Line, Plane } from '@react-three/drei';

import HudCircle from './HudCircle';
import SVGExtrude from '../three/SVGExtrude';
import { Group } from '@material-ui/icons';

const horizontalVertices = 20;
const verticalVertices = 40;

function Screen(props) {
    //note: the psuedo-wireframe effect is only working with react-three-fiber@5.3.17 atm
    return (
        <React.Fragment>
            <mesh position={[0, 0, 0]}>
                <planeGeometry attach="geometry" args={[verticalVertices - 2, horizontalVertices - 2]} />
                <meshPhongMaterial attach="material" color="cyan" depthTest={false} />
            </mesh>
            <SVGExtrude position={[-verticalVertices/2, -horizontalVertices/2, 0]} scale={[.08, .055, .05]} url={'/svgs/hud/border.svg'} />
        </React.Fragment>
    )
}

function HUDCircle(props) {



}

function HUDCorner(props) {
    const corner1 = useRef();
    const corner2 = useRef();

    // useFrame((state)=>{
    //     const time = state.clock.getElapsedTime();
    //     corner1.current.position.x = corner1.current.position.x + Math.sin(time)/20;
    //     corner1.current.position.y = corner1.current.position.y + Math.sin(time)/20;
    // })

    return (
        <React.Fragment>
            <SVGExtrude position={[-5, -13, -1]} scale={[-.1, .1, .1]} url={'/svgs/hud/hudcorner1.svg'} color="#008b8b" layer={1} depth={10} ref={corner1} />
            <SVGExtrude position={[5, 13, -1]} scale={[.1, -.1, .1]} url={'/svgs/hud/hudcorner1.svg'} color="#008b8b" layer={1} depth={10} ref={corner2} />
        </React.Fragment>
    )
}

function Grid(props) {
    const data = useMemo(() => {
        return new Array(horizontalVertices + 1).fill().map((_, i) => ({
            points: [[verticalVertices / 2, i - horizontalVertices / 2, -1], [-verticalVertices / 2, i - horizontalVertices / 2, -1]],
        })).concat(new Array(verticalVertices + 1).fill().map((_, i) => ({
            points: [[i - verticalVertices / 2, horizontalVertices / 2, -1], [i - verticalVertices / 2, -horizontalVertices / 2, -1]],
        })))
    }, []);
    return data.map((props, i) => <Line key={i} {...props} lineWidth={0.5} color="cyan" layers={1} />)
}

function Hud(props) {
    return (
        <React.Fragment>
            <Grid />
            <Screen />
            <HUDCorner />
            <HudCircle />
        </React.Fragment>
    )
}

export default Hud;