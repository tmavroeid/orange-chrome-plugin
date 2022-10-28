  // if you want to get baskets after clicking in the button with id=getproducts then replace 
  // the below listener 'DOMContentLoaded' with the below code block
  // var button = document.getElementById('getproducts');
  // button.addEventListener('click', function () {

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('status')
    $('#status').html('retrieving basket....');
    $('body').css('overflow', 'hidden');
    chrome.windows.getAll({populate:true}, (windows) => {
      windows.forEach((window) => {
        window.tabs.forEach((tab) => {
          if(tab.url.includes('kotsovolos.gr') || tab.url.includes('ab.gr')){
            chrome.tabs.sendMessage(tab.id, {type: 'marketplace'}, function(response) {
                    // Create the list element:
                    provider = response.provider
                    $('#product_list').html(response.product_list);
                    var table = document.createElement('table');
                    table.id = 'product_list'
                    var row = document.createElement('tr');
                    var item = document.createElement('td');
                    item.appendChild(document.createTextNode("Name"))
                    item.classList.add('name')
                    item.classList.add('heavy')
                    row.appendChild(item)
                    var item = document.createElement('td');
                    item.appendChild(document.createTextNode("Price"))
                    item.classList.add('pricetag')
                    item.classList.add('heavy')
                    row.appendChild(item)
                    var item = document.createElement('td');
                    item.appendChild(document.createTextNode(""))
                    item.classList.add("input_price_header")
                    item.classList.add('heavy')
                    row.appendChild(item)
                    var item = document.createElement('td');
                    item.appendChild(document.createTextNode("Quantity"))
                    item.classList.add('quantity')
                    item.classList.add('heavy')
                    row.appendChild(item)
                    table.appendChild(row)
                    counter = 0;
                    maxvalue = 0
                    total = 0;
                    initialtotal = 0;
                    for(var i = 0; i < response.product_list.length; i++) {

                      var row = document.createElement('tr');
                      var item = document.createElement('td');
                      item.appendChild(document.createTextNode(response.product_list[i].name))
                      item.classList.add("name")
                      row.appendChild(item)
                      var item = document.createElement('td');
                      var input = document.createElement("input");
                      input.type = "range";
                      input.step = 0.01
                      input.min = 0
                      input.max = parseFloat(response.product_list[i].price)*2
                      output_id = "v".concat(counter)
                      input_id = "s".concat(counter)
                      input.oninput = output_id.concat('.value='+input_id+'.value')
                      input.id = input_id
                      input.classList.add("slider")
                      input.value = response.product_list[i].price
                      item.appendChild(input); // put it into the DOM
                      row.appendChild(item)
                      var item = document.createElement('td')
                      var input = document.createElement("input")
                      input.id = "v".concat(counter)
                      input.value = response.product_list[i].price
                      input.classList.add("input_price")
                      item.classList.add('input_price')
                      item.appendChild(input)

                      row.appendChild(item)
                      var item = document.createElement('td');
                      item.appendChild(document.createTextNode(response.product_list[i].quantity))
                      item.id = "q".concat(counter)
                      item.classList.add('quantity')
                      row.appendChild(item)
                      table.appendChild(row)
                      counter += 1;
                      initialtotal+=response.product_list[i].quantity*response.product_list[i].price
                      total+=response.product_list[i].quantity*response.product_list[i].price
                    }
                    $('#dempercentage').html(((total*100)/initialtotal.toFixed(2)).toFixed(0).toString())
                    var dempercent = document.getElementById("dempercentage");
                    dempercent.classList.add('dempercentage')
                    var row = document.createElement('tr');
                    var item = document.createElement('td');
                    item.appendChild(document.createTextNode(""))
                    item.classList.add('name')
                    item.classList.add('heavy')
                    row.appendChild(item)
                    var item = document.createElement('td');
                    item.appendChild(document.createTextNode(""))
                    item.classList.add('pricetag')
                    item.classList.add('heavy')
                    row.appendChild(item)
                    var item = document.createElement('td');
                    item.appendChild(document.createTextNode(total.toFixed(2)))
                    item.classList.add("input_price_header")
                    item.classList.add('heavy')
                    item.classList.add('total')

                    item.id='total'
                    row.appendChild(item)
                    var item = document.createElement('td');
                    item.appendChild(document.createTextNode(""))
                    item.classList.add('quantity')
                    item.classList.add('heavy')
                    row.appendChild(item)
                    table.appendChild(row)

                    $('#status').html('retrieved basket');
                    $('#products').html(table)
                    counter = 0;
                    total = 0
                    for(var i = 0; i < response.product_list.length; i++) {
                      document.getElementById("s".concat(counter)).addEventListener("change", function(event,quantity) {
                        var item = document.getElementById('v'.concat(event.target.id.slice(1, 2)))
                        item.value = event.target.value
                        event.target.value = item.value
                        var items = document.querySelectorAll('tr input');
                        items.forEach(function(el) {
                          });
                      })
                      counter+=1
                    }
                    //calculate the democratization percentage
                    $('input').change(function(){ // run anytime the value changes
                      counter = 0
                      total = 0
                      for(var i = 0; i < response.product_list.length; i++) {
                        var value = Number($('#'.concat("s".concat(counter))).val());
                        var quantity = Number($('#'.concat("q".concat(counter))).text());
                        total += (value*quantity)
                        counter+=1
                      }
                      $('#dempercentage').html(((total.toFixed(2)*100)/initialtotal.toFixed(2)).toFixed(0).toString())
                      $('#total').html(total.toFixed(2))
                    });
                });
              }else if (tab.url.includes('booking')){
                chrome.tabs.sendMessage(tab.id, {type: "book-accommodation"}, function(response) {
                    provider = response.provider
                    // Create the list element:
                    var table = document.createElement('table');
                    table.id = 'accommodation'
                    var row = document.createElement('tr');
                    var item = document.createElement('td');
                    item.appendChild(document.createTextNode("Accommodation"))
                    item.classList.add('accommodation')
                    item.classList.add('heavy')
                    row.appendChild(item)
                    var item = document.createElement('td');
                    item.appendChild(document.createTextNode("Check-In"))
                    item.classList.add('checkin')
                    item.classList.add('heavy')
                    row.appendChild(item)
                    var item = document.createElement('td');
                    item.appendChild(document.createTextNode("Check-Out"))
                    item.classList.add('checkout')
                    item.classList.add('heavy')
                    row.appendChild(item)
                    var item = document.createElement('td');
                    item.appendChild(document.createTextNode("Price"))
                    item.classList.add('accommodation-pricetag')
                    item.classList.add('heavy')
                    row.appendChild(item)
                    var item = document.createElement('td');
                    item.appendChild(document.createTextNode(""))
                    item.classList.add("input_price_accommodation_header")
                    item.classList.add('heavy')
                    row.appendChild(item)
                    table.appendChild(row)
                    counter = 0;
                    maxvalue = 0
                    total = 0;
                    initialtotal = 0;
                    $('#status').html('retrieved basket');
                    $('#accommodation').html(table)
                    
                    var row = document.createElement('tr');
                    var item = document.createElement('td');
                    item.appendChild(document.createTextNode(response.accommodation[0].accommodation_type))
                    item.classList.add("accommodation")
                    item.id='accommodation_name'
                    row.appendChild(item)
                    var item = document.createElement('td');
                    item.appendChild(document.createTextNode(response.accommodation[0].checkin_date))
                    item.classList.add('checkin')
                    item.id='checkin'
                    row.appendChild(item)
                    var item = document.createElement('td');
                    item.appendChild(document.createTextNode(response.accommodation[0].checkout_date))
                    item.classList.add('checkout')
                    item.id='checkout'
                    row.appendChild(item)
                    var item = document.createElement('td');
                    var input = document.createElement("input");
                    input.type = "range";
                    input.step = 0.01
                    input.min = 0
                    input.max = parseFloat(response.accommodation[0].price)*2
                    output_id = "v1"
                    input_id = "s1"
                    input.oninput = output_id.concat('.value='+input_id+'.value')
                    input.id = input_id
                    input.classList.add("accommodation-slider")
                    input.value = response.accommodation[0].price
                    item.appendChild(input); // put it into the DOM
                    row.appendChild(item)
                    var item = document.createElement('td')
                    var input = document.createElement("input")
                    input.id = "v1"
                    input.value = response.accommodation[0].price
                    input.classList.add("input_price_accommodation")
                    item.classList.add('input_price_accommodation')
                    item.appendChild(input)

                    row.appendChild(item)
                    
                    table.appendChild(row)
                    initialtotal = parseFloat(response.accommodation[0].price)
                    total = parseFloat(response.accommodation[0].price)
                    
                    $('#dempercentage').html(((total*100)/initialtotal.toFixed(2)).toFixed(0).toString())
                    var dempercent = document.getElementById("dempercentage");
                    dempercent.classList.add('dempercentage')
                    var row = document.createElement('tr');
                    var item = document.createElement('td');
                    item.appendChild(document.createTextNode(""))
                    item.classList.add('name')
                    item.classList.add('heavy')
                    row.appendChild(item)
                    var item = document.createElement('td');
                    item.appendChild(document.createTextNode(""))
                    item.classList.add('accommodation-pricetag')
                    item.classList.add('heavy')
                    row.appendChild(item)
                    var item = document.createElement('td');
                    item.classList.add("input_price_accommodation_header")
                    item.classList.add('heavy')
                    row.appendChild(item)
                    var item = document.createElement('td');
                    item.appendChild(document.createTextNode(total.toFixed(2)))
                    item.classList.add("input_price_accommodation_header")
                    item.classList.add('heavy')
                    item.classList.add('total')

                    item.id='total'
                    row.appendChild(item)
                    var item = document.createElement('td');
                    item.appendChild(document.createTextNode(""))
                    item.classList.add('quantity')
                    item.classList.add('heavy')
                    row.appendChild(item)
                    table.appendChild(row)

                    $('#status').html('retrieved basket');
                    $('#accommodation').html(table)
                    document.getElementById("s1").addEventListener("change", function(event,quantity) {
                      var item = document.getElementById('v1')
                      item.value = event.target.value
                      event.target.value = item.value
                      var items = document.querySelectorAll('tr input');
                      items.forEach(function(el) {
                        });
                    })
                    //calculate the democratization percentage
                    $('input').change(function(){ // run anytime the value changes  
                        var value = Number($('#s1').val());
                        total = value
                        $('#dempercentage').html(((total.toFixed(2)*100)/initialtotal.toFixed(2)).toFixed(0).toString())
                        $('#total').html(total.toFixed(2))

                      })
                    });
                }
        });
      });
    });
  });