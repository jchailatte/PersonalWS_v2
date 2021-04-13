import React, { useEffect } from 'react';
//import dynamic from 'next/dynamic';
//import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import theme from '@/components/mui/theme';
import Sidebar from '@/components/general/sidebar';
import Background from '@/components/general/background';

import Header from '@/utils/general/header';
//import useStore from '@/utils/hooks/useStore';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import '@/css/Typist.css';

// let LCanvas = null
// if (process.env.NODE_ENV === 'production') {
//     LCanvas = dynamic(() => import('@/components/layout/_canvas'), {
//         ssr: false,
//     })
// } else {
//     LCanvas = require('@/components/layout/_canvas').default
// }

//https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_app.js


// const SplitApp = (props) => {

//     return (
//         <Fragment>
//             {
//                 props.dom &&
//                 <div>
//                     {props.dom}
//                 </div>
//             }
//             <LCanvas>
//                 {
//                     props.canvas &&
//                     <group>
//                         {props.canvas}
//                     </group>
//                 }
//             </LCanvas>
//         </Fragment>
//     )
// }


const App = ({ Component, pageProps }) => {
    //const router = useRouter();

    // const r3fArr = [];
    // const compArr = [];

    // Children.forEach(Component(pageProps).props.children, (child) => {
    //     if (child.props && child.props.r3f) {
    //         r3fArr.push(child)
    //     } else {
    //         compArr.push(child)
    //     }
    // });

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    // useEffect(() => {
    //     useStore.setState({ router })
    // }, [router])

    return (
        <React.Fragment>
            <Header />
            <ThemeProvider
                theme={theme}
            >
                <CssBaseline />
                <Background>
                    <Sidebar
                        padding={pageProps.padding}
                        selected={pageProps.selected}
                    >
                        <div
                            style={{ position: 'relative' }}
                        >
                            {/* {
                                r3fArr.length > 0 ? (
                                    <SplitApp
                                        canvas={r3fArr}
                                        dom={compArr}
                                    />
                                ) : ( */}
                                    <Component
                                        {...pageProps}
                                    />
                                {/* )
                            } */}
                        </div>
                    </Sidebar>
                </Background>
            </ThemeProvider>
        </React.Fragment>
    );
}

// SplitApp.propTypes = {
//     dom: PropTypes.array.isRequired,
//     canvas: PropTypes.array.isRequired
// }

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired
};

export default App;