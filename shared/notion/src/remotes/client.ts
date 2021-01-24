import fetch from "cross-fetch";
import { NOTION_TOKEN } from "../constants";

const NOTION_ENDPOINT = "https://www.notion.so/api/v3";

export async function callNotionFunction<T>(
  functionName: string,
  { body }: { body: unknown }
): Promise<T> {
  if (NOTION_TOKEN == null) {
    throw new Error(`Environment variable NOTION_TOKEN is not defined.`);
  }

  const response = await fetch(`${NOTION_ENDPOINT}/${functionName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie: `token_v2=${NOTION_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`Notion API Error while calling function ${functionName}`);
  }
}
