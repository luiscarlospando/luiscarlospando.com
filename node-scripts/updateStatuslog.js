const fs = require('fs');
const path = require('path');

const OMG_ADDRESS = 'mijo';
const SOURCE_URL = `https://api.omg.lol/address/${OMG_ADDRESS}/statuses/`;
const OUTPUT_PATH = path.join(__dirname, '..', '_data', 'statuslog.json');

// Fields we actually use to render a status page/card. `address` is constant
// and `relative_time` would freeze at fetch time, so both are dropped —
// relative time gets recomputed at render time instead.
function pickFields(status) {
    return {
        id: status.id,
        created: status.created,
        emoji: status.emoji,
        background: status.background,
        content: status.content,
        rendered_markdown: status.rendered_markdown,
        external_url: status.external_url,
    };
}

async function updateStatuslog() {
    const response = await fetch(SOURCE_URL);

    if (!response.ok) {
        throw new Error(`Failed to fetch ${SOURCE_URL}: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const statuses = data?.response?.statuses;

    if (!Array.isArray(statuses) || statuses.length === 0) {
        throw new Error('No statuses were found in the omg.lol response, refusing to overwrite existing data.');
    }

    const trimmed = statuses.map(pickFields);

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(trimmed, null, 4) + '\n');
    console.log(`Wrote ${trimmed.length} statuses to ${OUTPUT_PATH}`);
}

updateStatuslog().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
