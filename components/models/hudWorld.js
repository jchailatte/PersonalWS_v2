import { Fragment, useMemo, useLayoutEffect, Suspense } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

import FantasySky from '@/components/models/fantasySky';
import Lantern from '@/components/models/lantern';
import BinaryRing from '@/components/models/binaryRing';
import Hud from '@/components/models/hud/hud';

import Hud2 from '@/components/models/hud/hud2';

import SelectiveBloomEffect from '@/components/three/SelectiveBloomEffect';

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
            <PerspectiveCamera
                fov={80}
                position={[1, 0, 15]}
            />
            <ambientLight />
            <OrbitControls
                enablePan={false}
                maxDistance={50}
            />
            <Suspense
                fallback={null}
            >
                <Hud />
                <Hud2 />
                <FantasySky />
                <Lanterns />
                <BinaryRing
                    direction={1}
                />
                <BinaryRing
                    direction={-1}
                />
            </Suspense>
            {/* <SelectiveBloomEffect
                    layer={1}
            /> */}
        </Fragment>
    )
}

export default HUDWorld;