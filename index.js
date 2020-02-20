const SerialPort = require('serialport');
//const Readline = require('@serialport/parser-readline');
const GPS = require('gps');
const express = require('express');

const PORT = 4000;

const port = new SerialPort('/dev/ttyAMA0', {baudRate: 9600});
//const parser = new Readline();
const gps = new GPS;

const app = express();

let gpsData = {};

port.on('data', data => {
    gps.updatePartial(data);
});

gps.on('data', ({lat, lon, time, speed, track}) => {
    gpsData = {lat, lon, time, speed, track};
    console.log(`time: ${time}, latitude: ${lat}, longitude: ${lon}, speed: ${speed}, track: ${track}`);
});

//this.port.pipe(parser);
app.get('/', async (req, res) => {
    res.send(gpsData);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
