import React, { Fragment } from 'react';
import Image from 'next/image';
import { makeStyles, Typography } from '@material-ui/core';
import ThreeDRotationIcon from '@material-ui/icons/ThreeDRotation';

import Info from '@/components/general/info';
import HUDWorld from '@/components/models/hudWorld';

import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';

const useStyles = makeStyles(theme => ({
    root: {
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
            padding: false
        }
    };
}

const Index = () => {
    const classes = useStyles();

    return (
        <Fragment>
            <Info>
                <Fragment>
                    <Typography
                        variant="h6"
                    >
                        <u>
                            Attributions
                        </u>
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        Fantasy Sky Background by Hannes Delbeke <br/>
                        Rhetorician by engine9 <br/>
                        Impossible Cube by tomciomalina <br/>
                        Lanterns lowpoly models homework 11 by Bansheeva <br/>
                    </Typography>
                    <Typography
                        variant="h6"
                    >
                        <u>
                            Notes
                        </u>
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        The general theme I was going for was some type of sci-fi UI that mimiced 
                        a hologram. This is actually my second iteration of this homepage since the 
                        first one did not really showcase the 3D aspect. Here is what the first iteration
                        looked like. 
                    </Typography>
                    <Image
                        alt="homepagev1"
                        height={500}
                        layout="responsive"
                        src="/graphics/general/homepagev1.jpg"
                        width={982}
                    />
                </Fragment>
            </Info>
            <ThreeDRotationIcon
                className={classes.ThreeDAvatar}
                fontSize="large"
            />
            <Canvas
                style={{
                    height: 'calc(100vh - 64px)',
                    width: '100vw'
                }}
                concurrent
            >
                <HUDWorld />
            </Canvas>
            <Loader />
        </Fragment >
    );
};

export default Index;
