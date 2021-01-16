import React, { Suspense, useMemo, useState, useEffect, useRef, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';

import FantasySky from '../components/models/Fantasysky'
import Lantern from '../components/models/Lantern'
import BloomEffect from '../components/three/BloomEffect'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        width: '100vw'
    }
}));

// export async function getStaticProps(context){
//     return{
//         props:{
//             selected: 'Home',
//             quote: "Making a choice doesn't have to have any meaning, but it might have some. We live on Earth, not for any meaning, but to be meaningful.",
//             by: 'Jiang Ye',
//         }
//     }
// }

function Lanterns(){

    const { camera } = useThree();

    useLayoutEffect(()=>{
        camera.layers.enable(0);
        camera.layers.enable(1);
    },[])

    return(
        <Lantern/>
    )
}


export default function Index(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            {/* dont forget headers */}
            <div className={classes.root}>
                <Canvas
                    colorManagement
                    shadowMap
                    camera={{ position: [10, 7, 5], fov: 80 }}
                >
                    <ambientLight intensity={2} />
                    {/* <pointLight position={[40, 40, 40]} /> */}
                    {/* <fog attach="fog" args={["white", 50, 200]}/> */}
                    <OrbitControls />
                    <Suspense fallback={null}>
                        <FantasySky />
                        <Lanterns />
                    </Suspense>
                    <BloomEffect/>
                </Canvas>
            </div>


        </React.Fragment>
    )
};
