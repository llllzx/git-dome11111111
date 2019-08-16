// 表单发生提交行为
$('#userForm').on('submit', function () {
  //获取用户在表单中输入的内容并且格式化成字符串
  var formData = $(this).serialize();
  // console.log(formData);
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
    //告诉 $.ajax方法不要解析请求参数 
    processData: false,

    // 告诉 $.ajax方法不要设置请求参数的类型
    contentType: false,
    success: function (data) {
      console.log(data);
      //实现头像预览功能
      $('#preview').attr('src', data[0].avatar);
      $('#avatarHidden').val(data[0].avatar);

    }
  });
});

//渲染用户列表页面
$.ajax({
  type: 'get',
  url: '/users',
  success: function (response) {
    console.log(response);
    var html = template('userTpl', { data: response });
    // console.log(html);
    $('#userBox').html(html);
  }
});

// 渲染编辑用户页面 给编辑按钮添加事件
$('#userBox').on('click', '.edit', function () {
  var id = $(this).attr('data-id');
  // 根据id获取用户的详细信息
  $.ajax({
    type: 'get',
    url: '/users/' + id,
    success: function (response) {
      console.log(response)
      var html = template('editTpl', response);
      $('#editBox').html(html);
    }
  });
});

//点击删除按钮
$('#userBox').on('click', '.delete', function () {
  var id = $(this).attr('data-id');
  if (confirm('确认删除吗')) {
    $.ajax({
      type: 'delete',
      url: '/users/' + id,
      success: function () {
        alert('删除成功');
        location.reload();
      },
      error: function () {
        alert('删除失败');
      }
    });
  };

});


// 获取全选按钮 
var selectAll = $('#selectAll');

// 获取批量删除按钮
var deleteMany = $('#deleteMany');

// 当全选按钮发生改变时发生事件
selectAll.on('change', function () {
  // 获取全选按钮当前的状态
  var status = $(this).prop('checked');
  if (status) {
    //显示批量删除按钮
    deleteMany.show();
  } else {
    // 隐藏批量删除按钮
    deleteMany.hide();
  };

  //获取所有的用户
  $('#userBox').find('input').prop('checked', status);
});

// 当用户前面的复选框发生了改变的时候
$('#userBox').on('change', '.userStatus', function () {
  //获取所有的用户和点击了复选框的用户数量是否相同 如果相同的话就是全部选中了 自动勾选全选按钮
  //这是点击后就能选出当前的所有用户的数量
  var inputs = $('#userBox').find('input');
  //  console.log(inputs);
  // 这是判断 当前选中的用户数量是否和全部的用户数量一致 如果一致就勾选全选按钮
  if (inputs.length == inputs.filter(':checked').length) {
    selectAll.prop('checked', true);
  } else {
    selectAll.prop('checked', false);
  };
  //如果选中的复选框大于0 那么说明有选中的复选框
  if (inputs.filter(':checked').length > 0) {
    //显示批量删除按钮
    deleteMany.show();
  } else {
    // 隐藏批量删除按钮
    deleteMany.hide();
  };
});

$(deleteMany).on('click' , function () {
    var arr = [];
    // 获取选中的用户
    var userChecked = $('#userBox').find('input').filter(':checked');
    console.log(userChecked);
    //循环复选框 得到data-id的值
    userChecked.each( function (index, ele) {
      arr.push($(ele).attr('data-id'));
      
    });
    arr.join('-');
    console.log(arr);
     if( confirm('确认批量删除吗')) {
       $.ajax({
          type: 'delete',
          url: '/users/' + arr.join('-'),
          success: function () {
            //刷新页面
            alert('删除成功');
            location.reload();

            
          },
          error: function () {
            alert('删除失败');
          }
       });
     };
    
});



