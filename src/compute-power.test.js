"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var compute_power_1 = require("./compute-power");
describe('finding suitable linkstation for devices in different locations', function () {
    test('finds linkstation which is in the same place as device', function () {
        var linkStations = [
            {
                x: 100,
                y: 100,
                reach: 10
            }
        ];
        var device = {
            x: 100,
            y: 100
        };
        var actualLinkStation = (0, compute_power_1.findSuitableLinkStation)(linkStations, device);
        expect(actualLinkStation).toStrictEqual({
            linkStation: linkStations[0],
            device: device,
            power: 100
        });
    });
    test('doesn\'t find linkstation that is out of reach', function () {
        var linkStations = [
            {
                x: 100,
                y: 100,
                reach: 10
            }
        ];
        var device = {
            x: 50,
            y: 50
        };
        var actualLinkStation = (0, compute_power_1.findSuitableLinkStation)(linkStations, device);
        expect(actualLinkStation.linkStation).toBe(undefined);
    });
    test('finds link station that is closer to the device', function () {
        var linkStations = [
            {
                x: 150,
                y: 150,
                reach: 50
            },
            {
                x: 100,
                y: 100,
                reach: 50
            }
        ];
        var device = {
            x: 110,
            y: 110
        };
        var actualLinkStation = (0, compute_power_1.findSuitableLinkStation)(linkStations, device);
        expect(actualLinkStation).toEqual(expect.objectContaining({
            linkStation: linkStations[1] // this one is closer
        }));
    });
    test('power is correctly calculated', function () {
        var linkStations = [
            {
                x: 1,
                y: 1,
                reach: 4
            }
        ];
        var device = {
            x: 2,
            y: 2
        };
        var actualLinkStation = (0, compute_power_1.findSuitableLinkStation)(linkStations, device);
        // the formula is (reach - sqrt((d.x - ls.x) ^ 2 + (d.y - ls.y) ^ 2)) ^ 2
        expect(actualLinkStation).toEqual(expect.objectContaining({
            power: 6.69
        }));
    });
});
