/*
  Migration: Transform features from String[] to JSON objects and remove ProductFeature table
  
  This migration:
  1. Creates a temporary JSON column
  2. Converts existing string features to JSON format [{title, description, icon}]
  3. Drops old features column and renames temp column
  4. Drops ProductFeature table
*/

-- Step 1: Add temporary JSON column for features
ALTER TABLE "public"."Product" ADD COLUMN "features_temp" JSONB;

-- Step 2: Convert existing string array features to JSON format
-- Transform ['feature1', 'feature2'] to [{'title': 'feature1', 'description': '', 'icon': 'default'}]
UPDATE "public"."Product" 
SET "features_temp" = (
    SELECT jsonb_agg(
        jsonb_build_object(
            'title', feature_item,
            'description', '',
            'icon', 'default'
        )
    )
    FROM unnest(features) AS feature_item
)
WHERE features IS NOT NULL AND array_length(features, 1) > 0;

-- Set empty array for products with null or empty features
UPDATE "public"."Product" 
SET "features_temp" = '[]'::jsonb
WHERE features IS NULL OR array_length(features, 1) IS NULL;

-- Step 3: Drop old features column and rename temp column
ALTER TABLE "public"."Product" DROP COLUMN "features";
ALTER TABLE "public"."Product" RENAME COLUMN "features_temp" TO "features";

-- Step 4: Make features column NOT NULL
ALTER TABLE "public"."Product" ALTER COLUMN "features" SET NOT NULL;

-- Step 5: Drop ProductFeature table and its foreign key
ALTER TABLE "public"."ProductFeature" DROP CONSTRAINT "ProductFeature_productId_fkey";
DROP TABLE "public"."ProductFeature";
