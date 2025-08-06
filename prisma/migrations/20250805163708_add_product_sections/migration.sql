-- CreateTable
CREATE TABLE "public"."ProductSection" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "sectionType" TEXT NOT NULL,
    "title" TEXT,
    "subtitle" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductCard" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT,
    "iconColor" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductSection_productId_idx" ON "public"."ProductSection"("productId");

-- CreateIndex
CREATE INDEX "ProductSection_sectionType_idx" ON "public"."ProductSection"("sectionType");

-- CreateIndex
CREATE UNIQUE INDEX "ProductSection_productId_sectionType_key" ON "public"."ProductSection"("productId", "sectionType");

-- CreateIndex
CREATE INDEX "ProductCard_sectionId_idx" ON "public"."ProductCard"("sectionId");

-- CreateIndex
CREATE INDEX "ProductCard_order_idx" ON "public"."ProductCard"("order");

-- AddForeignKey
ALTER TABLE "public"."ProductSection" ADD CONSTRAINT "ProductSection_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductCard" ADD CONSTRAINT "ProductCard_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "public"."ProductSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
