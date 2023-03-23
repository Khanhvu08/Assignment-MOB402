$(function () {
    $('#btn-add-product').click(function () {
        if (!$('#email').val()) {
            $(".title").text('Vui lòng không để trống tài khoản')
            return false;
        }
        if (!$('#pwd').val()) {
            $(".title").text('Vui lòng không trống để mật khẩu')
            return false;
       }
    })
})