export interface ClubInfoArg {
  clubInfo: {
    name: string;
    description: string;
    kibela: string;
    captainId: string;
    subCaptainId: string;
    membersId: {
      type: string;
      text: string;
    }[];
  };
}

export type SectionArgType =
  | string
  | {
      type: string;
      text: string;
    }[];
