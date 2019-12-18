(function() {

  /* UTILS */
  function normalize(str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    /* 
      remove os acentos duma string.

      - recebe uma string

      - converte a string para minúsculas com o método .toLowerCase()
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase

      - normaliza caracteres em diferentes línguas com o método .normalize()
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize

      - com o método .replace(), substitui os acentos pelo caracter equivalente sem acento.
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
    */
  }

  function slugify(str) {
    return normalize(str).replace(/[\s_-]+/g, '-');
    /*
      converte uma string para um slug (url amigável)

      - recebe uma string
      - normaliza a string com a função normalize já existente
      - substitui espaços, underscores e hífens repetidos por um só hível.
      - devolve uma string em minúsculas e sem acentos separadas por hívens para usar como endereço amigável
    */
  }

  /* VARIABLES */
  var products = [
    {
      "name": "Girafa em Betão Armado",
      "image": "assets/images/animais.jpg",
      "stock": 7,
    },
    {
      "name": "Campânula",
      "image": "assets/images/campanula.jpg",
      "stock": 6,
    },
    {
      "name": "Tabuleiro de Madeira",
      "image": "assets/images/tabuleiro1.jpg",
      "stock": 17,

    },
    {
      "name": "Candeeiro",
      "image": "assets/images/lamp.jpg",
      "stock": 7,
    },
    {
      "name": "Quadro",
      "image": "assets/images/quadro.jpg",
      "stock": 2,
    },
    {
      "name": "Tabuleiro",
      "image": "assets/images/tabuleiro2.jpg",
      "stock": 0,
    },
    {
      "name": "Spoon Bag",
      "image": "assets/images/spoonbag.jpg",
      "stock": 5,
    },
    {
      "name": "Cesto",
      "image": "assets/images/cesto.jpg",
      "stock": 4,
    }
  ],
  productsList = document.querySelector('#products ul');
  searchInput = document.querySelector('.search input'),
  dateRange = document.querySelector('.date-range'),
  now = new Date(),
  startDate = new Date(1979, 0, 1),
  endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);

  /* METHODS */
  function renderProduct(item) {
    return [
      '<li>',
        '<a href="products/' + slugify(item.name) + '">',
          '<figure class="ratio ratio-1by1">',
            '<img src="' + item.image + '" alt="' + item.name + '" aria-hidden="true">' +
          '</figure>',
          '<h2>' + item.name + '</h2>',
        '</a>',
      '</li>',
    ].join('');
  }

  function renderProducts(list) {
    productsList.innerHTML = list.map(renderProduct).join('');
  }

  function searchProducts(evt) {
    var searchResults = products.filter(function(product) { // devolve um novo array filtrado
      /* 
        return product.name.indexOf(value) > -1;
        problema: é case-sensitive.

        return product.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
        problema: é case-insensitive mas é diacritic-sensitive (acentos);
      */
      return normalize(product.name).indexOf(normalize(evt.target.value)) > -1;
      /*
        ver a função normalize() no topo do ficheiro.
        nota: também é possível validar com o método .includes() em vez de indexOf() > -1;
      */
    });
    renderProducts(searchResults);
  }

  function setCopyright() {
    dateRange.innerHTML = [
      '<time datetime="' + startDate.toISOString() + '">' + startDate.getFullYear() + '</time>',
      '-',
      '<time datetime="' + endDate.toISOString() + '">' + endDate.getFullYear() + '</time>',
    ].join(' ');
  }

  /* EVENT LISTENERS */
  searchInput.addEventListener('input', searchProducts);

  /* INIT */
  renderProducts(products);
  setCopyright();

})();