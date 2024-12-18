document.addEventListener("mousemove", function(e) {
    // Create a sparkle element
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");

    sparkle.style.left = e.pageX+"px";
    sparkle.style.top = e.pageY+"px";

    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 1000);
});

$(document).ready(function() {
  $(".glow-img").hover(
    function() {
      $(this).animate({
        boxShadow: "0 0 15px #ffee2e, 0 0 30px #ffee2e",
        transform: "scale(1.05)" 
      }, 200);
    },
    function() {
      $(this).animate({
        boxShadow: "none",
        transform: "scale(1)" 
      }, 200);
    }
  );
});