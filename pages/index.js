import React, { Fragment } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { makeStyles, Typography } from '@material-ui/core';
import { ThreeDRotation } from '@material-ui/icons';
import { Loader } from '@react-three/drei';

import Info from '@/components/general/info';
import Attribution from '@/components/general/attribution';

const HUDWorld = dynamic(() => import('@/components/models/hudWorld'), {
    ssr: false,
});

export async function getStaticProps() {
    return {
        props: {
            canvasInteraction: true
        }
    };
}

const useStyles = makeStyles(theme => ({
    ThreeDAvatar: {
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(11),
        color: 'white',
    }
}));

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
                        <Attribution
                            author='Hannes Delbeke'
                            authorLink='https://sketchfab.com/han'
                            item='Fantasy Sky Background'
                            itemLink='https://sketchfab.com/3d-models/fantasy-sky-background-15c79bb2fc1147128039fe4ff90fd5a0'
                            license='CC BY 4.0'
                            licenseLink='https://creativecommons.org/licenses/by/4.0/'
                        />
                        <Attribution
                            author='engine9'
                            authorLink='https://sketchfab.com/engine9'
                            item='Rhetorician'
                            itemLink='https://sketchfab.com/3d-models/rhetorician-a89f035291d843069d73988cc0e25399'
                            license='CC BY 4.0'
                            licenseLink='https://creativecommons.org/licenses/by/4.0/'
                        />
                        <Attribution
                            author='tomciomalina'
                            authorLink='https://sketchfab.com/tomciomalina'
                            item='Impossible Cube'
                            itemLink='https://sketchfab.com/3d-models/impossible-cube-044a6f65abc14b959ff636ce0f37a858'
                            license='CC BY 4.0'
                            licenseLink='https://creativecommons.org/licenses/by/4.0/'
                        />
                        <Attribution
                            author='Bansheeva'
                            authorLink='https://sketchfab.com/Bansheeva'
                            item='Lanterns lowpoly models homework 11'
                            itemLink='https://sketchfab.com/3d-models/lanterns-lowpoly-models-homework-11-e7d36f6ce9824228b787204591f6f356'
                            license='CC BY 4.0'
                            licenseLink='https://creativecommons.org/licenses/by/4.0/'
                        />
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
            <HUDWorld
                r3f
            />
            <Loader/>
        </Fragment >
    );
};

export default Index;
