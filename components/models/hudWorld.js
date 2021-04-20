import { Fragment, useMemo, useLayoutEffect, Suspense } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

//import Loader from '@/components/three/loader';
import FantasySky from './fantasySkyModel';
import Lantern from './lanternModel';
import BinaryRing from './binaryRingModel';
import Cube from './cubeModel';

import HUDFace1 from './hud/hudFace1';
import HUDFace2 from './hud/hudFace2';
import HUDFace3 from './hud/hudFace3';
import HUDFace4 from './hud/hudFace4';
import HUDFace5 from './hud/hudFace5'; 
import HUDFace6 from './hud/hudFace6';
//import HUDFrame from './hud/hudFrame';

import SelectiveBloomEffect from '../three/selectiveBloomEffect';

const Lanterns = () => {
    const data = useMemo(() => {
        return new Array(30).fill().map(() => ({
            x: (20 + Math.random() * 35) * (Math.round(Math.random()) ? -1 : 1),
            y: (20 + Math.random() * 35) * (Math.round(Math.random()) ? -1 : 1),
            z: (20 + Math.random() * 35) * (Math.round(Math.random()) ? -1 : 1),
            yOffset: Math.random(),
            rotation: Math.round(Math.random()) ? -1 : 1
        }));
    }, []);

    return data.map((props, i) => <Lantern
        key={'lantern' + i}
        {...props}
    />);
};

const HUDWorld = () => {
    const { camera } = useThree();

    useLayoutEffect(() => {
        camera.layers.enable(0);
        camera.layers.enable(1);
    }, [camera]);

    return (
        <Fragment>
            <Suspense
                fallback={null}
            >
                <FantasySky />
                <Lanterns />
                <group
                    rotation={[-Math.PI / 16, Math.PI / 16, 0]}
                >
                    <BinaryRing />
                    <Cube />
                    <HUDFace1 />
                    <HUDFace2 />
                    <HUDFace3 />
                    <HUDFace4 />
                    <HUDFace5 />
                    <HUDFace6 />
                    {/* <HUDFrame /> */}
                </group>

                <ambientLight />
                <OrbitControls
                    enablePan={false}
                    maxDistance={50}
                />
            </Suspense>
            <PerspectiveCamera
                fov={80}
                position={[0, 0, 19]}
                makeDefault
            />
            <SelectiveBloomEffect
                layer={1}
            />
        </Fragment>
    )
}

export default HUDWorld;