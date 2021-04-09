import React, { Suspense, useMemo, Fragment, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';

import ThreeDRotationIcon from '@material-ui/icons/ThreeDRotation';

import Info from '@/components/general/info';
import HUDWorld from '@/components/models/hudWorld';

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

    // const router = useRouter();
    // console.log(router);

    console.log("render");

    return (
        <Fragment>
            <Info>
                <Fragment>test</Fragment>
            </Info>
            <ThreeDRotationIcon
                className={classes.ThreeDAvatar}
                fontSize="large"
            />
            <HUDWorld
                r3f
            />
            {/* <div
                className={classes.root}
            >
                <Canvas
                    //concurrent is causing the triple render (dunno if performance boost or not?)
                    camera={{ position: [1, 0, 15], fov: 80 }}
                    colorManagement
                    concurrent
                    shadowMap
                > */}
    

        </Fragment >
    );
};

export default Index;
