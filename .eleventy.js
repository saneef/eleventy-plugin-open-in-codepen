// Example use:
// {% postToCodepen "Pen Title", page.url, css, html %}

module.exports = (eleventyConfig, options) => {
  // Define defaults for your plugin config
  const defaults = {
    siteUrl: "https://codesampledomain.dev",
    siteTitle: "Example Site",
    siteTag: "codesampledomain",
    buttonText: "Open in CodePen",
    buttonClass: "open-in-codepen-button",
    buttonIconClass: "open-in-codepen-icon",
    preDemoCSS: `/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p {
  margin: 0;
}

/* Set core body defaults */
body {
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  font-family: system-ui, sans-serif;
}

/* Make images easier to work with */
img {
  display: block;
  max-width: 100%;
}`,
  };

  eleventyConfig.addShortcode("postToCodepen", (title, slug, css, html) => {
    const {
      siteUrl,
      siteTitle,
      siteTag,
      buttonText,
      preDemoCSS,
      buttonClass,
      buttonIconClass,
    } = {
      ...defaults,
      ...options,
    };

    const description = `Generated from: ${siteUrl}${slug}`;
    const snippetComment = `/***\n 🟣 ${siteTitle} Demo Styles\n */`;
    const baseCSS = css ? `\n${css}` : "";
    let cssCode = `${preDemoCSS}\n\n${snippetComment}${baseCSS}`;

    const penAttributes = {
      title: `${siteTitle} - ${title}`,
      description: description,
      tags: [siteTag],
      editors: "110",
      layout: "left",
      html: `<!-- ${siteTitle} - ${title}\n${description} -->${html}`,
      html_pre_processor: "none",
      css: cssCode,
      css_pre_processor: "scss",
      css_starter: "neither",
      css_prefix: "autoprefixer",
      head:
        "<meta name='viewport' content='width=device-width, initial-scale=1'>",
    };
    const JSONstring = JSON.stringify(penAttributes)
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

    return `<form action="https://codepen.io/pen/define" method="POST" target="_blank">
        <input type="hidden" name="data" value="${JSONstring}">
        <button class="${buttonClass}" type="submit" data-name="${title}" aria-label="Open ${title} in CodePen"><span class="${buttonIconClass}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" focusable="false">
      <path d="M32 10.909l-0.024-0.116-0.023-0.067c-0.013-0.032-0.024-0.067-0.040-0.1-0.004-0.024-0.020-0.045-0.027-0.067l-0.047-0.089-0.040-0.067-0.059-0.080-0.061-0.060-0.080-0.060-0.061-0.040-0.080-0.059-0.059-0.053-0.020-0.027-14.607-9.772c-0.463-0.309-1.061-0.309-1.523 0l-14.805 9.883-0.051 0.053-0.067 0.075-0.049 0.060-0.067 0.080c-0.027 0.023-0.040 0.040-0.040 0.061l-0.067 0.080-0.027 0.080c-0.027 0.013-0.027 0.053-0.040 0.093l-0.013 0.067c-0.025 0.041-0.025 0.081-0.025 0.121v9.996c0 0.059 0.004 0.12 0.013 0.18l0.013 0.061c0.007 0.040 0.013 0.080 0.027 0.115l0.020 0.067c0.013 0.036 0.021 0.071 0.036 0.1l0.029 0.067c0 0.013 0.020 0.053 0.040 0.080l0.040 0.053c0.020 0.013 0.040 0.053 0.060 0.080l0.040 0.053 0.053 0.053c0.013 0.017 0.013 0.040 0.040 0.040l0.080 0.056 0.053 0.040 0.013 0.019 14.627 9.773c0.219 0.16 0.5 0.217 0.76 0.217s0.52-0.080 0.76-0.24l14.877-9.875 0.069-0.077 0.044-0.060 0.053-0.080 0.040-0.067 0.040-0.093 0.021-0.069 0.040-0.103 0.020-0.060 0.040-0.107v-10c0-0.067 0-0.127-0.021-0.187l-0.019-0.060 0.059 0.004zM16.013 19.283l-4.867-3.253 4.867-3.256 4.867 3.253-4.867 3.253zM14.635 10.384l-5.964 3.987-4.817-3.221 10.781-7.187v6.424zM6.195 16.028l-3.443 2.307v-4.601l3.443 2.301zM8.671 17.695l5.964 3.987v6.427l-10.781-7.188 4.824-3.223v-0.005zM17.387 21.681l5.965-3.973 4.817 3.227-10.783 7.187v-6.427zM25.827 16.041l3.444-2.293v4.608l-3.444-2.307zM23.353 14.388l-5.964-3.988v-6.44l10.78 7.187-4.816 3.224z"></path>
    </svg></span> ${buttonText}</button>
        </form>`;
  });
};
