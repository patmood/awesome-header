
(function($) {
  var AwesomeHeader = function(el, options) {
    this.el = el
    this.floatHead = el.find('.float-head')
    this.config = {
      minHeight: 50 || options.minHeight,
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

    setFontSize: function(percentEffect) {
      var fontDiff = this.config.maxFontSize - this.config.minFontSize
        , newSize = this.config.minFontSize + (fontDiff * percentEffect)
      this.el.find('.text-container')
          .css('font-size', newSize + 'px')
    },

    setHeight: function(percentEffect) {
      var newHeight = Math.max(this.config.initHeight * percentEffect, 0)
      this.floatHead.height(newHeight)
    },

    setCoverOpacity: function() {
      var opacity = this.floatHead.height() / this.config.initHeight
      this.el.find('.cover').css('opacity', opacity )
    },

    _scrollChange: function() {
      var offset = this.floatHead.offset().top
        , percentEffect = Math.max(1 - (offset / this.config.initHeight), 0)

      this.setHeight(percentEffect)
      this.setFontSize(percentEffect)
      this.setCoverOpacity()
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
