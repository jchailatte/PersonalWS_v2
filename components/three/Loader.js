import { useProgress, Html } from '@react-three/drei';

//make loader prettier

//loader issue will probably resolve if i switch to overarching canvas

function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress()
    return (
        <Html>
            {progress} % loaded
        </Html>
    )
}

export default Loader;