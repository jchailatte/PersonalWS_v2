import { useState, useEffect } from 'react';

//https://www.pluralsight.com/guides/re-render-react-component-on-window-resize

export function useResize(elid) {

    const [dimensions, setDimensions] = useState({
        width: 0,
        height:0,
    });

    useEffect(()=>{
        const debouncedHandleResize = debounce(function handleResize() {
            setDimensions({
                width: document.getElementById(elid).offsetWidth,
                height: document.getElementById(elid).offsetHeight
            });
        },200);

        window.addEventListener('resize', debouncedHandleResize);

        return _ => {
            window.removeEventListener('resize', debouncedHandleResize);
        }
    });

    function debounce(fn, ms) {
        let timer;
        return _ => {
            clearTimeout(timer);
            timer = setTimeout(_ => {
                timer = null;
                fn.apply(this, arguments);
            }, ms)
        };
    }

    return dimensions;
}


