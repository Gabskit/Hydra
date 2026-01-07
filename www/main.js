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
    Alpine.data('lobbyHydraria', () => ({
    role: 'none',
    count: 1,
    max: 4,
    setupHost() {
      this.role = 'host';
      networkinterface.getWiFiIPAddress((ip) => {
        // Guardamos la IP para el juego, pero no la mostramos
        localStorage.setItem('serverIP', ip);
        
        // Generamos el QR automáticamente
        new QRCode(document.getElementById("qrcode"), {
            text: ip + ":8080",
            width: 128,
            height: 128
        });

        // Iniciamos el servidor intermedio en este teléfono
        wsserver.start(8080, {
          'onMessage': (conn, msg) => { 
            wsserver.broadcast(msg); 
            this.count = wsserver.connections.length;
          }
        });
      });
    },

    setupClient() {
      // Abre la cámara del móvil para escanear al Host
      cordova.plugins.barcodeScanner.scan(
        (result) => {
          if(!result.cancelled) {
            localStorage.setItem('serverIP', result.text); // Recibe la IP del QR
            $.mobile.changePage("game.html");
          }
        },
        (error) => { alert("Error al escanear: " + error); }
      );
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
