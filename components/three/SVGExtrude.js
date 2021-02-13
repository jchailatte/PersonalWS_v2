import { useMemo, forwardRef } from 'react';
import PropTypes from 'prop-types'
import { useLoader } from 'react-three-fiber';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

function SVGExtrude (props) {
    const data = useLoader(SVGLoader, props.url);
    const shapes = useMemo(() => data.paths.flatMap((g) => g.toShapes(true)), [data]);

    return (
        <group position={props.position} scale={props.scale} dispose={null}>
            {
                shapes.map((shape, i) => (
                    <mesh layers={props.layer} key={i}>
                        <extrudeGeometry attach="geometry" args={[shape, { depth: props.depth, bevelEnabled: props.bevelEnabled }]}/>
                        <meshBasicMaterial attach="material" color={props.color} />
                    </mesh>
                ))
            }
        </group>
    )   
};

SVGExtrude.propTypes = {
    position: PropTypes.array,
    scale: PropTypes.array,
    url: PropTypes.string.isRequired,
    color: PropTypes.string,
    depth: PropTypes.number,
    layer: PropTypes.number,
    bevelEnabled: PropTypes.bool,
}

SVGExtrude.defaultProps = {
    position: [0, 0, 0],
    scale: [1, 1, 1],
    depth: 2,
    color: "cyan",
    layer: 0,
    bevelEnabled: false,
}

export default SVGExtrude;