import axios from "axios";
import _ from "lodash";

/**
 * @description Execute codes
 * @function executeCodeController
 */
async function executeCodeController(httpRequest: Request) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const data_to_execute: { code: string; language: string; input?: string } = _.get(httpRequest, "context.validated");
    const stringify_data = JSON.stringify(data_to_execute);
    const server_response = await axios.post(
      "https://codexweb.netlify.app/.netlify/functions/enforceCode",
      stringify_data,
      {
        headers,
      },
    );

    return {
      headers,
      statusCode: server_response.status,
      body: {
        data: server_response.data,
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

export default executeCodeController;
