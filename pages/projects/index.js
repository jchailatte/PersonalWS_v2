import { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
    media: {
        objectFit: 'contain'
    },
    grow: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const items = [
    {
        text: 'Outdrafted',
        image: '/graphics/outdrafted.jpg',
        blurb:
            'Hackathon project for the Team Liquid Hackathon. Used to predict probability of winning based solely on team compositions using Challenger data.',
        note: 'This was done during the 10.22.1 patch so values are currently inaccurate',
        button1: 'Demo',
        button2: 'Devpost',
        button3: 'GitHub',
        href1: 'projects/tlhack',
        href2: 'https://devpost.com/software/outdrafted',
        href3: 'https://github.com/jchailatte/TLHackathon'
    },
    {
        text: 'CS@SC Summer Camps',
        image: '/graphics/summercamp.png',
        blurb:
            'Capstone Project(legacy from 2016). Added to and fixed(aka deleted) parts of the backend and migrated the WordPress site to another server (which had a firewall yay).',
        note:
            "Note: Can't really see much that I did on the site as all the functionalities require an account but I spent way to many hours to not include this project.",
        button1: 'Go to',
        button2: '',
        href1: 'https://summercamp.usc.edu/'
    },
    {
        text: 'Twitch Stonks',
        image: '/graphics/twitchstonks.png',
        blurb:
            'Many streamers can benefit from increased chat interaction and more reasons to receive bits and cheers. TwitchStonks allows viewers to anticipate heroic plays or embarrassing fails. Play stocks with your favorite streamers with none of the risk.',
        button1: 'Devpost',
        button2: 'GitHub',
        href1: 'https://devpost.com/software/twitchstonks',
        href2: 'https://github.com/PeterYangIO/twitchcon2019'
    },
    {
        text: "I'm Hungry",
        image: '/graphics/imhungry.png',
        blurb:
            'Software Engineering class project. A Yelp like application that allows the user to query a type of food and it will return various recipes as well as nearby restaurants within the desired distance.',
        button1: 'Github',
        button2: '',
        href1: 'https://github.com/jchailatte/ImHungry-Agile-'
    },
    {
        text: "Hitch 'n Ditch",
        image: '/graphics/hitchnditch.jpg',
        blurb:
            'Hitch \'n Ditch allows users to have the freedom of a car sharing service such as Maven or Zipcar but further aims to reduce congestion by utilizing "last mile delivery". Rather than giving the user full autonomy, within the last mile of driving, the user will be prompted to pick up the next person to drive the car.',
        button1: 'Devpost',
        button2: 'GitHub',
        href1: 'https://devpost.com/software/hitch-n-ditch',
        github: 'https://github.com/jchailatte/Hitch-n-Ditch'
    },
    {
        text: 'Streamer Trivia',
        image: '/graphics/streamertrivia.jpg',
        blurb:
            'We wanted to help broadcasters engage with their viewers. We decided that a Family Feud style game would be a super fun way for broadcasters to get viewers involved in their stream.',
        note: "Note: This was my first Hackathon so pardon the code...it's awful",
        button1: 'Devpost',
        button2: 'GitHub',
        href1: 'https://devpost.com/software/streamer-trivia',
        github: 'https://github.com/jchailatte/StreamerTrivia'
    }
];

export async function getStaticProps() {
    return {
        props: {
            selected: 'Projects',
        }
    };
}

export default function Project() {
    const classes = useStyles();

    return (
        <Fragment>

            <Grid
                spacing={3}
                container
            >
                {items.map((item, index) => (
                    <Grid
                        className={classes.grow}
                        key={index}
                        lg={4}
                        md={4}
                        sm={6}
                        xs={12}
                        item
                    >
                        <Card
                            id={item.uuid}
                        >
                            <CardActionArea
                                style={{ height: '90%' }}
                                disabled
                            >
                                <CardMedia
                                    className={classes.media}
                                    component="img"
                                    height="170"
                                    image={item.image}
                                    title={item.text}
                                />
                                <CardContent
                                    style={{ height: '60%' }}
                                >
                                    <Typography
                                        component="h2"
                                        variant="h5"
                                        gutterBottom
                                    >
                                        {item.text}
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        component="p"
                                        variant="body2"
                                    >
                                        {item.blurb}
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        component="p"
                                        variant="body2"
                                    >
                                        <br />
                                        {item.note}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button
                                    color="primary"
                                    disabled={item.button1 == ''}
                                    href={item.href1}
                                    size="small"
                                >
                                    {item.button1}
                                </Button>
                                <Button
                                    color="primary"
                                    disabled={item.button2 == ''}
                                    href={item.href2}
                                    size="small"
                                >
                                    {item.button2}
                                </Button>
                                <Button
                                    color="primary"
                                    disabled={item.button3 == ''}
                                    href={item.href3}
                                    size="small"
                                >
                                    {item.button3}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Fragment>
    );
}
