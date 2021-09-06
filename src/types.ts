export interface LinkStation {
  x: number,
  y: number,
  reach: number
}

export interface FoundLinkStation {
  linkStation: LinkStation | undefined,
  device: Device,
  power: number
}

export interface Device {
  x: number,
  y: number
}
