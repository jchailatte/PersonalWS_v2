import { Fragment } from 'react';
import { Link } from '@material-ui/core';
import PropTypes from 'prop-types';

const Attribution = (props) => {
    return (
        <Fragment>
            <Link
                href={props.itemLink}
                rel="noreferrer"
                target="_blank"
            >
                {props.item}
            </Link>
            &nbsp;by&nbsp;
            <Link
                href={props.authorLink}
                rel="noreferrer"
                target="_blank"
            >
                {props.author}
            </Link>
            &nbsp;licensed under&nbsp;
            <Link
                href={props.licenseLink}
                rel="noreferrer"
                target="_blank"
            >
                {props.license}
            </Link>
            <br/>
        </Fragment>
    )
}

Attribution.propTypes = {
    itemLink: PropTypes.string.isRequired,
    item: PropTypes.string.isRequired,
    authorLink: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    licenseLink: PropTypes.string.isRequired,
    license: PropTypes.string.isRequired,
};

export default Attribution;
