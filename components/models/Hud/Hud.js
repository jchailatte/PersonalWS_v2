import React, { Fragment, useMemo, useRef, useState } from 'react';
import { Text } from '@react-three/drei';

import SVGExtrude from '../../three/SVGExtrude';
import HUDScreen from './HudScreen';
import HUDLogo from './HudLogo';
import HUDFrame from './HudFrame';

import paths from '../../../public/json/paths.json'
import { dark } from '@material-ui/core/styles/createPalette';

//potential colors:
// cyan, slate gray, white, dark cyan ( 008b8b)

//rmber to optimize geometries and materials later either with useMemo 
//potentially change the sci fi design to lean more toward oriental designs such as the chinese/japanese lattice :D (would match the lanterns better)

//redo the nesting so unneccesary components dont rerender


const Hud = (props) => {
    const horizontalVertices = 20;
    const verticalVertices = 40;
    const fontType = "/fonts/Iceland-Regular.ttf";

    const [prevLevel, setPrevLevel] = useState([]);
    const [level, setLevel] = useState(paths);
    const [selected, setSelected] = useState(0);
    const options = Object.keys(level).length;

    const darkFilmMaterial = useMemo(() => <meshPhongMaterial attach="material" color="black" shininess={1} transparent={true} opacity={0.5} />, []);

    const buttons = new Array(5).fill().map((_, i) => ({
        text: `Option ${i + 1}`,
        position: [-13, 6 - (3 * i), 0.5]
    }));

    const HUDButton = (props) => {
        const [hover, setHover] = useState(false);

        return (
            <Fragment>
                <Text
                    color="#008b8b"
                    fontSize={1.5}
                    anchorX="center"
                    anchorY="center"
                    position={[props.position[0] - 1, props.position[1] + 1, props.position[2] + 0.1]}
                    font={fontType}
                    layers={0}
                >
                    {props.text}
                </Text>
                <SVGExtrude
                    groupProps={{
                        position: props.position,
                        scale: [0.1, 0.1, 0.1]
                    }}
                    scale={[0.1, 0.1, 0.1]}
                    url={'/svgs/hud/button0.svg'}
                    layer={0} recenter={true}
                >
                    <meshPhongMaterial attach="material" color={hover ? "#008b8b" : "cyan"} />
                </SVGExtrude>
                <mesh position={props.position} onPointerOver={(e) => setHover(true)} onPointerOut={(e) => setHover(false)}>
                    <planeGeometry attach="geometry" args={[9.5, 1.5]} />
                    {darkFilmMaterial}
                </mesh>
            </Fragment>
        )
    }

    const HUDArrow = (props) => {
        const [hover, setHover] = useState(false);
        return (
            <SVGExtrude
                groupProps={props.groupProps}
                meshProps={{
                    onPointerOver: (e) => setHover(true),
                    onPointerOut: (e) => setHover(false),
                    onClick: props.onClick
                }}
                url={'/svgs/hud/arrow.svg'}
                layer={0}
            >
                <meshPhongMaterial attach="material" color={hover ? "#008b8b" : "cyan"} />
            </SVGExtrude>
        )
    }

    const HUDControl = (props) => {
        const selectUp = () => {
            if (selected - 1 >= 0) {
                setSelected(selected - 1);
            }
        }

        const selectDown = () => {
            if (selected + 1 < options) {
                setSelected(selected + 1);
            }
        }

        const selectRight = () => {
            const nextLevel = Object.values(level)[selected];
            console.log(nextLevel);

            if (Object.keys(nextLevel).length != 0) {
                setPrevLevel(prevArray => [...prevArray, Object.keys(level)[selected]]);
                setLevel(nextLevel);
                setSelected(0);
            }
        }

        const selectLeft = () => {
            const length = Object.keys(prevLevel).length;
            if (length != 0) {
                if (length === 1) {
                    setPrevLevel([]);
                    setLevel(paths);
                    setSelected(0);
                }
            }
            else {
                //basically iterate through paths using prevLevel from 0 to length - 1
                //then pop last element from prevLevel
                //can implement later
            }
        }

        return (
            <Fragment>
                <HUDArrow
                    groupProps={{
                        position: [props.position[0] + 0.5, props.position[1], props.position[2]],
                        scale: [0.02, 0.02, 0.02]
                    }}
                    onClick={(e) => selectRight()}
                />
                <HUDArrow
                    groupProps={{
                        position: [props.position[0] - 3, props.position[1], props.position[2]],
                        scale: [-0.02, 0.02, 0.02]
                    }}
                    onClick={(e) => selectLeft()}
                />
                <HUDArrow
                    groupProps={{
                        position: [props.position[0], props.position[1] + 3, props.position[2]],
                        scale: [0.02, 0.02, 0.02],
                        rotation: [0, 0, Math.PI / 2]
                    }}
                    onClick={(e) => selectUp()}
                />
                <HUDArrow
                    groupProps={{
                        position: [props.position[0], props.position[1] - 0.5, props.position[2]],
                        scale: [-0.02, 0.02, 0.02],
                        rotation: [0, 0, Math.PI / 2]
                    }}
                    onClick={(e) => selectDown()}
                />
            </Fragment>
        )
    }

    return (
        <Fragment>
            <HUDScreen horizontalVertices={horizontalVertices} verticalVertices={verticalVertices} />
            <HUDLogo position={[15, 5, 0]} logo={'/graphics/general/logo.png'} />
            <HUDFrame />

            <mesh position={[1, 0, 0.1]}>
                <planeGeometry attach="geometry" args={[17, 15]} />
                {darkFilmMaterial}
            </mesh>
            <Text
                color="#008b8b"
                fontSize={2}
                anchorX="center"
                anchorY="center"
                position={[-12, 10, 0.5]}
                font={fontType}
            >
                Jonathan Chai
            </Text>
            {Object.keys(level).map((route, i) =>
                <Text
                    color="#008b8b"
                    fontSize={2}
                    anchorX="center"
                    anchorY="center"
                    position={[0, 7 - (3 * i), 0.5]}
                    font={fontType}
                    key={i}
                >
                    {route.charAt(0).toUpperCase() + route.slice(1)}
                </Text>
            )}
            <Text
                color="#008b8b"
                fontSize={2}
                anchorX="center"
                anchorY="center"
                position={[0, 7 - (3 * selected), 0.5]}
                font={fontType}
            >
                [                  ]
                </Text>
            {options < 5 &&
                [...Array(5 - options)].map((_, i) =>
                    <Text
                        color="#008b8b"
                        fontSize={2}
                        anchorX="center"
                        anchorY="center"
                        position={[0, 7 - (3 * (i + options)), 0.5]}
                        font={fontType}
                        key={i}
                    >
                        - - - - -
                        </Text>
                )
            }
            <HUDControl position={[15.5, -5.5, 0.5]} />
            {buttons.map((props, i) => <HUDButton {...props} key={i} />)}
        </Fragment >
    )
}

export default Hud;