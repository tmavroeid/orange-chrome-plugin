chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
      var data = request.data || {};
      var list = []
      if (request.type == "marketplace"){
        if(window.location.href.includes('kotsovolos.gr')){
          var elements = document.querySelectorAll('div.basketTable div.basketRow.item div.cell.prodCell span.name');
          var costs = document.querySelectorAll('div.basketTable div.basketRow.item div.cell.prodCell span.price')
          var quantities = document.querySelectorAll('div.basketTable div.basketRow.item div.cell.quantCell div.selected.homeAvailableQty')
          for(let j=0; j<elements.length; j++){
            list.push({'name':elements[j].textContent, 'price':costs[j].textContent/quantities[j].textContent, 'quantity':quantities[j].textContent})
          }
          products_provider = 'Kotsovolos'
          if(list.length>0){
            sendResponse({data: data, product_list: list, provider: products_provider, url: window.location.href, success: true});
          }
        }else if(window.location.href.includes('ab.gr')){
          var items = document.querySelectorAll('div.CheckoutProductList li.AvailableProductTile div.product-name ')
          var costs = document.querySelectorAll('div.CheckoutProductList li.AvailableProductTile div.ProductTileDetailsInformation span.total-product-value ')
          var quantities = document.querySelectorAll('div.CheckoutProductList li.AvailableProductTile div.ProductBasketAdder input.input-qty')
          for(let j=0; j<items.length; j++){
            list.push({'name':items[j].textContent, 'price':costs[j].textContent.replace(",", ".")/quantities[j].defaultValue, 'quantity':quantities[j].defaultValue})
          }
          products_provider = 'ABVasilopoulos'
          if(list.length>0){
            sendResponse({data: data, product_list: list, provider: products_provider, url: window.location.href, success: true});
          }
        }
        chrome.runtime.sendMessage({type: "notification", options: { product_list: list }});
      }else if (request.type == "book-accommodation"){
        if(window.location.href.includes('booking.com')){
          console.log('vhma3')
          var accommodation = document.querySelectorAll('div.bp-price-details__charge-type')[0].innerText
          var checkin_date = document.querySelectorAll('div.bui-date-range__item [aria-describedby="bp-checkin-date__label"] span.bui-date__title')[0].innerText
          var checkout_date = document.querySelectorAll('div.bui-date-range__item [aria-describedby="bp-checkout-date__label"] span.bui-date__title')[0].innerText
          var price = document.querySelectorAll('div.bp-price-details__charge-value [data-animate-price-group-name="bp_user_total_price"]')[0].dataset.value
          //the accommodation_area is not stored in the dynamodb
          var accommodation_area = document.querySelectorAll('div.bui-spacer--smaller address')[0].innerText
          
          provider = 'Booking'
          console.log(accommodation,checkin_date, checkout_date, price)
          list.push({'accommodation_type':accommodation, 'checkin_date':checkin_date, 'checkout_date':checkout_date, 'price': price.replace(",", "."), 'accommodation_area': accommodation_area})
        }
        if(list.length>0){
          sendResponse({data: data, accommodation: list, provider: provider, url: window.location.href, success: true});
        }
        // this one is for the popup dialog box
        // chrome.runtime.sendMessage({type: "notification", options: { product_list: list }});
      }
      
      
});


// window.addEventListener("load", function load(event){
//     
// },false);