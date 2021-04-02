import React, { Fragment, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { useFrame, useLoader } from 'react-three-fiber';

import SVGExtrude from '../../three/SVGExtrude';

const HUDLogo = props => {
    const circle1 = useRef();
    const circle2 = useRef();

    const logo = useLoader(THREE.TextureLoader, props.logo);
    const material = useMemo(
        () => <meshPhongMaterial
            attach="material"
            color="black"
            emissive="cyan"
            shininess={1} />,
        []
    );

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
                groupProps={{
                    position: props.position,
                    scale: [0.1, 0.1, 0.1]
                }}
                layer={1}
                recenter={true}
                ref={circle1}
                url={'/svgs/hud/hudcircle0.svg'}
            >
                {material}
            </SVGExtrude>
            <SVGExtrude
                groupProps={{
                    position: [props.position[0], props.position[1], props.position[2] + 1],
                    scale: [0.1, 0.1, 0.1]
                }}
                layer={1}
                recenter={true}
                ref={circle2}
                url={'/svgs/hud/hudcircle2.svg'}
            >
                {material}
            </SVGExtrude>
            <mesh
                position={[15, 5, 0.5]}>
                <planeGeometry
                    args={[5, 5]}
                    attach="geometry" />
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
    position: PropTypes.array.isRequired,
    logo: PropTypes.string.isRequired
};

export default HUDLogo;
