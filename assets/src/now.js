// Retrieve /now page via omg.lol
$.get('https://api.omg.lol/address/mijo/now', function (data) {
    let content = data.response.now.content;
        rawContent = String.raw(content);
        contentDom = document.getElementById("now-content");

    contentDom.append(rawContent);
});