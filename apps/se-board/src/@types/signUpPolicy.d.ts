declare module "@types" {
  interface Nicknames {
    content: BannedNickname[];
  }

  interface BannedNickname {
    id: number;
    bannedNickname: string;
  }

  interface BannedIds {
    content: BannedId[];
  }

  interface BannedId {
    id: number;
    bannedId: string;
  }
}
