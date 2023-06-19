// Retrieve /now page via omg.lol
$.get('https://api.omg.lol/address/mijo/now', function (data) {
    let content = response.now.content;
        contentDom = document.getElementById("now-content");

    contentDom.append(content);
});