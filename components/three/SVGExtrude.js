import { useMemo, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { useLoader, useUpdate } from 'react-three-fiber';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

//potentially add mesh props and group props

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
        <group
            position={props.position}
            scale={props.scale}
            rotation={props.rotation}
            ref={internalRef}
        >
            {shapes.map((shape, i) => (
                <mesh layers={props.layer} key={i} onClick={props.onClick}>
                    <extrudeGeometry attach="geometry" args={[shape, { depth: props.depth, ...props.extrudeSettings }]} />
                    {props.children}
                </mesh>
            ))}
        </group>
    )
});

SVGExtrude.propTypes = {
    position: PropTypes.array,
    scale: PropTypes.array,
    rotation: PropTypes.array,
    url: PropTypes.string.isRequired,
    depth: PropTypes.number,
    layer: PropTypes.number,
    extrudeSettings: PropTypes.object,
    recenter: PropTypes.bool,
    onClick: PropTypes.func,
}

SVGExtrude.defaultProps = {
    position: [0, 0, 0],
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
    depth: 2,
    layer: 0,
    extrudeSettings: { bevelEnabled: false },
    recenter: false,
}

export default SVGExtrude;