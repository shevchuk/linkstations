import { findSuitableLinkStation, printFoundLinkStation } from "./src/compute-power";

import { Device, FoundLinkStation, LinkStation } from "./src/types";

import { devices } from "./data/devices";
import { linkStations } from "./data/link-stations";

function convertLinkStations(inputLinkStations:number[][]):LinkStation[] {
  return inputLinkStations.map(input => {
    return {
      x: input[0],
      y: input[1],
      reach: input[2]
    }
  });
}

function convertDevice(input:number[]):Device {
  return {
    x: input[0],
    y: input[1]
  }
}

function processData() {
  devices
    .map(inputDevice =>
      findSuitableLinkStation(
        convertLinkStations(linkStations),
        convertDevice(inputDevice)))
    .map(printFoundLinkStation)
}

processData()
