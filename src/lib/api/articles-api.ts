import { getNotionDatabase } from "@/lib/notion";

export async function fetchNotionArticlesRaw() {
  const NOTION_DATABASE_ID = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;

  console.log("DEBUG: NOTION_DATABASE_ID:", NOTION_DATABASE_ID || 'Not set');

  if (!NOTION_DATABASE_ID) {
    console.error("Notion database ID is not set.");
    return { results: [] };
  }

  try {
    const results = await getNotionDatabase(NOTION_DATABASE_ID);
    console.log("Notion Articles Raw Data:", results);
    return { results }; // Wrap in an object to match previous structure
  } catch (error) {
    console.error("Failed to fetch Notion articles:", error);
    return { results: [] };
  }
}

