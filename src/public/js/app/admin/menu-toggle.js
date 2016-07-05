function ready(fn) {
  if (document.readyState != "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

function toggleClass(el, className) {
  if (el.classList) {
    el.classList.toggle(className);
  } else {
    var classes = el.className.split(" ");
    var existingIndex = classes.indexOf(className);

    if (existingIndex >= 0) {
      classes.splice(existingIndex, 1);
    } else {
      classes.push(className);
    }

    el.className = classes.join(" ");
  }
}

ready(function () {
  var className = "toggled";
  var menuToggle = document.getElementById("menu-toggle");
  var wrapper = document.getElementById("wrapper");
  if (menuToggle != null && wrapper != null) {
    menuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      toggleClass(wrapper, className);
      toggleClass(menuToggle, "closed");
    });
  }
});

