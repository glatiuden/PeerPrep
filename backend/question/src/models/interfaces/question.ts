export default interface IQuestion {
  _id: string;
  difficulty: string;
  topic: string;
  question: string;
  hint: string;
  solution: string;
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
}
