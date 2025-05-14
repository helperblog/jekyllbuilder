const configEditor = document.getElementById("configEditor");
const indexEditor = document.getElementById("indexEditor");
const aboutEditor = document.getElementById("aboutEditor");
const postEditor = document.getElementById("postEditor");
const styleEditor = document.getElementById("styleEditor");
const previewFrame = document.getElementById("preview");

// Default themes
const themes = {
  blog: {
    config: `title: My Blog
description: A simple blog powered by Jekyll
author: Your Name
theme: minima
baseurl: ""
url: "https://yourusername.github.io"`,
    index: `---
layout: default
title: Home
---

# Welcome to My Blog

This is a static site built using Jekyll and GitHub Pages.`,
    about: `---
layout: default
title: About
---

## About Me

This is the about page of your new Jekyll site.`,
    post: `---
layout: post
title: "Welcome Post"
date: 2025-05-14
---

Hello! This is your first Jekyll blog post.`,
    style: `body {
  font-family: sans-serif;
  color: #333;
  background: #fff;
}
h1 {
  color: #2c3e50;
}`
  },

  portfolio: {
    config: `title: My Portfolio
description: Showcase your work with Jekyll
author: Developer
theme: jekyll-theme-cayman
baseurl: ""
url: "https://yourusername.github.io"`,
    index: `---
layout: default
title: Home
---

# Welcome to My Portfolio

Highlight your projects and skills here.`,
    about: `---
layout: default
title: About
---

## About Me

Write a few lines about yourself and your skills.`,
    post: `---
layout: post
title: "First Portfolio Post"
date: 2025-05-14
---

This is your first portfolio update using Jekyll.`,
    style: `body {
  font-family: serif;
  background-color: #f2f2f2;
  color: #222;
}
h1 {
  color: #008080;
}`
  }
};

function loadTheme() {
  const selected = document.getElementById("theme").value;
  const t = themes[selected];
  configEditor.value = t.config;
  indexEditor.value = t.index;
  aboutEditor.value = t.about;
  postEditor.value = t.post;
  styleEditor.value = t.style;
  updatePreview();
}

function updatePreview() {
  const converter = new showdown.Converter();
  const html = converter.makeHtml(indexEditor.value);
  previewFrame.srcdoc = `
    <html>
      <head><style>${styleEditor.value}</style></head>
      <body>${html}</body>
    </html>`;
}

// Update preview on input
[indexEditor, styleEditor].forEach(el =>
  el.addEventListener("input", updatePreview)
);

function downloadSite() {
  const zip = new JSZip();

  zip.file("_config.yml", configEditor.value);
  zip.file("index.md", indexEditor.value);
  zip.file("about.md", aboutEditor.value);
  zip.file("_posts/2025-05-14-welcome.md", postEditor.value);
  zip.file("assets/style.css", styleEditor.value);

  zip.generateAsync({ type: "blob" }).then(function (content) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(content);
    a.download = "jekyll-site.zip";
    a.click();
  });
}

// Load default theme on start
window.onload = loadTheme;

