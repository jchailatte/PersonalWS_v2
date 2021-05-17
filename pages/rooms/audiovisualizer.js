import React, { Fragment } from 'react';

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
            <AudioWorld
                r3f
            />
        </Fragment >
    );
};

export default Index;
