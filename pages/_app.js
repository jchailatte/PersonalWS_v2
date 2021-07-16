import { Fragment, useEffect, Children } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

import theme from "@/components/mui/theme";
import Sidebar from "@/components/general/sidebar";
import Background from "@/components/general/background";
import Dom from "@/components/layout/_dom";

import Header from "@/utils/general/header";
import useStore from "@/utils/store/store";

import "@/css/Typist.css";

let LCanvas = null;
if (process.env.NODE_ENV === "production") {
    LCanvas = dynamic(() => import("@/components/layout/_canvas"), {
        ssr: false,
    });
} else {
    LCanvas = require("@/components/layout/_canvas").default;
}

//https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_app.js
//https://github.com/pmndrs/react-three-next/blob/main/src/pages/_app.jsx

const ForwardPropsToR3fComponent = ({ comp, pageProps }) => {
    let r3fArr = [];
    let compArr = [];

    try {
        Children.forEach(comp(pageProps).props.children, (child) => {
            if (child?.props && child.props.r3f) {
                r3fArr.push(child);
            } else {
                compArr.push(child);
            }
        });

        return (
            <>
                {compArr && (
                    <Dom
                        canvasInteraction={pageProps.canvasInteraction}
                        padding={pageProps.padding}
                    >
                        {compArr}
                    </Dom>
                )}
                {r3fArr && <LCanvas>{r3fArr}</LCanvas>}
            </>
        );
    } catch (error) {
        // fallback security for SSG
        return (
            <comp
                {...pageProps}
            />
        );
    }
};

const App = ({ Component, pageProps = {} }) => {
    const router = useRouter();

    useEffect(() => {
        useStore.setState({ router });
    }, [router]);

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <Fragment>
            <Header />
            <ThemeProvider
                theme={theme}
            >
                <CssBaseline />
                <Background
                    url={pageProps.backgroundurl}
                >
                    <Sidebar>
                        <div
                            style={{ position: "relative" }}
                        >
                            <ForwardPropsToR3fComponent
                                comp={Component}
                                pageProps={pageProps}
                            />
                        </div>
                    </Sidebar>
                </Background>
            </ThemeProvider>
        </Fragment>
    );
};

ForwardPropsToR3fComponent.propTypes = {
    comp: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};

export default App;
