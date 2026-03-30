(function () {
  // Wait for the DOM to fully load
  document.addEventListener("DOMContentLoaded", function () {
    // WhatsApp button hover functionality
    const whatsappButton = document.querySelector(".whatsapp-button");
    if (whatsappButton) {
      whatsappButton.addEventListener("mouseenter", () => {
        console.log("Hovering over WhatsApp button!");
      });

      whatsappButton.addEventListener("mouseleave", () => {
        console.log("Left the WhatsApp button!");
      });
    }

    // Cookie popup functionality
    const cookiePopup = document.getElementById("cookiePopup");
    if (cookiePopup && !localStorage.getItem("cookiesAccepted")) {
      cookiePopup.style.display = "block";
    }

    // Attach global functions for cookie actions
    window.acceptCookies = function () {
      localStorage.setItem("cookiesAccepted", "true");
      closePopup();
    };

    window.rejectCookies = function () {
      localStorage.setItem("cookiesAccepted", "false");
      closePopup();
      console.log("Cookies have been rejected.");
    };

    window.closePopup = function () {
      if (cookiePopup) cookiePopup.style.display = "none";
    };
  });
})();

$(document).ready(function (e) {
  if ($("#experience").length > 0 && window.innerWidth > 768) {
    $(window).scroll(function () {
      const experiencePosition = $("#experience").offset().top;
      if ($(this).scrollTop() >= experiencePosition) {
        $(".subnav").addClass("visible");
        $(".header").addClass("hidden");
      } else {
        $(".subnav").removeClass("visible");
        $(".header").removeClass("hidden");
      }
    });
  } 
  // Smooth scroll to sections for all nav links
  $(".subnav .nav-link, .back-to-top").on("click", function (event) {
    event.preventDefault();
    const targetId = $(this).attr("href");
    $("html, body").animate(
      {
        scrollTop: $(targetId).offset().top,
      },
      800
    );
  });
  $(".nav-link.no-current").on("click", function (event) {
    $(".nav-mobile-wrap").fadeOut();
   // event.preventDefault();
    const targetId = $(this).attr("href");
    $("html, body").animate(
      {
        scrollTop: $(targetId).offset().top,
      },
      800
    );
  });
  $("form.was-validated input").change(function () {
    mhao_validate($(this));
  });
  $("form.was-validated input").focusout(function () {
    mhao_validate($(this));
  });
  $("body").on("keyup", "form.was-validated input", function () {
    mhao_validate($(this));
  });
  $(".mhao_form_validate input").focus(function () {
    var form_group = $(this).parents(".form-group");
    if (!form_group.hasClass("focused")) {
      form_group.addClass("focused");
    }
  });

  // reCAPTCHA v3 integration:
  // If the widget didn't create `g-recaptcha-response`, execute and inject it before submitting.
  function ensureRecaptchaToken(form) {
    return new Promise(function (resolve) {
      try {
        var existing = form.find("input[name='g-recaptcha-response']").val();
        if (existing && existing.length > 0) return resolve();

        var widget = form.find(".g-recaptcha").first();
        var siteKey = widget.attr("data-sitekey");
        if (
          !siteKey ||
          !window.grecaptcha ||
          typeof window.grecaptcha.execute !== "function"
        ) {
          return resolve();
        }

        window.grecaptcha.ready(function () {
          try {
            var promise = window.grecaptcha.execute(siteKey, {
              action: "submit",
            });
            if (promise && typeof promise.then === "function") {
              promise
                .then(function (token) {
                  var input = form.find(
                    "input[name='g-recaptcha-response']"
                  );
                  if (!input.length) {
                    input = $("<input>")
                      .attr("type", "hidden")
                      .attr("name", "g-recaptcha-response")
                      .appendTo(form);
                  }
                  input.val(token);
                  resolve();
                })
                .catch(function () {
                  resolve();
                });
            } else {
              resolve();
            }
          } catch (err) {
            resolve();
          }
        });
      } catch (e) {
        resolve();
      }
    });
  }

  $("#contact_form").submit(function () {
    let form = $(this);
    if (form_validate(form)) {
      ensureRecaptchaToken(form).then(function () {
        mhero_form_submit(form, function () {
          location.replace(_mhao.base_url + "contact-us/thankyou");
        });
      });
    }
    return false;
  });
  $("#subscription_form").submit(function () {
    let form = $(this);
    if (form.hasClass("processing")) {
      return false;
    }
    if (!isEmail(form.find("input[name=email]").val())) {
      form
        .find(".input_notify")
        .text("Please enter a valid email address")
        .slideDown(300);
      return false;
    }
    form.addClass("processing");
    form.find(".input_notify").text("").slideUp(0);
    let form_data = form.serializeArray();
    form_data.push({ name: "source", value: 0 });
    $.ajax({
      url: _unanu.base_url + "user/subscription",
      data: form_data,
      type: "POST",
      success: function (response) {
        response = $.parseJSON(response);
        if (response.status == "success") {
          form
            .find("button, input")
            .prop("readonly", true)
            .prop("disabled", true);
        }
        form.find(".input_notify").text(response.message).slideDown(300);
      },
      error: function () {
        form
          .find(".input_notify")
          .text("Something went wrong! Try again later")
          .slideDown(300);
      },
    });
    return false;
  });
});
function objfilter(e) {
  let t = $("#objfilter_form"),
    i = $("#objfilter_form input")
      .filter(function (e, t) {
        return "" != $(t).val();
      })
      .serialize();
  i = decodeURI(i);
  let n = t.attr("action") + "?" + i;
  window.history.pushState("filter", "", n),
    $.get(n + "&filter=1", null, function (e) {
      $("#story_grid").html(e).slideUp(1).fadeIn("600");
    });
}
function aint(e = 0) {
  return (
    (e = e.toString().replace(/[^0-9.]/g, "")) || (e = 0), (e = parseInt(e))
  );
}
function aintm(e = 0) {
  return parseInt(e, 10);
}
function afloat(e = 0) {
  return (
    (e = e
      .toString()
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1")) || (e = 0),
    (e = parseFloat(e))
  );
}
function isEmail(e) {
  return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
    e
  );
}
function isName(e) {
  return /^(?:[\u0009-\u000D\u001C-\u007E\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){0,30}$/.test(
    e
  );
}
function isPhone(e) {
  return /^(?:\+966|00966|966)?0?5[0-9]{8}$/.test(e);
}
function _isPhone(e) {
  return /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g.test(e);
}
function isPassword(e) {
  return e.length >= 8;
}
function form_validate(e) {
  var t = !0;
  return (
    e.find("input").each(function () {
      mhao_validate($(this)) && (t = !1);
    }),
    e.addClass("was-validated"),
    t
  );
}
function mhao_validate(e) {
  let t = !1,
    i = e.attr("name"),
    n = e.val();
  return (
    "mhero_honeypot" != i &&
    "subscribe" != i &&
    !e.hasClass("empty") &&
    ("name" == i
      ? isName(n)
        ? (e.get(0).setCustomValidity(""), e.parent().removeClass("error"))
        : (e.get(0).setCustomValidity("Your name required (only characters)"),
          e.parent().addClass("error focused"),
          (t = !0))
      : "email" == i
      ? isEmail(n)
        ? (e.get(0).setCustomValidity(""), e.parent().removeClass("error"))
        : (e.get(0).setCustomValidity("A valid email is required"),
          e.parent().addClass("error focused"),
          (t = !0))
      : "phone" == i
      ? isPhone(n)
        ? (e.parent().removeClass("error"), e.get(0).setCustomValidity(""))
        : (e.get(0).setCustomValidity("A valid KSA phone number is required"),
          e.parent().addClass("error focused"),
          (t = !0))
      : "password" == i
      ? isPassword(n)
        ? (e.parent().removeClass("error"), e.get(0).setCustomValidity(""))
        : (e.get(0).setCustomValidity("Minimum 8 characters required"),
          e.parent().addClass("error focused"),
          (t = !0))
      : "" == e.val()
      ? (e.get(0).setCustomValidity("Please type here"),
        e.parent().addClass("error focused"),
        (t = !0))
      : (e.parent().removeClass("error"), e.get(0).setCustomValidity("")),
    t)
  );
}
function mhero_form_submit(e, t = null, i = null) {
  let n = e.serializeArray();
  e.find("label").addClass("disabled"),
    e.find("input").attr("readonly", "readonly").attr("disabled", "disabled"),
    e.find("button").attr("disabled", "disabled"),
    e.find("#loader").removeClass("d-none");
  $.post(e.attr("action"), n, function (n) {
    e.find("#loader").addClass("d-none");
    "success" == (n = $.parseJSON(n)).result
      ? (e.find("input[name=mhero_honeypot]").val("done"),
        e
          .find(".notifications .light")
          .removeClass("error-message")
          .addClass("success-message"),
        e[0].reset(),
        null != t && t(n))
      : (e.find("label").removeClass("disabled"),
        e.find("input, button").removeAttr("readonly").removeAttr("disabled"),
        null != i && i(n)),
      e.find(".notifications .light").html(n.message),
      e.find(".notifications").slideDown(300, function () {
        setTimeout(() => {
          $(".notifications").slideUp(300);
        }, 5e3);
      });
  });
}
