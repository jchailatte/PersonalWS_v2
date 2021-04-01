import PropTypes from 'prop-types';
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

const Deck = props => {
    const classes = useStyles();

    return (
        <Grid container spacing={3}>
            {props.items.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={4} className={classes.grow} key={index}>
                    <Card id={'container' + index + props.serial}>
                        <CardActionArea disabled style={{ height: '90%' }}>
                            <CardMedia
                                className={classes.media}
                                height="170"
                                component="img"
                                image={item.image}
                                title={item.text}
                            />
                            <CardContent style={{ height: '60%' }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {item.text}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {item.blurb}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <br></br>
                                    {item.note}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button
                                size="small"
                                color="primary"
                                href={item.href1}
                                disabled={item.button1 == ''}
                            >
                                {item.button1}
                            </Button>
                            <Button
                                size="small"
                                color="primary"
                                href={item.href2}
                                disabled={item.button2 == ''}
                            >
                                {item.button2}
                            </Button>
                            <Button
                                size="small"
                                color="primary"
                                href={item.href3}
                                disabled={item.button3 == ''}
                            >
                                {item.button3}
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

Deck.propTypes = {
    items: PropTypes.array,
    serial: PropTypes.number
};

export default Deck;
