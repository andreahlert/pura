export default {
  "description": "The Skeleton Text renders N animated (shimmer) lines, with the last one shorter, to mimic a paragraph while the real content is still loading. Use it during data fetching or hydration to reduce the sense of waiting. It marks aria-busy=\"true\" on the host and hides the decorative lines from screen readers (aria-hidden), respecting prefers-reduced-motion by swapping the shimmer for a soft pulse.",
  "demoHTML": "<div style=\"max-width: 360px; display: flex; flex-direction: column; gap: 24px;\">\n  <pura-skeleton-text lines=\"3\"></pura-skeleton-text>\n  <pura-skeleton-text lines=\"5\" gap=\"12px\" last=\"40%\"></pura-skeleton-text>\n</div>",
  "usage": "<pura-skeleton-text lines=\"3\"></pura-skeleton-text>\n\n<pura-skeleton-text lines=\"5\" gap=\"12px\" last=\"40%\"></pura-skeleton-text>"
};
