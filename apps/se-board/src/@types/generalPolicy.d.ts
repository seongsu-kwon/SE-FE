declare module "@types" {
  interface Ips {
    content: IpInfo[];
  }

  interface IpInfo {
    id: number;
    ipAddress: string;
  }
}
