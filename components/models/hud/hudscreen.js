import { Fragment, useMemo } from 'react';
import { Line } from '@react-three/drei';
import PropTypes from 'prop-types';

const HUDScreen = props => {
    const data = useMemo(() => {
        return new Array(props.horizontalVertices + 1)
            .fill()
            .map((_, i) => ({
                points: [
                    [props.verticalVertices / 2, i - props.horizontalVertices / 2, -1],
                    [-props.verticalVertices / 2, i - props.horizontalVertices / 2, -1]
                ]
            }))
            .concat(
                new Array(props.verticalVertices + 1).fill().map((_, i) => ({
                    points: [
                        [i - props.verticalVertices / 2, props.horizontalVertices / 2, -1],
                        [i - props.verticalVertices / 2, -props.horizontalVertices / 2, -1]
                    ]
                }))
            );
    }, [props.horizontalVertices, props.verticalVertices]);

    return (
        <Fragment>
            {data.map((props, i) => (
                <Line
                    key={'line' + i}
                    {...props}
                    color="cyan"
                    layers={1}
                    lineWidth={0.5}
                />
            ))}
            <mesh
                position={[0, 0, 0]}
            >
                <planeGeometry
                    args={[props.verticalVertices - 1, props.horizontalVertices - 1]}
                    attach="geometry"
                />
                <meshPhongMaterial
                    attach="material"
                    color="black"
                    opacity={0.1}
                    transparent={true}
                />
            </mesh>
            <mesh
                position={[1, 0, 0.1]}
            >
                <planeGeometry
                    args={[17, 15]}
                    attach="geometry"
                />
                <meshPhongMaterial
                    attach="material"
                    color="black"
                    opacity={0.5}
                    transparent={true}
                />
            </mesh>
        </Fragment>
    );
};

HUDScreen.propTypes = {
    horizontalVertices: PropTypes.number.isRequired,
    verticalVertices: PropTypes.number.isRequired
};

export default HUDScreen;
