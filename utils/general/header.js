/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable react/jsx-first-prop-new-line */
import Head from 'next/head';

const title = "Jonathan Chai - Portfolio"
const author = "Jonathan Chai"
const description = "Portfolio for Jonathan Chai"

const Header = () => {
    return (
        <Head>
            <meta charSet='utf-8' />
            <meta name='language' content='english' />
            <meta httpEquiv='content-type' content='text/html' />
            <meta name='author' content={author} />
            <meta name='designer' content={author} />
            <meta name='publisher' content={author} />

            <title>{title}</title>
            <meta name='description' content={description} />
            <meta
                name='keywords'
                content='Software Engineer,Computer Scientist,Frontend Engineer'
            />
            <meta name='robots' content='index,follow' />
            <meta name='distribution' content='web' />

            <meta
                name='viewport'
                content='width=device-width, minimum-scale=1, initial-scale=1.0'
            />
            <meta name='theme-color' content='#000000' />
            <link
                href="/graphics/general/logo.ico"
                rel="icon"
            />

            <meta property="og:image" content="/graphics/general/logo.png" />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="200" />
            <meta property="og:image:height" content="200" />
        </Head>
    )
}

export default Header;