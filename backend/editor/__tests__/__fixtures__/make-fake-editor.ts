import faker from "faker";
import { Types } from "mongoose";
import IEditor from "../../src/entities/interfaces/editor";

export default function makeFakeEditor(overwritingPayload: Partial<IEditor> = {}): IEditor {
  return Object.assign(
    {
      _id: new Types.ObjectId(),
      match_id: new Types.ObjectId(),
      content: faker.lorem.paragraph(),
      created_at: new Date(),
      updated_at: new Date(),
    },
    overwritingPayload,
  );
}
