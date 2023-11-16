// tudo que for console.log manter no cli.js porque aqui é como manipulação de dom
// aqui é manipulação de tela

const { soma, lerArquivo } = require('./index.js');
const chalk = require('chalk');

const resultado = soma(1, 3);

console.log(chalk.bgYellow("A soma é: "),chalk.yellow(resultado));

lerArquivo('./test/files/oneFile.md');

