import { Fragment, useMemo, useLayoutEffect, Suspense } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

import FantasySky from '@/components/models/fantasySky';
import Lantern from '@/components/models/lantern';
import BinaryRing from '@/components/models/binaryRing';
import HUD from '@/components/models/hud/hud';
import Loader from '@/components/three/Loader';
import HUDFrame from '@/components/models/hud/hudFrame';
import HUDLogo from '@/components/models/hud/hudLogo';
import HUDScreen from '@/components/models/hud/hudScreen';

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
                makeDefault
            />
            <ambientLight />
            <OrbitControls
                enablePan={false}
                maxDistance={50}
            />
            <Suspense
                fallback={<Loader />}
            >
                <FantasySky />
                <Lanterns />
                <BinaryRing
                    direction={1}
                />
                <BinaryRing
                    direction={-1}
                />
                <HUDLogo 
                    logo={'/graphics/general/logo.png'} 
                />
                <HUDFrame />
                <HUDScreen/>
                <HUD />
            </Suspense>
            <SelectiveBloomEffect
                layer={1}
            />
        </Fragment>
    )
}

export default HUDWorld;