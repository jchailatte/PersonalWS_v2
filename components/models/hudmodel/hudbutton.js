import { Fragment, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Text } from '@react-three/drei';

import SVGExtrude from '../../three/SVGExtrude';

const HUDButton = (props) => {
    const [hover, setHover] = useState(false);

    const darkFilmMaterial = useMemo(() => <meshPhongMaterial attach="material" color="black" shininess={1} transparent={true} opacity={0.5} />, []);
    const darkFilmGeometry = useMemo(() => <planeGeometry attach="geometry" args={[9.5, 1.5]} />, []);

    return (
        <Fragment>
            <Text
                color="#008b8b"
                fontSize={1.5}
                anchorX="center"
                anchorY="center"
                position={[props.position[0] - 1, props.position[1] + 1, props.position[2] + 0.1]}
                font={props.fontType}
                layers={0}
            >
                {props.text}
            </Text>
            <SVGExtrude
                groupProps={{
                    position: props.position,
                    scale: [0.1, 0.1, 0.1]
                }}
                scale={[0.1, 0.1, 0.1]}
                url={'/svgs/hud/button0.svg'}
                layer={0} recenter={true}
            >
                <meshPhongMaterial attach="material" color={hover ? "#008b8b" : "cyan"} />
            </SVGExtrude>
            <mesh position={props.position}
                onPointerOver={(e) => setHover(true)}
                onPointerOut={(e) => setHover(false)}
                onClick={props.onClick}
            >
                {darkFilmGeometry}
                {darkFilmMaterial}
            </mesh>
        </Fragment>
    )
}

HUDButton.propTypes = {
    position: PropTypes.array,
    fontType: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func
}

HUDButton.defaultProps = {
    position: [0, 0, 0],
    fontType: "/fonts/Iceland-Regular.ttf"
}


export default HUDButton;