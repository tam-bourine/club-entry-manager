import { WebClient, KnownBlock, Block } from "@slack/web-api"

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
    button: {
      text: string;
      color: string;
      action_id: string;
    }[]
  };
}

export interface sectionArg {
  text:
    | string
    | {
        type: string;
        text: string;
      }[];
}

export interface buttonArg {
  buttonOptions: {
    text: string;
    color?: string;
    action_id: string;
  }[]
}

export interface formArg {
  label: string;
  placeholder: string;
  actionId: string;
  blockId: string;
}

export interface modalArg {
  modalInfo: {
    client: WebClient;
    botToken: string;
    triggerId: string;
    callbackId: string;
    title: string;
    blocks: (KnownBlock | Block)[];
    submit: string;
  }
}