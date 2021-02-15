export interface messageArg {
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

export type sectionArgType =
  | string
  | {
      type: string;
      text: string;
    }[];
