#!/usr/bin/env node
// em sistemas *nix este script será interpretado utilizando node
// tudo que for console.log manter no cli.js porque aqui é como manipulação de dom
const fs = require('fs');
const chalk = require('chalk');
const { mdLinks } = require('./index.js');
// const cliValidate = 

// criação da CLI
// const argv = 

mdLinks('./test/files/oneFile.md')
  .then((conteudoDoArquivo) => {
    console.log(chalk.bgYellow(conteudoDoArquivo));
  });

console.log('minha cli em nodejs');