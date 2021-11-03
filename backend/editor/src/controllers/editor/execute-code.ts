import axios from "axios";
import _ from "lodash";
import { Logger } from "winston";

/**
 * @description Execute codes
 * @function executeCodeController
 */
export default function makeExecuteCodeController({ logger }: { logger: Logger }) {
  return async function executeCodeController(httpRequest: Request) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { code, language, input }: { code: string; language: string; input?: string } = _.get(
        httpRequest,
        "context.validated",
      );

      let final_language;
      switch (language.toLowerCase()) {
        case "c++":
          final_language = "cpp";
          break;
        case "c":
          final_language = "c";
          break;
        case "c#":
          final_language = "cs";
          break;
        case "java":
          final_language = "java";
          break;
        case "python":
          final_language = "py";
          break;
        case "ruby":
          final_language = "rb";
          break;
        case "kotlin":
          final_language = "kt";
          break;
        case "swift":
          final_language = "swift";
          break;
        case "javascript":
          final_language = "js";
          break;
      }

      if (final_language === "js") {
        const execution_result = eval(`(${code})`);
        return {
          headers,
          statusCode: 200,
          body: {
            data: execution_result,
          },
        };
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
  };
}
