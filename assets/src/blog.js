document.addEventListener("DOMContentLoaded", function () {
  const btnVersionBlog = document.getElementById("btn-version-blog");

  // Only proceed if the btn-version-blog element is found
  if (btnVersionBlog) {
    fetch("https://luiscarlospando.com/config.json")
      .then((response) => response.json())
      .then((data) => {
        // Update href attribute with site_url
        btnVersionBlog.href = data.site_url;

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
      })
      .catch((error) => {
        console.error("Error fetching config.json:", error);
      });
  }
});
