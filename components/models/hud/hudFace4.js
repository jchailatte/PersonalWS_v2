import { Fragment, } from 'react';
import { makeStyles } from '@material-ui/core';
import * as THREE from 'three';

const useStyles = makeStyles(() => ({

}));

const HUDFace4 = () => {
    const classes = useStyles();


    //maybe slap the contact form onto this side if reCaptcha doesn't freak out 
    //will have to test load times to make sure it doesnt increase but shouldnt be an issue hopefully
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