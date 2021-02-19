import { WebClient, KnownBlock, Block } from "@slack/web-api";

export interface sectionArg {
  text:
    | string
    | {
        type: string;
        text: string;
      }[];
}

export interface buttonArg {
  text: string;
  color?: string;
  actionId: string;
}

export interface clubInfoArg {
  name: string;
  description: string;
  kibela: string;
  captainId: string;
  subCaptainId: string;
  membersId: {
    type: string;
    text: string;
  }[];
  buttons: buttonArg[];
}

export interface formArg {
  label: string;
  placeholder: string;
  actionId: string;
  blockId: string;
}

export interface modalArg {
  client: WebClient;
  botToken: string;
  triggerId: string;
  callbackId: string;
  title: string;
  blocks: (KnownBlock | Block)[];
  submit: string;
}
export type SectionArgType =
  | string
  | {
      type: string;
      text: string;
    }[];
