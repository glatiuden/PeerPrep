import { EditorDb } from "../../data-access";

export default async function getEditorsController(httpRequest: Request) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const editors = await EditorDb.findAll();
    return {
      headers,
      statusCode: 200,
      body: {
        data: editors,
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
