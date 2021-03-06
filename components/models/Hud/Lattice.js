import { useMemo } from 'react';
import { Line } from '@react-three/drei';
import PropTypes from 'prop-types';

const Lattice = (props) => {
    const data = useMemo(() => {
        return new Array(props.horizontalVertices + 1).fill().map((_, i) => ({
            points: [[props.verticalVertices / 2, i - props.horizontalVertices / 2, -1], [-props.verticalVertices / 2, i - props.horizontalVertices / 2, -1]],
        })).concat(new Array(props.verticalVertices + 1).fill().map((_, i) => ({
            points: [[i - props.verticalVertices / 2, props.horizontalVertices / 2, -1], [i - props.verticalVertices / 2, -props.horizontalVertices / 2, -1]],
        })))
    }, []);
    return data.map((props, i) => <Line key={i} {...props} lineWidth={0.5} color="cyan" layers={1} />)
}

Lattice.propTypes = {
    horizontalVertices: PropTypes.number.isRequired,
    verticalVertices: PropTypes.number.isRequired
}

export default Lattice;

