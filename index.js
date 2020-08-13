// List out my NPM dependencies and require them
var inquirer = require("inquirer");
var fs = require("fs");
var axios = require("axios");

// I will need an inquirer .prompt function here

inquirer
  .prompt({
    message: "Please input your GitHub username:",
    name: "username",
  })
  .then(function ({ username }) {
    // Grabbing the github api
    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(function (res) {
      const githubAvatar = res.data.avatar_url;
      console.log(`Your GitHub Avatar: ${githubAvatar}`);

      // inquirer .prompt function that will hold my object arrays
      inquirer
        .prompt([
          {
            type: "input",
            message: "Input Github username again, we just want to be sure :)",
            name: "user",
          },
          {
            type: "input",
            message: "Input email address here.",
            name: "email",
          },
          {
            type: "input",
            message: "Input title here.",
            name: "title",
          },
          {
            type: "input",
            message: "Input description here.",
            name: "description",
          },
          {
            type: "input",
            message: "Input table of contents here.",
            name: "tableOfContents",
          },
          {
            type: "input",
            message: "Input installation instructions here.",
            name: "installation",
          },
          {
            type: "input",
            message: "Input usage information here.",
            name: "usage",
          },
          {
            type: "list",
            message: "Please choose a liscense option from the list.",
            name: "liscense",
            choices: ["MIT", "APACHE", "GPL", "none"]
        
          },
          {
            type: "input",
            message: "Input contributer guidelines here.",
            name: "contributers",
          },
          {
            type: "input",
            message: "Input test instructions here.",
            name: "tests",
          },
          {
            type: "input",
            message: "Input questions here.",
            name: "questions",
          },
        ])

        // Fulfill the .then promise given in the .prompt function
        .then((answer) => {

          // Let user create their desired README name
          const nameFile = answer.title.toLowerCase().split(' ').join('') + "_README.md";

          // Incorporate badges
          let badge;
          const badgeFunction = answer => {
              if (answer.license === "MIT") {
                  badge = "![License](https://img.shields.io/badge/License-MIT-yellow.svg)";
              } else if (answer.license === "APACHE") {
                  badge = "![License](https://img.shields.io/badge/License-Apache-blueviolet.svg)";
              } else if (answer.license === "GPL") {
                  badge = "![License](https://img.shields.io/badge/License-GPL-important.svg)";
              } else {
                  badge = "";
              }
          }
          badgeFunction(answer);

            // Use back tick notation to print our inputs
          const readmeContent = `# ${answer.title}

${badge}

## Description
- ${answer.description}

## Table of Contents
- ${answer.tableOfContents}

## Installation
- ${answer.installation}

## Usage
- ${answer.usage}

## Liscense
- ${answer.liscense}

## Contributer
- ${answer.contributers}

## Tests
- ${answer.tests}

## Questions
${answer.questions}
- Feel free to send me an email regarding this project or with any questions at: ${answer.email}
- To view my Github profile please click here: https://github.com/${answer.user}
- User Avatar: ${githubAvatar}`;

fs.writeFile(nameFile, readmeContent, function (err) {
  if (err) {
      console.log(err);
  }
  console.log("Success!")
})
          });
        });
      });