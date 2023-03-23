$(function () {
    $('.btn').click(function () {
        if (!$('.inputUsr').val()) {
            $(".title").text('Vui lòng không để trống tài khoản')
            return false;
        }
        if (!$('.inputPwd').val()) {
            $(".title").text('Vui lòng không để mật khẩu')
            return false;
        }
    })
})