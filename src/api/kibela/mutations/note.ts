import gql from "graphql-tag";
import { callAPI } from "../api";
import type { Note } from "../../../../@types/kibela.d";
import { fetchNoteByUrl } from "../queries/note";

export const moveOfficialFolder = async ({ kibelaUrl, name }: { kibelaUrl: string; name: string }): Promise<Note> => {
  const note = await fetchNoteByUrl(kibelaUrl);

  const mutation = gql`
    mutation {
      updateNoteFolder(input: { noteId: "${note.id}", folderFullName: "部活動/公認/${name}" }) {
        note {
          id
          title
          folderName
        }
      }
    }
  `;
  const data = await callAPI(mutation).catch((err) => {
    console.error(err);
  });
  return data.updateNoteFolder.note;
};
