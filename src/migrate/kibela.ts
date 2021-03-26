import gql from "graphql-tag";
import { Config } from "../constant";
import type { Folder, Note, Query } from "../../@types/kibela.d";
import { callAPI } from "../api/kibela/api";

export const deleteFolder = async ({ id, path }: Folder) => {
  const timestamp = new Date().getTime();

  await callAPI(gql`
    mutation {
      updateFolderName(input: { id: "${id}", name: "${timestamp}" }) {
        folder {
          id
          name
        }
      }
    }
  `);
  await callAPI(gql`
    mutation {
      archiveFolder(input: { id: "${id}" }) {
        folder {
          id
          name
        }
      }
    }
  `);

  console.log(`フォルダー: ${decodeURI(path)} が削除されました`);
};

const deleteNote = async ({ id, path }: Note) => {
  await callAPI(gql`
    mutation {
      archiveNote(input: { id: "${id}" }) {
        clientMutationId
      }
    }
  `);
  await callAPI(gql`
    mutation {
      deleteNote(input: { id: "${id}" }) {
        clientMutationId
      }
    }
  `);

  console.log(`記事: ${decodeURI(path)} が削除されました`);
};

const getClubFoldersByClubTypeFolder = async (clubTypeFolder: Folder) => {
  const data = await callAPI(gql`
    query {
      folder(id: "${clubTypeFolder.id}") {
        folders(first: 100) {
          nodes {
            id
            name
            path
          }
        }
      }
    }
  `);
  if (!data?.folder?.folders?.nodes) return [];

  const result = await Promise.all(
    data.folder.folders.nodes.map(
      async (clubFolder): Promise<{ folder: Query["folder"] }> =>
        callAPI(gql`
          query {
            folder(id: "${clubFolder.id}") {
              id
              name
              path
              notes(first: 100) {
                nodes {
                  id
                  title
                  path
                }
              }
            }
          }
        `)
    )
  );
  return result.map((dataByClub) => dataByClub.folder);
};

export const getClubTypeFolders = async () => {
  const clubTypeFolderData = await callAPI(gql`
    query {
      folders(first: 2, parentFolderId: "${Config.Kibela.MANAGE_FOLDER_ID}") {
        nodes {
          id
          name
        }
      }
    }
  `);
  if (!clubTypeFolderData.folders.nodes) {
    throw new Error("部活管理フォルダが取得できませんでした。");
  }

  return clubTypeFolderData.folders.nodes;
};

export const migrateClubFolders = async () => {
  const clubTypeFolders = await getClubTypeFolders();

  // NOTE: {公認|非公認}フォルダの数だけ繰り返す
  clubTypeFolders.forEach(async (clubTypeFolder) => {
    if (clubTypeFolder === null) {
      throw new Error(`部活管理フォルダが取得できませんでした。`);
    }

    const clubFolders = await getClubFoldersByClubTypeFolder(clubTypeFolder);
    if (!clubFolders) {
      console.error(`${clubTypeFolder.name}内にフォルダは見つかりませんでした。`);
      return;
    }

    // NOTE: 部活専用フォルダの数だけ繰り返す
    clubFolders.forEach(async (clubFolder) => {
      // NOTE: フォルダ内の記事の数だけ繰り返す
      if (clubFolder.notes.nodes) {
        console.log(`${clubFolder.name}に記事がありました`);
        await Promise.all(clubFolder.notes.nodes.map(async (note) => deleteNote(note)));
      }
      await deleteFolder(clubFolder);
    });
  });
};

migrateClubFolders();
