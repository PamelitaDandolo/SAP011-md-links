// importação do file system que é a biblioteca nativa do node.js, não é necessário fazer instalação
// file system é o sistema de arquivos que o Node dá cobertura, ler linhas, diretórios, estatísticas
const fs = require('fs');

function mdLinks(caminhoDoArquivo, options) {
  return new Promise((resolve, reject) => {
    fs.readFile(caminhoDoArquivo, 'utf8', (err, data) => { // data é o conteúdo de texto
      if (err) reject(err); // se tiver erro, chama o reject
      const regex = /\[([^\]]+)\]\((https?[^)]+)\)/g;
      let match;
      const links = [];
      while ((match = regex.exec(data)) !== null) { // loop
        links.push({
          href: match[2],
          text: match[1],
          file: caminhoDoArquivo,

        });
      }

      if (options.validate === false) {
        resolve(links); // se der certo, chama o resolve
      } else {
        const linksValidados = links.map((link) => fetch(link.href)
          .then((response) => { // then é o "resolve da promise"
            const linkValidado = { ...link };
            linkValidado.status = response.status;
            if (response.status >= 200 && response.status <= 299) { // status code
              linkValidado.ok = 'ok';
            } else {
              linkValidado.ok = 'fail';
            }
            return linkValidado;
          })
          .catch(() => {
            const linkValidado = { ...link };
            linkValidado.ok = 'fail';
            linkValidado.status = 'ENOTFOUND';
            return linkValidado;
          }));
        resolve(Promise.all(linksValidados));
      }
    });
  });
}

mdLinks('./oneFile.md', { validate: true }).then((result) => console.log(result));

module.exports = { mdLinks };
