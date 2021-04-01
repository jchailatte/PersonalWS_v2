import React, { Suspense, useMemo, Fragment, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';

import ThreeDRotationIcon from '@material-ui/icons/ThreeDRotation';
import { Canvas, useThree } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';

import FantasySky from '../components/models/fantasysky';
import Lantern from '../components/models/lantern';
import BinaryRing from '../components/models/binaryring';
import Hud from '../components/models/hud/hud';
import Info from '../components/general/info';

import SelectiveBloomEffect from '../components/three/SelectiveBloomEffect';

const useStyles = makeStyles((theme) => ({
    root: {
        //fix the little gap when switching to mobile
        //which for some reason refuses to disappear -_-
        height: 'calc(100vh - 64px)',
        width: '100vw'
    },
    ThreeDAvatar: {
        position: 'absolute',
        bottom: theme.spacing(3),
        right: theme.spacing(10),
        color: 'white',
        zIndex: 100
    }
}));

export async function getStaticProps() {
    return {
        props: {
            selected: 'Home',
            padding: false,
        }
    }
}

const Lanterns = () => {
    const data = useMemo(() => {
        return new Array(30).fill().map(() => ({
            x: (20 + Math.random() * 35) * (Math.round(Math.random()) ? -1 : 1),
            y: (20 + Math.random() * 35) * (Math.round(Math.random()) ? -1 : 1),
            z: (20 + Math.random() * 35) * (Math.round(Math.random()) ? -1 : 1),
            yOffset: Math.random(),
            rotation: Math.round(Math.random()) ? -1 : 1
        }))
    }, [])

    return data.map((props, i) => <Lantern key={"lantern" + i} {...props} />)
}

const Index = () => {
    const classes = useStyles();

    // const router = useRouter();
    // console.log(router);

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
                />
            </Head>
            <Info>
                <Fragment>
                    test
                </Fragment>
            </Info>

            <ThreeDRotationIcon
                fontSize="large"
                className={classes.ThreeDAvatar}
            />
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
                    <Scripts />
                    <Suspense fallback={null}>
                        <FantasySky />
                        <Lanterns />
                        <BinaryRing
                            direction={1}
                        />
                        <BinaryRing
                            direction={-1}
                        />
                        {/* <Hud />     */}
                    </Suspense>
                    <SelectiveBloomEffect layer={1} />
                </Canvas>
            </div>
        </React.Fragment>
    )
};

export default Index;