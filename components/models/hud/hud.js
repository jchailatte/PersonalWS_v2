import React, { Fragment, useState, useMemo } from 'react';
import { Text } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

import HUDScreen from './hudScreen.js';
import HUDLogo from './hudLogo.js';
import HUDFrame from './hudFrame.js';
import HUDArrow from './hudArrow.js';
import HUDButton from './hudButton.js';
import HUDSelect from './hudSelect.js';

import paths from '@/public/json/paths.json';

//rmber to optimize geometries and materials later either with useMemo
//potentially change the sci fi design to lean more toward oriental designs such as the chinese/japanese lattice :D (would match the lanterns better)
//maybe add a conversion for mobile  version (can be done later)

const logoPosition = [15, 5, 0];
const controlPosition = [15.5, -5.5, 0.5];

const Hud = () => {
    const fontType = '/fonts/Iceland-Regular.ttf';

    //eventually switch to a dolly (hopefully three js will implement prgrammatic support w/ orthographic)
    const { camera } = useThree();

    const [prevLevel, setPrevLevel] = useState([]);
    const [level, setLevel] = useState(paths);
    const [selected, setSelected] = useState(0);
    const options = Object.keys(level).length;

    // const selectUp = () => {
    //     if (selected - 1 >= 0) {
    //         setSelected(selected - 1);
    //     }
    // };

    // const selectDown = () => {
    //     if (selected + 1 < options) {
    //         setSelected(selected + 1);
    //     }
    // };

    // const selectRight = () => {
    //     const nextLevel = Object.values(level)[selected];
    //     if (Object.keys(nextLevel).length != 0) {
    //         setPrevLevel(prevArray => [...prevArray, Object.keys(level)[selected]]);
    //         setLevel(nextLevel);
    //         setSelected(0);
    //     }
    // };

    // const selectLeft = () => {
    //     const length = Object.keys(prevLevel).length;
    //     if (length != 0) {
    //         if (length === 1) {
    //             setPrevLevel([]);
    //             setLevel(paths);
    //             setSelected(0);
    //         }
    //     } else {
    //         //basically iterate through paths using prevLevel from 0 to length - 1
    //         //then pop last element from prevLevel
    //         //can implement later
    //     }
    // };

    // const selectSelect = () => {
    //     //figure out the workaround at some point zzz
    //     //try testing if it will work without Selective Bloom first though since that might be the issue
    //     const route = prevLevel.join('/') + '/' + Object.keys(level)[selected];
    //     window.location.href = route;
    //     //props.router.push();
    // };

    const recenter = () => {
        //turn this into a smooth animation later (though react-spring doesnt seem to allow this so might have to find a workaround)
        camera.position.x = 1;
        camera.position.y = 0;
        camera.position.z = 15;
        camera.updateProjectionMatrix();
    };
    console.log("rendering hud")

    return (
        <Fragment>
            {/* <HUDScreen /> */}
            {/* <HUDLogo
                logo={'/graphics/general/logo.png'}
                position={logoPosition}
            /> */}
            <HUDFrame />
            {/* {console.log("render hud")} */}
            {/* {Object.keys(level).map((route, i) => (
                //note: rmber to truncate strings later on :D
                //oh and fix the ">" to look nicer future me
                <Fragment
                    key={'route' + i}
                >
                    <Text
                        anchorX="center"
                        anchorY="center"
                        color="#008b8b"
                        font={fontType}
                        fontSize={2}
                        position={[0, 7 - 3 * i, 0.5]}
                    >
                        {route.charAt(0).toUpperCase() + route.slice(1)}
                    </Text>
                    {Object.keys(level[route]).length != 0 ? (
                        <Text
                            anchorX="center"
                            anchorY="center"
                            color="#008b8b"
                            font={fontType}
                            fontSize={2}
                            key={'>' + i}
                            position={[0, 7 - 3 * i, 0.5]}
                            text="                            >"
                        />
                    ) : null}
                </Fragment>
            ))}
            <Text
                anchorX="center"
                anchorY="center"
                color="#008b8b"
                font={fontType}
                fontSize={2}
                position={[0, 7 - 3 * selected, 0.5]}
            >
                [                      ]
            </Text>
            {options < 5 &&
                [...Array(5 - options)].map((_, i) => (
                    <Text
                        anchorX="center"
                        anchorY="center"
                        color="#008b8b"
                        font={fontType}
                        fontSize={2}
                        key={'dashed' + i}
                        position={[0, 7 - 3 * (i + options), 0.5]}
                    >
                        - - - - -
                    </Text>
                ))} */}
            {/* <HUDSelect
                onClick={() => selectSelect()}
                position={[15.5, -5.5, 0.5]}
            /> */}
            {/* <HUDArrow
                groupProps={{
                    position: [controlPosition[0] + 0.5, controlPosition[1], controlPosition[2]],
                    scale: [0.02, 0.02, 0.02]
                }}
                onClick={() => selectRight()}
            />
            <HUDArrow
                groupProps={{
                    position: [controlPosition[0] - 3, controlPosition[1], controlPosition[2]],
                    scale: [-0.02, 0.02, 0.02]
                }}
                onClick={() => selectLeft()}
            />
            <HUDArrow
                groupProps={{
                    position: [controlPosition[0], controlPosition[1] + 3, controlPosition[2]],
                    scale: [0.02, 0.02, 0.02],
                    rotation: [0, 0, Math.PI / 2]
                }}
                onClick={() => selectUp()}
            />
            <HUDArrow
                groupProps={{
                    position: [controlPosition[0], controlPosition[1] - 0.5, controlPosition[2]],
                    scale: [-0.02, 0.02, 0.02],
                    rotation: [0, 0, Math.PI / 2]
                }}
                onClick={() => selectDown()}
            /> */}
            {/* <HUDButton
                onClick={() => recenter()}
                position={[-13, 6, 0.5]}
                text={'Recenter'}
            /> */}
        </Fragment>
    );
};

export default Hud;
