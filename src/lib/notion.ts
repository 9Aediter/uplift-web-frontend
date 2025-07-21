// src/lib/notion.ts
import { Client } from "@notionhq/client";

export const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_TOKEN,
});

export const getNotionDatabase = async (databaseId: string) => {
  const response = await notion.databases.query({ database_id: databaseId });
  return response.results;
};
