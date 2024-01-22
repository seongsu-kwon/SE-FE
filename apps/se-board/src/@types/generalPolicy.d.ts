declare module "@types" {
  interface Ips {
    content: IpInfo[];
  }

  interface IpInfo {
    id: number;
    ipAddress: string;
  }

  interface SpamKeyword {
    id: number;
    word: string;
  }

  interface AdminIP {
    id: number;
    ipAddress: string;
  }
}
