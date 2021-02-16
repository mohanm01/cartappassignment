var cartlist = document.querySelector("#cartlist");
(function(){
    console.log('hellooo');
    getItems();      
})();

function getItems(){
    let file = "cart.json"
    fetch (file)
    .then(x => x.json())
    .then(x=> products(x.items));
}

function products(items){
    if(localStorage){
        localStorage.setItem('products',JSON.stringify(items));
    }
    var posts = ``;
     for(var i=0;i<items.length;i++){
        console.log(items[i]);
        posts += `<cart-listing 
            title="${items[i].name}" 
            imagesrc="${items[i].image}"
            displayprice = "${items[i].price.display}"
            actualprice = "${items[i].price.actual}"
            discount = "${items[i].discount}"
        ></cart-listing>`;
    }
    document.querySelector("#cartlist").innerHTML = posts;
    //addEventstoBtn();
}
function updateDetails(price, length, flag){
    let inputField = document.querySelector("#numitems"+length);
    let totalPrice = document.querySelector("#total"+length);
    if(flag==='inc')
        inputField.value = parseInt(inputField.value) + 1;        
    else
        inputField.value = parseInt(inputField.value) - 1;
    totalPrice.innerHTML = parseInt(price) * parseInt(inputField.value);
    updateTotalPrice();
    
}
function updateTotalPrice(){
    var items = document.getElementsByClassName("price");
    var totalPrice = 0;
    var discount = 106;
    for(var i=0;i<items.length;i++){
        totalPrice += parseInt(document.getElementsByClassName("price")[i].textContent);
    }   
    document.querySelector('#summaryitems').innerHTML = "Items ("+items.length+")";
    document.querySelector('#summaryvalue').innerHTML = "$"+totalPrice;
    document.querySelector('#summarytotal').innerHTML = "$"+(totalPrice - discount);
    
}
