var size = [0 , 0]
var scr = 0
var irchat = "<div class='ui-bar ui-bar-d Comfortaa' style='border-radius: inherit;'> sistema: Hola </div><br>"
let socket;
let players = {};
document.addEventListener("alpine:init", () => {
  Alpine.data("gamedata", () => ({
    score: scr,
    exit(){
      $.mobile.loading("show", {
        text: "cargando"
      })
      setTimeout(() => {
        window.location.href = "index.html"
      },1000)
    }
  }))
  Alpine.data("gamescn", () => ({
    lochat: irchat
  }))
})
function fillContent() {
  // Get the height of the current active page
  var activePage = $.mobile.activePage;
  var screen = $.mobile.getScreenHeight();
  var header = activePage.find(".ui-header").outerHeight() || 0;
  var footer = activePage.find(".ui-footer").outerHeight() || 0;
  // Get content padding (top + bottom) to ensure exact fit
  console.log(footer)
  var content = activePage.find(".ui-content");
  var padding = content.outerHeight() - content.height();
  size[0] = content.width()
  var contentHeight = screen - header - footer - padding;
  size[1] = contentHeight
  content.css("min-height", contentHeight + "px");
}
// Fire when a page is shown and whenever the window is resized
$(document).on("pageshow resize", function() {
  fillContent();
});

const app = Stage.mount({
  canvas: document.getElementById("container"),
})

app.viewbox(size[0], size[1])
