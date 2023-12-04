const { mdLinks } = require('./index.js');

// reconhece que é uma função
describe('mdLinks', () => {
  it('deveria ser uma função', () => {
    expect(typeof mdLinks).toBe('function');
  });
});

// extrai links sem validação quando false
describe('mdLinks', () => {
 // rejeitar caso arquivo não exista
  it('deveria retornar erro caso arquivo não exista', () => {
    return mdLinks('./oneFile1.md', { validate: false }).catch((links) => {
      expect(links).toBeDefined()
    });
  });

  // exraie link com exibição simples
  it('deveria retornar links extraídos sem validação quando validate for false', () => {
    return mdLinks('./oneFile.md', { validate: false }).then((links) => {
      expect(links).toStrictEqual([
        { href: 'https://developer.mozilla.org//pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/', text: 'Array - MDN', file: './oneFile.md' },
        { href: 'https://www.pamelitadandolo.com.br', text: 'pamelita', file: './oneFile.md'},
        { href: 'https://blablabla', text: 'blablabla', file: './oneFile.md' },
      ]);
    });
  });

  // extrai links com validação quando validate true
  it('deveria retornar links extraídos com validação quando validate for true', () => {
    global.fetch = jest.fn(() => Promise.resolve ({
      status: 200 // teste usando mocks em caso de sucesso
    }));
    return mdLinks('./oneFile.md', { validate: true }).then((links) => {
      expect(links).toStrictEqual([
        { href: 'https://developer.mozilla.org//pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/', text: 'Array - MDN', file: './oneFile.md', status: 200, ok: 'ok' },
        { href: 'https://www.pamelitadandolo.com.br', text: 'pamelita', file: './oneFile.md', status: 200, ok: 'ok' },
        { href: 'https://blablabla', text: 'blablabla', file: './oneFile.md', status: 200, ok: 'ok' },
      ]);
    });
  });
  
  //Promise sendo resolvida
it('deveria retornar links extraídos com validação quando validate for true', () => {
  global.fetch = jest.fn(() => Promise.resolve ({
    status: 404 // teste usando mocks em caso de falha ao encontrar link
  }));
  return mdLinks('./oneFile.md', { validate: true }).then((links) => {
    expect(links).toStrictEqual([
      { href: 'https://developer.mozilla.org//pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/', text: 'Array - MDN', file: './oneFile.md', status: 404, ok: 'fail' },
      { href: 'https://www.pamelitadandolo.com.br', text: 'pamelita', file: './oneFile.md', status: 404, ok: 'fail' },
      { href: 'https://blablabla', text: 'blablabla', file: './oneFile.md', status: 404, ok: 'fail' },
    ]);
  });
});

  //Promise sendo rejeitada
  it('deveria retornar links extraídos com validação quando validate for true', () => {
    global.fetch = jest.fn(() => Promise.reject ({}));
    return mdLinks('./oneFile.md', { validate: true }).then((links) => {
      expect(links).toStrictEqual([
        { href: 'https://developer.mozilla.org//pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/', text: 'Array - MDN', file: './oneFile.md', status: 'ENOTFOUND', ok: 'fail' },
        { href: 'https://www.pamelitadandolo.com.br', text: 'pamelita', file: './oneFile.md', status: 'ENOTFOUND', ok: 'fail' },
        { href: 'https://blablabla', text: 'blablabla', file: './oneFile.md', status: 'ENOTFOUND', ok: 'fail' },
      ]);
    });
  });

});


// mais um teste de validação, este do index.js
describe('linksValidados', () => {
  it('Deve retornar os resultados de validação dos links', () => {
    const links = [
      { href: 'https://developer.mozilla.org', text: 'MDN', file: './oneFile.md' },
      { href: 'https://www.laboratoria.la/br', text: 'Laboratória', file: './files/links.md' },
      { href: 'https://developer.mozilla.org/pt-BR', text: 'MND', file: './files/links.md' },
    ];
  });
});
