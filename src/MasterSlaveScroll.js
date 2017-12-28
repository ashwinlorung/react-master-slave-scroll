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

        this.state = {
            slaveHeightPx: null,
            innerSlaveTop: 0,
            innerSlaveLeft: 0
        };

        this.handleScrollX = this.handleScrollX.bind(this);
    }

    componentWillMount () {
        const {fixRight} = this.props;

        this.slaveLeft = (fixRight)?"auto":0;
    }

    componentDidMount () {
        this.setSlaveHeight();
        this.bindScrollYListener();
        this.listenDidScrollY();
        this.bindScrollXListener();
    }

    setSlaveHeight = () => {
        const {height, toListenWindowScroll} = this.props;

        if(height && !toListenWindowScroll){
            this.setState({
                slaveHeightPx: this.viewportRef.clientHeight
            });
        }
    };

    bindScrollYListener = () => {
        const {toListenWindowScroll} = this.props;

        if (toListenWindowScroll) {
            window.addEventListener("scroll", this.handleScrollY);
            this.viewportHeight = window.innerHeight;
        }else{
            this.viewportRef.addEventListener("scroll", this.handleScrollY);
            this.viewportHeight = this.viewportRef.clientHeight;
        }
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
        const {toListenWindowScroll, onScrollY} = this.props;
        let scrollY = (toListenWindowScroll)?window.scrollY:this.viewportRef.scrollTop;

        if(scrollY === this.prevScrollY){
            return;
        }

        const innerSlaveTop = parseInt(this.state.innerSlaveTop);
        let isScrollDown = (scrollY > this.prevScrollY),
            scrollDiff = scrollY - this.prevScrollY,
            // innerSlaveTop = this.innerSlaveRef.offsetTop,
            newInnerSlaveTop = 0
        ;

        this.prevScrollY = scrollY;

        if(isScrollDown && (-innerSlaveTop + this.viewportHeight < this.innerSlaveRef.offsetHeight) ){
            newInnerSlaveTop = ((this.innerSlaveRef.scrollHeight + innerSlaveTop - scrollDiff - this.viewportHeight <= 0)? -(this.innerSlaveRef.scrollHeight - this.viewportHeight): (innerSlaveTop -scrollDiff))  + "px";
            this.setState({
                innerSlaveTop: newInnerSlaveTop
            });
        }else if(!isScrollDown && innerSlaveTop < 0){
            newInnerSlaveTop = (( (innerSlaveTop -scrollDiff) > 0 )?0:innerSlaveTop -scrollDiff) + "px";
            this.setState({
                innerSlaveTop: newInnerSlaveTop
            });
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
        const {toListenWindowScroll} = this.props;

        if(toListenWindowScroll){
            window.addEventListener("scroll", this.handleScrollX);
        }else{
            this.viewportRef.addEventListener("scroll", this.handleScrollX);
        }
    };

    handleScrollX () {
        const {toListenWindowScroll, onScrollX} = this.props;
        let scrollX = (toListenWindowScroll)?window.scrollX:this.viewportRef.scrollLeft;
        if(scrollX === this.prevScrollX){
            return;
        }

        this.prevScrollX = scrollX;
        this.setState({
            innerSlaveLeft: -scrollX + "px"
        });

        onScrollX();
    };

    render () {
        const {
                minWidthPx,
                maxWidthPx,
                slaveWidthPx,
                toListenWindowScroll,
                scrollAnimDuration,
                fixRight,
                height,
                children
            } = this.props,
            {
                slaveHeightPx,
                innerSlaveTop,
                innerSlaveLeft
            } = this.state,
            filteredChildren = React.Children.toArray(children).filter(c => !!c)
        ;

        let style={
            minWidth: minWidthPx,
            maxWidth: maxWidthPx,
            position: "relative",
            height: (toListenWindowScroll)?"auto":height,
            overflow: (toListenWindowScroll)?"":"auto"
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
    height: PropTypes.string,
    scrollYListenTimer: PropTypes.number,
    scrollAnimDuration: PropTypes.number,
    onScrollY: PropTypes.func,
    onScrollX: PropTypes.func
};

MasterSlaveScroll.defaultProps = {
    minWidthPx: "auto",
    toListenWindowScroll: true,
    fixRight: false,
    height: "100%",
    scrollYListenTimer: 50,
    scrollAnimDuration: 0.2,
    onScrollY: ()=>{},
    onScrollX: ()=>{}
};

MasterSlaveScroll.Master = Master;
MasterSlaveScroll.Slave = Slave;

export {Master, Slave};
export default MasterSlaveScroll;