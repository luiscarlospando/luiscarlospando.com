// Last updated at (posts and pages) relative time conversions

// Require dayjs from 'dayjs'
const locale_es_mx = require('dayjs/locale/es-mx');
const dayjs = require('dayjs');
dayjs.locale('es-mx');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

// Retrieve last updated date from posts that has it
const lastUpdatedJekyll = document.getElementById("last-updated-at").innerHTML;
let lastUpdatedRelative = dayjs().to(lastUpdatedJekyll);

// Update date with relative format
document.getElementById("last-updated-at").innerHTML = lastUpdatedRelative;