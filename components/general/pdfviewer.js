import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Document, Page } from 'react-pdf';

const useStyles = makeStyles(() => ({
    restyle: {
        display: 'flex',
        paddingTop: '5vh',
        justifyContent: 'center'
    },
    border: {
        borderStyle: 'solid',
        borderWidth: 'thick'
    }
}));

const PDFViewer = ({ url, width, pageNumber }) => {
    const classes = useStyles();
    return (
        <Document
            className={classes.restyle}
            file={url}>
            <Page
                className={classes.border}
                pageNumber={pageNumber}
                width={width} />
        </Document>
    );
};

PDFViewer.propTypes = {
    url: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    pageNumber: PropTypes.number.isRequired
};

export default PDFViewer;
