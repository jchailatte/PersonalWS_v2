import React, { Suspense, useMemo, useState, useEffect, useRef, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import { Canvas, useThree } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';

import FantasySky from '../components/models/FantasySky';
import Lantern from '../components/models/Lantern';
import BinaryHalo from '../components/models/BinaryHalo';
import Hud from '../components/models/Hud/Hud';

import SelectiveBloomEffect from '../components/three/SelectiveBloomEffect';

const useStyles = makeStyles((theme) => ({
    root: {
        //fix the little gap when switching to mobile
        height: 'calc(100vh - 64px)',
        width: '100vw'
    }
}));

export async function getStaticProps(context){
    return{
        props:{
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

    useLayoutEffect(() => {
        camera.layers.enable(0);
        camera.layers.enable(1);
    }, [])

    return data.map((props, i) => <Lantern key={"lantern"+i} {...props} />)
}

const Index = (props) => {
    const classes = useStyles();

    // const router = useRouter();
    // console.log(router);
    
    const ref = useRef();
    return (
        <React.Fragment>
            {/* dont forget headers */}
            <div className={classes.root}>
                <Canvas
                    //concurrent is causing the triple render (dunno if performance boost or not?)
                    //concurrent
                    colorManagement
                    shadowMap
                    camera={{ position: [1, 0, 15], fov: 80 }}
                >
                    {/* <fog attach="fog" args={["black", 100, 20]}/> */}
                    <ambientLight />
                    <OrbitControls />
                    <Suspense fallback={null}>
                        <FantasySky />
                        <Lanterns />

                        <BinaryHalo
                            color="teal"
                            emissive="blue"
                            direction={1}
                        />
                        <BinaryHalo
                            color="teal"
                            emissive="blue"
                            direction={-1}
                        />
                        <Hud 
                        //router={router}
                        />
                    </Suspense>
                    <SelectiveBloomEffect layer={1} />
                </Canvas>
            </div>
        </React.Fragment>
    )
};

export default Index;