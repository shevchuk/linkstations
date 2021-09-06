import { Device, FoundLinkStation, LinkStation } from "./types";

function calculatePower(linkStation:LinkStation, device:Device): FoundLinkStation {
  const distance = Math.sqrt(Math.pow(linkStation.x - device.x, 2) + Math.pow(linkStation.y - device.y, 2));

  const power = distance > linkStation.reach ?
    0 : Math.pow(linkStation.reach - distance, 2);

  const powerRounded = Math.round(power*100)/100;

  return {
    linkStation: power === 0 ? undefined : linkStation,
    device,
    power: powerRounded
  }
}

export function findSuitableLinkStation(linkStations: LinkStation[], device: Device): FoundLinkStation {
  const found = linkStations
    .map(linkStation => calculatePower(linkStation, device))
    .sort((a, b) => b.power - a.power)

  return found[0];
}

export function printFoundLinkStation(foundLinkStation: FoundLinkStation): void {
  const devicePoint = foundLinkStation.device.x + ',' + foundLinkStation.device.y;

  if (foundLinkStation.linkStation) {
    const stationPoint = foundLinkStation.linkStation.x + ',' + foundLinkStation.linkStation.y;
    console.log(`Best link station for point ${devicePoint} is ${stationPoint} with power ${foundLinkStation.power}`)
  } else {
    console.log(`No link station within reach for point ${devicePoint}`)
  }
}

