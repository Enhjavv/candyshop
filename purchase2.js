const products = [
  {
    name: "Lollypop",
    price: 200,
    description: "Cheap",
    type: "Candy",
    image:
      "https://cdn.shopify.com/s/files/1/0642/7377/6855/products/CA-LOLL-22_800x.jpg?v=1660060615",
    },
  {
    name: "Ice Cream",
    price: 1200,
    description: "Frozen",
    type: "Ice cream",
    image:
      "https://cdn.britannica.com/50/80550-050-5D392AC7/Scoops-kinds-ice-cream.jpg",
  },
  {
    name: "Soft Drink",
    price: 2300,
    description: "Anti-thirsty",
    type: "Drinks",
    image:
      "https://news.mn/en/wp-content/uploads/sites/3/2020/01/2-7.jpg",
  },
  {
    name: "Gummy",
    price: 550,
    description: "Sweet",
    type: "Gummy",
    image:
      "https://cdn.shopify.com/s/files/1/0496/4293/0341/articles/8944599cbf1785534f067724538a6dea.jpg?v=1663667870",
  },
  {
    name: "Chocolate",
    price: 3200,
    description: "Delicious",
    type: "Chocolate",
    image:
      "https://www.eatingwell.com/thmb/tp4kUAInp03ZgaNst-Iy7WFEy6I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/what-happens-to-your-body-when-you-eat-chocolate-every-day-618fef2845ff43c7905bc8e94d078c81.jpg",
  },
];

function PrintProducts() {
  const productsContainer = document.getElementById("products");
  let newDiv = "";

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    console.log(product)
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img class='productImage' src="${product.image}"
      <h3 class="title">${product.name}</h3>
      <p>${product.description}</p>
      <p id="price">${product.price}</p>
      <button onclick="AddItem('${product.name}')">add</button>
      <button onclick="MinusItem('${product.name}')">minus</button>
    `;

    newDiv += div.outerHTML;
  }

  productsContainer.innerHTML = newDiv;
}

window.onload = PrintProducts;

const userbasket = [];

function AddItem(itemName) {
  const itemIndex = userbasket.findIndex((item) => item.name === itemName);

  if (itemIndex !== -1) {
    userbasket[itemIndex].quantity += 1;
  } else {
    userbasket.push({ name: itemName, quantity: 1 });
  }

  Basket();
}

function MinusItem(itemName) {
  const itemIndex = userbasket.findIndex((item) => item.name === itemName);

  if (itemIndex !== -1) {
    userbasket[itemIndex].quantity -= 1;

    if (userbasket[itemIndex].quantity === 0) {
      userbasket.splice(itemIndex, 1);
    }
  }

  Basket();
}

function Purchase() {
  let total = 0;
  for (let i = 0; i < userbasket.length; i++) {
    const { name, quantity } = userbasket[i];
    const product = products.find((p) => p.name === name);
    if (product) {
      total += product.price * quantity;
    }
  }

  document.getElementById("total").innerHTML = total;
  Clear();
}

function Clear() {
  userbasket = [];
}

function Basket() {
  const basketDiv = document.getElementById("basket");
  const basketHtml = userbasket
    .map(
      ({ name, quantity }) => `
    <h1>${name} - ${quantity}</h1>
  `
    )
    .join("");
  basketDiv.innerHTML = basketHtml;
}
