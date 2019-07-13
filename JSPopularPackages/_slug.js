const slug = require("slug");

function slugify(words) {
  return slug(words, { lower: true, replacement: "_" });
}

console.log(slugify("Blog Post One"));
