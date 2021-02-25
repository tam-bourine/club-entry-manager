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
  value: string;
}

export interface ClubInfoArg {
  name: string;
  description: string;
  budgetUse: string;
  channelId: string;
  captainId: string;
  membersId: {
    type: string;
    text: string;
  }[];
  kibela: string;
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

export interface Option {
  text: string;
  value: string;
}

export interface StaticSelectArg {
  label: string;
  options: Option[];
  actionId: string;
  blockId: string;
  initialOption: Option;
}

export type SectionArgType =
  | string
  | {
      type: string;
      text: string;
    }[];
