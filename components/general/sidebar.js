import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Drawer } from '@material-ui/core';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CodeIcon from '@material-ui/icons/Code';
import DescriptionIcon from '@material-ui/icons/Description';
import GithubIcon from '@material-ui/icons/GitHub';
import HomeIcon from '@material-ui/icons/Home';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';

//potential idea: make links into bubbles that cascade down in a curve 

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        height: '64px',
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    hide: {
        display: 'none'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "black"
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        //...theme.mixins.toolbar,
        // revert this once canvas autosizing is fixed 
        minHeight: '64px',
        justifyContent: 'flex-end'
    },
    content: {
        height: '100vh',
        marginLeft: -drawerWidth
    },
    contentFilter: {
        filter: 'brightness(50%)',
        userSelect: 'none',
        pointerEvents: 'none'
    },
    fontStyle: {
        fontFamily: 'Iceland',
        color: 'cyan'
    },
    padding: {
        padding: theme.spacing(3)
    },
    '@font-face': {
        fontFamily: 'Iceland',
        src: `url("/fonts/Iceland-Regular.ttf") format("truetype")`
    }
}));

const sbitems = [
    {
        text: 'Home',
        icon: <HomeIcon />,
        href: '/'
    },
    {
        text: 'About',
        icon: <AccountBoxIcon />,
        href: '/about'
    },
    {
        text: 'Resume',
        icon: <DescriptionIcon />,
        href: '/resume'
    },
    {
        text: 'Projects',
        icon: <CodeIcon />,
        href: '/projects'
    }
    // {
    //     text: 'Contact Me',
    //     icon: <EmailIcon />,
    //     href: '/contact',
    // },
];

const footer = [
    {
        text: 'GitHub',
        icon: <GithubIcon />,
        href: 'https://github.com/jchailatte'
    },
    {
        text: 'LinkedIn',
        icon: <LinkedInIcon />,
        href: 'https://www.linkedin.com/in/jchailatte/'
    }
];

const Sidebar = props => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div
            className={classes.root}
        >
            <AppBar
                className={classes.appBar}
                position="fixed"
            >
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        className={classes.menuButton}
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        //todo: make this link back to homepage
                        className={classes.fontStyle}
                        variant="h5"
                        noWrap
                    >
                        Jonathan Chai
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper
                }}
                open={open}
                variant="persistent"
            >
                <div
                    className={classes.drawerHeader}
                >
                    <IconButton
                        onClick={handleDrawerClose}
                        style={{ color: 'cyan' }}
                    >
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider
                    style={{ background: 'cyan' }}
                    variant='middle'
                />
                <List
                    id="mainsb"
                >
                    {sbitems.map((item, index) => (
                        <Link
                            href={item.href}
                            key={index}
                        >
                            <ListItem
                                className={classes.opennested}
                                component="a"
                                disabled={item.disable}
                                key={index}
                                onClick={handleDrawerClose}
                                selected={item.text === props.selected}
                                button
                            >
                                <ListItemIcon
                                    style={{ color: 'cyan' }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        variant: 'h5',
                                        className: classes.fontStyle
                                    }}
                                />
                            </ListItem>
                        </Link>
                    ))}
                </List>
                <Divider
                    style={{ background: 'cyan' }}
                    variant='middle'
                />
                <List>
                    {footer.map((item, index) => (
                        <ListItem
                            className={classes.opennested}
                            component="a"
                            disabled={item.disable}
                            href={item.href}
                            key={index}
                            target="_blank"
                            button
                        >
                            <ListItemIcon
                                style={{ color: 'cyan' }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{
                                    variant: 'h5',
                                    className: classes.fontStyle
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentFilter]: open,
                    [classes.padding]: props.padding
                })}
                id="content"
            >
                <div
                    className={classes.drawerHeader}
                />
                {props.children}
            </main>
        </div>
    );
};

Sidebar.propTypes = {
    selected: PropTypes.string,
    padding: PropTypes.bool,
    children: PropTypes.element
};

Sidebar.defaultProps = {
    padding: true
};

export default Sidebar;
