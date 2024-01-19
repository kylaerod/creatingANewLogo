// Use dynamic import for inquirer
import('inquirer').then(inquirerModule => {
  const inquirer = inquirerModule.default;

  const fs = require('fs');

  function getUserInput() {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'text',
        message: 'Enter up to three characters:',
        validate: input => /^[a-zA-Z0-9]{1,3}$/.test(input),
      },
      {
        type: 'input',
        name: 'textColor',
        message: 'Enter text color (keyword or hexadecimal):',
      },
      {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape:',
        choices: ['circle', 'triangle', 'square'],
      },
      {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter shape color (keyword or hexadecimal):',
      },
    ]);
  }

  function generateLogo() {
    getUserInput().then(userInput => {
      const svgContent = `
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          <${userInput.shape} cx="150" cy="100" r="50" fill="${userInput.shapeColor}" />
          <text x="150" y="100" fill="${userInput.textColor}" text-anchor="middle" alignment-baseline="middle" font-size="20">
            ${userInput.text}
          </text>
        </svg>
      `;

      fs.writeFileSync('logo.svg', svgContent);
      console.log('Generated logo.svg');
    }).catch(error => {
      console.error('Error generating logo:', error.message);
    });
  }

  generateLogo();
});
