export interface Device {
  type: string;
  serialNumber: string;
  owner?: string;
  profileId?: string;
  organizationId: string;
  gatewayType?: number;
  gatewayId?: string;
  gatewayVer?: string;
  deviceType?: string;
  deviceId?: string;
  extensionId?: string;
  imei?: string;
  simId?: string;
  active: boolean;
}

