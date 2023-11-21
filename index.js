// importação do file system que é a biblioteca nativa do node.js, não é necessário fazer instalação
const fs = require('fs');

function soma(a, b) {
  return a + b;
}
// leitura do arquivo
// validação dos links
function lerArquivo(caminhoDoArquivo) {
  return new Promise((resolve, reject) => {
    fs.readFile(caminhoDoArquivo, 'utf8', (err, data) => {
      if (err) reject(err); // se tiver erro, lançar o erro

      resolve(data); // parâmetro data é onde está o conteúdo do arquivo
    });
  });
}

module.exports = { soma, lerArquivo };
