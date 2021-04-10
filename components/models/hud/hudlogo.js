import React, { Fragment, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';

import SVGExtrude from '@/components/three/SVGExtrude';

const HUDLogo = (props) => {
    const circle1 = useRef();
    const circle2 = useRef();

    const logo = useLoader(THREE.TextureLoader, props.logo);

    const ring1Props = useMemo(() => ({
        groupProps: {
            position: [15, 5, 1],
            scale: [0.1, 0.1, 0.1]
        },
        material: () =>
            <meshPhongMaterial
                attach="material"
                color="black"
                emissive="cyan"
                shininess={1}
            />,
    }), []);

    const ring2Props = useMemo(() => ({
        groupProps: {
            position: [15, 5, 0],
            scale: [0.1, 0.1, 0.1],
        },
        material: () =>
            <meshPhongMaterial
                attach="material"
                color="black"
                emissive="cyan"
                shininess={1}
            />,
    }), []);


    useFrame(() => {
        if (circle1.current != null) {
            circle1.current.rotation.z = circle1.current.rotation.z + 0.01;
        }
        if (circle2.current != null) {
            circle2.current.rotation.z = circle2.current.rotation.z - 0.01;
        }
    });

    return (
        <Fragment>
            <SVGExtrude
                {...ring1Props}
                layer={1}
                recenter={true}
                ref={circle1}
                url={'/svgs/hud/hudcircle1.svg'}
            />
            <SVGExtrude
                {...ring2Props}
                layer={1}
                recenter={true}
                ref={circle2}
                url={'/svgs/hud/hudcircle2.svg'}
            />
            <mesh
                position={[15, 5, 0.5]}
            >
                <planeGeometry
                    args={[5, 5]}
                    attach="geometry"
                />
                <meshStandardMaterial
                    attach="material"
                    map={logo}
                    side={THREE.DoubleSide}
                    transparent
                />
            </mesh>
        </Fragment>
    );
};

HUDLogo.propTypes = {
    logo: PropTypes.string.isRequired
};

export default HUDLogo;
