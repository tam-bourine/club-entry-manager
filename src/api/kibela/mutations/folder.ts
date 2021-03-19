import gql from "graphql-tag";
import type { Folder } from "../../../../@types/kibela.d";
import { Config } from "../../../constant";
import { callAPI } from "../api";

export const deleteFolder = async ({ id }: Folder) => {
  const date = new Date();
  const timestamp = date.getTime();

  const renameMut = gql`
    mutation {
      updateFolderName(input: { id: "${id}", name: "${timestamp}" }) {
        folder {
          id
          name
        }
      }
    }
  `;
  await callAPI(renameMut);

  const archiveMut = gql`
    mutation {
      archiveFolder(input: { id: "${id}" }) {
        folder {
          id
          name
        }
      }
    }
  `;
  await callAPI(archiveMut);
};

export const getClubFolders = async () => {
  const getClubTypeFolders = gql`
    query {
      folders(first: 2, parentFolderId: "${Config.Kibela.MANAGE_FOLDER_ID}") {
        nodes {
          id
          name
        }
      }
    }
  `;
  const data = await callAPI(getClubTypeFolders);

  if (data == null) {
    throw new Error("Cannot get manage folders.");
  }
};
