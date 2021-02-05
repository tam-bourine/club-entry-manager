export interface messageArg {
  clubInfo: {
    name: string,
    description: string,
    kibela: string,
    captainId: string,
    subCaptainId: string,
    membersId: string
  },
  collaboratorsId: messageArg[]
}