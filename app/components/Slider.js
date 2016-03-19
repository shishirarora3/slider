import React, { PropTypes, Component }  from 'react';
import Slide from './Slide';
import Button from './Button';
class Slider extends Component {
    constructor(props) {
        super(props);
        let {images} = props,
            sliderLength = images.length,
            sliderItemWidth = 100 / sliderLength,
            relativeTranslationUnits = parseInt(sliderItemWidth / 2);
        this.state = {
            translationUnits: -relativeTranslationUnits,
            relativeTranslationUnits,
            noTransition: true
        };
        this.initiateAutoPlay();
    }
    initiateAutoPlay(){
        clearInterval(this.intervalAutoPlay);
        this.intervalAutoPlay = setInterval(()=>{
            this.onMouseUp.call(this);
            this.transitionDelay = true;
            setTimeout(()=>this.onMouseDown.call(this,{
                isLeft: false,
                isUserInitiated: false
            }),30);
        },200);
    }
    calculateNewIndex({isLeft,sliderIndex = 0, incrementTranslationUnits}){
        return {
            true: () => sliderIndex - incrementTranslationUnits,
            false: () => sliderIndex + incrementTranslationUnits
        }[isLeft]();
    }
    setTranslationUnits(isLeft) {
        let props = this.props,
            {images, incrementTranslationUnits} = props,
            sliderLength = images.length,//5 + 2 shadow images = 7
            startIndex = 0,//0
            endIndex = sliderLength- 3,//4
            sliderItemWidth = 100 / sliderLength,
            translationUnits,
            noTransition = false,
            relativeTranslationUnits = this.state.relativeTranslationUnits;

        this.sliderIndex = this.calculateNewIndex({
            isLeft,
            sliderIndex: this.sliderIndex,
            incrementTranslationUnits
        });

        /**
         * jerk at end to take to initial poition of slider with no animation.
         * slider goes from index startIndex=0 to index endIndex=4 and then repeats.
         * index -1 and 5 remain
         * hidden for circular feel
         * **/
        if (this.sliderIndex >= endIndex + 1) {
            this.sliderIndex = startIndex;
            this.onTransitionEnd();
            this.clearQueue();
            noTransition = true;
        } else if (this.sliderIndex <= startIndex-1) {
            this.sliderIndex = endIndex;
            noTransition = true;
            this.clearQueue();
            this.onTransitionEnd();
        } else {
            this.isAnimation = true;
        }
        translationUnits = (-1 * this.sliderIndex * sliderItemWidth ) - relativeTranslationUnits;

        this.setState({
            noTransition: noTransition,
            translationUnits: translationUnits
        });

    }

    updateSlider({isLeft}) {
        let that = this,
            {mouseIsDown,isAnimation, setTranslationUnits} = this;
        if (mouseIsDown && !isAnimation) {
            that.raf = requestAnimationFrame(that.updateSlider.bind(that, {isLeft}));
        } else {
            return false;
        }
        this.setTranslationUnits(isLeft);
    }
    autoPlayIfWaitElapsed(){
        this.lastMouseDownTimestamp = new Date();
        clearTimeout( this.mouseDowntimeStampTimeout );
        this.mouseDowntimeStampTimeout = setTimeout(()=>{
            let currentTimeStamp = new Date(),
                timeElapsed;
            timeElapsed = Math.round((currentTimeStamp.getTime() - this.lastMouseDownTimestamp.getTime() ));
            timeElapsed > 1000 && this.initiateAutoPlay();
        },2000);
    }
    onMouseDown({isLeft, isUserInitiated}, e) {

        if(isUserInitiated){
            clearInterval(this.intervalAutoPlay);
            this.autoPlayIfWaitElapsed();
            this.clearQueue();
            this.transitionDelay = false;
            this.isAnimation = false;
        }
        if (!this.mouseIsDown && !this.isAnimation) {
            this.mouseIsDown = true;
            this.interval = setInterval(function () {
                this.rafLoop = requestAnimationFrame(this.updateSlider.bind(this, {isLeft}));
            }.bind(this), 10);
        }
    }

    onMouseUp(e) {
        this.mouseIsDown = false;
        this.clearQueue();
    }
    clearQueue(){
        clearInterval(this.interval);
        cancelAnimationFrame(this.rafLoop);
        cancelAnimationFrame(this.raf);
    }
    onTransitionEnd() {
        this.isAnimation = false;
    }

    componentDidUpdate() {
        this._sliderTrack.addEventListener('transitionend', this.onTransitionEnd.bind(this), false);
    }

    componentWillReceiveProps(nextProps) {
        let {images} = nextProps,
            sliderLength = images.length,
            sliderItemWidth = 100 / sliderLength,
            relativeTranslationUnits = sliderItemWidth / 2;
        this.setState({
            translationUnits: -relativeTranslationUnits,
            relativeTranslationUnits: relativeTranslationUnits,
            noTransition: true
        });
    }

    render() {

        let props = this.props,
            {images,noOfSlidesShown} = props,
            sliderLength = images.length,

            sliderTrackWidth = (sliderLength / noOfSlidesShown) * 100 + '%',
            {translationUnits, noTransition} = this.state,
            sliderTrackStyle = {
                width: sliderTrackWidth,
                transform: 'translate3d(' + translationUnits + '%,0px,0px)',
                transitionDelay : this.transitionDelay?'1.5s':'0s'
            };
        const renderButton = ({isLeft, className, source})=> {
            return (
                <Button className={className}
                        onMouseDownCb={this.onMouseDown.bind(this, {
                            isLeft,
                            isUserInitiated: true
                         })}
                        onMouseUpCb={this.onMouseUp.bind(this, {
                            isUserInitiated: true
                        })}
                        source={source}/>
            )
        };
        return (
            <div id="mySlider">
                <div className="slider">
                    {
                        renderButton({
                        isLeft: false,
                        className: 'slider-next',
                        source:'https://static1.spuul.com/assets/images/icon_chevron_right-bd9598fa29.png'
                    })}
                    {
                        renderButton({
                        isLeft: true,
                        className: 'slider-prev',
                        source:'https://static1.spuul.com/assets/images/icon_chevron_left-8f8a035c1b.png'
                    })}
                    <div className="slider-list">
                        <div className={"slider-track " + (noTransition?"transition--0":'')} style={sliderTrackStyle}
                             ref={(c) => this._sliderTrack = c}>

                            {
                                images.map(function (imgSrc, i) {
                                return <Slide imgSrc={imgSrc} key={"image-"+i} sliderLength={sliderLength}/>;
                            })}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
Slider.propTypes = {
    images: React.PropTypes.array,
    noOfSlidesShown: React.PropTypes.number
};
Slider.defaultProps = {
    images: [],
    noOfSlidesShown: 3
};
export default Slider
