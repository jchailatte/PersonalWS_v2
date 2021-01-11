import React, { Suspense, useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Canvas, useFrame } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
import FantasySky from '../components/models/Fantasysky'
import Lantern from '../components/models/Lantern'

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


    return (
        <React.Fragment>
            {/* dont forget headers */}
            <div className={classes.root}>
                <Canvas
                    colorManagement
                    shadowMap
                    camera={{ position: [-5, 4, 4], fov: 40 }}
                >

                    <ambientLight intensity={2} />
                    <pointLight position={[40, 40, 40]} />
                    <OrbitControls />
                    <Suspense fallback={null}>
                        {/* models go here*/}
                        <FantasySky />
                        <Lantern />
                    </Suspense>
                </Canvas>
            </div>


        </React.Fragment>
    )
};
