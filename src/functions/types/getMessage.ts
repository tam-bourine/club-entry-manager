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

export interface sectionArg {
  text:
    | string
    | {
        type: string;
        text: string;
      }[];
  textType?: string;
}
