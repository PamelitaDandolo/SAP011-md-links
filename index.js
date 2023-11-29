// importação do file system que é a biblioteca nativa do node.js, não é necessário fazer instalação
const fs = require('fs'); // file system é o sistema de arquivos que o Node dá cobertura, ler linhas, diretórios, estatísticas
// leitura do arquivo
// validação dos links
function mdLinks(caminhoDoArquivo) {
  return new Promise((resolve, reject) => { // promessa, função de callback
    fs.readFile(caminhoDoArquivo, 'utf8', (err, data) => { // o arquivo deve ser lido
      if (err) reject(err); // se tiver erro, chama o reject
      const pattern = /\[([^\]]+)\]\((https?[^)]+)\)/g; // regex vai ajudar a extrair os links, padrão de caracteres
      const matches = [...data.matchAll(pattern)];
      resolve(matches); // se der certo, chama o resolve
    });
  });
}

mdLinks('./README.md').then((result) => console.log(result));

module.exports = { mdLinks };
