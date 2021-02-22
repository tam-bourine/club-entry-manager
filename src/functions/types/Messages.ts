import { WebClient, KnownBlock, Block } from "@slack/web-api";

export interface SectionArg {
  text:
    | string
    | {
        type: string;
        text: string;
      }[];
}

export interface ButtonArg {
  text: string;
  color?: string;
  actionId: string;
}

export interface ClubInfoArg {
  name: string;
  description: string;
  kibela: string;
  captainId: string;
  subCaptainId: string;
  membersId: {
    type: string;
    text: string;
  }[];
  buttons: ButtonArg[];
}

export interface FormArg {
  label: string;
  placeholder: string;
  actionId: string;
  blockId: string;
}

export interface ModalArg {
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
