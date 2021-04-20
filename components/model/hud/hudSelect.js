import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Text } from '@react-three/drei';

import SVGExtrude from '../../three/svgExtrude';

const HUDSelect = props => {
    const [hover, setHover] = useState(false);

    return (
        <Fragment>
            <SVGExtrude
                groupProps={{
                    position: [
                        props.position[0] - 1,
                        props.position[1] + 0.5,
                        props.position[2] + 0.5
                    ],
                    scale: [0.007, 0.007, 0.007],
                    rotation: [0, 0, Math.PI * 1.25]
                }}
                material={() => <meshPhongMaterial
                    attach="material"
                    color={hover ? '#008b8b' : 'cyan'}
                />}
                recenter={true}
                url={'/svgs/hud/hudsquare.svg'}
            />
            <mesh
                onClick={props.onClick}
                onPointerOut={() => setHover(false)}
                onPointerOver={() => setHover(true)}
                position={[
                    props.position[0] - 1.25,
                    props.position[1] + 1.25,
                    props.position[2] + 0.5
                ]}
                rotation={[0, 0, Math.PI / 4]}
            >
                <planeGeometry
                    args={[3, 3]}
                    attach="geometry"
                />
                <meshPhongMaterial
                    attach="material"
                    color="black"
                    opacity={0.5}
                    shininess={1}
                    transparent={true}
                />
            </mesh>
            {/* <Text
                anchorX="center"
                color="#008b8b"
                font={props.fontType}
                fontSize={1}
                position={[
                    props.position[0] - 1.25,
                    props.position[1] + 1.25,
                    props.position[2] + 0.6
                ]}
            >
                Select
            </Text> */}
        </Fragment>
    );
};

HUDSelect.propTypes = {
    position: PropTypes.array,
    fontType: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func
};

HUDSelect.defaultProps = {
    position: [0, 0, 0],
    fontType: '/fonts/Iceland-Regular.ttf'
};

export default HUDSelect;
