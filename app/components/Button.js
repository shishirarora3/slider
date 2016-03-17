
import React, { PropTypes, Component }  from 'react';


class Button extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let props = this.props,
            {onMouseDownCb,onMouseUpCb,
                content,className} = props;
        return (

                    <div className={"round-button "+className} onMouseDown = {onMouseDownCb} onMouseUp = {onMouseUpCb}>
                        <div className="round-button-circle">
                            <a href="javascript:void(0)" className="round-button">{content}</a>
                        </div>
                    </div>
                )
    }
}

export default Button
