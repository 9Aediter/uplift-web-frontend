import { fetchNotionArticlesRaw } from "@/lib/api/articles-api";
import { Article } from "@/types/article.d"; // Corrected import path
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"; // Keep PageObjectResponse

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function getArticles(): Promise<Article[]> {
  const rawData = await fetchNotionArticlesRaw();
  const articles: Article[] = [];

  if (!Array.isArray(rawData.results)) {
    console.error("rawData.results is not an array:", rawData);
    return [];
  }

  for (const result of rawData.results) {
    if ("properties" in result && result.object === "page") {
      const pageResult = result as PageObjectResponse;

      let title = "";
      const titleProperty = pageResult.properties?.Title as any; // Use any for now
      if (titleProperty && titleProperty.type === "title") {
        title = titleProperty.title?.[0]?.plain_text ?? "";
      }

      let description = "";
      const descriptionProperty = pageResult.properties?.Description as any; // Use any for now
      if (descriptionProperty) {
        if (descriptionProperty.type === "phone_number") {
          description = descriptionProperty.phone_number ?? "";
        } else if (descriptionProperty.type === "rich_text") {
          description = descriptionProperty.rich_text?.[0]?.plain_text ?? "";
        } else if (descriptionProperty.type === "number") {
          description = descriptionProperty.number?.toString() ?? "";
        }
      }

      let category = "";
      const categoryProperty = pageResult.properties?.Category as any; // Use any for now
      if (categoryProperty && categoryProperty.type === "multi_select") {
        category = categoryProperty.multi_select?.[0]?.name ?? "";
      }

      const url = pageResult.url ?? "";
      const slug = generateSlug(title);

      articles.push({
        id: pageResult.id,
        title,
        description,
        category,
        url,
        slug,
      });
    } else {
      console.warn("Skipping non-page object or object without properties in Notion results:", result);
    }
  }

  return articles;
}



