(function () {
  "use strict";

  angular.module("praesto.admin")
    .component("multiSelect", {
      templateUrl: "js/app/admin/components/multiselect/multiselect.html",
      controller: MultiSelectController,
      bindings: {
        items: "=",
        options: "@",
        multiple: "@",
        compareBy: "@",
        scrollAfterRows: "@",
        filterAfterRows: "@",
        tabIndex: "@",
        onSelect: "&"
      }
    });

  MultiSelectController.$inject = ["$document"];

  function MultiSelectController($document) {
    var that = this;

    that.init = function () {
      that.isVisible = false;
      that.isOpen = false;
      that.items = [];
      that.ulStyle = {};
      if (that.scrollAfterRows !== undefined && parseInt(that.scrollAfterRows).toString() === that.scrollAfterRows) {
        that.ulStyle = { "max-height": (that.scrollAfterRows * 26 + 14) + "px", "overflow-y": "auto", "overflow-x": "hidden" };
      }
    };

    var elementMatchesAnyInArray = function (element, elementArray) {
      for (var i = 0; i < elementArray.length; i++) {
        if (element === elementArray[i]) {
          return true;
        }
      }
      return false;
    };

    var clickHandler = function (event) {
      if (elementMatchesAnyInArray(event.target, $document[0].querySelectorAll(event.target.tagName))) {
        return;
      }
      that.isOpen = false;
      $document.unbind("click", clickHandler);
    };

    that.toggleSelect = function () {
      if (that.isOpen) {
        that.filter = "";
        that.isOpen = false;
        $document.unbind("click", clickHandler);
      } else {
        that.filter = "";
        that.isOpen = true;
        $document.bind("click", clickHandler);
      }
    };

    that.init();
  }
})();
