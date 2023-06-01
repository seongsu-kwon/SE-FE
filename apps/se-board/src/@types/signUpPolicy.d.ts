declare module "@types" {
  interface Nicknames {
    nicknames: BannedNickname[];
  }

  interface BannedNickname {
    id: number;
    bannedNickname: string;
  }

  interface BannedIds {
    bannedIds: BannedId[];
  }

  interface BannedId {
    id: number;
    bannedId: string;
  }
}
