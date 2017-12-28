import React from "react";
import ReactDom from "react-dom";
import MasterSlaveScroll, {Master, Slave} from "./MasterSlaveScroll";
import "./index.css"

ReactDom.render(
    <React.Fragment>
        <div style={{height: "60px"}}>
        </div>
        <MasterSlaveScroll
            minWidthPx={700}
            slaveWidthPx={300}
            height={"60vh"}
            toListenWindowScroll={true}
            fixRight={false}
            scrollAnimDuration={0}
            scrollYListenTimer={0}
            onScrollY={({scrollY, scrollDiff})=>{console.log("ScrollY call back invoked : "+scrollY+", "+scrollDiff);}}
            onScrollX={()=>console.log("ScrollX invoked")}
        >
            <Slave
            >
                <div style={{background:"red"}}>
                    <p>paragraph 1</p>
                    <p>paragraph 2</p>
                    <p>paragraph 3</p>
                    <p>paragraph 4</p>
                    <p>paragraph 5</p>
                    <p>paragraph 6</p>
                    <p>paragraph 7</p>
                    <p>paragraph 8</p>
                    <p>paragraph 9</p>
                    <p>paragraph 10</p>
                    <p>paragraph 11</p>
                    <p>paragraph 12</p>
                    <p>paragraph 13</p>
                    <p>paragraph 14</p>
                    <p>paragraph 15</p>
                    <p>paragraph 16</p>
                    <p>paragraph 17</p>
                    <p>paragraph 18</p>
                    <p>paragraph 19</p>
                    <p>paragraph 20</p>
                    <p>paragraph 21</p>
                    <p>paragraph 22</p>
                    <p>paragraph 23</p>
                    <p>paragraph 24</p>
                    <p onClick={()=>alert("click fired")}>paragraph 25</p>

                </div>
            </Slave>

            <Master>
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro">
                    </p>
                </div>

                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro">
                    </p>
                </div>

                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro">
                    </p>
                </div>

                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro">
                    </p>
                </div>
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro">
                    </p>
                </div>

                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro">
                    </p>
                </div>

                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro">
                    </p>
                </div>

                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro">
                    </p>
                </div>
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro">
                    </p>
                </div>

                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro">
                    </p>
                </div>

                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro">
                    </p>
                </div>

                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro">
                    </p>
                </div>
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro">
                    </p>
                </div>

                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro">
                    </p>
                </div>

                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro">
                    </p>
                </div>

                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro">
                    </p>
                </div>
            </Master>
        </MasterSlaveScroll>
    </React.Fragment>,
    document.getElementById("root")
);