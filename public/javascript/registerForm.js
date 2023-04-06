$(function () {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const regex = new RegExp("^[^\s@]+@[^\s@]+\.[^\s@]+$");

  $(".btn").click(function () {
    if (!$("#email").val()) {
      $("#errorLogin").text("Vui lòng không để trống tài khoản");
      return false;
    } else {
      if (!$("#email").val().match(regex)) {
        $("#errorLogin").text("Email không đúng định dạng");
        return false;
      }
    }
    if (!$("#pwd").val()) {
      $("#errorLogin").text("Vui lòng không trống để mật khẩu");
      return false;
    }
    if (!$("#files").files) {
        $("#errorLogin").text("Vui lòng chọn avatar");
        return;
      }
  })
});
