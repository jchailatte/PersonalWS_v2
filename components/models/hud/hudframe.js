import React, { Fragment, useMemo } from 'react';

import SVGExtrude from '@/components/three/SVGExtrude';

const HUDFrame = () => {

    const corner1Props = useMemo(() => ({
        depth: 10,
        groupProps: {
            position: [-5, -12, -1],
            scale: [-0.1, 0.1, 0.1]
        },
        layer: 1,
        material: () =>
            <meshPhongMaterial
                attach="material"
                color="black"
                emissive="#008b8b"
                shininess={10}
            />,
        url: '/svgs/hud/hudcorner1.svg'
    }), []);

    const corner2Props = useMemo(() => ({
        depth: 10,
        groupProps: {
            position: [5, 12, -1],
            scale: [0.1, -0.1, 0.1]
        },
        layer: 1,
        material: () =>
            <meshPhongMaterial
                attach="material"
                color="black"
                emissive="#008b8b"
                shininess={10}
            />,
        url: '/svgs/hud/hudcorner1.svg'
    }), []);

    const frameProps = useMemo(() => ({
        groupProps: {
            position: [0, 0, 0],
            scale: [0.0825, 0.055, 0.05]
        },
        layer: 1,
        material: () =>
            <meshPhongMaterial
                attach="material"
                color="black"
                emissive="#008b8b"
                shininess={10}
            />,
        recenter: true,
        url: '/svgs/hud/border.svg'
    }), []);

    return (
        <Fragment>
            {console.log("render hudFrame")}
            <SVGExtrude
                {...corner1Props}
            />
            <SVGExtrude
                {...corner2Props}
            />
            <SVGExtrude
                {...frameProps}
            />
        </Fragment>
    );
};

export default HUDFrame;
