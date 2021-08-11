import { useEffect, useRef } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import useStore from '@/utils/store/store';

const useStyles = (props) => makeStyles(theme => ({
    root: {
        position: 'absolute',
        minHeight: 'calc(100vh - 64px)',
        width: '100vw',
        zIndex: 10,
    },
    padding: {
        padding: theme.spacing(3),
    },
    disablePointer: {
        pointerEvents: 'none'
    },
    container: {
        backgroundColor: '#f7f1e1',
        backgroundImage: `url(${props.url})`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        //backgroundSize: 'cover',
        [theme.breakpoints.up('md')]: {
            backgroundPosition: 'right'
        },
        [theme.breakpoints.down('md')]: {
            backgroundPosition: '80%'
        }
    }
}));

const Dom = (props) => {
    const classes = useStyles(props)();

    const ref = useRef(null);
    useEffect(() => {
        useStore.setState({ dom: ref })
    }, [])

    return (
        <div
            className={clsx(classes.root, classes.container, {
                [classes.padding]: props.padding,
                [classes.disablePointer]: props.canvasInteraction
            })}
            ref={ref}
            id="dombackground"
        >
            {props.children}
        </div>
    )
}

Dom.propTypes = {
    children: PropTypes.node,
    padding: PropTypes.bool,
    canvasInteraction: PropTypes.bool
};

Dom.defaultProps = {
    padding: true,
    canvasInteraction: false,
    url: '/graphics/homepage.gif',
};

export default Dom;