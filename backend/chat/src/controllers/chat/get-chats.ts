import { chatService } from "../../services";

/**
 * @description Get all chat records
 * @function getChatsController
 */
async function getChatsController(httpRequest: Request) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const chats = await chatService.findAll();
    return {
      headers,
      statusCode: 200,
      body: {
        data: chats,
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

export default getChatsController;
