import React, { Suspense, useMemo, useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Canvas, useFrame } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
import FantasySky from '../components/models/Fantasysky'
import Lantern from '../components/models/Lantern'
import Effects from '../components/three/Effects'

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

export default function Index(props) {
    const classes = useStyles();

    const lanterns = useMemo(()=>{
        new Array(24).fill().map((_,i)=>({
            position: [],
            factor: 0.1 + Math.random(),
            rotation: Math.random() < 0.5 ? Math.random() * 0.1 : Math.random() * -0.01,
        }))

    })


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
                    <pointLight position={[40, 40, 40]} />
                    <OrbitControls />
                    <Suspense fallback={null}>
                        {/* models go here*/}
                        <FantasySky />
                        <Lantern />
                        {/* <Effects/> */}
                    </Suspense>
                </Canvas>
            </div>


        </React.Fragment>
    )
};
