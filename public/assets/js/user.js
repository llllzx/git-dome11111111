// 表单发生提交行为
$('#userForm').on('submit', function () {
  //获取用户在表单中输入的内容并且格式化成字符串
  var formData = $(this).serialize();
  console.log(formData);
  //向服务器端发送添加用户的请求
  $.ajax({
    type: 'post',
    url: '/users',
    // data 可以接受对象形式 也可以接受参数字符串
    data: formData,
    success: function () {
      // 刷新页面
      location.reload();
    },
    error: function () {
      alert('用户添加失败');
    }
  });
  // 阻止浏览器发生默认的提交行为 
  return false;
});

//头像上传
$('#avatar').on('change', function () {
  // 用户选择到的文件
  // console.log(this.files[0]);
  var formData = new FormData();
  formData.append('avatar', this.files[0]);

  $.ajax({
      type: 'post',
      url: '/upload',
      data: formData,
      //告诉$.ajax方法不要解析请求参数 
      processData: false,

      // 告诉$.ajax方法不要设置请求参数的类型
      contentType: false,
      success: function (data) {
        console.log(data);
        //实现头像预览功能
        $('#preview').attr('src', data[0].avatar);
        $('#avatarHidden').val(data[0].avatar);
        
      }
  });
});