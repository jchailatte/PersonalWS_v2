import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';

import SVGExtrude from '../../three/SVGExtrude';

const HUDCorner = (props) => {

    

    return (
        <Fragment>
            <SVGExtrude position={[-5, -12, -1]} scale={[-0.1, 0.1, 0.1]} url={'/svgs/hud/hudcorner1.svg'} layer={1} depth={10} center={true}  >
                <meshPhongMaterial attach="material" color="black" emissive="#008b8b" shininess={10} />
            </SVGExtrude>
            <SVGExtrude position={[5, 12, -1]} scale={[0.1, -0.1, 0.1]} url={'/svgs/hud/hudcorner1.svg'} layer={1} depth={10} center={true}  >
                <meshPhongMaterial attach="material" color="black" emissive="#008b8b" shininess={10} />
            </SVGExtrude>
            <SVGExtrude position={[0, 0, 0]} scale={[.0825, .055, .05]} url={'/svgs/hud/border.svg'} recenter={true} >
                <meshBasicMaterial attach="material" color="cyan" />
            </SVGExtrude>
        </Fragment>
    )
}

export default HUDCorner;