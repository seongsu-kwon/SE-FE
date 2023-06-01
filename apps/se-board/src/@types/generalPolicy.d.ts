declare module "@types" {
  interface Ips {
    ips: IpInfo[];
  }

  interface IpInfo {
    id: number;
    ipAddress: string;
  }
}
