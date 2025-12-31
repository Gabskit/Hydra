var cash = 50

document.addEventListener("alpine:init", () => {
    Alpine.data("datos", () => ({
        money: cash,
        change(){
            $.mobile.loading("show", {
                text: "Cargando"
            })
            setTimeout(() => {
                window.location.href = "game.html"
            },1000)
        },
        exit(){
            if (navigator.app && navigator.app.exitApp) {
        // Cierra la aplicación en Android
        navigator.app.exitApp();
    } else if (navigator.device && navigator.device.exitApp) {
        // Alternativa para versiones antiguas
        navigator.device.exitApp();
    } else {
        // Si estás en un navegador normal, usa el método estándar
        window.close();
    }
        }
    }))
    
})

function fillContent() {
    // Get the height of the current active page
    var activePage = $.mobile.activePage;
    
    var screen = $.mobile.getScreenHeight();
    var header = activePage.find(".ui-header").outerHeight() || 0;
    var footer = activePage.find(".ui-footer").outerHeight() || 0;
    
    // Get content padding (top + bottom) to ensure exact fit
    var content = activePage.find(".ui-content");
    var padding = content.outerHeight() - content.height();
    
    var contentHeight = screen - header - footer - padding;
    
    content.css("min-height", contentHeight + "px");
}

// Fire when a page is shown and whenever the window is resized
$(document).on("pageshow resize", function() {
    fillContent();
});
