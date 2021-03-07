import React, { Fragment, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

import SVGExtrude from '../../three/SVGExtrude';

const HUDCorner = (props) => {

    const material = useMemo(() => <meshPhongMaterial attach="material" color="black" emissive="#008b8b" shininess={10} />, []);

    return (
        <Fragment>
            <SVGExtrude position={[-5, -12, -1]} scale={[-0.1, 0.1, 0.1]} url={'/svgs/hud/hudcorner1.svg'} layer={1} depth={10} center={true}  >
                {material}
            </SVGExtrude>
            <SVGExtrude position={[5, 12, -1]} scale={[0.1, -0.1, 0.1]} url={'/svgs/hud/hudcorner1.svg'} layer={1} depth={10} center={true}  >
                {material}
            </SVGExtrude>
            <SVGExtrude position={[0, 0, 0]} scale={[.0825, .055, .05]} url={'/svgs/hud/border.svg'} layer={1} recenter={true} >
                {material}
            </SVGExtrude>
        </Fragment>
    )
}

export default HUDCorner;