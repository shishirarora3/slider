import React, { PropTypes, Component }  from 'react';


class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let props = this.props,
            {onMouseDownCb, onMouseUpCb, source, className} = props;
        return (

            <div className={"icon "+className} onMouseDown={onMouseDownCb} onMouseUp={onMouseUpCb}>
                <img src={source}/>
            </div>
        )
    }
}

export default Button
