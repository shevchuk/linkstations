"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var compute_power_1 = require("./src/compute-power");
var devices_1 = require("./data/devices");
var link_stations_1 = require("./data/link-stations");
function convertLinkStations(inputLinkStations) {
    return inputLinkStations.map(function (input) {
        return {
            x: input[0],
            y: input[1],
            reach: input[2]
        };
    });
}
function convertDevice(input) {
    return {
        x: input[0],
        y: input[1]
    };
}
function processData() {
    devices_1.devices
        .map(function (inputDevice) {
        return (0, compute_power_1.findSuitableLinkStation)(convertLinkStations(link_stations_1.linkStations), convertDevice(inputDevice));
    })
        .map(compute_power_1.printFoundLinkStation);
}
processData();
