import axios from "axios";

/*type _Versionprops = {
  language: string;
  version: string;
  aliases: string[];
};*/

const API = axios.create({
  baseURL: "http://localhost:8000/api/piston",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getVersion = async (langauge: string) => {
  try {
    const response = await API.get(`/runtimes/${langauge}`);
    const { status, message, _lang_ } = response.data;

    if (status === "error") {
      console.log(message);
      return;
    }

    return _lang_["version"];
  } catch (error: any) {
    console.error(error);
  }
};

// API to execute the code users tries to run on an exercise
export const executeCodeApi = async (language: string, sourceCode: string) => {
  // get language version and aliases (optional)

  const version = await getVersion(language);

  const response = await API.post("/execute", {
    language: language,
    sourceCode: sourceCode,
    version: version,
  });

  return response.data;
};
