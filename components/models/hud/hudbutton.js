import { Fragment, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Text } from '@react-three/drei';

import SVGExtrude from '../../three/SVGExtrude';

const HUDButton = props => {
    const [hover, setHover] = useState(false);

    const darkFilmMaterial = useMemo(
        () => (
            <meshPhongMaterial
                attach="material"
                color="black"
                opacity={0.5}
                shininess={1}
                transparent={true}
            />
        ),
        []
    );
    const darkFilmGeometry = useMemo(
        () => <planeGeometry
            args={[9.5, 1.5]}
            attach="geometry"
        />,
        []
    );

    return (
        <Fragment>
            {/* <Text
                anchorX="center"
                anchorY="center"
                color="#008b8b"
                font={props.fontType}
                fontSize={1.5}
                layers={0}
                position={[props.position[0] - 1, props.position[1] + 1, props.position[2] + 0.1]}
            >
                {props.text}
            </Text> */}
            <SVGExtrude
                groupProps={{
                    position: props.position,
                    scale: [0.1, 0.1, 0.1]
                }}
                layer={0}
                material={() => <meshPhongMaterial
                    attach="material"
                    color={hover ? '#008b8b' : 'cyan'}
                />}
                recenter={true}
                scale={[0.1, 0.1, 0.1]}
                url={'/svgs/hud/button0.svg'}
            />
            <mesh
                onPointerDown={props.onClick}
                onPointerOut={() => setHover(false)}
                onPointerOver={() => setHover(true)}
                position={props.position}
            >
                {darkFilmGeometry}
                {darkFilmMaterial}
            </mesh>
        </Fragment>
    );
};

HUDButton.propTypes = {
    position: PropTypes.array,
    fontType: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func
};

HUDButton.defaultProps = {
    position: [0, 0, 0],
    fontType: '/fonts/Iceland-Regular.ttf'
};

export default HUDButton;
