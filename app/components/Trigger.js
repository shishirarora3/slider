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
        }
    }
    componentDidMount(){
        imageFactory.next(this.props.source,10).then((images)=>{
            this.state.images.push(...images);
        })
    }

    render() {
        imageFactory.next(10).then((images)=>{
            return (
                <Slider
                    images = {this.state.images}
                    className = "mySlider"
                    noOfSlidesShown = {2}
                    relativeTranslationUnits = {-1.5}
                    incrementTranslationUnits = {1}
                />
            )
        });

    }
}

export default Trigger
