// importação do file system que é a biblioteca nativa do node.js, não é necessário fazer instalação
const fs = require('fs'); // file system é o sistema de arquivos que o Node dá cobertura, ler linhas, diretórios, estatísticas
// leitura do arquivo
// validação dos links
function mdLinks(caminhoDoArquivo, options) {
  return new Promise((resolve, reject) => { // promessa, função de callback
    fs.readFile(caminhoDoArquivo, 'utf8', (err, data) => { // o arquivo deve ser lido
      if (err) reject(err); // se tiver erro, chama o reject
      const pattern = /\[([^\]]+)\]\((https?[^)]+)\)/g; // regex vai ajudar a extrair os links, padrão de caracteres
      let match;
      const links = [];
      while ((match = pattern.exec(data)) !== null) {
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
          .then((response) => {
            const linkValidado = { ...link };
            linkValidado.status = response.status;
            if (response.status >= 200 && response.status <= 299) {
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
