import gql from "graphql-tag";
import { callAPI } from "../api";
import type { Note } from "../../../../../@types/kibela.d";
import { fetchNoteByUrl } from "../queries/note";

export const moveOfficialFolder = async (url: string, clubName: string): Promise<Note> => {
  const note = await fetchNoteByUrl(url);

  console.log(note);

  const mutation = gql`
    mutation {
      updateNoteFolder(input: { noteId: "${note.id}", folderFullName: "部活動/公認/${clubName}" }) {
        note {
          id
          title
          folderName
        }
      }
    }
  `;
  const data = await callAPI(mutation);
  return data.updateNoteFolder.note;
};
