export default interface IEditor {
  _id: string;
  match_id: string;
  programming_language: string;
  content: string;
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface PaginatedEditorResult {
  data: IEditor[];
  pagination: {
    current_page: number;
    from: number | null;
    to: number | null;
    per_page: number;
    total: number;
    total_pages: number;
  };
}
