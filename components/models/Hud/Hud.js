import React, { Fragment, useMemo, useRef, useState } from 'react';
import { Text } from '@react-three/drei';
import { useRouter } from 'next/router';

import SVGExtrude from '../../three/SVGExtrude';
import HUDScreen from './HudScreen';
import HUDLogo from './HudLogo';
import HUDFrame from './HudFrame';
import HUDArrow from './HudArrow';
import HUDButton from './HudButton';
import HUDSelect from './HudSelect';

import paths from '../../../public/json/paths.json'

//potential colors:
// cyan, slate gray, white, dark cyan ( 008b8b)

//rmber to optimize geometries and materials later either with useMemo 
//potentially change the sci fi design to lean more toward oriental designs such as the chinese/japanese lattice :D (would match the lanterns better)

//redo the nesting so unneccesary components dont rerender


const Hud = (props) => {
    const horizontalVertices = 20;
    const verticalVertices = 40;
    const controlPosition = [15.5, -5.5, 0.5];
    const fontType = "/fonts/Iceland-Regular.ttf";

    const router = useRouter();
    const [prevLevel, setPrevLevel] = useState([]);
    const [level, setLevel] = useState(paths);
    const [selected, setSelected] = useState(0);
    const options = Object.keys(level).length;

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

    const select = () => {
        const route = "/" + prevLevel.join('/') + Object.keys(level)[selected];
        console.log(route);
        router.push(route);
    }

    return (
        <Fragment>
            <HUDScreen horizontalVertices={horizontalVertices} verticalVertices={verticalVertices} />
            <HUDLogo position={[15, 5, 0]} logo={'/graphics/general/logo.png'} />
            <HUDFrame />


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
            <HUDSelect 
                position={[15.5, -5.5, 0.5]} 
                onClick={(e)=>select()}
            />
            <HUDArrow
                groupProps={{
                    position: [controlPosition[0] + 0.5, controlPosition[1], controlPosition[2]],
                    scale: [0.02, 0.02, 0.02]
                }}
                onClick={(e) => selectRight()}
            />
            <HUDArrow
                groupProps={{
                    position: [controlPosition[0] - 3, controlPosition[1], controlPosition[2]],
                    scale: [-0.02, 0.02, 0.02]
                }}
                onClick={(e) => selectLeft()}
            />
            <HUDArrow
                groupProps={{
                    position: [controlPosition[0], controlPosition[1] + 3, controlPosition[2]],
                    scale: [0.02, 0.02, 0.02],
                    rotation: [0, 0, Math.PI / 2]
                }}
                onClick={(e) => selectUp()}
            />
            <HUDArrow
                groupProps={{
                    position: [controlPosition[0], controlPosition[1] - 0.5, controlPosition[2]],
                    scale: [-0.02, 0.02, 0.02],
                    rotation: [0, 0, Math.PI / 2]
                }}
                onClick={(e) => selectDown()}
            />
        </Fragment >
    )
}

export default Hud;