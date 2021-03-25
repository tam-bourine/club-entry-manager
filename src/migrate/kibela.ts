import gql from "graphql-tag";
import { Config } from "../constant";
import type { Folder } from "../../@types/kibela.d";
import { callAPI } from "../api/kibela/api";

export const deleteFolder = ({ id, name }: Folder) => {
  const timestamp = new Date().getTime();

  callAPI(gql`
    mutation {
      updateFolderName(input: { id: "${id}", name: "${timestamp}" }) {
        folder {
          id
          name
        }
      }
    }
  `).then(() => {
    callAPI(gql`
      mutation {
        archiveFolder(input: { id: "${id}" }) {
          folder {
            id
            name
          }
        }
      }
    `).then(() => {
      console.log(`${name}が削除されました`);
    });
  });
};

const getClubFoldersByClubTypeFolder = async (clubTypeFolder: Folder) => {
  const query = gql`
    query {
      folder(id: "${clubTypeFolder.id}") {
        folders(first: 100) {
          nodes {
            id
            name
          }
        }
      }
    }
  `;
  const data = await callAPI(query);
  if (!data.folder?.folders?.nodes || data.folder?.folders?.nodes === null) {
    console.error(`${clubTypeFolder.name}下には各部活専用フォルダは存在しませんでした。`);
  }
  return data.folder?.folders?.nodes as Folder[];
};

export const getClubTypeFolders = async () => {
  const query = gql`
    query {
      folders(first: 2, parentFolderId: "${Config.Kibela.MANAGE_FOLDER_ID}") {
        nodes {
          id
          name
        }
      }
    }
  `;
  const clubTypeFolderData = await callAPI(query);
  if (!clubTypeFolderData.folders.nodes) {
    throw new Error("Cannot get manage folders.");
  }
  return clubTypeFolderData.folders.nodes;
};

export const migrateClubFolders = async () => {
  const clubTypeFolders = await getClubTypeFolders();

  await Promise.all(
    clubTypeFolders.map(async (clubTypeFolder) => {
      if (clubTypeFolder === null) throw new Error();

      const clubFolders = await getClubFoldersByClubTypeFolder(clubTypeFolder);
      clubFolders.forEach((clubFolder) => {
        deleteFolder(clubFolder);
      });
    })
  );
};

migrateClubFolders();
