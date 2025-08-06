-- CreateTable
CREATE TABLE "public"."ProductFeature" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "iconType" TEXT NOT NULL DEFAULT 'default',
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductFeature_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductFeature_productId_idx" ON "public"."ProductFeature"("productId");

-- CreateIndex
CREATE INDEX "ProductFeature_order_idx" ON "public"."ProductFeature"("order");

-- CreateIndex
CREATE INDEX "ProductFeature_isActive_idx" ON "public"."ProductFeature"("isActive");

-- AddForeignKey
ALTER TABLE "public"."ProductFeature" ADD CONSTRAINT "ProductFeature_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
