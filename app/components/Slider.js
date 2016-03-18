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
            relativeTranslationUnits: relativeTranslationUnits,
            noTransition: true
        };
    }

    setTranslationUnits(isLeft) {
        let props = this.props,
            {images, incrementTranslationUnits, boundryIndexes} = props,
            [startIndex,endIndex] = boundryIndexes,
            sliderLength = images.length,
            sliderItemWidth = 100 / sliderLength,
            translationUnits,
            noTransition = false,
            relativeTranslationUnits = this.state.relativeTranslationUnits;
        this.sliderIndex = this.sliderIndex || 0;
        var calculator = {
            true: function () {
                this.sliderIndex -= incrementTranslationUnits;
            }.bind(this),
            false: function () {
                this.sliderIndex += incrementTranslationUnits;
            }.bind(this)
        };

        calculator[isLeft]();
        if (this.sliderIndex >= endIndex) {
            this.sliderIndex = 0;
            this.isAnimation = false;
            noTransition = true;
        } else if (this.sliderIndex < startIndex) {
            this.sliderIndex = endIndex;
            noTransition = true;
            this.isAnimation = false;
        } else {
            this.isAnimation = true;
        }
        console.log(this.sliderIndex);
        translationUnits = (-1 * this.sliderIndex * sliderItemWidth ) - relativeTranslationUnits;
        this.setState({
            noTransition: noTransition,
            translationUnits: translationUnits
        });
    }

    updateSlider(isLeft) {
        var that = this;
        if (this.mouseIsDown && !this.isAnimation) {
            requestAnimationFrame(this.updateSlider.bind(that, isLeft));
        } else {
            return false;
        }
        this.setTranslationUnits(isLeft);

    }

    onMouseDown(isLeft, e) {
        if (!this.mouseIsDown && !this.isAnimation) {
            this.mouseIsDown = true;
            this.interval = setInterval(function () {
                requestAnimationFrame(this.updateSlider.bind(this, isLeft));
            }.bind(this), 10);
        }
    }

    onMouseUp(e) {
        this.mouseIsDown = false;
        clearInterval(this.interval);
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
                transform: 'translate3d(' + translationUnits + '%,0px,0px)'
            };
        const renderButton = (isLeft, className, source)=> {
            return (
                <Button className={className}
                        onMouseDownCb={this.onMouseDown.bind(this, isLeft)}
                        onMouseUpCb={this.onMouseUp.bind(this)}
                        source={source}/>
            )
        };
        return (
            <div id="mySlider">
                <div className="slider">
                    {renderButton(false, 'slider-next', 'https://static1.spuul.com/assets/images/icon_chevron_right-bd9598fa29.png')}
                    {renderButton(true, 'slider-prev', 'https://static1.spuul.com/assets/images/icon_chevron_left-8f8a035c1b.png')}

                    <div className="slider-list">
                        <div className={"slider-track " + (noTransition?"transition--0":'')} style={sliderTrackStyle}
                             ref={(c) => this._sliderTrack = c}>

                            {images.map(function (imgSrc, i) {
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
