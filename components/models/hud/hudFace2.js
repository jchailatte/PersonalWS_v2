import { Fragment, useState } from 'react';
import { Html } from '@react-three/drei';
import { Typography, makeStyles } from '@material-ui/core';
import * as THREE from 'three';

import paths from '@/public/json/paths.json';

const useStyles = makeStyles(() => ({
    text: {
        color: "cyan",
        fontFamily: "Iceland",
        width: '400px',
    },
    '@font-face': {
        fontFamily: 'Iceland',
        src: `url("/fonts/Iceland-Regular.ttf") format("truetype")`
    },
}));

const HUDFace2 = () => {
    const classes = useStyles();

    const [prevLevel, setPrevLevel] = useState([]);
    const [level, setLevel] = useState(paths);
    const options = Object.keys(level).length;

    const selectRight = (selected) => {
        const nextLevel = Object.values(level)[selected];
        if (Object.keys(nextLevel).length != 0) {
            setPrevLevel(prevArray => [...prevArray, Object.keys(level)[selected]]);
            setLevel(nextLevel);
        }
    };

    return (
        <Fragment>
            <mesh
                position={[-9.5, 0, 0]}
                rotation={[0, -Math.PI / 2, 0]}
            >
                <planeGeometry
                    args={[16, 16]}
                    attach="geometry"
                />
                <meshPhongMaterial
                    attach="material"
                    color="black"
                    opacity={0.5}
                    side={THREE.DoubleSide}
                    transparent={true}
                />
                <Html
                    distanceFactor={10}
                    position={[0, 0, 0.5]}
                    center
                    transform
                >
                    {Object.keys(level).map((route, i) => (
                        //note: rmber to truncate strings later on :D
                        //oh and fix the ">" to look nicer future me
                        <Fragment
                            key={'route' + i}
                        >
                            <Typography
                                className={classes.text}
                                variant="h2"
                            >
                                {route.charAt(0).toUpperCase() + route.slice(1)}
                                {Object.keys(level[route]).length != 0 &&
                                    <Typography
                                        align="right"
                                        className={classes.text}
                                        display="inline"
                                            //prob will have to wrap in button or list 
//                                        onClick={() => selectRight(i)}
                                        variant="h2"
                                    >
                                        &nbsp;&nbsp;{'>'}
                                    </Typography>
                                }
                            </Typography>

                        </Fragment>
                    ))}
                </Html>
            </mesh>
        </Fragment >
    )

}


export default HUDFace2;