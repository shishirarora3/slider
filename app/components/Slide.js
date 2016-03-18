import React, { PropTypes, Component }  from 'react';


class Slide extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let props = this.props,
            {imgSrc,sliderLength,key} = props,
            sliderItemWidth = 100 / sliderLength,
            slideStyle = {
                width: sliderItemWidth + '%'
            };
        return (

            <div className="slide" style={slideStyle} key={key}>
                <div className="image-container">
                    <img src={imgSrc}/>
                </div>
            </div>
        )
    }
}

export default Slide
