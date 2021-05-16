import React, { Fragment } from 'react';

import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';

import AudioWorld from '@/components/models/audioWorld';


export async function getStaticProps() {
    return {
        props: {
            padding: false
        }
    };
}

const Index = () => {

    return (
        <Fragment>
            <Canvas
                mode='concurrent'
                style={{
                    height: 'calc(100vh - 64px)',
                    width: '100vw'
                }}
            >
                <AudioWorld/>
            </Canvas>
            <Loader />
        </Fragment >
    );
};

export default Index;
