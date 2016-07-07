
"use strict";

var React = require('react');
var ReactDOM = require('react-dom');

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Grid = require('react-bootstrap').Grid;
// var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
// var Button = require('react-bootstrap').Button;
// var Input = require('react-bootstrap').Input;
var tinycolor = require('tinycolor2');

var Blink1 = require('node-blink1');

var devices = Blink1.devices(); // returns array of serial numbers
var blink1 = null;
if( devices.length ) { // have at least one blink(1) plugged in
    console.log("Found blink1 devices: ", devices);
    blink1 = new Blink1();
    blink1.fadeToRGB(100, 0,0,0 );
}

var App = React.createClass({

    getInitialState: function() {
        return {
        };
    },
    changeColor: function(colorstr) {
        // console.log("changing blink1 color",evt, evt.target.value, JSON.stringify(evt.target));
        // var colorstr = evt.target.value;
        var c = tinycolor(colorstr).toRgb();

        if( blink1 ) {
            // blink1.fadeToRGB(100, 255,0,255 );
            blink1.fadeToRGB(100, c.r, c.g, c.b );
        }
    },

    render: function() {
        var self = this;
        var makeDevList = function() {
            if( !devices.length ) {
                return ( <h4> No blink(1) devices found </h4> );
            }
            return (
                <h4> blink(1) device found: <b>{devices[0]}</b></h4>
            );
        };
        var makeButton = function(colorstr) {
            return (
                <button type="button" style={{width:20, height:20, background:colorstr}}
                    onClick={self.changeColor.bind(null,colorstr)}/> // FIXME: don't quite understand the .bind(null,...)
            );
        };
        return (
            <Grid>
                <Row>
                   <h1> Electron Blink(1) Toy! </h1>
                </Row>
                <Row>
                    {makeDevList()}
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
            </Grid>
        );
    }
});

ReactDOM.render( <App />,  document.getElementById('example') );