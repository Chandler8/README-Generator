// write out the CLI module here
var fs = require('fs');

// export the module to our index.js file for usage
module.exports = {
    generateReadme: () => {
        fs.writeFile("README1.md",'', function(err) {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Success!");
        }
        });
    }
};