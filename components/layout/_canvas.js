
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import PropTypes from 'prop-types';

import useStore from '@/utils/store/store'

const LCanvas = (props) => {

    return (
        <Canvas
            onCreated={({ events }) => {
                useStore.setState({ events })
            }}
            style={{
                height: 'calc(100vh - 64px)',
                width: '100vw'
            }}
        >
            <Preload
                all
            />
            {props.children}
        </Canvas>
    )
}

LCanvas.propTypes = {
    children: PropTypes.node
};

export default LCanvas;