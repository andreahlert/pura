export default {
  "description": "Pagination is a native web component that renders pagination controls: a Previous button, page numbers with ellipsis truncation (first, last, current, and neighbors), and a Next button. Use it when you need to split long lists or tables into pages. When a page is clicked, it fires the change event and updates the page attribute automatically.",
  "demoHTML": "<pura-pagination id=\"paginacao\" total=\"10\" page=\"3\"></pura-pagination>\n\n<script type=\"module\">\n  const paginacao = document.getElementById(\"paginacao\");\n  paginacao.addEventListener(\"change\", (e) => {\n    console.log(\"Selected page:\", e.detail.page);\n  });\n</script>",
  "usage": "<pura-pagination id=\"paginacao\" total=\"10\" page=\"3\"></pura-pagination>\n\n<script type=\"module\">\n  const paginacao = document.getElementById(\"paginacao\");\n  paginacao.addEventListener(\"change\", (e) => {\n    console.log(\"Selected page:\", e.detail.page);\n  });\n</script>"
};
