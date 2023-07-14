// Llamar a la función para obtener todas las cervezas al cargar la página

window.onload = function() {
  // Obtener el nombre de la página actual
  var currentPage = window.location.pathname;

  // Verificar si la página actual no es "compra.html" ni "contacto.html"
  if (currentPage.indexOf("compra.html") === -1 && currentPage.indexOf("contacto.html") === -1) {
    // Llamar a la función "inicio"
    inicio();
  }
}
var shoppingCart = [];

function getAllCervezas() {
  fetch("https://b4you.free.mockoapp.net/beers")
    .then((resp) => {
      return resp.json();
    })
    .then((cervezasArray) => {
      let productos = document.getElementById("productos");
      cervezasArray.forEach((cerveza) => {
        var div = document.createElement("div");
        div.id = "producto-div";

        var title = document.createElement("h3");
        title.innerHTML = cerveza.title;

        var img = document.createElement("img");
        img.src = cerveza.image;

        var description = document.createElement("p");
        description.innerHTML = cerveza.description;

        var divPrice = document.createElement("div");
        divPrice.id = "divPrice";

        var price = document.createElement("p");
        price.id = "price";
        price.innerHTML = "Precio: $";

        var priceValue = document.createElement("p");
        priceValue.id = "priceValue";
        priceValue.innerHTML = cerveza.price;

        var divStock = document.createElement("div");
        divStock.id = "divStock";

        var stock = document.createElement("p");
        stock.id = "stock";
        stock.innerHTML = "Stock: ";

        var quantity = document.createElement("p");
        quantity.id = "stockQuantity";
        quantity.innerHTML = cerveza.quantity;

        var button = document.createElement("button");
        button.classList.add("addButton");
        button.innerHTML = "Agregar";

        divPrice.appendChild(price);
        divPrice.appendChild(priceValue);

        divStock.appendChild(stock);
        divStock.appendChild(quantity);

        div.appendChild(title);
        div.appendChild(img);
        div.appendChild(description);
        div.appendChild(divPrice);
        div.appendChild(divStock);
        div.appendChild(button);

        productos.appendChild(div);
      });

      // Agregar evento de clic a los botones de agregar cerveza
      var addButtons = document.getElementsByClassName("addButton");
      for (var i = 0; i < addButtons.length; i++) {
        addButtons[i].addEventListener("click", addToCart);
      }
    });
}

function getAllCervezasByCategory(categoryId) {
  fetch("https://b4you.free.mockoapp.net/beers")
    .then((resp) => resp.json())
    .then((cervezasArray) => {
      let productos = document.getElementById("productos");
      productos.innerHTML = "";

      const filteredCervezas = cervezasArray.filter(
        (cerveza) => cerveza.category_id == categoryId
      );

      filteredCervezas.forEach((cerveza) => {
        var div = document.createElement("div");
        div.id = "producto-div";

        var title = document.createElement("h3");
        title.innerHTML = cerveza.title;

        var img = document.createElement("img");
        img.src = cerveza.image;

        var description = document.createElement("p");
        description.innerHTML = cerveza.description;

        var divPrice = document.createElement("div");
        divPrice.id = "divPrice";

        var price = document.createElement("p");
        price.id = "price";
        price.innerHTML = "Precio: $";

        var priceValue = document.createElement("p");
        priceValue.id = "priceValue";
        priceValue.innerHTML = cerveza.price;

        var divStock = document.createElement("div");
        divStock.id = "divStock";

        var stock = document.createElement("p");
        stock.id = "stock";
        stock.innerHTML = "Stock: ";

        var quantity = document.createElement("p");
        quantity.id = "stockQuantity";
        quantity.innerHTML = cerveza.quantity;

        var button = document.createElement("button");
        button.classList.add("addButton");
        button.innerHTML = "Agregar";

        divPrice.appendChild(price);
        divPrice.appendChild(priceValue);

        divStock.appendChild(stock);
        divStock.appendChild(quantity);

        div.appendChild(title);
        div.appendChild(img);
        div.appendChild(description);
        div.appendChild(divPrice);
        div.appendChild(divStock);
        div.appendChild(button);

        productos.appendChild(div)
      });

      // Agregar evento de clic a los botones de agregar cerveza
      var addButtons = document.getElementsByClassName("addButton");
      for (var i = 0; i < addButtons.length; i++) {
        addButtons[i].addEventListener("click", addToCart);
      }
    });
}

function addToCart(event) {
  // Obtener el contenedor del producto padre del botón clicado

  var productoDiv = event.target.closest("#producto-div");

  // Obtener los elementos dentro del contenedor
  var title = productoDiv.querySelector("h3").innerHTML;
  var imgSrc = productoDiv.querySelector("img").getAttribute("src");
  var quantity = productoDiv.querySelector("#stockQuantity").innerHTML;
  var priceProducto = parseFloat(
    productoDiv.querySelector("#priceValue").innerHTML
  );

  var productosDivs = document.querySelectorAll("#producto-div");

  var mostrada = false;
  productosDivs.forEach(function (producto) {
    var titleProducto = producto.querySelector("h3").innerHTML;
    var quantityProducto = producto.querySelector("#stockQuantity").innerHTML;
    if (titleProducto == title && quantityProducto > 0) {
      quantityProducto--;
      displayStock(producto, quantityProducto); // Actualizar el stock en la vista
    } else if (titleProducto == title && quantity == 0 && !mostrada) {
      alert("No hay stock disponible");
      mostrada = true;
    }
  });

  // Verificar si el artículo ya está en el carrito
  var existingItem = shoppingCart.find((item) => item.title === title);

  var sumado = false;
  if (existingItem) {
    // Si el artículo ya está en el carrito, incrementar la cantidad
    existingItem.quantity++;
    existingItem.stock--;
    if (!sumado) {
      existingItem.priceValue += priceProducto;
      sumado = true;
    }
  } else {
    // Si el artículo no está en el carrito, agregarlo con una cantidad de 1
    shoppingCart.push({
      title: title,
      imgSrc: imgSrc,
      quantity: 1,
      price: "Precio: $",
      stock: quantity - 1,
      priceValue: priceProducto,
    });
  }

  // Mostrar los datos en el carrito
  displayCart();
}

function displayCart() {
  var cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  // Recorrer los elementos del carrito y mostrarlos en el DOM
  shoppingCart.forEach((item, index) => {
    var li = document.createElement("li");
    li.id = "cartLi";

    var img = document.createElement("img");
    img.src = item.imgSrc;

    var title = document.createElement("p");
    title.id = "title";
    title.innerHTML = item.title;

    var divStock = document.createElement("div");
    divStock.id = "divStock";

    var stock = document.createElement("p");
    stock.innerHTML = "Stock: ";

    var stockQuantity = document.createElement("p");
    stockQuantity.id = "stockQuantity";
    stockQuantity.innerHTML = item.stock;

    var divCant = document.createElement("div");
    divCant.id = "divCant";

    var quantity = document.createElement("p");
    quantity.innerHTML = "Cantidad: ";

    var decreaseButton = document.createElement("button");
    decreaseButton.innerHTML = "-";
    decreaseButton.addEventListener("click", function () {
      decreaseQuantity(index);
    });

    var quantityValue = document.createElement("p");
    quantityValue.id = "quantityValue";
    quantityValue.innerHTML = item.quantity;

    var increaseButton = document.createElement("button");
    increaseButton.innerHTML = "+";
    increaseButton.addEventListener("click", function () {
      increaseQuantity(index);
    });

    var divPrice = document.createElement("div");
    divPrice.id = "divPrice";

    var price = document.createElement("p");
    price.innerHTML = item.price;

    var priceValue = document.createElement("p");
    priceValue.id = "priceValue";
    priceValue.innerHTML = item.priceValue;

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Eliminar " + '<i class="fas fa-trash-alt"></i>';
    deleteButton.addEventListener("click", function () {
      removeItem(index);
    });

    divStock.appendChild(stock);
    divStock.appendChild(stockQuantity);

    divCant.appendChild(quantity);
    divCant.appendChild(decreaseButton);
    divCant.appendChild(quantityValue);
    divCant.appendChild(increaseButton);

    divPrice.appendChild(price);
    divPrice.appendChild(priceValue);

    li.appendChild(title);
    li.appendChild(img);
    li.appendChild(divStock);
    li.appendChild(divCant);
    li.appendChild(divPrice);
    li.appendChild(deleteButton);

    cartItems.appendChild(li);
  });

  // Mostrar el carrito
  var cart = document.getElementById("cart");
  cart.style.display = "block";
}

function increaseQuantity(index) {
  var cartItems = document.getElementById("cart-items");
  var productoDiv = cartItems.children[index];

  // Obtener los elementos dentro del contenedor
  var title = productoDiv.querySelector("#title").innerHTML;
  var imgSrc = productoDiv.querySelector("img").getAttribute("src");

  var productos = document.querySelectorAll("#producto-div");

  var existingItem = shoppingCart.find((item) => item.title === title);
  var sumado = false;
  if (existingItem && existingItem.stock >= 1) {
    existingItem.quantity++;
    existingItem.stock--;
    displayStock(productoDiv, existingItem.stock);
    displayQuantityInCart(productoDiv, existingItem.quantity);
    productos.forEach(function (cerveza) {
      var titleCerveza = cerveza.querySelector("h3").innerHTML;
      var quantityCerveza = cerveza.querySelector("#stockQuantity").innerHTML;
      var priceCerveza = cerveza.querySelector("#priceValue").innerHTML;
      if (titleCerveza == title && quantityCerveza >= 1) {
        quantityCerveza--;
        if (!sumado) {
          existingItem.priceValue += parseInt(priceCerveza);
          sumado = true;
        }
        displayPriceValue(productoDiv, existingItem.priceValue);
        displayStock(cerveza, quantityCerveza);
      } else if (titleCerveza == title && quantityCerveza == 0) {
        quantityCerveza = existingItem.stock;
        displayStock(cerveza, quantityCerveza);
      }
    });
  } else if (existingItem && existingItem.stock == 0) {
    displayStock(productoDiv, existingItem.stock);
    alert("No hay mas stock");
  }
}

function decreaseQuantity(index) {
  var cartItems = document.getElementById("cart-items");
  var productoDiv = cartItems.children[index];

  // Obtener los elementos dentro del contenedor
  var title = productoDiv.querySelector("#title").innerHTML;

  var productos = document.querySelectorAll("#producto-div");

  var existingItem = shoppingCart.find((item) => item.title == title);
  var restado = false;
  if (existingItem && existingItem.quantity > 1) {
    existingItem.quantity--;
    existingItem.stock++;
    displayStock(productoDiv, existingItem.stock);
    displayQuantityInCart(productoDiv, existingItem.quantity);
    productos.forEach(function (cerveza) {
      var titleCerveza = cerveza.querySelector("h3").innerHTML;
      var quantityCerveza = cerveza.querySelector("#stockQuantity").innerHTML;
      var priceCerveza = cerveza.querySelector("#priceValue").innerHTML;
      if (titleCerveza == title ) {
        quantityCerveza++;
        if (!restado) {
          existingItem.priceValue -= parseInt(priceCerveza);
          restado = true;
        }
        displayPriceValue(productoDiv, existingItem.priceValue);
        displayStock(cerveza, quantityCerveza);
      } 
    });
  } else if (existingItem && existingItem.quantity == 1) {
    existingItem.quantity--;
    existingItem.stock++;
    productos.forEach(function (cerveza) {
      var titleCerveza = cerveza.querySelector("h3").innerHTML;
      var quantityCerveza = cerveza.querySelector("#stockQuantity").innerHTML;
      if (titleCerveza == title) {
        quantityCerveza = existingItem.stock;
        displayStock(cerveza, quantityCerveza);
      }
    });
    removeItem(index);
    
    
  }
}

function removeItem(index) {
  var cartItems = document.getElementById("cart-items");
  var productoDiv = cartItems.children[index];

  // Obtener los elementos dentro del contenedor
  var title = productoDiv.querySelector("#title").innerHTML;

  var productos = document.querySelectorAll("#producto-div");

  var existingItem = shoppingCart.find((item) => item.title === title);
  if (existingItem){
    var removeIndex = shoppingCart.indexOf(existingItem);
      shoppingCart.splice(removeIndex, 1);
      displayCart();
      productos.forEach(function (cerveza) {
        var titleCerveza = cerveza.querySelector("h3").innerHTML;
        var quantityCerveza = cerveza.querySelector("#stockQuantity").innerHTML;
        if (title == titleCerveza && quantityCerveza > 0) {
          quantityCerveza = parseInt(quantityCerveza) + parseInt(existingItem.quantity);
          displayStock(cerveza, quantityCerveza);
        }
        displayStock(cerveza, quantityCerveza);
      });
  }
  if (shoppingCart.length == 0){
    displayCart();
    toggleCart();
  }
}

function toggleCart() {
  var cart = document.getElementById("cart");
  if (cart.style.display === "block") {
    cart.style.display = "none";
  } else {
    cart.style.display = "block";
  }
}

function inicio() {
  const selector = document.getElementById("sel-category");

  // Obtener el valor de la categoría seleccionada de la URL
  const searchParams = new URLSearchParams(window.location.search);
  const selectedCategory = searchParams.get("category");

  selector.addEventListener("change", function() {
    var urlPagina = window.location.href;
    const selectedOption = selector.value;
  
    if (selectedOption !== "") {
      // Verificar si la URL contiene "/index.html"
      if (!urlPagina.includes("/index.html")) {
        // Agregar "/index.html" a la URL
        urlPagina += "index.html";
      }
  
      // Crear una nueva instancia de URLSearchParams
      const newSearchParams = new URLSearchParams();
  
      // Agregar los parámetros existentes a la nueva instancia, excepto "category"
      searchParams.forEach((value, key) => {
        if (key !== "category") {
          newSearchParams.append(key, value);
        }
      });
  
      // Agregar el nuevo valor de "category" a los parámetros de búsqueda
      newSearchParams.set("category", selectedOption);
  
      // Construir la nueva URL con los parámetros de búsqueda actualizados
      const newURL = urlPagina.split("?")[0] + "?" + newSearchParams.toString();
  
      // Redireccionar a la nueva URL
      window.location.href = newURL;
    }
  });

  fetch("https://b4you.free.mockoapp.net/categories")
    .then((resp) => {
      return resp.json();
    })
    .then((categoryList) => {
      let selector = document.getElementById("sel-category");
      let selectorCategorias = document.createElement("option");
      selectorCategorias.innerHTML = "CATEGORIAS";
      selector.appendChild(selectorCategorias);

      categoryList.forEach((category) => {
        let opt = document.createElement("option");
        opt.innerHTML = category.title;
        opt.value = category.id;
        selector.appendChild(opt);
      });

      selector.addEventListener("mousedown", function () {
        selector.firstElementChild.style.display = "none";
      });

      // Establecer el valor de la categoría seleccionada en el selector
      if (selectedCategory) {
        selector.value = selectedCategory;
      }

      // Llamar a la función getAllCervezasByCategory() con el valor de la categoría seleccionada
      if (selectedCategory) {
        getAllCervezasByCategory(selectedCategory);
      }
    })
    .then(getAllCervezas())
    .then(getAllRecommended());
}

var busquedaInput = document.getElementById("buscador");
var botonBuscar = document.getElementById("boton-buscar");
var productosContainer = document.getElementById("productos");

function searchPage() {
  var searchText = busquedaInput.value.toLowerCase();

  fetch("https://b4you.free.mockoapp.net/beers")
    .then((resp) => resp.json())
    .then((cervezasArray) => {
      productosContainer.innerHTML = "";

      const filteredCervezas = cervezasArray.filter((cerveza) =>
        cerveza.title.toLowerCase().includes(searchText)
      );

      if (filteredCervezas.length === 0) {
        // Mostrar mensaje de no encontrado
        alert("No se encontraron productos con ese texto");
        getAllCervezas();
      } else {
        filteredCervezas.forEach((cerveza) => {
          var div = document.createElement("div");
          div.id = "producto-div";

          var title = document.createElement("h3");
          title.innerHTML = cerveza.title;

          var img = document.createElement("img");
          img.src = cerveza.image;

          var description = document.createElement("p");
          description.innerHTML = cerveza.description;

          var divPrice = document.createElement("div");
          divPrice.id = "divPrice";

          var price = document.createElement("p");
          price.id = "price";
          price.innerHTML = "Precio: $";

          var priceValue = document.createElement("p");
          priceValue.id = "priceValue";
          priceValue.innerHTML = cerveza.price;

          var divStock = document.createElement("div");
          divStock.id = "divStock";

          var stock = document.createElement("p");
          stock.id = "stock";
          stock.innerHTML = "Stock: ";

          var quantity = document.createElement("p");
          quantity.id = "stockQuantity";
          quantity.innerHTML = cerveza.quantity;

          var button = document.createElement("button");
          button.classList.add("addButton");
          button.innerHTML = "Agregar";

          divPrice.appendChild(price);
          divPrice.appendChild(priceValue);

          divStock.appendChild(stock);
          divStock.appendChild(quantity);

          div.appendChild(title);
          div.appendChild(img);
          div.appendChild(description);
          div.appendChild(divPrice);
          div.appendChild(divStock);
          div.appendChild(button);

          productosContainer.appendChild(div);
        });

        // Ocultar los productos no coincidentes
        var allProductos = productosContainer.querySelectorAll("#producto-div");
        allProductos.forEach((producto) => {
          if (
            !filteredCervezas.some(
              (cerveza) =>
                producto.querySelector("h3").innerHTML === cerveza.title
            )
          ) {
            producto.style.display = "none";
          }
        });

        // Agregar evento de clic a los botones de agregar cerveza
        var addButtons = document.getElementsByClassName("addButton");
        for (var i = 0; i < addButtons.length; i++) {
          addButtons[i].addEventListener("click", addToCart);
        }
      }
    });

  // Limpiar el campo de búsqueda
  busquedaInput.value = "";
}


var currentPage = window.location.pathname;

// Verificar si la página actual no contiene "compra.html"
if (currentPage.includes("index.html")) {
  var compraButton = document.getElementById("compraButton");
  // Asignar la función de búsqueda al evento click del botón
  botonBuscar.addEventListener("click", function () {
    if (busquedaInput.value.trim() !== "") {
      searchPage();
    }
  });
  compraButton.addEventListener("click", function () {
    window.location.href = "/pages/compra.html";
  });
}
else {
  if (currentPage.includes("contacto.html")){
  var compraButton = document.getElementById("compraButton");
  // Verificar si estamos en index.html y redirigir en consecuencia
    compraButton.addEventListener("click", function () {
      // Redirigir a cualquier otra página que no sea index.html
      window.location.href = "compra.html";
    });
  }
}

function loginForm() {
  let divLogin = document.getElementById("modal");
  divLogin.innerHTML = "";

  let divContent = document.createElement("div");
  divContent.className = "modal-content";

  let closeSpan = document.createElement("button");
  closeSpan.innerHTML = '<i class="fas fa-window-close"></i>';
  closeSpan.id = "cerrarLogin";
  closeSpan.onclick = closeLogin;

  let formH2 = document.createElement("h2");
  formH2.innerHTML = "Iniciar Sesion";

  let form = document.createElement("form");
  form.id = "login-form";
  form.onsubmit = "return ingresar()";

  let username = document.createElement("label");
  username.for = "username";
  username.innerHTML = "Usuario:";

  let usernameInput = document.createElement("input");
  usernameInput.type = "text";
  usernameInput.id = "username";
  usernameInput.name = "username";
  usernameInput.required = true;

  let password = document.createElement("label");
  password.for = "password";
  password.innerHTML = "Contraseña:";

  let passwordInput = document.createElement("input");
  passwordInput.type = "text";
  passwordInput.id = "password";
  passwordInput.name = "password";
  passwordInput.required = true;

  let submit = document.createElement("button");
  submit.id = "submitButton";
  submit.type = "submit";
  submit.innerHTML = "Ingresar";
  submit.onclick = ingresar;

  form.appendChild(username);
  form.appendChild(usernameInput);
  form.appendChild(password);
  form.appendChild(passwordInput);
  form.appendChild(submit);

  divContent.appendChild(closeSpan);
  divContent.appendChild(formH2);
  divContent.appendChild(form);

  divLogin.appendChild(divContent);
}

function toggleLogin() {
  let modal = document.getElementById("modal");
  loginForm();
  modal.style.display = "block";
}

function closeLogin() {
  let modal = document.getElementById("modal");
  modal.style.display = "none";
}

function ingresar() {

  let username = document.getElementById("username");
  let password = document.getElementById("password");

  let cerrar = false;
  if (username.value === "admin" && password.value === "admin") {
    cerrar = true;
  } else {
    alert("Usuario o contraseña incorrectos");
  }

  return cerrar;
}

function getAllRecommended() {
  fetch("https://b4you.free.mockoapp.net/beers")
    .then((resp) => {
      return resp.json();
    })
    .then((cervezasArray) => {
      let productos = document.getElementById("recommended-products-product");
      for (let i = 0; i < 3; i++) {
        // Obtener solo las 3 primeras cervezas
        const cerveza = cervezasArray[i];
        var div = document.createElement("div");
        div.id = "producto-div";

        var title = document.createElement("h3");
        title.innerHTML = cerveza.title;

        var img = document.createElement("img");
        img.src = cerveza.image;

        var description = document.createElement("p");
        description.innerHTML = cerveza.description;

        var divPrice = document.createElement("div");
        divPrice.id = "divPrice";

        var price = document.createElement("p");
        price.id = "price";
        price.innerHTML = "Precio: $";

        var priceValue = document.createElement("p");
        priceValue.id = "priceValue";
        priceValue.innerHTML = cerveza.price;

        var divStock = document.createElement("div");
        divStock.id = "divStock";

        var stock = document.createElement("p");
        stock.id = "stock";
        stock.innerHTML = "Stock: ";

        var quantity = document.createElement("p");
        quantity.id = "stockQuantity";
        quantity.innerHTML = cerveza.quantity;

        var button = document.createElement("button");
        button.classList.add("addButton");
        button.innerHTML = "Agregar";

        divPrice.appendChild(price);
        divPrice.appendChild(priceValue);

        divStock.appendChild(stock);
        divStock.appendChild(quantity);

        div.appendChild(title);
        div.appendChild(img);
        div.appendChild(description);
        div.appendChild(divPrice);
        div.appendChild(divStock);
        div.appendChild(button);

        productos.appendChild(div);
      }

      // Agregar evento de clic a los botones de agregar cerveza
      var addButtons = document.getElementsByClassName("addButton");
      for (var i = 0; i < addButtons.length; i++) {
        addButtons[i].addEventListener("click", addToCart);
      }
    });
}

function displayStock(productoDiv, stock) {
  var stockElement = productoDiv.querySelector("#stockQuantity");
  stockElement.innerHTML = stock;
}

function displayPriceValue(productoDiv, priceValue) {
  var priceElement = productoDiv.querySelector("#priceValue");
  priceElement.innerHTML = priceValue;
}

function displayQuantityInCart(productoDiv, stock) {
  var stockElement = productoDiv.querySelector("#quantityValue");
  stockElement.innerHTML = stock;
}


function removeAllItems() {
  if (shoppingCart.length > 0){
    for (var i = shoppingCart.length - 1; i >= 0; i--) {
      removeItem(i);
    }
    displayCart();
    toggleCart();
  }
  else{
    displayCart();
    toggleCart();
  }
}
