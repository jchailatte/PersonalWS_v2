import React, { Suspense, useMemo, useState, Profiler, useRef, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';

import { Canvas, useThree } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';

import FantasySky from '../components/models/fantasysky.js';
import Lantern from '../components/models/lantern.js';
import BinaryRing from '../components/models/binaryring.js';
import Hud from '../components/models/hud/hud.js';

import SelectiveBloomEffect from '../components/three/SelectiveBloomEffect';

const useStyles = makeStyles((theme) => ({
    root: {
        //fix the little gap when switching to mobile
        height: 'calc(100vh - 64px)',
        width: '100vw'
    }
}));

export async function getStaticProps(context) {
    return {
        props: {
            selected: 'Home',
            padding: false,
        }
    }
}

const Lanterns = () => {
    const { camera } = useThree();

    const data = useMemo(() => {
        return new Array(30).fill().map((_, i) => ({
            x: (20 + Math.random() * 35) * (Math.round(Math.random()) ? -1 : 1),
            y: (20 + Math.random() * 35) * (Math.round(Math.random()) ? -1 : 1),
            z: (20 + Math.random() * 35) * (Math.round(Math.random()) ? -1 : 1),
            yOffset: Math.random(),
            rotation: Math.round(Math.random()) ? -1 : 1
        }))
    }, [])

    return data.map((props, i) => <Lantern key={"lantern" + i} {...props} />)
}

const Index = (props) => {
    const classes = useStyles();

    // const router = useRouter();
    // console.log(router);

    const logTimes = (id, phase, actualTime, baseTime, startTime, commitTime) => {
        console.log(`${id}'s ${phase} phase:`);
        console.log(`Actual time: ${actualTime}`);
        console.log(`Base time: ${baseTime}`);
        console.log(`Start time: ${startTime}`);
        console.log(`Commit time: ${commitTime}`);
    };

    const ref = useRef();

    const Scripts = () => {
        const { camera } = useThree();

        useLayoutEffect(() => {
            camera.layers.enable(0);
            camera.layers.enable(1);
        }, [])

        return null;
    }

    return (
        <React.Fragment>
            <Head>
                <meta
                    name="description"
                    key="description"
                    content="A little personal website for me or as I like to call it, my developer sandbox"
                    key="description"
                />
            </Head>
            <div className={classes.root}>
                <Canvas
                    //concurrent is causing the triple render (dunno if performance boost or not?)
                    //concurrent
                    colorManagement
                    shadowMap
                    camera={{ position: [1, 0, 15], fov: 80 }}
                >
                    <ambientLight />
                    <OrbitControls 
                        maxDistance={50}
                    />
                    <Suspense fallback={null}>
                        <Scripts />
                        <FantasySky />
                        <Lanterns />
                        <BinaryRing
                            direction={1}
                        />
                        <BinaryRing
                            direction={-1}
                        />
                        <Hud/>
                    </Suspense>
                    <SelectiveBloomEffect layer={1} />
                </Canvas>
            </div>
        </React.Fragment>
    )
};

export default Index;