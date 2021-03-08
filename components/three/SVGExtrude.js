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

            const xOffset = (size.x / -2) * (1 / props.groupProps.scale[0]);
            const yOffset = (size.y / -2) * (1 / props.groupProps.scale[1]);

            group.children.forEach((item) => {
                item.position.x = xOffset;
                item.position.y = yOffset;
            })
        }
    }, []);

    useImperativeHandle(ref, () => internalRef.current, []);

    return (
        <group
            ref={internalRef}
            {...props.groupProps}
        >
            {shapes.map((shape, i) => (
                <mesh layers={props.layer} key={i} {...props.meshProps} >
                    <extrudeGeometry attach="geometry" args={[shape, { depth: props.depth, ...props.extrudeSettings }]} />
                    {props.children}
                </mesh>
            ))}
        </group>
    )
});

SVGExtrude.propTypes = {
    groupProps: PropTypes.object,
    meshProps: PropTypes.object,
    depth: PropTypes.number,
    layer: PropTypes.number,
    extrudeSettings: PropTypes.object,
    recenter: PropTypes.bool,
}

SVGExtrude.defaultProps = {
    depth: 2,
    layer: 0,
    extrudeSettings: { bevelEnabled: false },
    recenter: false,
}

export default SVGExtrude;