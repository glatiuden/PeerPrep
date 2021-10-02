import { EditorDb } from "../../data-access";

export default async function getEditorsController(httpRequest: Request) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const notes = await EditorDb.findAll();
    return {
      headers,
      statusCode: 200,
      body: {
        data: notes,
      },
    };
  } catch (err: any) {
    return {
      headers,
      statusCode: 404,
      body: {
        errors: err.message,
      },
    };
  }
}
