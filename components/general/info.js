import { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Modal, Paper } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: 100
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

const Info = props => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            <Fab color="primary" aria-label="Info" className={classes.fab} onClick={handleOpen}>
                <InfoOutlinedIcon />
            </Fab>
            <Modal open={open} onClose={handleClose} className={classes.modal}>
                <Paper>{props.children}</Paper>
            </Modal>
        </Fragment>
    );
};

Info.propTypes = {
    children: PropTypes.element.isRequired
};

Info.defaultProps = {};

export default Info;
