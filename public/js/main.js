(function ($) {
  "use strict";
  console.log("hello World");
  const payLoad = [
    {
      imgUrl:
        "https://www.howtogeek.com/wp-content/uploads/2021/01/windows_hello_hero_2.jpg?width=1198&trim=1,1&bg-color=000&pad=1,1",
    },
    {
      imgUrl:
        "https://cdn.shopify.com/s/files/1/1190/4748/t/10/assets/logo.png?v=5439823434889869121",
    },
    {
      imgUrl:
        "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg",
    },
  ];
  $("#content-container").append(
    `<div><img src="${payLoad[0].imgUrl}"/></div>`
  );
  /*==================================================================*/
  $("#sign-up-btn").on("click", function () {
    $("#sign-up-form").show();
    $("#log-in-form").hide();
  });

  $("#log-in-btn").on("click", function () {
    $("#log-in-form").show();
    $("#sign-up-form").hide();
  });
  /*==================================================================
    [ Focus input ]*/
  $(".input100").each(function () {
    $(this).on("blur", function () {
      if ($(this).val().trim() != "") {
        $(this).addClass("has-val");
      } else {
        $(this).removeClass("has-val");
      }
    });
  });

  /*==================================================================
    [ Validate ]*/
  var input = $(".validate-input .input100");

  $(".validate-form").on("submit", function () {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }

    return check;
  });

  $(".validate-form .input100").each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });

  function validate(input) {
    if ($(input).attr("type") == "email" || $(input).attr("name") == "email") {
      if (
        $(input)
          .val()
          .trim()
          .match(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
          ) == null
      ) {
        return false;
      }
    } else {
      if ($(input).val().trim() == "") {
        return false;
      }
    }
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass("alert-validate");
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass("alert-validate");
  }

  /*==================================================================
    [ Show pass ]*/
  var showPass = 0;
  $(".btn-show-pass").on("click", function () {
    if (showPass == 0) {
      $(this).next("input").attr("type", "text");
      $(this).find("i").removeClass("zmdi-eye");
      $(this).find("i").addClass("zmdi-eye-off");
      showPass = 1;
    } else {
      $(this).next("input").attr("type", "password");
      $(this).find("i").addClass("zmdi-eye");
      $(this).find("i").removeClass("zmdi-eye-off");
      showPass = 0;
    }
  });
})(jQuery);
