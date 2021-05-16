
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import PropTypes from 'prop-types';

import useStore from '@/utils/store/store'

const LCanvas = (props) => {
    const dom = useStore((state) => state.dom)
    return (
        <Canvas
            mode='concurrent'
            onCreated={(state) => state.events.connect(dom.current)}
            style={{
                position: 'absolute',
                top: 0,
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