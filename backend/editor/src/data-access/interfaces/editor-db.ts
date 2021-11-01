import Editor from "../../entities/editor";
import IEditor from "../../entities/interfaces/editor";

export default interface IEditorDb {
  insert: (insertPayload: Partial<IEditor>) => Promise<Editor | null>;
  findById: ({ id }: { id: string }) => Promise<Editor | null>;
  findAll: () => Promise<Editor[]>;
  findByMatchId: ({ match_id }: { match_id: string }) => Promise<Editor | null>;
  update: (updatePayload: Partial<IEditor>) => Promise<Editor | null>;
  delete: ({ id }: { id: string }) => Promise<Editor | null>;
  hardDelete: ({ id }: { id: string }) => Promise<boolean>;
}
