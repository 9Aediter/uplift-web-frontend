// src/lib/content.ts
import 'server-only';
import path from 'path';
import { promises as fs } from 'fs';

type PageContent = {
  [key: string]: any;
};

const contentDirectory = path.join(process.cwd(), 'src', 'data', 'content');

export async function getLocalizedPageContent(
  locale: string,
  pageName: string
): Promise<PageContent | null> {
  const filePath = path.join(contentDirectory, locale, `${pageName}.json`);

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const content = JSON.parse(fileContents);
    return content;
  } catch (error) {
    console.error(`Failed to load localized content for ${locale}/${pageName}:`, error);
    return null;
  }
}
