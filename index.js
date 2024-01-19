import('inquirer').then((inquirerModule) => {
  const { default: inquirer } = inquirerModule;
  import('fs').then(async (fsModule) => {
    const fs = fsModule.default.promises;

    function getUserInput() {
      return inquirer.prompt([
        {
          type: 'input',
          name: 'text',
          message: 'Enter up to three characters:',
          validate: (input) => /^[a-zA-Z0-9]{1,3}$/.test(input),
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

    async function generateLogo() {
      try {
        const userInput = await getUserInput();

        let shapeElement;

        switch (userInput.shape) {
          case 'circle':
            shapeElement = `<circle cx="150" cy="100" r="50" fill="${userInput.shapeColor}" />`;
            break;
          case 'triangle':
            shapeElement = `<polygon points="150,50 100,150 200,150" fill="${userInput.shapeColor}" />`;
            break;
          case 'square':
            shapeElement = `<rect x="100" y="50" width="100" height="100" fill="${userInput.shapeColor}" />`;
            break;
          default:
            throw new Error('Invalid shape selected');
        }

        const svgContent = `
          <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            ${shapeElement}
            <text x="150" y="100" fill="${userInput.textColor}" text-anchor="middle" alignment-baseline="middle" font-size="20">
              ${userInput.text}
            </text>
          </svg>
        `;

        await fs.writeFile('logo.svg', svgContent);
        console.log('Generated logo.svg');
      } catch (error) {
        console.error('Error generating logo:', error.message);
      }
    }

    generateLogo();
  });
});
