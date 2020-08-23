// electron-blink1-toy
// @todbot

"use strict";

const React = require('react');
const ReactDOM = require('react-dom');

const Row = require('react-bootstrap').Row;
const Col = require('react-bootstrap').Col;
const Container = require('react-bootstrap').Container;

const tinycolor = require('tinycolor2');

const Blink1 = require('node-blink1');

let blink1 = null;

let devices = Blink1.devices(); // returns array of serial numbers
if( devices.length ) { // have at least one blink(1) plugged in
    console.log("Found blink1 devices: ", devices);
    blink1 = new Blink1();
    blink1.fadeToRGB(100, 120,100,80 );
}
else {
  console.log("no blink1 devices found");
}

// on reload, release the blink1
window.onbeforeunload = (e) => {
  console.log('window is about to be closed/reloaded')
  if( blink1 ) { blink1.close() }
}

class Blink1ToyApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  changeColor(colorstr) {
    // console.log("changing blink1 color",evt, evt.target.value, JSON.stringify(evt.target));
    // var colorstr = evt.target.value;
    var c = tinycolor(colorstr).toRgb();
    if( blink1 ) {
      // blink1.fadeToRGB(100, 255,0,255 );
      blink1.fadeToRGB(100, c.r, c.g, c.b );
    }
  };


  render() {
    var self = this;

    var makeDevList = function() {
      if( !devices.length ) {
        return ( <h4> No blink(1) devices found. Insert blink(1) and restart app. </h4> );
      }
      return (
        <h4> blink(1) device found: <b>{devices[0]}</b></h4>
      );
    };

    var makeButton = function(colorstr) {
      return (
        <button type="button" style={{width:20, height:20, margin:5, background:colorstr}}
          onClick={self.changeColor.bind(null,colorstr)}/> // FIXME: don't quite understand the .bind(null,...)
        );
      };

    return (
        <Container style={{padding:25}}>
          <Row>
            <Col>
              <h1> Electron blink(1) Toy! </h1>
              {makeDevList()}
            </Col>
          </Row>

          <Row>
            <Col>
              <h3> Click to change color </h3>
              {makeButton('#000000')}
              {makeButton('#ff0000')}
              {makeButton('#00ff00')}
              {makeButton('#0000ff')}
              {makeButton('#ff00ff')}
              {makeButton('#00ffff')}
              {makeButton('#ffff00')}
              {makeButton('#ffffff')}
            </Col>
          </Row>
        </Container>
      );
  }

}

//ReactDOM.render(<App />, document.getElementById('app'))
ReactDOM.render(
  <Blink1ToyApp />,
  document.getElementById('app')
);
