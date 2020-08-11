// Since this is a CLI app (command line input) we need to also incorporate a CLI module
var cli = require ('./cli-module');
const generateReadme = cli.generateReadme;

// List out my NPM dependencies and require them
var inquirer = require('inquirer');
var fs = require('fs');
var axios = require('axios');

// I will need an inquirer .prompt function here

inquirer
  .prompt({
    message: "Please input your GitHub username:",
    name: "username"
  })
  .then(function({ username }) {
    // Grabbing the github api
    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(function(res) {
      const githubAvitar = res.data.avatar_url;
      console.log(`Your GitHub Avitar: ${githubAvitar}`);
      const githubEmail = res.data.email;
      console.log(`Your GitHub email: ${githubEmail}`);

      // inquirer .prompt function that will hold my object arrays
      inquirer
      .prompt([
          {
              type: "input",
              message: "Input title here.",
              name: "title"
          },
          {
              type: "input",
              message: "Input description here.",
              name: "description"
          },
          {
              type: "input",
              message: "Input table of contents here.",
              name: "tableOfContents"
          },
          {
              type: "input",
              message: "Input installation here.",
              name: "installation"
          },
          {
              type: "input",
              message: "Input usage here.",
              name: "usage"
          },
          {
              type: "input",
              message: "Input liscense here.",
              name: "liscense"
          },
          {
              type: "input",
              message: "Input contributers here.",
              name: "contributers"
          },
          {
              type: "input",
              message: "Input tests here.",
              name: "tests"
          },
          {
              type: "input",
              message: "Input questions here.",
              name: "questions"
          }
    ])
});
});

// Then send everything to the readme via an fs.appendFile function
    // Make sure to use ## tags to format the readme properly
    // Use back tick notation with ${randomStuff} syntax