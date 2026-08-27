// Configura dayjs (con plugin de tiempo relativo) para las tarjetas de
// webmentions del footer del blog. El bloque que las renderiza vive en un
// <script> inline de footer.php, fuera de este bundle, así que se expone en
// window para que pueda reusarlo sin cargar su propia copia vía CDN.

// Require dayjs from 'dayjs'
const locale_es_mx = require("dayjs/locale/es-mx");
const dayjs = require("dayjs");
dayjs.locale("es-mx");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

window.dayjs = dayjs;
