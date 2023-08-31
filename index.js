import menuArray from "./data.js"
const menuPage = document.getElementById("menu");
const paymentPage = document.getElementById("payment");
const paymentCount = document.getElementById("payment-count");
const totalPrice = document.getElementById("total-price");
const cardForm = document.getElementById("card-form");
const completeOrder = document.getElementById("complete-order");
const closeButton = document.getElementById("close-btn");

let addArray = [];
let total = 0;

renderOut();

function renderOut(){
  const menuStorage = menuArray.map(menu => {
    return `
    <div class="line">
        <div class="box"> 
        <p class="emoji"> ${menu.emoji} </p>
        <div class="ingredients">
            <h1> ${menu.name} </h1>
            <p> ${menu.ingredients}</p>
            <h1>$${menu.price}</h1>
        </div>
        <button class="add add-button"><a href="#payment" data-product-list="${menu.id}"> + </a></button>
        </div>
    </div>`
  })
  menuPage.innerHTML = menuStorage;
}

document.addEventListener("click", function(e){
  paymentPage.style.display = "block";
  if(e.target.dataset.productList){
    increaseQuantity(e.target.dataset.productList)
  }
  if(e.target.dataset.removeList){
    removeOrder(e.target.dataset.removeList)
  }
})

function increaseQuantity(menuId){
  const targetOrderMenu = menuArray.filter(function(menu){
    return menuId == menu.id
  })[0]
  targetOrderMenu.quantity++;

  addArray.push({
    name: targetOrderMenu.name,
    price: targetOrderMenu.price,
    id: targetOrderMenu.id,
    quantity: targetOrderMenu.quantity,
  })
  renderOrder(addArray)
  renderTotalPrice(targetOrderMenu.price);
}

function removeOrder(order){
  const removedItem = addArray.filter(function(item){
    return item.id == order
  })[0]

  addArray = addArray.filter(function(item) {
    return item != removedItem
  })

  total -= removedItem.price;
  totalPrice.innerHTML = `$${total}`;
  renderOrder()
  if(total == 0){
    paymentPage.style.display = "none";
  }
}

function renderOrder(order){
  let orderPrice = '';
  let orderText = '';
  
  for(let menu of addArray){
    orderPrice = `<p> $${menu.price} </p>`
    orderText += `
    <div class="left-toggle">
      <div class="first-toggle">
          <h1> ${menu.name} </h1>
          <button data-remove-list="${menu.id}"></button>
      </div>
      ${orderPrice}
    </div>`
  }
  paymentCount.innerHTML = orderText;
}

function renderTotalPrice(price){
  total += price;
  totalPrice.innerHTML = `$${total}`;
}

cardForm.addEventListener("submit", function(e){
  document.getElementById("card-form").style.display = "none";
  e.preventDefault();
  const newForm = new FormData(cardForm)
  const getName = newForm.get("yourName");
  let textStore = `<h2>Thanks ${getName}! Your order is on its way! </h2> <h3> Refresh the page if you would like to make another order.</h3> `
  document.getElementById("pay-page").innerHTML = textStore;
})

completeOrder.addEventListener("click", function(){
  document.getElementById("card-form").style.display = "block";
})

closeButton.addEventListener("click", function(){
  document.getElementById("card-form").style.display = "none";
})