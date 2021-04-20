import { Fragment, } from 'react';
import { makeStyles } from '@material-ui/core';
import * as THREE from 'three';

const useStyles = makeStyles(() => ({

}));

const HUDFace4 = () => {
    const classes = useStyles();

    return (
        <Fragment>
            <mesh
                position={[9.5, 0, 0]}
                rotation={[0, Math.PI / 2, 0]}
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

            </mesh>
        </Fragment >
    )

}


export default HUDFace4;