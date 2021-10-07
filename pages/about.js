import { Fragment } from 'react';
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

export default function About() {
    const classes = useStyles();

    return (
        <Fragment>
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
                                    variant="h3"
                                >
                                    <b>
                                        Hello!
                                    </b>
                                </Typography>
                                <br />
                                <Typography
                                    variant="h4"
                                >
                                    My name is Jonathan Chai and I am a software developer. 

                                </Typography>
                                <br />
                                <Typography
                                    variant="h4"
                                >
                                    I mainly specialize is frontend work utilizing JavaScipt and the React framework but I am also familiar 
                                    with other parts of the tech stack using stuff like Spring Boot and Docker. I was a backend engineer before 
                                    transitioning to focus more on the frontend. 
                                </Typography>
                                <br />
                                <Typography
                                    variant="h4"
                                >
                                    Currently, the JavaScript frameworks of choice I am experimenting with
                                    are Three.js and Next.js (basically this website). My main interests are in combining some artsy graphic stuff with code. 
                                </Typography>
                                <br />
                                <Typography
                                    variant="h5"
                                >
                                    Version 3.0 of this website is in the works c:
                                </Typography>

                                {/* <Typography
                                    variant="h5"
                                >
                                    PS. I got asked this a few times but yes the background was drawn by me
                                </Typography> */}
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
        </Fragment>
    );
}
