import { useProgress, Html } from '@react-three/drei';

//make loader prettier

function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress()
    return (
        <Html 
            center
        >
            {progress} % loaded
        </Html>
    )
}

export default Loader;