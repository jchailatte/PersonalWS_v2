import { Fragment, useState, Suspense } from 'react';
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Button } from '@material-ui/core';
import { PlayArrow, Pause } from '@material-ui/icons';

import SelectiveBloomEffect from '../three/selectiveBloomEffect';
//import Loader from '@/components/three/loader';

const AudioWorld = () => {
    const { camera } = useThree();
    const file = '/audio/[Diviners]Tropic Love.mp3';
    const [play, setPlay] = useState(false);

    const listener = new THREE.AudioListener();
    camera.add(listener);

    const sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();

    const toggle = (sound) => {
        if (sound.isPlaying) {
            console.log("pause");
            setPlay(false);
            sound.pause();
        }
        else {
            console.log("play")
            setPlay(true);
            sound.play
        }
    }

    return (
        <Fragment>
            <Suspense
                fallback={null}
            >
                <ambientLight />
                <OrbitControls
                    enablePan={false}
                    maxDistance={50}
                />
            </Suspense>
            <Html>
                <Button
                    onClick={() => toggle(sound)}
                    style={{ color: 'white' }}
                >
                    {play ? <Pause /> : <PlayArrow />}
                </Button>
                <audio
                    controls
                />
            </Html>
            <PerspectiveCamera
                fov={80}
                position={[0, 0, 22]}
                makeDefault
            />
            <SelectiveBloomEffect
                layer={1}
            />
        </Fragment>
    )
}

export default AudioWorld;