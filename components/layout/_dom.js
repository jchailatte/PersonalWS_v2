import { useRef } from 'react'
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import useStore from '@/utils/store/store';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        minHeight: 'calc(100vh - 64px)',
        width: '100vw',
        padding: theme.spacing(3),
        zIndex: 10
    }
}));

const Dom = (props) => {
    const classes = useStyles();

    const ref = useRef(null);
    useStore.setState({ dom: ref });
    return (
        <div
            className={classes.root}
            ref={ref}
        >
            {props.children}
        </div>
    )
}

Dom.propTypes = {
    children: PropTypes.node
};

export default Dom;