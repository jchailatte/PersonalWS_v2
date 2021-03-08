import clsx from 'clsx';
import { makeStyles} from '@material-ui/core/styles';

//note: replace this later or at least replace the background
// also organize the graphics folder 
// also figure out why content is not taking the entire width of the screen by default -> prob in sidebar -.-

const useStyles = makeStyles((theme)=>(
{
    container: {    
        backgroundColor: '#f7f1e1',
        backgroundImage: `url('/graphics/homepage.gif')`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        minHeight:'100vh',
        [theme.breakpoints.up("md")]: {
            backgroundPosition: 'right',
        },
        [theme.breakpoints.down('md')]: {
            backgroundPosition: '80%',
        }
    }
}));

export default function Background(props) {
    const classes = useStyles();
  
    return(
        <div className={classes.container} id="background">
            {props.children}
        </div>
    )
}