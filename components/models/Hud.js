import React, { Fragment, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from 'react-three-fiber';
import { Text, Line, Billboard } from '@react-three/drei';

import SVGExtrude from '../three/SVGExtrude';

import paths from '../../public/json/paths.json'


//potential colors:
// cyan, slate gray, white, dark cyan ( 008b8b)

//rmber to optimize geometries and materials later either with useMemo or useResource

const Hud = (props) => {
    const horizontalVertices = 20;
    const verticalVertices = 40;
    const fontType = "/fonts/Iceland-Regular.ttf";

    const buttons = new Array(5).fill().map((_, i) => ({
        text: `Option ${i + 1}`,
        position: [-13, 6 - (3 * i), 0.5]
    }));

    const Lattice = (props) => {
        const data = useMemo(() => {
            return new Array(horizontalVertices + 1).fill().map((_, i) => ({
                points: [[verticalVertices / 2, i - horizontalVertices / 2, -1], [-verticalVertices / 2, i - horizontalVertices / 2, -1]],
            })).concat(new Array(verticalVertices + 1).fill().map((_, i) => ({
                points: [[i - verticalVertices / 2, horizontalVertices / 2, -1], [i - verticalVertices / 2, -horizontalVertices / 2, -1]],
            })))
        }, []);
        return data.map((props, i) => <Line key={i} {...props} lineWidth={0.5} color="cyan" layers={1} />)
    }

    const Screen = (props) => {
        //note: the psuedo-wireframe effect is only working with react-three-fiber@5.3.17 atm
        return (
            <Fragment>
                <mesh position={[0, 0, 0]}>
                    <planeGeometry attach="geometry" args={[verticalVertices - 1, horizontalVertices - 1]} />
                    <meshPhongMaterial attach="material" color="cyan" depthTest={false} />
                </mesh>
                <mesh position={[1, 0, 0.1]}>
                    <planeGeometry attach="geometry" args={[17, 15]} />
                    <meshPhongMaterial attach="material" color="black" shininess={1} transparent={true} opacity={0.5} />
                </mesh>
                <SVGExtrude position={[0, 0, 0]} scale={[.0825, .055, .05]} url={'/svgs/hud/border.svg'} recenter={true} >
                    <meshBasicMaterial attach="material" color="cyan" />
                </SVGExtrude>
            </Fragment>
        )
    }

    const HUDCorner = (props) => {
        const corner1 = useRef();
        const corner2 = useRef();

        // useFrame((state) => {
        //     const time = state.clock.getElapsedTime();
        //     const wave = Math.sin(time) * 0.01;

        //     if (corner1.current != null) {
        //         corner1.current.position.x = corner1.current.position.x + wave;
        //         corner1.current.position.y = corner1.current.position.y + wave;
        //     }
        //     if (corner2.current != null) {
        //         corner2.current.position.x = corner2.current.position.x - wave;
        //         corner2.current.position.y = corner2.current.position.y - wave;
        //     }
        // })


        return (
            <Fragment>
                <SVGExtrude position={[-5, -12, -1]} scale={[-0.1, 0.1, 0.1]} url={'/svgs/hud/hudcorner1.svg'} layer={1} depth={10} center={true} ref={corner1} >
                    <meshPhongMaterial attach="material" color="black" emissive="#008b8b" shininess={10} />
                </SVGExtrude>
                <SVGExtrude position={[5, 12, -1]} scale={[0.1, -0.1, 0.1]} url={'/svgs/hud/hudcorner1.svg'} layer={1} depth={10} center={true} ref={corner2} >
                    <meshPhongMaterial attach="material" color="black" emissive="#008b8b" shininess={10} />
                </SVGExtrude>
            </Fragment>
        )
    }

    const HUDCircle = (props) => {
        const circle1 = useRef();
        const circle2 = useRef();

        const logo = useLoader(THREE.TextureLoader, '/graphics/general/logo.png')

        useFrame((state) => {
            if (circle1.current != null) {
                circle1.current.rotation.z = circle1.current.rotation.z + 0.01;
            }
            if (circle2.current != null) {
                circle2.current.rotation.z = circle2.current.rotation.z - 0.01;
            }
        })

        return (
            <Fragment>
                <SVGExtrude position={[15, 5, 0]} scale={[0.1, 0.1, 0.1]} url={'/svgs/hud/hudcircle0.svg'} layer={1} recenter={true} ref={circle1} >
                    <meshPhongMaterial attach="material" color="black" emissive="cyan" shininess={10} />
                </SVGExtrude>
                <SVGExtrude position={[15, 5, 1]} scale={[0.1, 0.1, 0.1]} url={'/svgs/hud/hudcircle2.svg'} layer={1} recenter={true} ref={circle2} >
                    <meshPhongMaterial attach="material" color="black" emissive="cyan" shininess={10} />
                </SVGExtrude>
                <Billboard position={[15, 5, 0.5]} follow={true} args={[5, 5]} lockX={true} lockY={true}>
                    <meshStandardMaterial attach="material" map={logo} transparent />
                </Billboard>
            </Fragment>
        )
    }

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
        const [level, setLevel] = useState(Object.keys(paths));
        const [selected, setSelected] = useState(0);
        const options = level.length;

        const Option = (props) => {
            const nextLevel = level[props.route];

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
                {level.map((route, i) =>
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
        return (
            <Fragment>
                <SVGExtrude position={[15.5, -5, 0.5]} scale={[0.02, 0.02, 0.02]} url={'/svgs/hud/arrow.svg'} layer={0} >
                    <meshPhongMaterial attach="material" color="cyan" />
                </SVGExtrude>
                <SVGExtrude position={[13, -5, 0.5]} scale={[-0.02, 0.02, 0.02]} url={'/svgs/hud/arrow.svg'} layer={0} >
                    <meshPhongMaterial attach="material" color="cyan" />
                </SVGExtrude>
                <SVGExtrude position={[15.5, -2.5, 0.5]} scale={[0.02, 0.02, 0.02]} rotation={[0, 0, Math.PI / 2]} url={'/svgs/hud/arrow.svg'} layer={0} >
                    <meshPhongMaterial attach="material" color="cyan" />
                </SVGExtrude>
                <SVGExtrude position={[15.5, -5, 0.5]} scale={[-0.02, 0.02, 0.02]} rotation={[0, 0, Math.PI / 2]} url={'/svgs/hud/arrow.svg'} layer={0}>
                    <meshPhongMaterial attach="material" color="cyan" />
                </SVGExtrude>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <Lattice />
            <Screen />
            <HUDCorner />
            <HUDCircle />
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