import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useLoader, useThree } from 'react-three-fiber';
import { Plane, Extrude } from '@react-three/drei';

import SVGExtrude from '../three/SVGExtrude';

function HudCircle(props) {
    //008b8b
    //potential colors:
    // cyan, slate gray, white, dark cyan

    const urls = [...Array(3)].map((_,i)=> `/svgs/hud/hudcircle${i}.svg`);

    return (
        <>
            {/* <SVGExtrude position={[10.5,1.5,1]} scale={[0.04,0.04,0.04]} url={urls[1]} layer={1}/> */}
            <SVGExtrude position={[9,0,0]} scale={[.1,.1,.1]} url={urls[0]} layer={1} />
            <SVGExtrude position={[10.5,1.5,2]} scale={[.1,.1,.1]} url={urls[2]} layer={1}/>
        </>
    )
}

export default HudCircle;