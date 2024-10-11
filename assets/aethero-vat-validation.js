document.addEventListener("DOMContentLoaded", function(event) {
  let scriptElement = document.createElement("script");
  scriptElement.setAttribute("src", "https://app.esyncer.com/js/eulift_cart_billing.js?v=" + Math.floor(Math.random() * 100000000));
  document.body.appendChild(scriptElement);
});

function ShowVATinput() {
        var radioyes = document.getElementById("radioyes");
        var textinput = document.getElementById("vatInput");
        textinput.style.display = radioyes.checked ? "block" : "none";
}




