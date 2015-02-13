(function(){
  jQuery.fn.extend({
    resizable: function(options){
      var settings = {
        maxWidth: null,
        maxHeight: null,
        minWidth: null,
        minHeight: null,
        container: ""
      }; 

      $.extend(settings, options);

      var $this = $(this);

      var $resizeIcon = $("<span></span>").addClass("resizable-icon").appendTo($this);

      $resizeIcon.on("mousedown", function(){
        $(document).on("mousemove", function(e){
          e.preventDefault();
          var coordX = $this.offset().top;
          var coordY = $this.offset().left;
          var pageX = e.pageX || e.offsetX;
          var pageY = e.pageY || e.offsetY;

          var height = pageY - coordY,
            width = pageX - coordX;

          var maxHeight = settings.maxHeight,
            minHeight = settings.minHeight,
            maxWidth = settings.maxWidth,
            minWidth = settings.minWidth;

          if(maxHeight){
            maxHeight = settings.container?Math.min(maxHeight, $(settings.container).height()):maxHeight,
          } else if(settings.container) {
            maxHeight = $(settings.container).height();
          }

          if(maxWidth) {
            maxWidth = settings.container?Math.min(maxWidth, $(settings.container).width()):maxWidth;
          }else if(settings.container) {
            maxWidth = $(settings.container).width();
          }

          height = maxHeight?Math.min(maxHeight, height) : height;
          height = minHeight?Math.max(minHeight, height) : height;
          width = maxWidth?Math.min(maxWidth, width) : width;
          width = minWidth?Math.max(minWidth, width) : width;

          $this.css({width: width, height: height});
        });

        $(document).on("mouseup", function(){
          $(document).off("mousemove");
        });
      });
    }
  });
})(jQuery);