import { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Modal, Paper } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: 100
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    paper: {
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        [theme.breakpoints.up('md')]:{
            maxWidth: '50vw'
        },
        [theme.breakpoints.down('md')]:{
            maxWidth: '80vw'
        }
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
            <Fab
                aria-label="Info"
                className={classes.fab}
                color="primary"
                onClick={handleOpen}
            >
                <InfoOutlinedIcon />
            </Fab>
            <Modal
                className={classes.modal}
                onClose={handleClose}
                open={open}
            >
                <Paper
                    className={classes.paper}
                >
                    {props.children}
                </Paper>
            </Modal>
        </Fragment>
    );
};

Info.propTypes = {
    children: PropTypes.element.isRequired
};

Info.defaultProps = {};

export default Info;
