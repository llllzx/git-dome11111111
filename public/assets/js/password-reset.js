

//修改密码 当修改密码发生表单提交行为的时候

$('#modifyForm').on('submit', function () {
  //获取用户在表单中输入的内容
  var formData = $(this).serialize();

  $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function () {
          location.href = '/admin/login.html';
        },
        error: function () {
          alert('密码修改失败')
        },
  });
  
  //阻止表单默认提交
  return false;
});
