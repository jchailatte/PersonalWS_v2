import {Fragment} from 'react';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

}));

export default function About() {
    const classes = useStyles();

    return (
        <Fragment>
            <Head>
                <title
                    key="title"
                >
                    Resume
                </title>
            </Head>
            <a
                href={'/doc/res.pdf'}
                rel="noreferrer"
                target="_blank"
            >
                Resume
            </a>
                          

        </Fragment>
    );
}
