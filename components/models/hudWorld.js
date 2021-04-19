import { Fragment, useMemo, useLayoutEffect, Suspense } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

//import Loader from '@/components/three/loader';
import FantasySky from './fantasySky';
import Lantern from './lantern';
import BinaryRing from './binaryRing';
import Cube from './cube';

import HUDFace1 from './hud/hudFace1';
import HUDFace2 from './hud/hudFace2';
import HUDFace3 from './hud/hudFace3';


import HUD from '@/components/models/hud/hud';
import HUDFrame from '@/components/models/hud/hudFrame';
import HUDScreen from '@/components/models/hud/hudScreen';

import SelectiveBloomEffect from '@/components/three/selectiveBloomEffect';

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
  
                <BinaryRing/>
                <Cube />
                {/* <HUDFrame/> */}
                <HUDFace1 />
                <HUDFace2 />
                <HUDFace3 />
                <ambientLight />
                <OrbitControls
                    enablePan={false}
                    maxDistance={50}
                />
            </Suspense>
            <PerspectiveCamera
                fov={80}
                position={[0, 0, 17]}
                makeDefault
            />
            <SelectiveBloomEffect
                layer={1}
            />
        </Fragment>
    )
}

export default HUDWorld;