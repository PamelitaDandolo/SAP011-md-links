const { mdLinks, linksValidados } = require('./index.js');

// função mdLinks
describe('mdLinks', () => {
  it('é uma função', () => {
    expect(typeof mdLinks).toBe('function');
  });
});

describe('linksValidados', () => {
  it('Deve retornar os resultados de validação dos links', () => {
    const links = [
      { href: 'https://developer.mozilla.org', text: 'MDN', file: './oneFile.md' },
      { href: 'https://www.laboratoria.la/br', text: 'Laboratória', file: './files/links.md' },
      { href: 'https://developer.mozilla.org/pt-BR', text: 'MND', file: './files/links.md' },
    ];
  });
});
