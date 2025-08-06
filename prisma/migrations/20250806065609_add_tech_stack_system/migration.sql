/*
  Warnings:

  - You are about to drop the column `techStack` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "techStack";

-- CreateTable
CREATE TABLE "public"."Technology" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "svgCode" TEXT NOT NULL,
    "category" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TechStackSection" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "title" TEXT DEFAULT 'Technology Stack',
    "subtitle" TEXT DEFAULT 'Cutting-edge tools & technologies we use',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TechStackSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TechStackSectionTechnology" (
    "id" TEXT NOT NULL,
    "techStackSectionId" TEXT NOT NULL,
    "technologyId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TechStackSectionTechnology_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Technology_name_key" ON "public"."Technology"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Technology_slug_key" ON "public"."Technology"("slug");

-- CreateIndex
CREATE INDEX "Technology_isActive_idx" ON "public"."Technology"("isActive");

-- CreateIndex
CREATE INDEX "Technology_category_idx" ON "public"."Technology"("category");

-- CreateIndex
CREATE INDEX "TechStackSection_productId_idx" ON "public"."TechStackSection"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "TechStackSection_productId_key" ON "public"."TechStackSection"("productId");

-- CreateIndex
CREATE INDEX "TechStackSectionTechnology_techStackSectionId_idx" ON "public"."TechStackSectionTechnology"("techStackSectionId");

-- CreateIndex
CREATE INDEX "TechStackSectionTechnology_technologyId_idx" ON "public"."TechStackSectionTechnology"("technologyId");

-- CreateIndex
CREATE INDEX "TechStackSectionTechnology_order_idx" ON "public"."TechStackSectionTechnology"("order");

-- CreateIndex
CREATE UNIQUE INDEX "TechStackSectionTechnology_techStackSectionId_technologyId_key" ON "public"."TechStackSectionTechnology"("techStackSectionId", "technologyId");

-- AddForeignKey
ALTER TABLE "public"."TechStackSection" ADD CONSTRAINT "TechStackSection_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TechStackSectionTechnology" ADD CONSTRAINT "TechStackSectionTechnology_techStackSectionId_fkey" FOREIGN KEY ("techStackSectionId") REFERENCES "public"."TechStackSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TechStackSectionTechnology" ADD CONSTRAINT "TechStackSectionTechnology_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "public"."Technology"("id") ON DELETE CASCADE ON UPDATE CASCADE;
