import React, {Component, Children, cloneElement} from "react";
import PropTypes from "prop-types";
import Master from "./components/Master/Master";
import Slave from "./components/Slave/Slave";

class MasterSlaveScroll extends Component {
    constructor (props) {
        super(props);

        this.didScrollY = false;
        this.prevScrollY = 0;
        this.prevScrollX = 0;
        this.topGutter = 0;

        this.state = {
            slaveHeightPx: null,
            slaveTop: 0,
            innerSlaveTop: 0,
            innerSlaveLeft: 0
        };

        this.handleScrollX = this.handleScrollX.bind(this);
    }

    componentWillMount () {

    }

    componentDidMount () {
        this.setSlaveHeight();
        this.bindScrollYListener();
        this.listenDidScrollY();
        this.bindScrollXListener();
    }

    setSlaveHeight = () => {

        this.setState({
            slaveHeightPx: "calc(100vh - "+ this.viewportRef.offsetTop + "px)"
        });
        this.topGutter = this.viewportRef.offsetTop;
    };

    bindScrollYListener = () => {
        window.addEventListener("scroll", this.handleScrollY);
    };

    handleScrollY = () => {
        this.didScrollY = true;
    };

    listenDidScrollY = () => {
        const {scrollYListenTimer} = this.props;
        setInterval(()=>{
            if(this.didScrollY){
                this.didScrollY = false;
                this.onDidScrollY();
            }
        }, scrollYListenTimer);
    };

    onDidScrollY = () => {
        let scrollY = window.scrollY;

        if(scrollY === this.prevScrollY){
            return;
        }

        const {slaveTop} = this.state,
            {onScrollY} = this.props
        ;

        const innerSlaveTop = this.state.innerSlaveTop;
        let isScrollDown = (scrollY > this.prevScrollY),
            scrollDiff = scrollY - this.prevScrollY,
            newInnerSlaveTop = 0,
            newSlaveTop = 0,
            viewportHeight = window.innerHeight,
            slaveScrollHeight = this.innerSlaveRef.scrollHeight,
            slaveOffsetHeight = this.innerSlaveRef.offsetHeight,
            remainingMasterToScroll = this.masterRef.scrollHeight - scrollY - viewportHeight
        ;

        this.prevScrollY = scrollY;

        if(isScrollDown){
            if(-innerSlaveTop + viewportHeight < slaveOffsetHeight + this.topGutter){
                newInnerSlaveTop = (
                    (slaveScrollHeight + innerSlaveTop - scrollDiff - viewportHeight  + this.topGutter <= 0)
                        ? -(slaveScrollHeight - viewportHeight + this.topGutter)
                        : (innerSlaveTop -scrollDiff)
                    )
                ;
                this.setState({
                    innerSlaveTop: newInnerSlaveTop
                });
            }else if(remainingMasterToScroll < 0){
                newSlaveTop = newSlaveTop + (remainingMasterToScroll + this.topGutter);
                this.setState({
                    slaveTop: newSlaveTop
                });
            }
        }else if(!isScrollDown){
            if( slaveTop < 0){
                newSlaveTop = (slaveTop - scrollDiff > 0)?0:(slaveTop - scrollDiff);
                this.setState({
                    slaveTop: newSlaveTop
                });
            }else if(innerSlaveTop < 0){
                newInnerSlaveTop = (( (innerSlaveTop -scrollDiff) > 0 )?0:innerSlaveTop -scrollDiff);
                this.setState({
                    innerSlaveTop: newInnerSlaveTop
                });
            }

        }

        onScrollY({scrollY, scrollDiff});
    };

    setReference = (child, ref) => {
        switch (child) {
            case "master":
                this.masterRef = ref;
                break;
            case "slave":
                this.slaveRef = ref;
                break;
            case "innerSlave":
                this.innerSlaveRef = ref;
                break;
        }
    };

    bindScrollXListener = () => {
        window.addEventListener("scroll", this.handleScrollX);
    };

    handleScrollX () {
        const {onScrollX} = this.props;
        let scrollX = window.scrollX;
        if(scrollX === this.prevScrollX){
            return;
        }

        this.prevScrollX = scrollX;
        this.setState({
            innerSlaveLeft: -scrollX
        });

        onScrollX();
    };

    render () {
        const {
                minWidthPx,
                maxWidthPx,
                slaveWidthPx,
                scrollAnimDuration,
                fixRight,
                children
            } = this.props,
            {
                slaveTop,
                slaveHeightPx,
                innerSlaveTop,
                innerSlaveLeft
            } = this.state,
            filteredChildren = React.Children.toArray(children).filter(c => !!c)
        ;

        let style={
            minWidth: minWidthPx,
            maxWidth: maxWidthPx,
            position: "relative"
        };

        return (
            <div ref={el=>this.viewportRef=el}
                 style={style}
            >
                {
                    Children.map(filteredChildren, (child, index) => {
                        if (!child) {
                            return null;
                        }
                        const childProps = {
                            slaveWidthPx: slaveWidthPx,
                            slaveHeightPx: slaveHeightPx,
                            slaveTop: slaveTop,
                            slaveLeft: this.slaveLeft,
                            fixRight: fixRight,
                            innerSlaveTop: innerSlaveTop,
                            innerSlaveLeft: innerSlaveLeft,
                            setReference: this.setReference,
                            scrollAnimDuration: scrollAnimDuration,
                            ...child.props
                        };

                        return cloneElement(child, childProps);
                    })
                }
            </div>
        );
    }
}

MasterSlaveScroll.propTypes = {
    minWidthPx: PropTypes.number,
    slaveWidthPx: PropTypes.number.isRequired,
    toListenWindowScroll: PropTypes.bool,
    top: PropTypes.number,
    scrollYListenTimer: PropTypes.number,
    scrollAnimDuration: PropTypes.number,
    onScrollY: PropTypes.func,
    onScrollX: PropTypes.func
};

MasterSlaveScroll.defaultProps = {
    minWidthPx: "auto",
    toListenWindowScroll: true,
    fixRight: false,
    scrollYListenTimer: 25,
    scrollAnimDuration: 0.05,
    onScrollY: ()=>{},
    onScrollX: ()=>{}
};

MasterSlaveScroll.Master = Master;
MasterSlaveScroll.Slave = Slave;

export {Master, Slave};
export default MasterSlaveScroll;