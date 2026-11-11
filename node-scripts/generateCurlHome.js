// Genera _site/index.txt: la versión de terminal del sitio que se sirve cuando
// alguien hace `curl luiscarlospando.com` (ver el rewrite por user-agent en
// vercel.json). Corre DESPUÉS de `jekyll build` porque escribe dentro de _site/.
//
// Prueba local:
//   node node-scripts/generateCurlHome.js && cat _site/index.txt

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUTPUT_PATH = path.join(ROOT, "_site", "index.txt");
const STATUSLOG_PATH = path.join(ROOT, "_data", "statuslog.json");
const CONFIG_PATH = path.join(ROOT, "_config.yml");
const BLOG_FEED_URL = "https://blog.luiscarlospando.com/feed/";
const WIDTH = 72;
const POSTS_LIMIT = 5;

// ---------------------------------------------------------------------------
// ANSI helpers (256 colores)
// ---------------------------------------------------------------------------
const ESC = "\x1b[";
const reset = `${ESC}0m`;
const fg = (n) => (s) => `${ESC}38;5;${n}m${s}${reset}`;
const bold = (s) => `${ESC}1m${s}${reset}`;
const dim = (s) => `${ESC}2m${s}${reset}`;
const accent = fg(33); // azul, cercano a $primary hsl(220, 90%, 56%)
const cyan = fg(44);
const yellow = fg(220);
const pink = fg(205);

// ---------------------------------------------------------------------------
// Datos
// ---------------------------------------------------------------------------

// Lee solo claves escalares de primer nivel (`clave: valor`) de _config.yml.
// Suficiente para lo que necesitamos, sin agregar una dependencia de YAML.
function readConfig() {
    const config = {};
    const lines = fs.readFileSync(CONFIG_PATH, "utf8").split("\n");
    for (let i = 0; i < lines.length; i++) {
        const match = lines[i].match(/^([a-z_]+):\s*"?([^"#\n]*?)"?\s*(#.*)?$/);
        if (!match || !match[2]) continue;
        let value = match[2];
        // Bloques multilínea (`clave: >-` o `clave: |`): junta las líneas indentadas.
        if (/^[>|][-+]?$/.test(value)) {
            const block = [];
            while (i + 1 < lines.length && /^\s+\S/.test(lines[i + 1]))
                block.push(lines[++i].trim());
            value = block.join(" ");
        }
        config[match[1]] = value;
    }
    return config;
}

function decodeEntities(str) {
    return str
        .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
        .replace(/&#x([0-9a-f]+);/gi, (_, h) =>
            String.fromCodePoint(parseInt(h, 16))
        )
        .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .trim();
}

async function fetchBlogPosts() {
    try {
        const response = await fetch(BLOG_FEED_URL, {
            signal: AbortSignal.timeout(10000),
        });
        if (!response.ok)
            throw new Error(`${response.status} ${response.statusText}`);
        const xml = await response.text();
        const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(
            0,
            POSTS_LIMIT
        );
        return items
            .map(([, item]) => {
                const tag = (name) => {
                    const m = item.match(
                        new RegExp(`<${name}>([\\s\\S]*?)</${name}>`)
                    );
                    return m ? decodeEntities(m[1]) : "";
                };
                const date = new Date(tag("pubDate"));
                return {
                    title: tag("title"),
                    link: tag("link"),
                    date: isNaN(date) ? "" : date.toISOString().slice(0, 10),
                };
            })
            .filter((post) => post.title && post.link);
    } catch (error) {
        console.warn(
            `[curl] No se pudo leer el feed del blog (${error.message}); se omite la sección.`
        );
        return [];
    }
}

function readLatestStatus() {
    try {
        const statuses = JSON.parse(fs.readFileSync(STATUSLOG_PATH, "utf8"));
        return statuses[0] || null;
    } catch {
        return null;
    }
}

// ---------------------------------------------------------------------------
// Formato
// ---------------------------------------------------------------------------

function wrap(text, width, indent = "") {
    const words = text.replace(/\s+/g, " ").trim().split(" ");
    const lines = [];
    let line = "";
    for (const word of words) {
        if (line && (line + " " + word).length > width - indent.length) {
            lines.push(indent + line);
            line = word;
        } else {
            line = line ? `${line} ${word}` : word;
        }
    }
    if (line) lines.push(indent + line);
    return lines.join("\n");
}

function heading(title) {
    const bar = "─".repeat(Math.max(0, WIDTH - title.length - 4));
    return `${accent("──")} ${bold(title)} ${dim(bar)}`;
}

function linkRow(label, url, labelWidth = 12) {
    return `  ${cyan(label.padEnd(labelWidth))} ${url}`;
}

const BANNER = [
    "███╗   ███╗██╗     ██╗ ██████╗ ",
    "████╗ ████║██║     ██║██╔═══██╗",
    "██╔████╔██║██║     ██║██║   ██║",
    "██║╚██╔╝██║██║██   ██║██║   ██║",
    "██║ ╚═╝ ██║██║╚█████╔╝╚██████╔╝",
    "╚═╝     ╚═╝╚═╝ ╚════╝  ╚═════╝ ",
];
// Degradado de azul a rosa, una línea por color.
const BANNER_COLORS = [39, 33, 63, 99, 135, 171];

function render({ config, posts, status }) {
    const url = config.url || "https://luiscarlospando.com";
    const out = [];

    out.push("");
    BANNER.forEach((line, i) => out.push("  " + fg(BANNER_COLORS[i])(line)));
    out.push("");
    out.push(
        `  ${bold(config.title || "Luis Carlos Pando")} ${dim("aka")} ${pink("Mijo")} ${dim("(/ˈmiːhoʊ/)")}`
    );
    out.push(`  ${dim("Web developer · Chihuahua, México")}`);
    out.push("");
    out.push(
        wrap(
            config.description ||
                "Punk dude. Millennial missing the old internet. Lover of music and the quirky, weird, personal web.",
            WIDTH,
            "  "
        )
    );
    out.push("");

    if (status) {
        const when = new Date(Number(status.created) * 1000)
            .toISOString()
            .slice(0, 10);
        out.push(heading("Status"));
        out.push("");
        out.push(
            wrap(`${status.emoji || "💬"}  ${status.content}`, WIDTH, "  ")
        );
        out.push(`  ${dim(when)}  ${dim(`${url}/status/`)}`);
        out.push("");
    }

    if (posts.length) {
        out.push(heading("Últimos posts del blog"));
        out.push("");
        for (const post of posts) {
            const titleLines = wrap(post.title, WIDTH - 14).split("\n");
            out.push(`  ${dim(post.date)}  ${bold(titleLines[0])}`);
            titleLines
                .slice(1)
                .forEach((l) => out.push(`              ${bold(l)}`));
            out.push(`              ${dim(post.link)}`);
        }
        out.push("");
    }

    out.push(heading("Por aquí"));
    out.push("");
    out.push(linkRow("about", `${url}/about/`));
    out.push(linkRow("now", `${url}/now/`));
    out.push(
        linkRow("blog", config.blog_url || "https://blog.luiscarlospando.com")
    );
    out.push(linkRow("music", `${url}/music/`));
    out.push(linkRow("games", `${url}/games/`));
    out.push(linkRow("uses", `${url}/uses/`));
    out.push(linkRow("guestbook", `${url}/guestbook/`));
    out.push("");

    out.push(heading("En otros lados"));
    out.push("");
    if (config.mastodon_url) out.push(linkRow("mastodon", config.mastodon_url));
    if (config.bluesky_url) out.push(linkRow("bluesky", config.bluesky_url));
    if (config.omglol_url) out.push(linkRow("omg.lol", config.omglol_url));
    if (config.lastfm_url) out.push(linkRow("last.fm", config.lastfm_url));
    if (config.github_username)
        out.push(
            linkRow("github", `https://github.com/${config.github_username}`)
        );
    out.push(linkRow("contacto", `${url}/contact/`));
    out.push("");

    out.push(dim("─".repeat(WIDTH)));
    out.push(
        `  ${yellow("★")} ${dim("Estás viendo la versión de terminal. Ábrelo en un navegador:")}`
    );
    out.push(`    ${accent(url)}`);
    out.push("");

    return out.join("\n") + "\n";
}

async function main() {
    if (!fs.existsSync(path.dirname(OUTPUT_PATH))) {
        throw new Error(
            "No existe _site/. Corre `bundle exec jekyll build` antes de este script."
        );
    }
    const config = readConfig();
    const [posts, status] = await Promise.all([
        fetchBlogPosts(),
        readLatestStatus(),
    ]);
    fs.writeFileSync(OUTPUT_PATH, render({ config, posts, status }));
    console.log(
        `[curl] Escribí ${OUTPUT_PATH} (${posts.length} posts, status: ${status ? "sí" : "no"})`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
