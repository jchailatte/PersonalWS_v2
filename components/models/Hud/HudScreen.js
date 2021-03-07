import { Fragment, useMemo } from 'react';
import { Line } from '@react-three/drei';
import PropTypes from 'prop-types';

const HUDScreen = (props) => {
    const data = useMemo(() => {
        return new Array(props.horizontalVertices + 1).fill().map((_, i) => ({
            points: [[props.verticalVertices / 2, i - props.horizontalVertices / 2, -1], [-props.verticalVertices / 2, i - props.horizontalVertices / 2, -1]],
        })).concat(new Array(props.verticalVertices + 1).fill().map((_, i) => ({
            points: [[i - props.verticalVertices / 2, props.horizontalVertices / 2, -1], [i - props.verticalVertices / 2, -props.horizontalVertices / 2, -1]],
        })))
    }, []);
    
    return (
        <Fragment>
            {data.map((props, i) => <Line key={i} {...props} lineWidth={0.5} color="cyan" layers={1} />)}
            <mesh position={[0, 0, 0]}>
                <planeGeometry attach="geometry" args={[props.verticalVertices - 1, props.horizontalVertices - 1]} />
                <meshPhongMaterial attach="material" color="cyan" depthTest={false} />
            </mesh>
            <mesh position={[1, 0, 0.1]}>
                <planeGeometry attach="geometry" args={[17, 15]} />
                <meshPhongMaterial attach="material" color="black" shininess={1} transparent={true} opacity={0.5} />
            </mesh>
        </Fragment>
    )
}

HUDScreen.propTypes = {
    horizontalVertices: PropTypes.number.isRequired,
    verticalVertices: PropTypes.number.isRequired
}

export default HUDScreen;

