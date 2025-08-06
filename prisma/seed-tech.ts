import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const technologies = [
  {
    name: "React",
    slug: "react",
    svgCode: `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2.5" fill="#61DAFB"/><path d="M12 1c-6.33 0-11.5 2.51-11.5 5.6 0 3.09 5.17 5.6 11.5 5.6s11.5-2.51 11.5-5.6C23.5 3.51 18.33 1 12 1zM12 17.8c-6.33 0-11.5-2.51-11.5-5.6 0-3.09 5.17-5.6 11.5-5.6s11.5 2.51 11.5 5.6c0 3.09-5.17 5.6-11.5 5.6z" fill="#61DAFB" fill-opacity="0.3"/></svg>`,
    category: "Frontend"
  },
  {
    name: "Node.js",
    slug: "nodejs",
    svgCode: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" fill="#68A063"/><path d="M12 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z" fill="#68A063" fill-opacity="0.5"/></svg>`,
    category: "Backend"
  }
];

async function seedTech() {
  console.log('🌱 Seeding technologies...');
  
  for (const tech of technologies) {
    await prisma.technology.upsert({
      where: { slug: tech.slug },
      update: tech,
      create: tech,
    });
    console.log(`✅ Created/Updated technology: ${tech.name}`);
  }
  
  console.log('✨ Tech stack seeding completed!');
}

seedTech()
  .catch((e) => {
    console.error('❌ Error seeding tech stack:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });