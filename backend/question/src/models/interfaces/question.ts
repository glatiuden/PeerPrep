export default interface IQuestion {
  _id: string;
  title: string;
  description: string;
  difficulty: string;
  topic: string;
  hint: string;
  examples: Example[];
  constraints: string[];
  solution: string;
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
}

type Example = {
  input: string;
  output: string;
};

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
