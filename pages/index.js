import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ThreeDRotationIcon from '@material-ui/icons/ThreeDRotation';

import Info from '@/components/general/info';
import HUDWorld from '@/components/models/hudWorld';

import { Canvas } from '@react-three/fiber';

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
                <Fragment>test</Fragment>
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

        </Fragment >
    );
};

export default Index;
