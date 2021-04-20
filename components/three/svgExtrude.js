import { useMemo, forwardRef, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { SVGLoader } from 'three-stdlib';

const SVGExtrude = forwardRef((props, ref) => {
    const data = useLoader(SVGLoader, props.url);
    const shapes = useMemo(() => data.paths.flatMap((g) => g.toShapes([props.isCCW, props.noHoles])), [data.paths, props.isCCW, props.noHoles]);
    const Material = useMemo(() => props.material, [props.material]);
    const internalRef = useRef();

    const scaleX = props.groupProps.scale[0] || 1;
    const scaleY = props.groupProps.scale[1] || 1;
    
    useLayoutEffect(() => {
        if (props.recenter) {
            const box = new THREE.Box3().setFromObject(internalRef.current);
            const size = new THREE.Vector3();
            box.getSize(size);

            const xOffset = (size.x / -2) * (1 / scaleX);
            const yOffset = (size.y / -2) * (1 / scaleY);

            internalRef.current.children.forEach(item => {
                item.position.x = xOffset;
                item.position.y = yOffset;
            });
        }
    }, [props.recenter, scaleX, scaleY]);

    useImperativeHandle(ref, () => internalRef.current, [internalRef]);

    return (
        <group
            ref={internalRef}
            {...props.groupProps}
        >
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
    url: PropTypes.string.isRequired,
    isCCW: PropTypes.bool,
    noHoles: PropTypes.bool,
};

SVGExtrude.defaultProps = {
    depth: 2,
    layer: 0,
    extrudeSettings: { bevelEnabled: false },
    recenter: false,
    isCCW: true,
    noHoles: true,
    groupProps: {},
    meshProps: {},
};

export default SVGExtrude;
