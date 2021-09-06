import { findSuitableLinkStation } from "./compute-power";
import { Device, FoundLinkStation, LinkStation } from "./types";

describe('finding suitable linkstation for devices in different locations', () => {
  test('finds linkstation which is in the same place as device', () => {
    const linkStations: LinkStation[] = [
      {
        x: 100,
        y: 100,
        reach: 10
      }
    ];

    const device: Device = {
      x: 100,
      y: 100
    };

    const actualLinkStation: FoundLinkStation = findSuitableLinkStation(linkStations, device);

    expect(actualLinkStation).toStrictEqual({
      linkStation: linkStations[0],
      device,
      power: 100
    })
  });
  test('doesn\'t find linkstation that is out of reach', () => {
    const linkStations: LinkStation[] = [
      {
        x: 100,
        y: 100,
        reach: 10
      }
    ];

    const device: Device = {
      x: 50,
      y: 50
    };

    const actualLinkStation: FoundLinkStation = findSuitableLinkStation(linkStations, device);

    expect(actualLinkStation.linkStation).toBe(undefined)
  });
  test('finds link station that is closer to the device', () => {
    const linkStations: LinkStation[] = [
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

    const device: Device = {
      x: 110,
      y: 110
    };

    const actualLinkStation: FoundLinkStation = findSuitableLinkStation(linkStations, device);

    expect(actualLinkStation).toEqual(
      expect.objectContaining({
        linkStation: linkStations[1] // this one is closer
      })
    )
  });
  test('power is correctly calculated', () => {
    const linkStations: LinkStation[] = [
      {
        x: 1,
        y: 1,
        reach: 4
      }
    ];

    const device: Device = {
      x: 2,
      y: 2
    };

    const actualLinkStation: FoundLinkStation = findSuitableLinkStation(linkStations, device);

    // the formula is (reach - sqrt((d.x - ls.x) ^ 2 + (d.y - ls.y) ^ 2)) ^ 2
    expect(actualLinkStation).toEqual(
      expect.objectContaining({
        power: 6.69
      })
    )
  })
});
