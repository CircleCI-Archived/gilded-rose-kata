const fs = require("fs");
const path = require("path");

const {Item, update_quality} = require('./src/gilded_rose');

if (process.argv.length < 3) {
  console.warn("Usage: node runner.js <in-file> <out-file>");
  process.exit(1);
}

const inFile = process.argv[2];
const outFile = process.argv[3];

console.warn("Reading from %s, writing to %s", inFile, outFile);

function parseItem(line) {
  var [name, sell_in, quality] = line.split("__");
  return new Item(name, Number(sell_in), Number(quality));
}
function unparseItem(item) {
  return [item.name, item.sell_in, item.quality].join("__");
}

const items = fs.readFileSync(inFile, "utf8")
  .split("\n")
  .map(l => l.trim())
  .filter(l => l && !l.startsWith(";"))
  .map(parseItem);

const output = update_quality(items)
  .map(unparseItem)
  .join("\n");

fs.mkdirSync(path.dirname(outFile), {recursive: true});
fs.writeFileSync(outFile, output);
