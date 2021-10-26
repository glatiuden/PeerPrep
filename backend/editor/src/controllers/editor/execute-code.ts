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
    const { code, language, input }: { code: string; language: string; input?: string } = _.get(
      httpRequest,
      "context.validated",
    );
    console.log(language);
    let final_language;
    switch (language) {
      case "c++":
        final_language = "cpp";
        break;
      case "java":
        final_language = "java";
        break;
      case "python":
        final_language = "py";
        break;
    }
    const stringify_data = JSON.stringify({
      code,
      language: final_language,
      input,
    });
    const server_response = await axios.post(
      "https://codexweb.netlify.app/.netlify/functions/enforceCode",
      stringify_data,
      {
        headers,
      },
    );
    console.log(server_response);

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
