function fetchuser(done) {
    $.get('/api/vendor',function (data) {
        done(data)
    })
}
function createuser(user) {
    return(`<div class="row">
            <div class="col-4 card ">${user.id}</div>
            <div class="col-4 card ">${user.name}</div>
            <button onclick="deleteUser(${user.id})">X</button></div>`)
}

function deleteUser(userId){
  $.ajax({
    url: `/api/vendor`,
    type: 'DELETE',
    data: {id: userId},
    success: function(result) { 
    }
  });
}



$(function () {
  let userlist=$('#user_list');
  function getUsers(){
  
    fetchuser(function (users) {
        userlist.empty()
        for(user of users){
            userlist.append(createuser(user))
        }
    })
};

    getUsers();

    $('#addtask').click(() => {
      $.post(
        '/api/vendor',
        {
          name: $('#name').val(),
        },
        (data) => {
          if (data) {
            $('#name').val("");
            
            alert("Task added successfully!");
            getUsers();

          } else {
            alert('Some error occurred')
          }
        }
      )
    })
});
