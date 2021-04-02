import React, { Fragment, useMemo } from 'react';

import SVGExtrude from '../../three/SVGExtrude';

const HUDFrame = () => {
    const material = useMemo(
        () => (
            <meshPhongMaterial
                attach="material"
                color="black"
                emissive="#008b8b"
                shininess={10}
            />
        ),
        []
    );

    return (
        <Fragment>
            <SVGExtrude
                depth={10}
                groupProps={{
                    position: [-5, -12, -1],
                    scale: [-0.1, 0.1, 0.1]
                }}
                layer={1}
                url={'/svgs/hud/hudcorner1.svg'}
            >
                {material}
            </SVGExtrude>
            <SVGExtrude
                depth={10}
                groupProps={{
                    position: [5, 12, -1],
                    scale: [0.1, -0.1, 0.1]
                }}
                layer={1}
                url="/svgs/hud/hudcorner1.svg"
            >
                {material}
            </SVGExtrude>
            <SVGExtrude
                groupProps={{
                    position: [0, 0, 0],
                    scale: [0.0825, 0.055, 0.05]
                }}
                layer={1}
                recenter={true}
                url={'/svgs/hud/border.svg'}
            >
                {material}
            </SVGExtrude>
        </Fragment>
    );
};

export default HUDFrame;
