function fetchcarttable(done) {
    $.get('/api/carttable',function (data) {
        done(data)
    })
}

function createcarttable(user) {
    return(`<div class="col-2 card "><h4>${user.id}</h4></div>
    <div class="col-3 card "><h4>${user.productId}</h4></div>
    <div class="col-2 card "><h4>${user.product.vendor.id}</h4></div>
    <div class="col-3 card "><h4>${user.userId}</h4></div>
    <div class="col-2 card "><h4>${user.quantity}</h4></div>`)
}

$(function () {
    let userlist=$('#showproduct');
    fetchcarttable(function (users) {
        userlist.empty()
        for(user of users){
            userlist.append(createcarttable(user))
        }
    })
})