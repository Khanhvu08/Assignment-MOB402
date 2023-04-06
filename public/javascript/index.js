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

});
