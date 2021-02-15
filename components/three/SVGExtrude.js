import { useMemo, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { useLoader, useUpdate } from 'react-three-fiber';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

const SVGExtrude = forwardRef((props, ref) => {
    const data = useLoader(SVGLoader, props.url);
    const shapes = useMemo(() => data.paths.flatMap((g) => g.toShapes(true)), [data]);

    const internalRef = useUpdate((group) => {
        if (props.recenter) {
            const box = new THREE.Box3().setFromObject(group);
            const size = new THREE.Vector3();
            box.getSize(size);

            const xOffset = (size.x / -2) * (1 / props.scale[0]);
            const yOffset = (size.y / -2) * (1 / props.scale[1]);

            group.children.forEach((item) => {
                item.position.x = xOffset;
                item.position.y = yOffset;
            })
        }
    }, []);

    useImperativeHandle(ref, () => internalRef.current, []);

    return (
        <group position={props.position} scale={props.scale} dispose={null} ref={internalRef}>
            {
                shapes.map((shape, i) => (
                    <mesh layers={props.layer} key={i} >
                        <extrudeGeometry attach="geometry" args={[shape, { depth: props.depth, bevelEnabled: props.bevelEnabled }]} />
                        <meshBasicMaterial attach="material" color={props.color} />
                    </mesh>
                ))
            }
        </group>
    )
});

SVGExtrude.propTypes = {
    position: PropTypes.array,
    scale: PropTypes.array,
    url: PropTypes.string.isRequired,
    color: PropTypes.string,
    depth: PropTypes.number,
    layer: PropTypes.number,
    bevelEnabled: PropTypes.bool,
    recenter: PropTypes.bool,
}

SVGExtrude.defaultProps = {
    position: [0, 0, 0],
    scale: [1, 1, 1],
    depth: 2,
    color: "cyan",
    layer: 0,
    bevelEnabled: false,
    recenter: false,
}

export default SVGExtrude;