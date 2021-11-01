import faker from "faker";
import { Types } from "mongoose";
import IChat from "../../src/entities/interfaces/chat";

export default function makeFakeChat(overwritingPayload: Partial<IChat> = {}): IChat {
  return Object.assign(
    {
      _id: new Types.ObjectId(),
      match_id: new Types.ObjectId(),
      content: [
        {
          user_id: new Types.ObjectId(),
          display_name: faker.name.firstName(),
          message: faker.lorem.sentence(),
          time_sent: new Date(),
          _id: new Types.ObjectId(),
        },
      ],
      created_at: new Date(),
      updated_at: new Date(),
    },
    overwritingPayload,
  );
}
