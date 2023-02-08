/* Generate a share link for the user's Mastodon domain */
function MastodonShare(e){

    // Get the source text
    src = e.target.getAttribute("data-src");

    // Get the Mastodon domain
    domain = prompt("Enter your Mastodon domain", "mastodon.social");

    if (domain == "" || domain == null){
        return;
    }

    // Build the URL
    url = "https://" + domain + "/share?text=" + src;

    // Open a window on the share page
    window.open(url, '_blank');
}