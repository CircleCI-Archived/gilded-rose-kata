var bs = require("browser-sync").create();

bs.init({
    server: "./src",
    files: ["./src/**/*"]
});
