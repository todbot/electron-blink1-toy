// electron-blink1-toy
// @todbot

import React from 'react';
import Button from 'react-bootstrap/Button';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

import tinycolor from 'tinycolor2'

import Blink1 from 'node-blink1'

let blink1 = null;
let blink1s = Blink1.devices() // returns array of serial numbers

// on reload, release the blink1
window.onbeforeunload = (e) => {
  console.log('window is about to be closed/reloaded')
  if( blink1 ) { blink1.close() }
}

function blink1_rescan() {
  if( blink1 ) { blink1.close(); blink1 = null }
  blink1s = Blink1.devices() // returns array of serial numbers
  if( blink1s.length ) { // have at least one blink(1) plugged in
    console.log("Found blink1 devices: ", blink1s);
    blink1 = new Blink1();
    blink1.fadeToRGB(100, 80,80,80 );
  }
  else {
    console.log("no blink1 devices found");
  }
}

export default class Blink1Toy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blink1_serial: 0, // blink1_serial,  // unused but reminder to self
    }
    this.handleRescan = this.handleRescan.bind(this)
    this.changeColor = this.changeColor.bind(this)

  }
  componentDidMount() {
    this.handleRescan()
  }

  handleRescan() {
    console.log("rescan!")
    blink1_rescan()

    let blink1_serial = 0
    if( blink1 ) { blink1_serial = blink1s[0] }
    this.setState({ blink1_serial: blink1_serial })

  }

  changeColor(colorstr) {
    console.log("changing blink1 color",colorstr);
    // console.log("changing blink1 color",evt, evt.target.value, JSON.stringify(evt.target));
    // var colorstr = evt.target.value;
    var c = tinycolor(colorstr).toRgb();
    if( blink1 ) {
      // blink1.fadeToRGB(100, 255,0,255 );
      blink1.fadeToRGB(100, c.r, c.g, c.b )
    }
  }

  render() {
    var self = this;

    var makeDevList = function() {
      let msg = <h4> No blink(1) devices found </h4>
      if( self.state.blink1_serial != 0 ) {
        msg = <h4> blink(1) device found: {self.state.blink1_serial} </h4>
      }
      return( msg )
    }

    var makeButton = function(colorstr) {
      return (
        <button type="button" style={{width:40, height:40, margin:5, background:colorstr}}
          onClick={() => self.changeColor(colorstr)}/>
        )
        // onClick={self.changeColor.bind(null,colorstr)}/> // FIXME: don't quite understand the .bind(null,...)
      }

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

          <Row>
            <Col>
              <button type="button" onClick={this.handleRescan}> Rescan </button>
            </Col>
          </Row>

        </Container>
      )
  }

}
