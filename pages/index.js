import React, { Fragment } from 'react';
import Image from 'next/image';
import { makeStyles, Typography } from '@material-ui/core';
import { ThreeDRotation } from '@material-ui/icons';

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
        right: theme.spacing(11),
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
                        Fantasy Sky Background by Hannes Delbeke <br />
                        Rhetorician by engine9 <br />
                        Impossible Cube by tomciomalina <br />
                        Lanterns lowpoly models homework 11 by Bansheeva <br />
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
                        a hologram. This is actually my third iteration of this website since the first 
                        one looked awful(it was done with 2D canvas animations instead of 3D) and the second 
                        one didn&#39;t really showcase the 3D aspect. Here&#39;s what the second interation 
                        looked like. 
                    </Typography>
                    <Image
                        alt="homepagev1"
                        height={500}
                        layout="responsive"
                        priority={true}
                        src="/graphics/general/homepagev1.jpg"
                        width={982}
                    />
                </Fragment>
            </Info>
            <ThreeDRotation
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
