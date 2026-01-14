// Display archived tweets with pagination

// Config
const ITEMS_PER_PAGE = 10; // tweets per page

let currentPage = 1;
let allTweets = [];

// Function to get page number from URL
function getPageFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get("page"), 10);
    return page && page > 0 ? page : 1;
}

// Function to update URL with current page
function updateURL(page) {
    const url = new URL(window.location);
    if (page === 1) {
        url.searchParams.delete("page");
    } else {
        url.searchParams.set("page", page);
    }
    window.history.pushState({ page }, "", url);
}

// Function to format date for display
function formatTweetDate(dateString) {
    // CSV has dates like "October 31, 2014 at 10:17AM"
    // Parse manually since browser may not understand this format
    const regex = /(\w+)\s+(\d+),\s+(\d+)\s+at\s+(\d+):(\d+)(AM|PM)/;
    const match = dateString.match(regex);

    if (!match) {
        console.warn("Could not parse date:", dateString);
        return dateString;
    }

    const monthNames = {
        January: "ene",
        February: "feb",
        March: "mar",
        April: "abr",
        May: "may",
        June: "jun",
        July: "jul",
        August: "ago",
        September: "sep",
        October: "oct",
        November: "nov",
        December: "dic",
    };

    const monthNumbers = {
        January: "01",
        February: "02",
        March: "03",
        April: "04",
        May: "05",
        June: "06",
        July: "07",
        August: "08",
        September: "09",
        October: "10",
        November: "11",
        December: "12",
    };

    const monthStr = match[1];
    const day = String(match[2]).padStart(2, "0");
    const year = match[3];
    let hours = parseInt(match[4]);
    const minutes = match[5];
    const ampm = match[6];

    // Convert to 24-hour format for datetime attribute
    if (ampm === "PM" && hours !== 12) {
        hours += 12;
    } else if (ampm === "AM" && hours === 12) {
        hours = 0;
    }

    const month = monthNames[monthStr] || monthStr.toLowerCase().slice(0, 3);
    const monthNum = monthNumbers[monthStr] || "01";
    const hoursStr = String(hours).padStart(2, "0");

    // ISO 8601 format for datetime attribute
    const datetime = `${year}-${monthNum}-${day}T${hoursStr}:${minutes}:00`;

    // Display format with original AM/PM
    const displayText = `${parseInt(day)} ${month} ${year}, ${match[4]}:${minutes} ${ampm}`;

    return `<time datetime="${datetime}"><em>${displayText}</em></time>`;
}

// Function to make links clickable in tweet text
function linkifyTweet(text) {
    // URLs
    const urlPattern =
        /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    text = text.replace(
        urlPattern,
        '<a href="$1" target="_blank" rel="noopener">$1</a>'
    );

    // Mentions
    text = text.replace(
        /@(\w+)/g,
        '<a href="https://twitter.com/$1" target="_blank" rel="noopener">@$1</a>'
    );

    // Hashtags
    text = text.replace(
        /#(\w+)/g,
        '<a href="https://twitter.com/hashtag/$1" target="_blank" rel="noopener">#$1</a>'
    );

    return text;
}

// Function to display archived tweets
function displayArchivedTweets() {
    // Get current page from URL
    currentPage = getPageFromURL();

    const container = document.getElementById("archived-tweets");
    if (!container) {
        console.log("❌ #archived-tweets does not exist in DOM");
        return;
    }

    // Set loading state
    container.innerHTML = `
        <li class="loading-state">
            <i class="fas fa-spinner fa-spin"></i> Cargando tweets archivados...
        </li>`;

    // Fetch tweets from JSON file (adjust path to where you save the file)
    fetch("/assets/data/tweets.json")
        .then((response) => response.json())
        .then((data) => {
            console.log("✅ #archived-tweets exists in DOM. Loading tweets...");

            // Reverse array to show most recent tweets first
            allTweets = data.reverse();

            // Validate page number after we know total items
            const totalPages = Math.ceil(allTweets.length / ITEMS_PER_PAGE);
            if (currentPage > totalPages) {
                currentPage = 1;
                updateURL(currentPage);
            }

            renderPaginatedTweets();
            setupPagination();
        })
        .catch((error) => {
            console.error("Error loading tweets:", error);
            container.innerHTML = `<li>No se pudieron cargar los tweets. Por favor, actualiza la página.</li>`;
        });
}

// Render paginated tweets
function renderPaginatedTweets() {
    const list = document.getElementById("archived-tweets");
    if (!list) return;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const tweets = allTweets.slice(startIndex, endIndex);

    list.innerHTML = tweets
        .map((tweet, index) => {
            // Always use dateOriginal and format it
            const dateToFormat = tweet.dateOriginal || tweet.date;
            const formattedDate = formatTweetDate(dateToFormat);
            const linkedText = linkifyTweet(tweet.text);
            const separator = index < tweets.length - 1 ? "<hr>" : "";

            return `
                <li class="mb-4">
                    <div class="card mb-4">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-2 col-lg-1 text-center">
                                    <img src="https://luiscarlospando.com/assets/images/avatar.webp"
                                         alt="L. Carlos Pando"
                                         class="rounded-circle img-fluid mb-4"
                                         style="max-width: 48px;"
                                         loading="${index < 3 ? "eager" : "lazy"}">
                                </div>
                                <div class="col-md-10 col-lg-11">
                                    <div class="tweet-content">
                                        <div class="tweet-header mb-2">
                                            <strong>L. Carlos Pando</strong>
                                            <span class="text-muted">${tweet.handle}</span>
                                            <span class="text-muted"> · ${formattedDate}</span>
                                        </div>
                                        <div class="tweet-text mb-2">
                                            <p style="white-space: pre-wrap; margin: 0;">${linkedText}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                ${separator}`;
        })
        .join("");
}

// Handle page navigation
function handlePageChange(newPage) {
    const totalPages = Math.ceil(allTweets.length / ITEMS_PER_PAGE);

    if (newPage < 1 || newPage > totalPages) {
        return;
    }

    currentPage = newPage;
    updateURL(currentPage);
    renderPaginatedTweets();
    setupPagination();

    // Scroll to top of the list
    document
        .getElementById("archived-tweets")
        ?.scrollIntoView({ behavior: "smooth" });
}

// Handle page jump from input
function handlePageJump() {
    const input = document.getElementById("tweetsPageJumpInput");
    const page = parseInt(input.value, 10);

    if (!isNaN(page) && page > 0) {
        handlePageChange(page);
    }
}

// Setup pagination buttons
function setupPagination() {
    const totalPages = Math.ceil(allTweets.length / ITEMS_PER_PAGE);
    const list = document.getElementById("archived-tweets");
    if (!list) return;

    const existing = document.querySelector(".tweets-pagination");
    if (existing) existing.remove();

    const container = document.createElement("div");
    container.className = "tweets-pagination";
    container.style.textAlign = "center";

    container.innerHTML = `
    <hr>
    <div class="pagination-info" style="margin-bottom: 1rem;">
      Página ${currentPage} de ${totalPages} (${allTweets.length} tweets)
    </div>
    <div class="pagination-controls" style="display: flex; justify-content: center; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
      <button id="tweetsPrevPage" class="btn btn-primary" aria-label="Anterior" ${currentPage === 1 ? "disabled" : ""}>« Anterior</button>
      <button id="tweetsNextPage" class="btn btn-primary" aria-label="Siguiente" ${currentPage === totalPages ? "disabled" : ""}>Siguiente »</button>
    </div>
    <hr>
    <div class="pagination-go-to" style="margin-bottom: 1rem;">
      <div>
        <label for="tweetsPageJumpInput" style="margin: 0; white-space: nowrap;">Ir a página:</label>
        <input
          type="number"
          id="tweetsPageJumpInput"
          min="1"
          max="${totalPages}"
          value="${currentPage}"
          style="width: 70px; padding: 0.375rem 0.5rem; border: 1px solid #ced4da; border-radius: 0.25rem;"
          aria-label="Número de página"
        >
        <button id="tweetsPageJumpBtn" class="btn btn-primary" aria-label="Ir">Ir</button>
      </div>
    </div>
  `;

    list.parentNode.insertBefore(container, list.nextSibling);

    document.getElementById("tweetsPrevPage")?.addEventListener("click", () => {
        if (currentPage > 1) handlePageChange(currentPage - 1);
    });

    document.getElementById("tweetsNextPage")?.addEventListener("click", () => {
        if (currentPage < totalPages) handlePageChange(currentPage + 1);
    });

    document
        .getElementById("tweetsPageJumpBtn")
        ?.addEventListener("click", handlePageJump);

    document
        .getElementById("tweetsPageJumpInput")
        ?.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                handlePageJump();
            }
        });
}

// Handle browser back/forward navigation
window.addEventListener("popstate", (event) => {
    if (event.state && event.state.page) {
        currentPage = event.state.page;
    } else {
        currentPage = getPageFromURL();
    }

    if (allTweets.length > 0) {
        renderPaginatedTweets();
        setupPagination();
    }
});

// Call the function when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    // Only run if container exists
    if (document.getElementById("archived-tweets")) {
        displayArchivedTweets();
    }
});
