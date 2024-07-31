


document.addEventListener('DOMContentLoaded', function() {
    // Funkce pro změnu textu tlačítka
    function changeButtonText() {
        var button = document.querySelector('.shopify-payment-button__more-options');
        if (button) {
            button.textContent = 'Další platební možnosti';
        }
    }

    // Nejprve zkusíme změnit text ihned
    changeButtonText();

    // Nastavení MutationObserver pro sledování změn v DOM
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                changeButtonText();
            }
        });
    });

    // Začneme sledovat celý dokument pro změny
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Volitelně: zastavíme observer po určité době (např. 10 sekund)
    setTimeout(function() {
        observer.disconnect();
    }, 10000);
});
