function HikeSlider(images, selector, noOfSlidesShown) {
    this.images = images;
    this.selector = selector;
    this.sliderIndex = 0;
    this.noOfSlidesShown = noOfSlidesShown;
    this.sliderLength = this.images.length;
    this.initializeSlider();
    this.firstClone = null;
    this.lastCone = null;
    this.sliderFrameLength = parseInt(this.sliderLength / this.noOfSlidesShown);

}





HikeSlider.prototype.initializeSlider = function() {
    


    //construction of DOM
    var that = this;
    (function(){
        var $slider = $("#" + this.selector);
        if ($slider.length > 0) {
            this.sliderItemWidth = (100 / this.sliderLength);
            $slider.empty();
            var $sliderContainer = $('<div class="slider"></div>');
            $slider.append($sliderContainer);
            $sliderContainer.append('<div class="round-button slider-prev"><div class="round-button-circle"><a href="javascript:void(0)" class="round-button">&lt;</a></div></div>');
            $sliderContainer.append('<div class="round-button slider-next"><div class="round-button-circle"><a href="javascript:void(0)" class="round-button">&gt;</a></div></div>');
            var $sliderList = $('<div class="slider-list"></div>');
            var $sliderTrack = $('<div class="slider-track"></div>');
            for (var i = 0; i < this.images.length; i++) {
                var $slide = $('<div class="slide"></div>');
                var $item = $('<div class="image-container"></div>');
                var $img = $('<img></img>');
                $img.attr('src', this.images[i]);
                $item.append($img);
                $slide.append($item);
                $sliderTrack.append($slide);
                $slide.css('width', this.sliderItemWidth + '%');
            }
            $sliderList.append($sliderTrack);
            $sliderContainer.append($sliderList);
            $sliderTrack.css('width', (this.sliderLength / this.noOfSlidesShown) * 100 + '%');

            this.sliderContent = $sliderTrack;
            this.firsItem = $($sliderTrack.children()[0]);
            this.lastItem = $($sliderTrack.children()[this.sliderLength - 1]);
        }
    }).call(that);

    //event handlers registered
        $('.slider-prev').on({
           'mousedown' : function(event) {
                            this.goLeft();
                            this.interval = setInterval(function() {
                                this.goLeft();
                            }.bind(this), 100);
                          }.bind(this),
            'mouseup': function(event) {
                            clearInterval(this.interval);
                        }.bind(that)
        });
        $('.slider-next').on({
           'mousedown' : function(event) {
                            this.goRight();
                            this.interval = setInterval(function() {
                                this.goRight();
                            }.bind(this), 100);
                          }.bind(this),
            'mouseup': function(event) {
                            clearInterval(this.interval);
                        }.bind(that)
        });
    
}

HikeSlider.prototype.goLeft = function() {
    if (this.isAnimation) {
        return;
    }
    this.isAnimation = true;
    var self = this;
    this.sliderIndex--;
    if (this.sliderIndex == -1) {
        this.sliderContent.addClass('transition--0');
        this.sliderLength += this.noOfSlidesShown;
        this.sliderItemWidth = 100 / this.sliderLength;
        for (var i = 0; i < this.noOfSlidesShown; i++) {
            var clone = $(this.sliderContent.children()[this.sliderContent.children().length - 1 - i]).clone();
            clone.addClass('clone');
            this.sliderContent.prepend(clone);
        }
        this.sliderContent.css('width', (this.sliderLength / this.noOfSlidesShown) * 100 + '%');
        this.lastClone = true;
        $.each(this.sliderContent.children(), function() {
            return $(this).css("width", self.sliderItemWidth + "%");
        });
        var t = -1 * (this.sliderIndex + 2) * this.sliderItemWidth * this.noOfSlidesShown;
        this.sliderContent.css('transform', 'translate3d(' + t + '%,0px,0px)');


        window.requestAnimationFrame(function() {
            t = 0;
            this.sliderContent.removeClass('transition--0');
            this.sliderContent.one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
                function() {

                    if (this.lastClone) {
                        this.lastClone = false;
                        this.sliderContent.addClass('transition--0');
                        this.sliderIndex = this.sliderFrameLength - 1;
                        $('.clone').remove();
                        this.sliderLength = this.sliderContent.children().length;
                        this.sliderItemWidth = 100 / this.sliderLength;
                        this.sliderContent.css('width', (this.sliderLength / this.noOfSlidesShown) * 100 + '%');
                        var t = -1 * this.sliderIndex * this.sliderItemWidth * this.noOfSlidesShown;
                        this.sliderContent.css('transform', 'translate3d(' + t + '%,0px,0px)');
                        $.each(this.sliderContent.children(), function() {
                            return $(this).css("width", self.sliderItemWidth + "%");
                        });
                        this.appendFirstFrameToSliderContent();
                        this.isAnimation = false;
                    }

                }.bind(this));
            this.sliderContent.css('transform', 'translate3d(' + t + '%,0px,0px)');
        }.bind(this));


    } else {
        var translationUnits = -1 * this.sliderIndex * this.sliderItemWidth * this.noOfSlidesShown;
        this.sliderContent.removeClass('transition--0');
        this.sliderContent.one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
            function() {
            	this.removeLastFrameFromSlider();
                this.isAnimation = false;
            }.bind(this));
        this.sliderContent.css('transform', 'translate3d(' + translationUnits + '%,0px,0px)');

        	
    

    }
}

HikeSlider.prototype.goRight = function() {
    if (this.isAnimation) {
        return;
    }
    this.isAnimation = true;
    this.sliderIndex++;
    var translationUnits = -1 * this.sliderIndex * this.sliderItemWidth * this.noOfSlidesShown;
    this.sliderContent.removeClass('transition--0');
    $(".slider-track").one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
        function() {
            var self = this;
            this.isAnimation = false;
            if (this.firstClone) {
                this.sliderIndex = 0;
                this.sliderContent.addClass('transition--0');
                $('.clone').remove();
                this.adjustSliderItemWidth();
                var t = -1 * this.sliderIndex * this.sliderItemWidth * this.noOfSlidesShown;
                this.sliderContent.css('transform', 'translate3d(' + t + '%,0px,0px)');
                $.each(this.sliderContent.children(), function() {
                    return $(this).css("width", self.sliderItemWidth + "%");
                });

                this.firstClone = false;
            }

            if (this.sliderIndex == this.sliderFrameLength - 1) {
                this.appendFirstFrameToSliderContent();

            }
        }.bind(this));
    $('.slider-track').css('transform', 'translate3d(' + translationUnits + '%,0px,0px)');

}

HikeSlider.prototype.appendFirstFrameToSliderContent = function() {
	var self = this;
    this.sliderLength += this.noOfSlidesShown;
    this.sliderItemWidth = 100 / this.sliderLength;
    for (var i = 0; i < this.noOfSlidesShown; i++) {
        var clone = $(this.sliderContent.children()[i]).clone();
        clone.addClass('clone');
        this.sliderContent.append(clone);
    }
    this.sliderContent.css('width', (this.sliderLength / this.noOfSlidesShown) * 100 + '%');
    this.firstClone = true;
    $.each(this.sliderContent.children(), function() {
        return $(this).css("width", self.sliderItemWidth + "%");
    });
    this.sliderContent.addClass('transition--0');
    var t = -1 * this.sliderIndex * this.sliderItemWidth * this.noOfSlidesShown;
    this.sliderContent.css('transform', 'translate3d(' + t + '%,0px,0px)');
}

HikeSlider.prototype.adjustSliderItemWidth = function () {
	                this.sliderLength = this.sliderContent.children().length;
                this.sliderItemWidth = 100 / this.sliderLength;
                this.sliderContent.css('width', (this.sliderLength / this.noOfSlidesShown) * 100 + '%');
}

HikeSlider.prototype.removeLastFrameFromSlider = function () {
	var $clones = $('.clone');
	var self = this;
	if ($clones.length) {
		$clones.remove();
		this.sliderContent.addClass('transition--0');
		this.adjustSliderItemWidth();
		$.each(this.sliderContent.children(), function() {
               return $(this).css("width", self.sliderItemWidth + "%");
         });
		this.firstClone = false;
		var t = -1 * this.sliderIndex * this.sliderItemWidth * this.noOfSlidesShown;
    this.sliderContent.css('transform', 'translate3d(' + t + '%,0px,0px)');
	}
}
