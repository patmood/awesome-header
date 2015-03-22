
(function($) {
  var AwesomeHeader = function(el, options) {
    this.el = el
    this.floatHead = el.find('.float-head')
    this.config = {
      initHeight: 500 || options.initHeight,
      maxFontSize: 72 || options.maxFontSize,
      minFontSize: 18 || options.minFontSize
    }

    this.el.height(this.config.initHeight)
    this._scrollChange()
    $(window).on('scroll', this._scrollChange.bind(this))
  }

  AwesomeHeader.prototype = {
    constructor: AwesomeHeader,

    setFontSize: function(offset) {
      var newSize = Math.min(
        this.config.maxFontSize,
        this.floatHead.height()
      )

      newSize = Math.max(
        this.config.minFontSize,
        newSize
      )
      this.el.find('.text-container')
          .css('font-size', newSize + 'px')
    },

    setHeight: function(offset) {
      var newHeight = Math.max(this.config.initHeight - offset, 0)
      this.floatHead.height(newHeight)
    },

    _scrollChange: function() {
      var offset = this.floatHead.offset().top
      this.setHeight(offset)
      this.setFontSize(offset)
    }


  }

  $.fn.awesomeHeader = function(options) {
    return this.each(function(){
      var el = $(this)
      el.data('awesomeHeader', new AwesomeHeader(el, options))
    })
  }

  return AwesomeHeader
})(jQuery)


$(document).on('ready', function() {
  $('#header').awesomeHeader()
})
