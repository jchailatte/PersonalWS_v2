import { useRef } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import useStore from '@/utils/store/store';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        minHeight: 'calc(100vh - 64px)',
        width: '100vw',
        zIndex: 10, 
        //pointerEvents: 'none'
    },
    padding: {
        padding: theme.spacing(3),
    },
    disablePointer: {
        pointerEvents: 'none'
    }
}));

const Dom = (props) => {
    const classes = useStyles();

    const ref = useRef(null);
    useStore.setState({ dom: ref })
    return (
        <div
            className={clsx(classes.root, {
                [classes.padding] : props.padding,
                [classes.disablePointer] : props.canvasInteraction
            })}
            ref={ref}
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
    canvasInteraction: false
};

export default Dom;