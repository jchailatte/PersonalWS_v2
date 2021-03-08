import { useState } from 'react';

import SVGExtrude from '../../three/SVGExtrude';

const HUDArrow = (props) => {
    const [hover, setHover] = useState(false);
    return (
        <SVGExtrude
            groupProps={props.groupProps}
            meshProps={{
                onPointerOver: (e) => setHover(true),
                onPointerOut: (e) => setHover(false),
                onClick: props.onClick
            }}
            url={'/svgs/hud/arrow.svg'}
            layer={0}
        >
            <meshPhongMaterial attach="material" color={hover ? "#008b8b" : "cyan"} />
        </SVGExtrude>
    )
}

export default HUDArrow;