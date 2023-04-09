$(function () {
  $("#btn-add-product").click(function () {
    if (
      !$("#productName").val() ||
      !$("#productPrice").val() ||
      !$("#productColor").val() ||
      !$("#productType").val() ||
      !$("#customerName").val()
    ) {
      $("#error").text("Please complete all fields");
      return false;
    }
  });
  $("#btn-add-user").click(function () {
    if (
      !$("#username").val() ||
      !$("#password").val() ||
      !$("#fullname").val()
    ) {
      $("#error").text("Please complete all fields");
      return false;
    } else {
      if (!$("#files").files) {
        $("#errorLogin").text("Vui lòng chọn avatar");
        return;
      }
    }
  });
});
