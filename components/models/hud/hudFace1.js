import { Fragment, } from 'react';
import { Html } from '@react-three/drei';
import { Typography, makeStyles } from '@material-ui/core';
import Typist from 'react-typist';
import * as THREE from 'three';

const useStyles = makeStyles(() => ({
    text: {
        color: "cyan",
        fontFamily: "Iceland",
        width: '400px',
    },
    disable: {
        userSelect: 'none',
        pointerEvents: 'none'
    },
    '@font-face': {
        fontFamily: 'Iceland',
        src: `url("/fonts/Iceland-Regular.ttf") format("truetype")`
    },
}));

//maybe write custom typist animation since it's using depreciated stuff

const HUDFace1 = () => {
    const classes = useStyles();

    return (
        <Fragment>
            <mesh
                position={[0, 0, 9.5]}
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
                    occlude={true}
                    position={[0, 0, 0.5]}
                    style={{
                        pointerEvents: 'none',
                        userSelect: 'none',
                    }}
                    zIndexRange={[100, 0]}
                    center
                    transform
                >
                    <Typography
                        align="center"
                        className={classes.text}
                        variant="h1"
                    >
                        <Typist
                            cursor={{
                                blink: true,
                                element: '_',
                            }}
                        >
                            Hi!
                            <Typist.Delay
                                ms={900}
                            />
                            <Typist.Backspace
                                count={3}
                                delay={1500}
                            />
                            My name is Jonathan Chai
                            <Typist.Backspace
                                count={24}
                                delay={2000}
                            />
                            Welcome to my world
                        </Typist >
                    </Typography>
                </Html>
            </mesh>
        </Fragment >
    )

}

export default HUDFace1;