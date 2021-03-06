import React, { Fragment, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader, useUpdate } from 'react-three-fiber';
import { Text } from '@react-three/drei';

import SVGExtrude from '../../three/SVGExtrude';
import Lattice from './Lattice';
import HUDLogo from './HudLogo';
import HUDFrame from './HudFrame';

import paths from '../../../public/json/paths.json'


//potential colors:
// cyan, slate gray, white, dark cyan ( 008b8b)

//rmber to optimize geometries and materials later either with useMemo or useResource

//redo the nesting so unneccesary components dont rerender

const Hud = (props) => {
    const horizontalVertices = 20;
    const verticalVertices = 40;
    const fontType = "/fonts/Iceland-Regular.ttf";

    const [prevLevel, setPrevLevel] = useState({});
    const [level, setLevel] = useState(paths);
    const [selected, setSelected] = useState(0);
    const options = Object.keys(level).length;

    const buttons = new Array(5).fill().map((_, i) => ({
        text: `Option ${i + 1}`,
        position: [-13, 6 - (3 * i), 0.5]
    }));

    const HUDButton = (props) => {

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
                <SVGExtrude position={props.position} scale={[0.1, 0.1, 0.1]} url={'/svgs/hud/button0.svg'} layer={0} recenter={true} >
                    <meshPhongMaterial attach="material" color="cyan" />
                </SVGExtrude>
                <mesh position={props.position}>
                    <planeGeometry attach="geometry" args={[9, 1.5]} />
                    <meshPhongMaterial attach="material" color="black" shininess={1} transparent={true} opacity={0.5} />
                </mesh>
            </Fragment>
        )
    }

    const HUDOptions = (props) => {

        const Option = (props) => {

            return (
                <Text
                    color="#008b8b"
                    fontSize={2}
                    anchorX="center"
                    anchorY="center"
                    position={[0, 7 - (3 * props.order), 0.5]}
                    font={fontType}
                >
                    {props.route.charAt(0).toUpperCase() + props.route.slice(1)}
                </Text>
            )
        }

        return (
            <Fragment>
                {Object.keys(level).map((route, i) =>
                    <Option route={route} order={i} key={i} />
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
            </Fragment>
        )
    }

    const HUDControl = (props) => {

        const selectUp = () => {
            if (selected - 1 >= 0) {
                setSelected(selected - 1);
            }
        }

        const selectDown = () => {
            console.log(options);
            if (selected + 1 < options) {
                setSelected(selected + 1);
            }
        }

        const selectRight = () => {
            const nextLevel = Object.values(level)[selected];
            console.log(nextLevel);

            if (Object.keys(nextLevel).length != 0) {
                setPrevLevel({...prevLevel, ...level});
                setLevel(nextLevel);
                setSelected(0);
            }
        }

        const selectLeft = () => {
            console.log(prevLevel);

            if(Object.keys(prevLevel).length != 0){

            }
        }

        return (
            <Fragment>
                <SVGExtrude
                    position={[16, -5.5, 0.5]}
                    scale={[0.02, 0.02, 0.02]}
                    url={'/svgs/hud/arrow.svg'}
                    onClick={(e) => selectRight()}
                    layer={0}
                >
                    <meshPhongMaterial attach="material" color="cyan" />
                </SVGExtrude>
                <SVGExtrude
                    position={[12.5, -5.5, 0.5]}
                    scale={[-0.02, 0.02, 0.02]}
                    url={'/svgs/hud/arrow.svg'}
                    layer={0}
                >
                    <meshPhongMaterial attach="material" color="cyan" />
                </SVGExtrude>
                <SVGExtrude
                    position={[15.5, -2.5, 0.5]}
                    scale={[0.02, 0.02, 0.02]}
                    rotation={[0, 0, Math.PI / 2]}
                    url={'/svgs/hud/arrow.svg'}
                    onClick={(e) => selectUp()}
                >
                    <meshPhongMaterial attach="material" color="cyan" />
                </SVGExtrude>
                <SVGExtrude
                    position={[15.5, -6, 0.5]}
                    scale={[-0.02, 0.02, 0.02]}
                    rotation={[0, 0, Math.PI / 2]}
                    url={'/svgs/hud/arrow.svg'}
                    onClick={(e) => selectDown()}
                >
                    <meshPhongMaterial attach="material" color="cyan" />
                </SVGExtrude>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <Lattice horizontalVertices={horizontalVertices} verticalVertices={verticalVertices} />
            <HUDLogo position={[15, 5, 0]} logo={'/graphics/general/logo.png'} />
            <HUDFrame />


            <mesh position={[0, 0, 0]}>
                <planeGeometry attach="geometry" args={[verticalVertices - 1, horizontalVertices - 1]} />
                <meshPhongMaterial attach="material" color="cyan" depthTest={false} />
            </mesh>
            <mesh position={[1, 0, 0.1]}>
                <planeGeometry attach="geometry" args={[17, 15]} />
                <meshPhongMaterial attach="material" color="black" shininess={1} transparent={true} opacity={0.5} />
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
            <HUDOptions />
            <HUDControl />
            {buttons.map((props, i) => <HUDButton {...props} key={i} />)}
        </Fragment >
    )
}

export default Hud;