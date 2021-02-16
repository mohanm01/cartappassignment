const template = document.createElement('template');
template.innerHTML = `
<style>
.cart-item{
    width: 200px;
    height: 233px;
    border : 1px solid #80808042;
    float:left;
    margin: 0px 10px 10px 0px;
  }
  .item{
    width: 41px;
      height: 20px;
      background: #00800087;
      font-size: 9px;
      text-align: center;
      line-height: 20px;
      margin-top: 15px;
      color: #fff;
      font-weight: bold;
  }
  .item-section{
    clear:both;
    width:100%;
    height:45px;
    background: #d3d3d36e;
  }
  .addtocartbtn{
    border: 2px solid #03a9f4;
    font-size: 12px;
    padding: 3px 0px;
    width: 79px;
    border-radius: 5px;
    color: #03a9f4;
    cursor : pointer;
  }
</style>
<div class="cart-list">
    <div class="cart-item">
        <div class="item" id="item" style="float:left;"></div>
        <div style="float:left;margin: 15px 0px 10px 0px;">
            <image width="116" id="productimage" height="160" src=''/>
        </div>
        <div class="item-section" style="line-height:19px;">
            <div id="title" style="text-indent:10px;"> </div>
            <div style="text-indent:10px;">
                <span style="font-size:12px;text-decoration:line-through;" id="displayprice"></span>
                <span id="actualprice" style="font-size: 12px;margin-left: 1px;margin-right: 18px;"></span>
                <input type="button" id="addtocartbtn" class="addtocartbtn" value="Add to Cart"/>                
            </div>
        </div>
    </div>
    </div>`;
class CartListing extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({'mode':'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('#title').innerHTML = this.getAttribute('title');
        this.shadowRoot.querySelector('#displayprice').innerHTML = "$"+this.getAttribute('displayprice');
        this.shadowRoot.querySelector('#actualprice').innerHTML = "$"+this.getAttribute('actualprice');
        this.shadowRoot.querySelector('#productimage').src = this.getAttribute('imagesrc');
        this.shadowRoot.querySelector('#item').innerHTML = this.getAttribute('discount')+"% OFF";
        this.shadowRoot.querySelector('#addtocartbtn').setAttribute("data-id",this.getAttribute('title'));        
    }
    connectedCallback(){
        this.shadowRoot.querySelector('#addtocartbtn').addEventListener('click',function(){
            if(this.value !== "In Cart"){
                this.value = "In Cart";                              
                document.querySelector('#success-msg').innerHTML = this.dataset.id +" is added to cart.";
                document.querySelector('#success-msg').style.display = "block";
                setTimeout(function(){
                    document.querySelector('#success-msg').style.display = "none";
                },3000)
                var products = JSON.parse(localStorage.getItem('products'));
                var selItem = products.find(o => o.name === this.dataset.id);
                console.log(selItem);
                var length = document.querySelector("#list_items").children.length;
                var div = document.createElement('div');
                div.classList.add('item-info');
                var fid = "total"+length;
                var inputid = "numitems"+length;
                div.innerHTML = `
                <div style="width:52%;float:left;border: 1px solid #80808042;margin-right: 10px;">
                    <image height="40" width="50" src="${selItem.image}">
                    <span style="font-size:11px;position: relative;top:-14px;">${selItem.name}</span>
                </div>
                <div style="width:30%;float:left;">
                    <span style="font-size:16px;cursor: pointer;" onclick="updateDetails(${selItem.price.actual},${length},'dec')">-</span>
                    <input id="${inputid}" type="text" min="1" style="height:18px;width:34px;" disabled value="1"/> 
                    <span style="font-size:16px;cursor: pointer;" onclick="updateDetails(${selItem.price.actual},${length},'inc')">+</span>
                </div>
                <div style="width:14%;float:left;">
                    <div style="float:left;">$</div>
                    <div id="${fid}" class="price" style="float:left;">${selItem.price.actual}<div>
                </div>
                `;
                document.querySelector("#list_items").appendChild(div);
                document.querySelector("#total_items").innerHTML = "Items ("+(length+1)+")";
                updateTotalPrice();
            }
        });
    }
    
}

window.customElements.define('cart-listing', CartListing);
