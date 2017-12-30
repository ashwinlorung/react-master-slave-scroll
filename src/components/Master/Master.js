import React, {Component} from "react";
import PropTypes from "prop-types";


class Master extends Component {
    constructor (props) {
        super(props);

    }

    componentDidMount () {
        const {setReference} = this.props;

        setReference("master", this.ref);
    }

    render () {
        const {slaveWidthPx, fixRight} = this.props;

        let style = {
            width: "calc(100% - "+ slaveWidthPx +"px)",
            position: "relative",
            right: 0,
            left: (fixRight)?0: slaveWidthPx,
            top: 0,
            boxSizing: "border-box"
        };

        return (
            <div ref={el=>this.ref=el}
                 style={style}
            >
                {this.props.children}
            </div>
        );
    }
}

Master.propTypes = {
};

export default Master;