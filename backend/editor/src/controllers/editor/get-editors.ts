import { editorService } from "../../services";

/**
 * @description Get all editor records
 * @function getEditorsController
 */
async function getEditorsController(httpRequest: Request) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const editors = await editorService.findAll();
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

export default getEditorsController;
