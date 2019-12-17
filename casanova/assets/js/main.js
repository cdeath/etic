(function() {

  /* UTILS */
  function normalize(str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function slugify(str) {
    return normalize(str).replace(/[\s_-]/g, '-');
  }

  /* VARIABLES */
  var products = [
    {
      "name": "Girafa em Betão Armado",
      "image": "assets/images/animais.jpg",
      "stock": 7
    },
    {
      "name": "Campânula",
      "image": "assets/images/campanula.jpg",
      "stock": 6
    },
    {
      "name": "Tabuleiro de Madeira",
      "image": "assets/images/tabuleiro1.jpg",
      "stock": 17,

    },
    {
      "name": "Candeeiro",
      "image": "assets/images/lamp.jpg",
      "stock": 7
    },
    {
      "name": "Quadro",
      "image": "assets/images/quadro.jpg",
      "stock": 2
    },
    {
      "name": "Tabuleiro",
      "image": "assets/images/tabuleiro2.jpg",
      "stock": 0
    },
    {
      "name": "Spoon Bag",
      "image": "assets/images/spoonbag.jpg",
      "stock": 5
    },
    {
      "name": "Cesto",
      "image": "assets/images/cesto.jpg",
      "stock": 4
    }
  ],
  productsList = document.querySelector('#products ul');
  searchInput = document.querySelector('.search input'),
  dateRange = document.querySelector('.date-range'),
  now = new Date(),
  startDate = new Date(1979, 0, 1),
  endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);

  /* METHODS */
  function renderProduct(product) {
    return [
      '<li>',
        '<a href="products/' + slugify(product.name) + '">',
          '<figure class="ratio ratio-1by1">',
            '<img src="' + product.image + '" alt="' + product.name + '" aria-hidden="true">' +
          '</figure>',
          '<h2>' + product.name + '</h2>',
        '</a>',
      '</li>',
    ].join('');
  }

  function searchProducts(evt) {
    var value = evt.target.value;
    productsList.innerHTML = products.filter(function (product) {
      /* 
        return product.name.indexOf(value) > -1;
        não serve porque é case-sensitive.

        return product.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
        é case-insensitive mas não serve porque é é diacritic-sensitive.
      */
      return normalize(product.name).indexOf(normalize(value)) > -1;
      /* o utilitário normalize converte tudo para minúsculas e substitui os acentos */
    }).map(renderProduct).join('');
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
  productsList.innerHTML = products.map(renderProduct).join('');
  setCopyright();

})();