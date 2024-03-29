import React, { useState, Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Fade from '@material-ui/core/Fade';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import champions from '@/public/json/champions10-22-1.json';
import Info from '@/components/general/info';

//something wrong in this file might have to throw it and rewrite it from scratch
//to incrementally find the damn error

export async function getStaticProps() {
    return {
        props: {
            padding: false
        }
    };
}

const useStyles = makeStyles(theme => ({
    side1: {
        backgroundColor: '#0C223F',
        paddingBottom: '2vh'
    },
    side2: {
        backgroundColor: '#FFFFFF',
        paddingBottom: '2vh'
    },
    center: {
        position: 'absolute',
        top: '35%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    centerReset: {
        position: 'absolute',
        top: '60%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '100',
        backgroundColor: '#2468BF'
    },
    alert: {
        position: 'absolute',
        top: '5%',
        width: '90%',
        zIndex: '99',
        transform: 'translate(5%)',
        borderStyle: 'outset'
    },
    playerImg: {
        height: '50vh',
        overflowX: 'auto'
    },
    paperPadding: {
        padding: '5px',
        marginLeft: '10px',
        marginRight: '10px'
    },
    selectPadding: {
        width: '95%',
        backgroundColor: 'white',
        zIndex: '50'
    },
    title: {
        display: 'flex',
        justifyContent: 'space-evenly',
        background: 'white',
        minHeight: '10vh'
    },
    fightButton: {
        height: '25vh',
        width: '25vh',
        background: '#ce2029',
        color: 'white',
        zIndex: '30',
        boxShadow: '0 0 0 0 rgba(199, 21, 133, 0.5)',
        animation: '$pulse 2s infinite'
    },
    hide: {
        display: 'none'
    },
    circularChart: {
        maxWidth: '35vh',
        zIndex: '25'
    },
    circle: {
        stroke: '#2468BF',
        fill: 'none',
        strokeWidth: '2.8',
        animation: '$progress 6s ease-out forwards'
    },
    oppositeCircle: {
        stroke: 'white',
        fill: 'none',
        strokeWidth: '2.8'
    },
    circlebg: {
        fill: 'none',
        stroke: '#eee',
        strokeWidth: '3.8'
    },
    line: {
        position: 'absolute',
        width: '100%',
        overflow: 'hidden',
        height: '15%',
        background: 'white'
    },
    line1: {
        zIndex: '15',
        opacity: '0.5'
    },
    line2: {
        zIndex: '10',
        opacity: '0.7'
    },
    line3: {
        zIndex: '5'
    },
    wave: {
        position: 'absolute',
        left: '0',
        width: '200%',
        height: '100%',
        backgroundRepeat: 'repeat no-repeat',
        backgroundPosition: '0 bottom',
        transformOrigin: 'center bottom'
    },
    wave1: {
        backgroundSize: '50% 80px',
        backgroundImage: `url("/graphics/tlhack/1blue.png")`
    },
    wave2: {
        backgroundSize: '50% 100px',
        backgroundImage: `url("/graphics/tlhack/2blue.png")`,
        animation: '$wavy 12s linear infinite'
    },
    wave3: {
        backgroundSize: '50% 80px',
        backgroundImage: `url("/graphics/tlhack/3blue.png")`,
        animation: '$wavy 18s linear infinite'
    },
    sffont: {
        fontFamily: 'SFF'
    },
    wavepadding: {
        paddingTop: '16.8vh'
    },
    rotatingBlue: {
        animation: '$rotate 6s linear'
    },
    turn: {
        transform: 'scaleX(-1)'
    },
    champCards: {
        height: '56vh',
        width: '7vw'
    },
    gradientBorder: {
        position: 'absolute',
        display: 'block',
        top: '-50%',
        left: '-50%',
        zIndex: '-9',
        height: '200%',
        width: '200%',
        transform: 'rotate(-45deg)',
        overflow: 'hidden',
        background:
            'linear-gradient(to right, #fff 20%, #00000000 40%, #0C223F 50%, #0C223F 55%, #00000000 70%, #fff 100%)',
        backgroundSize: '200% auto',
        animation: '$shine 6s linear infinite'
    },
    modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    paperModal: {
        width: '90vw',
        maxHeight: '90vh',
        overflowY: 'scroll'
    },
    hidingblue: {
        position: 'absolute',
        height: '150px',
        top: '60vh',
        animation: '$slide 6s linear forwards'
    },
    grayOut: {
        opacity: 0.4,
        filter: 'alpha(opacity=40)'
    },
    slideDown: {},
    cardImage: {
        height: '50vh'
    },
    '@keyframes progress': {
        '0%': {
            strokeDasharray: '25 100'
        },
        '25%': {
            strokeDasharray: '75 100'
        },
        '50%': {
            strokeDasharray: '25 100'
        },
        '75%': {
            strokeDasharray: '75 100'
        }
    },
    '@keyframes wavy': {
        '0%': {
            transform: 'translateX(0) translateZ(0) scaleY(1)'
        },
        '50%': {
            transform: 'translateX(-25%) translateZ(0) scaleY(0.5)'
        },
        '100%': {
            transform: 'translateX(-50%) translateZ(0) scaleY(1)'
        }
    },
    '@keyframes pulse': {
        '0%': {},
        '50%': {
            boxShadow: '0 0 0 20px rgba(199, 21, 133, 0)'
        },
        '100%': {
            boxShadow: '0 0 0 0 rgba(199, 21, 133, 0)'
        }
    },
    '@keyframes rotate': {
        '0%': {
            transform: 'rotate(-40deg) rotateY(180deg)'
        },
        '20%': {
            transform: 'rotate(40deg) rotateY(360deg)'
        },
        '40%': {
            transform: ' rotate(-40deg) rotateY(180deg)'
        },
        '60%': {
            transform: ' rotate(40deg) rotateY(360deg)'
        },
        '100%': {
            transform: 'rotate(0deg) rotateY(180deg)'
        }
    },
    '@keyframes shine': {
        '50%': {
            backgroundPosition: '200% center'
        }
    },
    '@keyframes slide': {
        '0%': {
            transform: 'translateX(-50%) translateY(-35%) rotate(-40deg)'
        },
        '20%': {
            transform: 'translateX(-50%) translateY(-35%) rotate(40deg)'
        },
        '40%': {
            transform: 'translateX(-50%) translateY(-35%) rotate(-40deg)'
        },
        '60%': {
            transform: 'translateX(-50%) translateY(-20%) rotate(40deg) '
        },
        '100%': {
            transform: 'translateX(-50%) translateY(-20%) translateY(70%)'
        }
    },
    '@font-face': {
        fontFamily: 'SFF',
        src: `url("/fonts/SFF.otf") format("opentype")`
    }
}));

const positions = ['Top', 'Jung', 'Mid', 'Bot', 'Sup'];

const TLHack = () => {
    const classes = useStyles();
    const portrait = '/graphics/tlhack/portraitbg.jpg';

    const champData = champions[0].data;
    const initialState = {
        Top1: {
            champion: '',
            src: portrait
        },
        Jung1: {
            champion: '',
            src: portrait
        },
        Mid1: {
            champion: '',
            src: portrait
        },
        Bot1: {
            champion: '',
            src: portrait
        },
        Sup1: {
            champion: '',
            src: portrait
        },
        Top2: {
            champion: '',
            src: portrait
        },
        Jung2: {
            champion: '',
            src: portrait
        },
        Mid2: {
            champion: '',
            src: portrait
        },
        Bot2: {
            champion: '',
            src: portrait
        },
        Sup2: {
            champion: '',
            src: portrait
        }
    };

    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [turn, setTurn] = useState(false);
    const [message, setMessage] = useState('');
    const [run, setRun] = useState(false);
    const [team, setTeam] = useState(initialState);
    const [selected, setSelected] = useState({});
    const [disappear, setDisappear] = useState(false);
    const [fade, setFade] = useState(0);
    const [percent, setPercent] = useState(50);
    const [currentCard, setCurrentCard] = useState(0);
    //const [trigger, setTrigger] = useState(false);
    //const isFirstRun = React.useRef(true);

    const handleModalOpen = () => {
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const handleModalClose2 = () => {
        setDisappear(false);
    };

    const onCardClick = (team, key) => {
        setCurrentCard((team - 1) * 5 + key);
        handleModalOpen();
    };

    const reset = () => {
        setTeam(initialState);
        setSelected({});

        //setTrigger(false);
        setFade(0);
        setDisappear(false);
        setRun(false);
        setTurn(false);
        setPercent(50);
    };

    //  useEffect(() => {
    //     if (isFirstRun.current) {
    //         isFirstRun.current = false;
    //         return;
    //     }

    //     setPercent(80);
    //     setTurn(true);
    //     const team1string = `${team['Top1'].champion}%2C${team['Jung1'].champion}%2C${team['Mid1'].champion}%2C${team['Bot1'].champion}%2C${team['Sup1'].champion}`;
    //     const team2string = `${team['Top2'].champion}%2C${team['Jung2'].champion}%2C${team['Mid2'].champion}%2C${team['Bot2'].champion}%2C${team['Sup2'].champion}`;

    //     fetch(`${process.env.TLHACK}/compare_teams?team_1=${team1string}&team_2=${team2string}`)
    //         .then(data => {
    //             return data.json();
    //         })
    //         .then(data => {
    //             const chance = data.win_chance;
    //             setPercent(chance);
    //             if (chance > 50) {
    //                 setTurn(true);
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }, [trigger]);

    const fightOnClick = () => {
        let flag = false;
        Object.keys(team).map(index => {
            if (team[index].champion === '') {
                flag = true;
            }
        });

        if (flag) {
            setOpen(true);
            setMessage('Teams must be filled completely!');
        } else {
            setFade(800);
            setDisappear(true);
            setRun(true);

            //replacing the trigger
            setPercent(80);
            setTurn(true);
        }
    };

    const onTileClick = (champKey, loadingUrl) => {
        setTeam({
            ...team,
            [`${positions[currentCard % 5]}${currentCard < 5 ? '1' : '2'}`]: {
                champion: champKey,
                src: `/graphics/riot/champion/loading/${loadingUrl}`
            }
        });
        setSelected({ ...selected, [currentCard]: champKey });

        handleModalClose();
    };

    return (
        <Fragment>
            <Info>
                <Fragment>
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
                        The server for this project uses TensorFlow which my Digital Ocean droplet has a hard time handling.
                        So, the server for this project is disabled and the result is set to a default 80% 😅.
                        <br />
                        This project was also done during League&#39;s <code>10.22.1</code> patch so all the data is inaccurate now anyways.
                    </Typography>
                </Fragment>
            </Info>
            <Fade
                in={open}
            >
                <Alert
                    action={
                        <IconButton
                            onClick={() => {
                                setOpen(false);
                            }}
                            size="small"
                        >
                            <CloseIcon />
                        </IconButton>
                    }
                    className={classes.alert}
                    severity="warning"
                >
                    <AlertTitle>Warning</AlertTitle>
                    {message}
                </Alert>
            </Fade>
            <Modal
                className={classes.modal}
                onClose={handleModalClose}
                open={openModal}
                closeAfterTransition
            >
                <Fade
                    in={openModal}
                >
                    <Paper
                        className={classes.paperModal}
                    >
                        <Grid
                            justify="center"
                            container
                        >
                            {Object.keys(champData).map(index => {
                                const dis = Object.values(selected).includes(champData[index].key);
                                return (
                                    <Grid
                                        key={index}
                                        item
                                    >
                                        <Button
                                            disabled={dis}
                                            onClick={() =>
                                                onTileClick(champData[index].key, `${index}_0.jpg`)
                                            }
                                        >
                                            <img
                                                className={clsx({ [classes.grayOut]: dis })}
                                                src={`/graphics/riot/champion/champion/${champData[index].image.full}`}
                                            />
                                        </Button>
                                    </Grid>
                                );
                            })}
                        </Grid >
                        <div
                            className={classes.gradientBorder}
                        />
                    </Paper >
                </Fade >
            </Modal >
            <Modal
                className={classes.modal}
                onClose={handleModalClose2}
                open={disappear}
                closeAfterTransition
                disableAutoFocus
                disableBackdropClick
                disableEnforceFocus
                disableEscapeKeyDown
            >
                <Fade
                    in={disappear}
                >
                    <Grid
                        container
                    >
                        <Grid
                            style={{ height: '50vh' }}
                            xs={12}
                            item
                        >
                            <svg
                                className={`${classes.center} ${classes.circularChart}`}
                                viewBox="0 0 36 36"
                            >
                                <path
                                    className={classes.circlebg}
                                    d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path
                                    className={classes.oppositeCircle}
                                    d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path
                                    className={clsx({ [classes.circle]: run })}
                                    d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="#444"
                                    strokeDasharray={`${percent}, 100`}
                                    strokeWidth="1"
                                />
                            </svg>
                            <div
                                className={classes.center}
                            >
                                <img
                                    className={clsx({
                                        [classes.rotatingBlue]: run,
                                        [classes.turn]: turn
                                    })}
                                    src="https://static-cdn.jtvnw.net/emoticons/v1/301702758/2.0"
                                    style={{ height: '100px', width: 'auto' }}
                                />
                            </div>
                        </Grid>
                        <Grid
                            xs={12}
                            item
                        >
                            <img
                                className={classes.hidingblue}
                                src="https://static-cdn.jtvnw.net/emoticons/v1/302703811/2.0"
                            />
                            <Typography
                                style={{
                                    fontFamily: "'Big Shoulders Stencil Text', cursive",
                                    color: 'white'
                                }}
                                variant="h2"
                            >
                                {percent}%
                            </Typography>
                        </Grid>
                        <Grid
                            style={{ paddingTop: '10vh' }}
                            xs={12}
                            item
                        >
                            <Button
                                color="default"
                                onClick={reset}
                                style={{ backgroundColor: '#2468BF' }}
                            >
                                <Typography
                                    style={{
                                        fontFamily: "'Big Shoulders Stencil Text', cursive",
                                        color: 'white'
                                    }}
                                    variant="h2"
                                >
                                    Reset
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Fade>
            </Modal>
            <Fade
                in={!disappear}
                timeout={fade}
            >
                <Fab
                    className={`${classes.fightButton} ${classes.center}`}
                    onClick={fightOnClick}
                >
                    <Typography
                        style={{ fontFamily: "'Big Shoulders Stencil Text', cursive" }}
                        variant="h4"
                    >
                        FIGHT!
                    </Typography>
                </Fab>
            </Fade>
            <Grid
                align="center"
                container
            >
                <Grid
                    className={classes.title}
                    xs={12}
                    item
                >
                    {[...Array(5)].map((x, i) => (
                        <img
                            key={i}
                            src="https://static-cdn.jtvnw.net/emoticons/v1/301702778/2.0"
                            style={{ alignSelf: 'center', transform: `rotate(${90 * i}deg)` }}
                        />
                    ))}
                    <Typography
                        style={{ fontFamily: 'SFF' }}
                        variant="h3"
                    >
                        OUTDRAFTED
                    </Typography>
                    {[...Array(5)].map((x, i) => (
                        <img
                            key={i}
                            src="https://static-cdn.jtvnw.net/emoticons/v1/301702778/2.0"
                            style={{ alignSelf: 'center', transform: `rotate(${90 * i}deg)` }}
                        />
                    ))}
                </Grid>
                <Grid
                    xs={12}
                    item
                >
                    <div
                        className={`${classes.line} ${classes.line1}`}
                    >
                        <div
                            className={`${classes.wave} ${classes.wave1}`}
                        />
                    </div>
                    <div
                        className={`${classes.line} ${classes.line2}`}
                    >
                        <div
                            className={`${classes.wave} ${classes.wave2}`}
                        />
                    </div>
                    <div
                        className={`${classes.line} ${classes.line3}`}
                    >
                        <div
                            className={`${classes.wave} ${classes.wave3}`}
                        />
                    </div>
                </Grid>
                <Grid
                    className={`${classes.side1} ${classes.wavepadding}`}
                    xs={6}
                    container
                    item
                >
                    <Grid
                        xs={12}
                        item
                    >
                        <Paper
                            className={classes.paperPadding}
                        >
                            <Typography
                                variant="h3"
                            >Team 1
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid
                        justify="space-evenly"
                        style={{ paddingTop: '20px', paddingRight: '30px' }}
                        xs={12}
                        container
                        item
                    >
                        {positions.map((pos, key) => (
                            <Grid
                                key={key}
                                item
                            >
                                <Card
                                    className={classes.champCards}
                                    style={{ backgroundColor: '' }}
                                >
                                    <CardActionArea
                                        onClick={() => onCardClick(1, key)}
                                    >
                                        <CardHeader
                                            title={pos}
                                        />
                                        <CardMedia
                                            className={classes.cardImage}
                                            image={team[pos + '1'].src}
                                        />
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid
                    className={`${classes.side2} ${classes.wavepadding}`}
                    xs={6}
                    item
                >
                    <Grid
                        xs={12}
                        item
                    >
                        <Paper
                            className={classes.paperPadding}
                            style={{ backgroundColor: '#0C223F' }}
                        >
                            <Typography
                                style={{ color: 'white' }}
                                variant="h3"
                            >
                                Team 2
                            </Typography>
                        </Paper>
                        <Grid
                            justify="space-evenly"
                            style={{ paddingTop: '20px', paddingLeft: '30px' }}
                            xs={12}
                            container
                            item
                        >
                            {positions.map((pos, key) => (
                                <Grid
                                    key={key}
                                    item
                                >
                                    <Card
                                        className={classes.champCards}
                                        style={{ backgroundColor: '#0C223F' }}
                                    >
                                        <CardActionArea
                                            onClick={() => onCardClick(2, key)}
                                        >
                                            <CardHeader
                                                style={{ color: 'white' }}
                                                title={pos}
                                            />
                                            <CardMedia
                                                className={classes.cardImage}
                                                image={team[pos + '2'].src}
                                            />
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment >
    );
}

const TLHackPage = () =>{
    return (
        <Fragment>
            <TLHack/>
        </Fragment>
    )
}

export default TLHackPage;