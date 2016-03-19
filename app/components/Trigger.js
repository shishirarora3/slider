/**
 * Created by shishirarora on 16/03/16.
 */
import React, { PropTypes, Component }  from 'react';
import imageFactory from '../utils/data';
import Slider from './Slider';

class Trigger extends Component {
    constructor(props) {
        super(props);
        let imagesSlider1,images =  ['assets/loader.gif', 'assets/loader.gif', 'assets/loader.gif'];
        this.state = {
            imagesSlider2: images,
            imagesSlider1: images

        };
        imageFactory.setSource(props.source).next(5, (images)=> {
                imagesSlider1 = Trigger.makeCircular(images);
        }).next(5, (images)=> {
            this.setState({
                imagesSlider2: Trigger.makeCircular(images),
                imagesSlider1: imagesSlider1
            });
        });
    }

    static makeCircular( images ){
        images.push(images[0],images[1]);
        images.unshift(images[images.length-3]);
        return images;
    }
    render() {

        let {imagesSlider1,imagesSlider2 } = this.state;
        return (
            <div>
                <Slider
                    images={imagesSlider1}
                    className="mySlider"
                    noOfSlidesShown={2}
                    boundryIndexes = {[1,5]}
                    incrementTranslationUnits={1}
                />
                <Slider
                    images={imagesSlider2}
                    className="mySlider"
                    noOfSlidesShown={2}
                    boundryIndexes = {[1,5]}
                    incrementTranslationUnits={1}
                />
            </div>
        )
    }
}

export default Trigger
