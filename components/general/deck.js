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
        <Grid
            spacing={3}
            container>
            {props.items.map((item, index) => (
                <Grid
                    className={classes.grow}
                    key={index}
                    lg={4}
                    md={4}
                    sm={6}
                    xs={12}
                    item>
                    <Card
                        id={'container' + index + props.serial}>
                        <CardActionArea
                            style={{ height: '90%' }}
                            disabled>
                            <CardMedia
                                className={classes.media}
                                component="img"
                                height="170"
                                image={item.image}
                                title={item.text}
                            />
                            <CardContent
                                style={{ height: '60%' }}>
                                <Typography
                                    component="h2"
                                    variant="h5"
                                    gutterBottom>
                                    {item.text}
                                </Typography>
                                <Typography
                                    color="textSecondary"
                                    component="p"
                                    variant="body2">
                                    {item.blurb}
                                </Typography>
                                <Typography
                                    color="textSecondary"
                                    component="p"
                                    variant="body2">
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
    );
};

Deck.propTypes = {
    items: PropTypes.array,
    serial: PropTypes.number
};

export default Deck;
