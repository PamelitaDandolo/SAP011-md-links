// importação do file system que é a biblioteca nativa do node.js, não é necessário fazer instalação
const fs = require('fs'); // file system é o sistema de arquivos que o Node dá cobertura, ler linhas, diretórios, estatísticas
// leitura do arquivo
// validação dos links
function mdLinks(caminhoDoArquivo, options) {
  return new Promise((resolve, reject) => { // promessa, função de callback
    fs.readFile(caminhoDoArquivo, 'utf8', (err, data) => { // o arquivo deve ser lido
      if (err) reject(err); // se tiver erro, chama o reject
      const pattern = /\[([^\]]+)\]\((https?[^)]+)\)/g; // regex vai ajudar a extrair os links, padrão de caracteres
      const matches = [...data.matchAll(pattern)];
      const links = matches.map((match) => {
        return {
          href: match[2],
          text: match[1],
          file: caminhoDoArquivo,
        };
      });
      if (options.validate === false) {
        resolve(links); // se der certo, chama o resolve
      } else {
        const linksValidados = links.map((link) => {
          return fetch(link.href)
            .then((response) => {
              link.status = response.status;
              if (responde.status >= 200 && response.status <= 299) {
                link.ok = 'ok';
              } else {
                link.ok = 'fail';
              }
              return link;
            }
            ).catch((err) => {
              link.ok = 'fail';
              link.status = 'ENOTFOUND';
              return link;
            }
            );
        });
        resolve(Promise.all(linksValidados));
      }
    });
  });
}

mdLinks('./README.md', { validate: true }).then(result => console.log(result));

module.exports = { mdLinks };
