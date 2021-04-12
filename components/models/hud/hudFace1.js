import { Fragment, useState, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { Typography, makeStyles } from '@material-ui/core';
import Typist from 'react-typist';

const useStyles = makeStyles((theme) => ({
    text: {
        color: "cyan",
        fontFamily: "Iceland",
        width: '260px',
    }, 
    disable: {
        userSelect: 'none',
        pointerEvents: 'none'
    },
    '@font-face': {
        fontFamily: 'Iceland',
        src: `url("/fonts/Iceland-Regular.ttf") format("truetype")`
    }
}));

const HUDFace1 = (props) => {
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
                    transparent={true}
                />
                <Html
                    className={classes.disable}
                    distanceFactor={10}
                    position={[0, 0, -0.5]}
                    center
                    transform
                >
                    <Typography
                        align="center"
                        className={classes.text}
                        variant="h2"
                    >
                        <Typist
                            cursor={{
                                blink: true,
                                element: '_'
                            }}
                        >
                            Hi!
                            <Typist.Delay
                                ms={800}
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