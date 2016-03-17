/**
 * Created by shishirarora on 16/03/16.
 */
import React, { PropTypes, Component }  from 'react';
import imageFactory from '../utils/data';
import Slider from './Slider';

class Trigger extends Component {
    constructor(props) {
        super(props);
        this.state ={
            images:['assets/loader.gif']
        };
        imageFactory.next(10, props.source,(images)=>{
            this.setState({
                images: images
            });
        });
    }


    render() {
        var  that =this;

            return (
                <Slider
                    images = {this.state.images}
                    className = "mySlider"
                    noOfSlidesShown = {2}
                    incrementTranslationUnits = {1}
                />
            )
    }
}

export default Trigger
