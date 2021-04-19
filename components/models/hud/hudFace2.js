import { Fragment, useState } from 'react';
import { Html } from '@react-three/drei';
import { Typography, makeStyles, ButtonBase, Breadcrumbs } from '@material-ui/core';
import * as THREE from 'three';

import paths from '@/public/json/paths.json';
import useStore from '@/utils/store/store';

const useStyles = makeStyles(() => ({
    text: {
        color: "cyan",
        fontFamily: "Iceland",
        width: '400px',
    },
    screenSize: {
        width: '450px'
    },
    arrows: {
        width: '75px'
    },
    optionButton: {
        width: '300px',
        paddingLeft: '25px',
    },
    buttonOverride: {
        '&:hover': {
            backgroundColor: 'rgba(0, 255, 255, 0.2)',
            borderLeft: '4px solid cyan',
            borderRight: '4px solid cyan',
            background: `linear-gradient(to bottom, cyan 4px, transparent 4px) 0 0,
            linear-gradient(to bottom, cyan 4px, transparent 4px) 100% 0,
            linear-gradient(to top, cyan 4px, transparent 4px) 0 100%,
            linear-gradient(to top, cyan 4px, transparent 4px) 100% 100%`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `10px 10px`
        }
    },
    buttonRow: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },
    '@font-face': {
        fontFamily: 'Iceland',
        src: `url("/fonts/Iceland-Regular.ttf") format("truetype")`
    },
}));

const HUDFace2 = () => {
    const classes = useStyles();
    const router = useStore((state) => state.router);
    const [prevLevel, setPrevLevel] = useState([]);
    const [level, setLevel] = useState(paths);
    const options = Object.keys(level).length;

    const selectRight = (selected) => {
        const nextLevel = level[selected];
        setPrevLevel([...prevLevel, selected]);
        setLevel(nextLevel);
    };

    const selectSelect = (selected) => {
        const route = prevLevel.join('/') + '/' + selected;
        router.push(route);
    }

    return (
        <Fragment>
            <mesh
                position={[-9.5, 0, 0]}
                rotation={[0, -Math.PI / 2, 0]}
            >
                <planeGeometry
                    args={[16, 16]}
                    attach="geometry"
                />
                <meshPhongMaterial
                    attach="material"
                    color="black"
                    opacity={0.5}
                    side={THREE.DoubleSide}
                    transparent={true}
                />
                <Html
                    className={classes.screenSize}
                    distanceFactor={10}
                    position={[0, 0, 0.5]}
                    center
                    transform
                >
                    {prevLevel.length != 0 &&
                        <ButtonBase
                            className={`${classes.arrows} ${classes.buttonOverride}`}
                        >
                            <Typography
                                className={classes.text}
                                variant="h2"
                            >
                                {console.log(prevLevel)}
                                {'<'}
                            </Typography>
                        </ButtonBase>
                    }
                    {Object.keys(level).map((route, i) => (
                        //note: rmber to truncate strings later on :D
                        //ideally it would scroll left to right and repeat
                        <div
                            className={classes.buttonRow}
                            key={"option" + i}
                        >
                            <ButtonBase
                                className={`${classes.buttonOverride} ${classes.optionButton}`}
                                onClick={() => selectSelect(route)}
                            >
                                <Typography
                                    align="left"
                                    className={classes.text}
                                    variant="h2"
                                >
                                    {route.charAt(0).toUpperCase() + route.slice(1)}
                                </Typography>
                            </ButtonBase>
                            {Object.keys(level[route]).length != 0 &&
                                <ButtonBase
                                    className={`${classes.arrows} ${classes.buttonOverride}`}
                                    onClick={() => selectRight(route)}
                                >
                                    <Typography
                                        className={classes.text}
                                        variant="h2"
                                    >
                                        {'>'}
                                    </Typography>
                                </ButtonBase>
                            }
                        </div>
                    ))}
                </Html>
            </mesh>
        </Fragment >
    )

}


export default HUDFace2;