$('#loginOut').on('click', function () {
  // var conFirm = confirm('请问确认退出吗?');
  if(confirm('请问确认退出吗?')) {
    $.ajax({
      type: 'post',
      url: '/logout',
      success: function () {
        location.href = 'login.html';
      },
      error: function () {
        console.log('退出失败');
      }
    });
  };
});