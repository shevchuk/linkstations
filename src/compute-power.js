"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printFoundLinkStation = exports.findSuitableLinkStation = void 0;
function calculatePower(linkStation, device) {
    var distance = Math.sqrt(Math.pow(linkStation.x - device.x, 2) + Math.pow(linkStation.y - device.y, 2));
    var power = distance > linkStation.reach ?
        0 : Math.pow(linkStation.reach - distance, 2);
    var powerRounded = Math.round(power * 100) / 100;
    return {
        linkStation: power === 0 ? undefined : linkStation,
        device: device,
        power: powerRounded
    };
}
function findSuitableLinkStation(linkStations, device) {
    var found = linkStations
        .map(function (linkStation) { return calculatePower(linkStation, device); })
        .sort(function (a, b) { return b.power - a.power; });
    return found[0];
}
exports.findSuitableLinkStation = findSuitableLinkStation;
function printFoundLinkStation(foundLinkStation) {
    var devicePoint = foundLinkStation.device.x + ',' + foundLinkStation.device.y;
    if (foundLinkStation.linkStation) {
        var stationPoint = foundLinkStation.linkStation.x + ',' + foundLinkStation.linkStation.y;
        console.log("Best link station for point " + devicePoint + " is " + stationPoint + " with power " + foundLinkStation.power);
    }
    else {
        console.log("No link station within reach for point " + devicePoint);
    }
}
exports.printFoundLinkStation = printFoundLinkStation;
