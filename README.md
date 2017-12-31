# react-master-slave-scroll

`MasterSlaveScroll` is a React component allowing users to create a fixed side menu whcich is longer than the viewport and scrolls along with the main page in sync.

## Demo
A Demo is available [here](http://ashwinrai.com/work/MasterSlaveScrollDemo/MasterSlaveScrollDemo.html).

## Installation

1. Install `react-master-slave-scroll` using npm (or [yarn]). `npm install react-master-slave-scroll`
2. Import `react-master-slave-scroll` to use `MasterSlaveScroll, Master and Slave` components.

## Usage

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import MasterSlaveScroll, {Master, Slave} from 'react-master-slave-scroll';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MasterSlaveScroll
          slaveWidthPx={300}
      >
          <Slave>
              <div style={{background:"red", height:"130vh"}}>
                  <p>top</p>
                  <p style={{position:"absolute", bottom:"0"}}>bottom</p>
              </div>
          </Slave>

          <Master>
              <div style={{background:"yellow", height: "160vh"}}></div>
          </Master>
      </MasterSlaveScroll>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

## API

### MasterSlaveScroll#props

#### minWidthPx: number

Set `min-width` attribute to msaterslavesroll component.

#### slaveWidthPx: number

Set `width` attribute to slave component.

#### scrollYListenTimer: number

Set scroll listener delay in milliseconds.

#### scrollAnimDuration: number

Set animation duration for slave scroll in milliseconds.

#### onScrollY: func

This function is called on vertical scroll.

#### onScrollX: func

This function is called on horizontal scroll.



Contributions are welcome. :)

[yarn]: https://yarnpkg.com/
