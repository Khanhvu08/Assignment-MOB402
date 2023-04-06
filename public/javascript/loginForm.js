$(function () {
  $(".btn").click(function () {
    if (!$(".inputUsr").val()) {
      $("#errorLogin").text("Vui lòng không để trống email");
      return false;
    }
    if (!$(".inputPwd").val()) {
      $("#errorLogin").text("Vui lòng không để trống mật khẩu");
      return false;
    }
  });
  $("#errLG").fadeIn().delay(2000).fadeOut();
});
