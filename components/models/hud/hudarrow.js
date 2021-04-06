import { useState } from 'react';
import PropTypes from 'prop-types';

import SVGExtrude from '../../three/SVGExtrude';

const HUDArrow = (props) => {
    const [hover, setHover] = useState(false);

    return (
        <SVGExtrude
            groupProps={props.groupProps}
            layer={0}
            material={
                () =>
                    <meshPhongMaterial
                        attach="material"
                        color={hover ? '#008b8b' : 'cyan'}
                    />}
            meshProps={{
                onPointerOver: () => setHover(true),
                onPointerOut: () => setHover(false),
                onPointerDown: props.onClick
            }}
            url={'/svgs/hud/arrow.svg'}
        />
    );
};

HUDArrow.propTypes = {
    groupProps: PropTypes.object,
    onClick: PropTypes.func.isRequired
};

export default HUDArrow;
