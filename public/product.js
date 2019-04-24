function fetchdropdown(done) {
  $.get('/api/vendor', function (data) {
    done(data)
  })
}

function fetchproduct(done) {
  $.get('/api/product', function (data) {
    done(data)
  })
}

function createproduct(product) {

  return (`<div class="col-2 card ">${product.id}</div>
    <div class="col-3 card ">${product.name}</div>
    <div class="col-2 card ">${product.price}</div>
    <div class="col-2 card ">${product.quantity}</div>
    <div class="col-2 card ">${product.vendorId}</div>
    <button onclick="deleteProduct(${product.id})">X</button>`)
}



function deleteProduct(productId) {
  $.ajax({
    url: `/api/product`,
    type: 'DELETE',
    data: { id: productId },
    success: function (result) {
      getproduct();
    }
  });

}

function addtocart(productid, quantity, userId) {
  $.post(
    '/api/carttable',
    {

      quantity: quantity,
      productId: productid,
      userId: userId,
    },
    (data) => {
      if (data) {
        // $('#firstname').val("");
        // $('#lastname').val("");
        alert("Task added successfully!");


      } else {
        alert('Some error occurred')
      }
    }
  )
}




function showproduct(product, userId) {

  return (`<div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${product.id}</h5>
      <p class="card-text">Product Name=>${product.name}</p>
      <p class="card-text">Price=>${product.price}</p>
      <input type="text" placeholder="Quantity" class="card-text" id="quantity_${product.id}"></input>
      <button onclick="addtocart(${product.id},$('#quantity_${product.id}').val(), ${userId})">Add To Cart</button>
    </div>
  </div>`)
}

function createdropdown(vendor) {
  return (`<option value='${vendor.id}'>${vendor.name}</option>`)
}




function getproduct() {
  let dropdown = $('#dropdown');
  let productlist = $('#showproduct')
  fetchproduct(function (products) {
    productlist.empty()
    for (product of products) {
      productlist.append(createproduct(product))
    }
  })

  fetchdropdown(function (vendors) {
    dropdown.empty()
    dropdown.append(`<option value="">--Please choose a vendor--</option>`)
    for (vendor of vendors) {
      dropdown.append(createdropdown(vendor))
    }
  })
};

getproduct();

$('#login').click(() => {

  $.post(
    '/api/user',
    {
      username: $('#username').val(),
      email: $('#email').val(),
    },
    (data) => {
      if (data.success) {
        // $('#firstname').val("");
        // $('#lastname').val("");
        let productitem = $('#productlist')
        fetchproduct(function (products) {
          productitem.empty()
          for (product of products) {
            productitem.append(showproduct(product, data.id))
          }
        })

      } else {
        alert('Some error occurred')
      }
    }
  )


})

$('#addtask').click(() => {
  $.post(
    '/api/product',
    {
      name: $('#name').val(),
      quantity: $('#quantity').val(),
      price: $('#price').val(),
      vendorId: $('#dropdown').val(),
    },
    (data) => {
      if (data) {
        // $('#firstname').val("");
        // $('#lastname').val("");
        alert("Task added successfully!");


      } else {
        alert('Some error occurred')
      }
    }
  )
  getproduct();
})


