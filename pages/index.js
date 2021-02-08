import React, { Suspense, useMemo, useState, useEffect, useRef, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls, Line } from '@react-three/drei';

import FantasySky from '../components/models/FantasySky';
import Lantern from '../components/models/Lantern';
import BinaryHalo from '../components/models/BinaryHalo';
import Hud from '../components/models/Hud';
import Hud2 from '../components/models/Hud2';

import SelectiveBloomEffect from '../components/three/SelectiveBloomEffect';

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

    //may change this from useMemo if implementing the onHover draggy thing
    const data = useMemo(()=>{
        return new Array(30).fill().map((_,i)=>({
            x: (20 + Math.random() * 35) * (Math.round(Math.random()) ? -1 : 1),
            y: (20 + Math.random() * 35) * (Math.round(Math.random()) ? -1 : 1),
            z: (20 + Math.random() * 35) * (Math.round(Math.random()) ? -1 : 1),
            yOffset: Math.random(),
            rotation: Math.round(Math.random()) ? -1 : 1
        }))
    }, [])

    useLayoutEffect(()=>{
        camera.layers.enable(0);
        camera.layers.enable(1);
    },[])

    return data.map((props,i) => <Lantern key={i} {...props} />)
}

export default function Index(props) {
    const classes = useStyles();

    const ref = useRef();
    return (
        <React.Fragment>
            {/* dont forget headers */}
            <div className={classes.root}>
                <Canvas
                    colorManagement
                    shadowMap
                    camera={{ position: [0, 0, 5], fov: 80 }}
                >
                    {/* <fog attach="fog" args={["black", 100, 20]}/> */}
                    <OrbitControls />
                    <Suspense fallback={null}>
                        <FantasySky />
                        <Lanterns />
                        <BinaryHalo 
                            color="teal"
                            emissive="blue"
                        />
                        {/* <Hud/>             */}
                        <Hud2/>
                    </Suspense>
                    <SelectiveBloomEffect layer={1}/>
                </Canvas>
            </div>


        </React.Fragment>
    )
};
