/**
 * Created by shishirarora on 16/03/16.
 */
import React, { PropTypes, Component }  from 'react';
import imageFactory from '../utils/data';
import Slider from './Slider';

class Trigger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: ['assets/loader.gif']
        };
        imageFactory.setSource(props.source).next(5, (images)=> {

            this.setState({
                imagesSlider1: this.makeCircular(images)
            });
        }).next(5, (images)=> {
            this.setState({
                imagesSlider2: this.makeCircular(images)
            });
        });
    }

    makeCircular( images ){
        images.push(images[0]);
        images.unshift(images[images.length-2]);
        return images;
    }
    render() {
        var that = this;

        return (
            <div>
                <Slider
                    images={this.state.imagesSlider1}
                    className="mySlider"
                    noOfSlidesShown={2}
                    incrementTranslationUnits={1}
                />
                <Slider
                    images={this.state.imagesSlider2}
                    className="mySlider"
                    noOfSlidesShown={2}
                    incrementTranslationUnits={1}
                />
            </div>
        )
    }
}

export default Trigger
