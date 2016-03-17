
import React, { PropTypes, Component }  from 'react';
import Slide from './Slide';
import Button from './Button';
class Slider extends Component {
    constructor(props) {
        super(props);
        let {images} = props,
            sliderLength = images.length,

            sliderItemWidth = 100 / sliderLength,
            relativeTranslationUnits= parseInt(sliderItemWidth/2);
        this.sliderIndex = 0;
        this.state = {
            translationUnits : -relativeTranslationUnits,
            relativeTranslationUnits: relativeTranslationUnits
        };
    }
    getTranslationUnits(isLeft){
        let props = this.props,
            {images, incrementTranslationUnits} = props,
            sliderLength = images.length,
            sliderItemWidth = 100 / sliderLength,
            translationUnits,

            relativeTranslationUnits = this.state.relativeTranslationUnits ;

        var sign,
            calculator = {
                true: function(){
                    this.sliderIndex-=incrementTranslationUnits;
                }.bind(this),
                false: function(){
                    this.sliderIndex+=incrementTranslationUnits;
                }.bind(this)
            };
        calculator[isLeft]();

        if(this.sliderIndex>= sliderLength-1){
            this.sliderIndex = 0;
        }else if( this.sliderIndex<0){
            this.sliderIndex = sliderLength-1;
        }
        translationUnits = (-1 * this.sliderIndex * sliderItemWidth ) - relativeTranslationUnits;

        return translationUnits;

    }
    updateSlider(isLeft){
        var that =this;
        if(this.mouseIsDown && !this.isAnimation){
            requestAnimationFrame( this.updateSlider.bind(that, isLeft) );
        }else{
            return false;
        }
        var translationUnits = this.getTranslationUnits(isLeft);
        this.setState({'translationUnits': translationUnits});
        this.isAnimation = true;
        }
    onMouseDown(isLeft, e){
        if(!this.mouseIsDown && !this.isAnimation){
            this.mouseIsDown = true;
            this.interval = setInterval(function(){
                requestAnimationFrame(this.updateSlider.bind(this,isLeft));
            }.bind(this),10);
        }
    }
    onMouseUp( e){
        this.mouseIsDown = false;
        clearInterval(this.interval);
    }
    onTransitionEnd(){
        this.isAnimation = false;
    }
    componentDidUpdate() {
        this._sliderTrack.addEventListener('transitionend', this.onTransitionEnd.bind(this), false);
    }
    componentWillReceiveProps(nextProps) {
        let {images} = nextProps,
            sliderLength = images.length,
            sliderItemWidth = 100 / sliderLength,
            relativeTranslationUnits = sliderItemWidth/2;
        this.setState({
            translationUnits : -relativeTranslationUnits,
            relativeTranslationUnits: relativeTranslationUnits
        });

    }
    render() {
        let props = this.props,
            {images,noOfSlidesShown} = props,
            sliderLength = images.length,

            sliderTrackWidth = (sliderLength/noOfSlidesShown)* 100 + '%',
            {translationUnits} = this.state,
            sliderTrackStyle = {
                width: sliderTrackWidth,
                transform:'translate3d('+translationUnits+'%,0px,0px)'

            };
        const renderButton = (isLeft, className, content)=>{
            return (
                <Button className={className}
                        onMouseDownCb = {this.onMouseDown.bind(this, isLeft)}
                        onMouseUpCb = {this.onMouseUp.bind(this)}
                        content = {content}/>
            )
        };
        return (
            <div id="mySlider">
                <div className="slider">
                    {renderButton(false, 'slider-next', '>')}
                    {renderButton(true, 'slider-prev', '<')}


                    <div className="slider-list">
                        <div className="slider-track" style={sliderTrackStyle} ref={(c) => this._sliderTrack = c}>

                            {images.map(function(imgSrc,i){
                                return <Slide imgSrc ={imgSrc} key={"image-"+i} sliderLength={sliderLength} />;
                            })}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
Slider.propTypes = { images: React.PropTypes.array,
    noOfSlidesShown: React.PropTypes.number};
Slider.defaultProps = { images: [],
    noOfSlidesShown:3};
export default Slider
