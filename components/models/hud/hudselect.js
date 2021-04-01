import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Text } from '@react-three/drei';

import SVGExtrude from '../../three/SVGExtrude';

const HUDSelect = (props) => {
    const [hover, setHover] = useState(false);

    return (
        <Fragment>
            <SVGExtrude
                groupProps={{
                    position: [props.position[0] - 1, props.position[1] + 0.5, props.position[2] + 0.5],
                    scale: [0.007, 0.007, 0.007],
                    rotation: [0, 0, Math.PI * 1.25]
                }}
                url={"/svgs/hud/hudsquare.svg"}
                recenter={true}
            >
                <meshPhongMaterial attach="material" color={hover ? "#008b8b" : "cyan"} />
            </SVGExtrude>
            <mesh
                position={[props.position[0] - 1.25, props.position[1] + 1.25, props.position[2] + 0.5]}
                rotation={[0, 0, Math.PI / 4]}
                onPointerOver={setHover(true)}
                onPointerOut={setHover(false)}
                onClick={props.onClick}
            >
                <planeGeometry attach="geometry" args={[3, 3]} />
                <meshPhongMaterial attach="material" color="black" shininess={1} transparent={true} opacity={0.5} />
            </mesh>
            <Text
                color="#008b8b"
                fontSize={1}
                anchorX="center"
                position={[props.position[0] - 1.25, props.position[1] + 1.25, props.position[2] + 0.6]}
                font={props.fontType}
            >
                Select
            </Text>
        </Fragment>
    )
}

HUDSelect.propTypes = {
    position: PropTypes.array,
    fontType: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func
};

HUDSelect.defaultProps = {
    position: [0, 0, 0],
    fontType: "/fonts/Iceland-Regular.ttf"
}

export default HUDSelect;