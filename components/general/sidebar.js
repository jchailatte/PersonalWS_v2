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
import CopyrightIcon from '@material-ui/icons/Copyright';
import DescriptionIcon from '@material-ui/icons/Description';
import EmailIcon from '@material-ui/icons/Email';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ForumIcon from '@material-ui/icons/Forum';
import GithubIcon from '@material-ui/icons/GitHub';
import HomeIcon from '@material-ui/icons/Home';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoomRounded';
import MenuIcon from '@material-ui/icons/Menu';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';

const drawerWidth = 240;

//add copyright plus other stuff -> refer to v1

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        height: "100vh",
        marginLeft: -drawerWidth,
    },
    contentShift: {
        filter: "brightness(50%)"
    },
    fontstyle:{
        fontFamily: "Iceland",
        fontSize: '22px',
    },
    padding: {
        padding: theme.spacing(3)
    },
    "@font-face": {
        fontFamily: 'Iceland',
        src: `url("/fonts/Iceland-Regular.ttf") format("truetype")`
    },
}));

const sbitems =
    [
        {
            text: 'Home',
            icon: <HomeIcon />,
            href: '/',
        },
        {
            text: 'About',
            icon: <AccountBoxIcon />,
            href: '/about',
        },
        {
            text: 'Resume',
            icon: <DescriptionIcon />,
            href: '/resume',
        },
        {
            text: 'Projects',
            icon: <CodeIcon />,
            href: '/projects',
        },
        {
            text: 'Contact Me',
            icon: <EmailIcon />,
            href: '/contact',
        },
];

const footer =
    [
        {
            text: 'GitHub',
            icon: <GithubIcon />,
            href: 'https://github.com/jchailatte',
            target: "_blank"
        },
        {
            text: 'LinkedIn',
            icon: <LinkedInIcon />,
            href: 'https://www.linkedin.com/in/jchailatte/',
            target: "_blank"
        }
    ];

const Sidebar = (props) => {
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
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Jonathan Chai
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List id='mainsb'>
                    {sbitems.map((item, index) => (
                        <Link href={item.href} key={index}>
                            <ListItem button component='a'
                                selected={item.text === props.selected}
                                className={classes.opennested}
                                disabled={item.disable}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText
                                    disableTypography
                                    primary={item.text}
                                    className={classes.fontstyle}
                                >
                                </ListItemText>
                            </ListItem>
                        </Link>
                    ))}
                </List>
                <Divider />
                <List>
                    {footer.map((item, index) => (
                        <ListItem button component='a'
                            href={item.href}
                            target={item.target}
                            className={classes.opennested}
                            disabled={item.disable}
                            key={index}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} className={classes.fontstyle} disableTypography></ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                    [classes.padding] : props.padding,
                })}
                id="content"
            >
                <div className={classes.drawerHeader} />
                {props.children}
            </main>
        </div>
    );
}

Sidebar.propTypes = {
    selected: PropTypes.string,
    padding: PropTypes.bool,
}

Sidebar.defaultProps = {
    padding:true
}

export default Sidebar;