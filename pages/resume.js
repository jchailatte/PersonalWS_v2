import React from 'react';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSSR from '@material-ui/core/NoSsr';

import PDFViewer from '../components/general/pdfviewer';
import { useResize } from '../utils/hooks/useResize';

//later update to latest version of react-pdf and fix all the bugs that crop up with it -.-

const useStyles = makeStyles((theme) => ({

}));

export async function getStaticProps(context) {
    return {
        props: {
            selected: 'Resume',
        }
    }
}

export default function Resume(props) {
    const classes = useStyles();
    const dimensions = useResize('content');

    return (
        <React.Fragment>
            <Head>
                <title key="title">Jonathan Chai - Resume</title>
            </Head>
            <NoSSR>
                <div style={{width: '100vw'}}>
                    <PDFViewer
                        url={"/doc/res.pdf"}
                        width={0.8 * dimensions.width}
                        pageNumber={1}
                    />
                </div>
            </NoSSR>
        </React.Fragment>
    )
}