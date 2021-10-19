export default interface IQuestion {
  _id: string;
  difficulty: string;
  topic: string;
  title: string;
  description: string;
  hint: string;
  solution: string;
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface PaginatedEditorResult {
  data: IQuestion[];
  pagination: {
    current_page: number;
    from: number | null;
    to: number | null;
    per_page: number;
    total: number;
    total_pages: number;
  };
}
