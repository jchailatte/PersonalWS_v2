import { useMemo, forwardRef, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

const SVGExtrude = forwardRef((props, ref) => {
    const data = useLoader(SVGLoader, props.url);
    const shapes = useMemo(() => data.paths.flatMap(g => g.toShapes(true)), [data]);

    const Material = useMemo(()=>props.material,[props.material]);

    const internalRef = useRef();
    
    //eh fix this at some point

    useLayoutEffect(() => {
        if (props.recenter) {
            console.log("recenter " + props.url);
            const box = new THREE.Box3().setFromObject(internalRef.current);
            const size = new THREE.Vector3();
            box.getSize(size);

            const xOffset = (size.x / -2) * (1 / props.groupProps.scale[0]);
            const yOffset = (size.y / -2) * (1 / props.groupProps.scale[1]);

            internalRef.current.children.forEach(item => {
                item.position.x = xOffset;
                item.position.y = yOffset;
            });
        }
    }, [props.groupProps.scale, props.recenter]);

    useImperativeHandle(ref, () => internalRef.current, [internalRef]);

    return (
        <group
            ref={internalRef}
            {...props.groupProps}
        >
            {console.log("render " + props.url)}
            {shapes.map((shape) => (
                <mesh
                    key={shape.uuid}
                    layers={props.layer}
                    {...props.meshProps}
                >
                    <extrudeGeometry
                        args={[shape, { depth: props.depth, ...props.extrudeSettings }]}
                        attach="geometry"
                    />
                    <Material />
                </mesh>
            ))}
        </group>
    );
});

SVGExtrude.propTypes = {
    material: PropTypes.func.isRequired,
    groupProps: PropTypes.object,
    meshProps: PropTypes.object,
    depth: PropTypes.number,
    layer: PropTypes.number,
    extrudeSettings: PropTypes.object,
    recenter: PropTypes.bool,
    url: PropTypes.string.isRequired
};

SVGExtrude.defaultProps = {
    depth: 2,
    layer: 0,
    extrudeSettings: { bevelEnabled: false },
    recenter: false
};

export default SVGExtrude;
