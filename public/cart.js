function fetchproduct(done) {
    $.get('/api/product', function (data) {
        done(data)
    })
}


function showproduct(product, quantity) {

    let total = product.price * quantity;
    return (`<div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${product.id}</h5>
      <p class="card-text">Product Name=>${product.name}</p>
      <p class="card-text">Quantity=>${quantity}</p>
      <p class="card-text">Price=>${product.price}</p>
      <p class="card-text">Total Amount=>${total}</p>
    </div>
  </div>`)
}

function fetchproducts(productId, productQuantity) {
    let productlist = $('#productlist')
    $.get(`api/product/${productId}`, (products) => {
        for (let product of products) {
            productlist.append(showproduct(product, productQuantity));
        }
    })
}

function fetchProductId(id) {
    $.get(`/api/carttable/${id}`, (products) => {
        for (let product of products) {
            fetchproducts(product.productId, product.quantity);
        }
    })
}

$('#login').click(() => {
    let username = $('#username').val();
    let email = $('#email').val();

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
                fetchProductId(data.id);

            } else {
                alert('Some error occurred')
            }
        }
    )
})
