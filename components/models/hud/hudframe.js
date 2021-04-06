import React, { Fragment } from 'react';

import SVGExtrude from '../../three/SVGExtrude';

const HUDFrame = () => {

    return (
        <Fragment>
            <SVGExtrude
                depth={10}
                groupProps={{
                    position: [-5, -12, -1],
                    scale: [-0.1, 0.1, 0.1]
                }}
                layer={1}
                material={() => <meshPhongMaterial
                    attach="material"
                    color="black"
                    emissive="#008b8b"
                    shininess={10}
                />}
                url={'/svgs/hud/hudcorner1.svg'}
            />
            <SVGExtrude
                depth={10}
                groupProps={{
                    position: [5, 12, -1],
                    scale: [0.1, -0.1, 0.1]
                }}
                layer={1}
                material={() => <meshPhongMaterial
                    attach="material"
                    color="black"
                    emissive="#008b8b"
                    shininess={10}
                />}
                url="/svgs/hud/hudcorner1.svg"
            />
            <SVGExtrude
                groupProps={{
                    position: [0, 0, 0],
                    scale: [0.0825, 0.055, 0.05]
                }}
                layer={1}
                material={() => <meshPhongMaterial
                    attach="material"
                    color="black"
                    emissive="#008b8b"
                    shininess={10}
                />}
                recenter={true}
                url={'/svgs/hud/border.svg'}
            />
        </Fragment>
    );
};

export default HUDFrame;
