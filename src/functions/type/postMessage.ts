export interface messageArg {
  clubInfo: {
    name: string,
    description: string,
    kibela: string,
    captainId: string,
    subCaptainId: string,
    membersId: {
      type: string, text: string
    }[]
  }
}