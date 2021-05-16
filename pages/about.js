import React from 'react';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    fontstyle: {
        color: 'white',
        textShadow: '0 0 5px black, 0 0 5px black',
        fontFamily: "'Caveat', cursive"
    },
    background: {
        display: 'flex',
        justifyContent: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    background2: {
        height: '20vw',
        width: '20vw'
    },
    portrait: {
        height: '60vh'
    },
    titlebackground: {
        backgroundImage: `url(/graphics/stroke.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        textAlign: 'center'
    },
    itemstyle1: {
        [theme.breakpoints.down('md')]: {
            marginTop: '5vh',
            order: '-1'
        }
    },
    border: {
        borderStyle: 'solid',
        borderWidth: 'thick'
    },
    index: {
        zIndex: 1
    }
}));

export async function getStaticProps() {
    return {
        props: {
            selected: 'About',
            quote:
                'Potions had a cooldown. What was the best way to drink potions to keep up your endurance during battle? That itself was a type of knowledge.',
            by: "The King's Avatar"
        }
    };
}

export default function About() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Head>
                <title
                    key="title"
                >
                    About
                </title>
            </Head>
            <Grid
                spacing={3}
                container
            >
                <Grid
                    alignItems="center"
                    lg={9}
                    spacing={3}
                    container
                    item
                >
                    <Grid
                        style={{ backgroundColor: 'white' }}
                        xs={12}
                        container
                        item
                    >
                        <div
                            className={classes.index}
                            id="container1"
                            style={{ display: 'flex' }}
                        >
                            <Grid
                                className={classes.index}
                                md={9}
                                sm={12}
                                xs={12}
                                item
                            >
                                <Typography
                                    variant="h4"
                                >Hello!
                                </Typography>
                                <br />
                                <Typography
                                    variant="h4"
                                >
                                    My name is Jonathan Chai, that&#39;s me to the right, and I am a
                                    software engineer that graduated from the University of Southern
                                    California and currently looking for a job (yay for Covid).
                                </Typography>
                                <br />
                                <Typography
                                    variant="h4"
                                >
                                    Currently, the JavaScript frameworks of choice I am working with
                                    are Three.js and Next.js (this site is a combination of
                                    both) and I am very interested in being able to combine art with
                                    code.
                                </Typography>
                                <br />
                                <Typography
                                    variant="h4"
                                >
                                    My main hobbies include reading light novels and playing video
                                    games like League of Legends and TeamFight Tactics.
                                </Typography>
                                <br />
                                <Typography
                                    variant="h5"
                                >
                                    PS. I got asked this a few times but yes the background was drawn by me
                                </Typography>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
                <Grid
                    align="center"
                    className={classes.itemstyle1}
                    sm={3}
                    xs={12}
                    item
                >
                    <Hidden
                        implementation="css"
                        only={['sm', 'md']}
                    >
                        <Card
                            className={classes.background}
                        >
                            <img
                                className={classes.portrait}
                                src="/graphics/profpic.jpg"
                            />
                        </Card>
                    </Hidden>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
