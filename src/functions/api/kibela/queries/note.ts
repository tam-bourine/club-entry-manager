import gql from "graphql-tag";
import type { Note } from "../../../../../@types/kibela.d";
import { callAPI } from "../../kibela";

export const fetchNoteByUrl = async (url: string): Promise<Note> => {
  const query = gql`
    query {
      noteFromPath(path: "${url}") {
        id
        title
        folderName
      }
    }
  `;

  const data = await callAPI(query);
  return data.noteFromPath;
};
