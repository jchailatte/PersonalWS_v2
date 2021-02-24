//https://github.com/vercel/next.js/blob/canary/examples/with-sitemap/scripts/generate-sitemap.js
const fs = require('fs')
const globby = require('globby')

function addPage(page) {
    const path = page.replace('pages', '').replace('.js', '').replace('.mdx', '').replace('/index', '');

    return `  <url>
    <loc>${`${process.env.WEBSITE_URL}${path}`}</loc>
    <changefreq>monthly</changefreq>
  </url>`
}

function generateJsonmap(pages) {
    const paths = pages.map((page) => {
        return page.replace('pages/', '').replace('.js', '').replace('/index', '');
    });

    const output = {};
    for (const path of paths) {
        current = output;

        for (const segment of path.split('/')) {
            if (segment !== '') {
                if (!(segment in current)) {
                    current[segment] = {};
                }
                current = current[segment];
            }
        }
    }
    return output;
}

async function generateSitemap() {
    // Ignore Next.js specific files (e.g., _app.js) and API routes.
    const pages = await globby([
        'pages/**/*{.js,.mdx}',
        '!pages/_*.js',
        '!pages/api',
    ]);

    const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(addPage).join('\n')}
</urlset>`;

    const json = generateJsonmap(pages);

    fs.writeFileSync('public/json/paths.json', JSON.stringify(json));
    fs.writeFileSync('public/sitemap.xml', sitemap);
}

generateSitemap();