import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
//import CopyrightIcon from '@material-ui/icons/Copyright';
import DescriptionIcon from '@material-ui/icons/Description';
//import EmailIcon from '@material-ui/icons/Email';
//import ExpandLessIcon from '@material-ui/icons/ExpandLess';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import ForumIcon from '@material-ui/icons/Forum';
import GithubIcon from '@material-ui/icons/GitHub';
import HomeIcon from '@material-ui/icons/Home';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import ListItemIcon from '@material-ui/core/ListItemIcon';
//import MeetingRoomIcon from '@material-ui/icons/MeetingRoomRounded';
import MenuIcon from '@material-ui/icons/Menu';
//import SportsEsportsIcon from '@material-ui/icons/SportsEsports';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        height: '64px',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
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
        width: drawerWidth
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    },
    content: {
        height: '100vh',
        marginLeft: -drawerWidth
    },
    contentFilter: {
        filter: 'brightness(50%)'
    },
    fontStyle: {
        fontFamily: 'Iceland'
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
            <CssBaseline />
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
                        className={classes.fontStyle}
                        variant="h4"
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
                    >
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
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
                                <ListItemIcon>{item.icon}</ListItemIcon>
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
                <Divider />
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
                            <ListItemIcon>{item.icon}</ListItemIcon>
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
