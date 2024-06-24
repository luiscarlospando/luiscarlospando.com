document.addEventListener("DOMContentLoaded", function () {
  const btnVersionBlog = document.getElementById("btn-version-blog");

  // Function to update the HTML comment
  function updateComment(version) {
    const comments = document.createTreeWalker(
      document,
      NodeFilter.SHOW_COMMENT,
    );
    let found = false;
    while (comments.nextNode()) {
      const commentNode = comments.currentNode;
      if (commentNode.nodeValue.includes("vPLACEHOLDER")) {
        commentNode.nodeValue = commentNode.nodeValue.replace(
          "vPLACEHOLDER",
          `v${version}`,
        );
        found = true;
        break;
      }
    }
    return found;
  }

  // Only proceed if the btn-version-blog element is found
  if (btnVersionBlog) {
    fetch("https://luiscarlospando.com/config.json")
      .then((response) => response.json())
      .then((data) => {
        // Update href attribute with site_url
        btnVersionBlog.href = `${data.site_url}/acerca-de/`;

        // Update title attribute with site_title and site_version
        btnVersionBlog.title = `${data.site_title} v${data.site_version}`;

        // Update data-original-title attribute with site_title
        btnVersionBlog.setAttribute(
          "data-original-title",
          `${data.site_title} v${data.site_version}`,
        );

        // Update innerHTML of the <code> tag
        const codeTag = btnVersionBlog.querySelector("code");
        codeTag.innerHTML = `v${data.site_version}`;

        // Check for the presence of the PLACEHOLDER and update the HTML comment
        if (updateComment(data.site_version)) {
          console.log("Comment updated successfully.");
        } else {
          console.log("Placeholder comment not found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching config.json:", error);
      });
  }
});
