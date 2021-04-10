import React, { Fragment, useMemo } from 'react';

import SVGExtrude from '@/components/three/SVGExtrude';

const HUDFrame = () => {

    const corner1Props = useMemo(() => ({
        groupProps: {
            position: [-5, -12, -1],
            scale: [-0.1, 0.1, 0.1]
        },
        material: () =>
            <meshPhongMaterial
                attach="material"
                color="black"
                emissive="#008b8b"
                shininess={10}
            />,
    }), []);

    const corner2Props = useMemo(() => ({
        groupProps: {
            position: [5, 12, -1],
            scale: [0.1, -0.1, 0.1]
        },
        material: () =>
            <meshPhongMaterial
                attach="material"
                color="black"
                emissive="#008b8b"
                shininess={10}
            />,
    }), []);

    const frameProps = useMemo(() => ({
        groupProps: {
            position: [0, 0, 0],
            scale: [0.0825, 0.055, 0.05]
        },
        material: () =>
            <meshPhongMaterial
                attach="material"
                color="black"
                emissive="#008b8b"
                shininess={10}
            />,

    }), []);

    return (
        <Fragment>
            <SVGExtrude
                {...corner1Props}
                depth={10}
                layer={1}
                url='/svgs/hud/hudcorner1.svg'
            />
            <SVGExtrude
                {...corner2Props}
                depth={10}
                layer={1}
                url='/svgs/hud/hudcorner1.svg'
            />
            <SVGExtrude
                {...frameProps}
                layer={1}
                recenter={true}
                url='/svgs/hud/border.svg'
            />
        </Fragment>
    );
};

export default HUDFrame;
