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
                            if(!this.mouseIsDown && !this.isAnimation){
                                this.mouseIsDown = true;
                                this.interval = setInterval(function(){
                                    requestAnimationFrame(this.updateSlider.bind(this,true));
                                }.bind(this),10);
                                
                            }   
                          }.bind(this),
            'mouseup': function(event) {
                        this.mouseIsDown = false;
                        clearInterval(this.interval);
                    }.bind(this)
        });
        $('.slider-next').on({
           'mousedown' : function(event) {
                            if(!this.mouseIsDown && !this.isAnimation){
                                this.mouseIsDown = true;
                                this.interval = setInterval(function(){
                                    requestAnimationFrame(this.updateSlider.bind(this,false));
                                }.bind(this),10);
                                
                            }  
                          }.bind(this),
            'mouseup': function(event) {
                            this.mouseIsDown = false;
                            clearInterval(this.interval);
                        }.bind(this)
        });
        this.sliderContent.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',function(){
                 this.isAnimation = false;
            }.bind(this));
    
}

HikeSlider.prototype.getTranslationUnits = function(isLeft){
    var sign, 
    calculator = {
        true: function(){
            this.sliderIndex--;
            sign = -1;
        }.bind(this),
        false: function(){
            this.sliderIndex++;
            sign = -1;
        }.bind(this)
    };
    calculator[isLeft]();
    
    if(this.sliderIndex>= this.sliderFrameLength-1){
        //this.sliderContent .addClass('transition--0');
        this.sliderIndex = 0;
    }else if( this.sliderIndex<0){
        //this.sliderContent .addClass('transition--0');
        this.sliderIndex = this.sliderFrameLength-1;
    }
    
    return sign * this.sliderIndex * this.sliderItemWidth * this.noOfSlidesShown;
}

HikeSlider.prototype.updateSlider = function(isLeft){
            var that =this;
            //this.sliderContent .removeClass('transition--0');
            if(this.mouseIsDown && !this.isAnimation){
                    requestAnimationFrame( HikeSlider.prototype.updateSlider.bind(that, isLeft) );
                    
                    
            }else{
                return false;
            }
            var translationUnits = this.getTranslationUnits(isLeft);
            this.isAnimation = true;
            this.sliderContent .css('transform', 'translate3d(' + translationUnits + '%,0px,0px)');
            
        
}


