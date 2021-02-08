import React, { useMemo } from 'react'
import { Text, Line, Plane } from '@react-three/drei'

import HudCircle from './HudCircle';
import { VerifiedUser } from '@material-ui/icons';

const horizontalVertices = 20;
const verticalVertices = 40;

function Screen(props) {
    //note: the psuedo-wireframe effect is currently only working with react-three-fiber@5.3.17
    return (
        <mesh>
            <planeGeometry attach="geometry" args={[horizontalVertices, verticalVertices]}/>
            <meshPhongMaterial attach="material" color="cyan" depthTest={false} />
        </mesh>
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
            {/* <HudCircle /> */}
        </React.Fragment>
    )
}

export default Hud;