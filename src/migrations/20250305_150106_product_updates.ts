import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_products_discount_type" AS ENUM('percent_off', 'amount_off');
  ALTER TABLE "products_sizes" RENAME TO "products_stock";
  ALTER TABLE "products_stock" RENAME COLUMN "stock" TO "quantity";
  ALTER TABLE "products_stock" DROP CONSTRAINT "products_sizes_parent_id_fk";
  
  DROP INDEX IF EXISTS "products_sizes_order_idx";
  DROP INDEX IF EXISTS "products_sizes_parent_id_idx";
  ALTER TABLE "products" ALTER COLUMN "nickname" SET NOT NULL;
  ALTER TABLE "products" ALTER COLUMN "colorway" DROP NOT NULL;
  ALTER TABLE "products" ALTER COLUMN "size_category" SET DEFAULT 'mens';
  ALTER TABLE "products" ADD COLUMN "slug" varchar;
  ALTER TABLE "products" ADD COLUMN "discount_type" "enum_products_discount_type" NOT NULL;
  ALTER TABLE "products" ADD COLUMN "discount_value" numeric NOT NULL;
  ALTER TABLE "products" ADD COLUMN "min_price" numeric;
  ALTER TABLE "products" ADD COLUMN "total_stock" numeric;
  DO $$ BEGIN
   ALTER TABLE "products_stock" ADD CONSTRAINT "products_stock_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "products_stock_order_idx" ON "products_stock" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_stock_parent_id_idx" ON "products_stock" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "products_slug_idx" ON "products" USING btree ("slug");
  ALTER TABLE "users" DROP COLUMN IF EXISTS "login_attempts";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "lock_until";
  ALTER TABLE "products_stock" DROP COLUMN IF EXISTS "discount";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "name";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "products_sizes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" numeric NOT NULL,
  	"price" numeric NOT NULL,
  	"discount" numeric,
  	"stock" numeric DEFAULT 1 NOT NULL
  );
  
  ALTER TABLE "products_stock" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "products_stock" CASCADE;
  DROP INDEX IF EXISTS "products_slug_idx";
  ALTER TABLE "products" ALTER COLUMN "size_category" DROP DEFAULT;
  ALTER TABLE "products" ALTER COLUMN "nickname" DROP NOT NULL;
  ALTER TABLE "products" ALTER COLUMN "colorway" SET NOT NULL;
  ALTER TABLE "users" ADD COLUMN "login_attempts" numeric DEFAULT 0;
  ALTER TABLE "users" ADD COLUMN "lock_until" timestamp(3) with time zone;
  ALTER TABLE "products" ADD COLUMN "name" varchar;
  DO $$ BEGIN
   ALTER TABLE "products_sizes" ADD CONSTRAINT "products_sizes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "products_sizes_order_idx" ON "products_sizes" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_sizes_parent_id_idx" ON "products_sizes" USING btree ("_parent_id");
  ALTER TABLE "products" DROP COLUMN IF EXISTS "slug";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "discount_type";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "discount_value";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "min_price";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "total_stock";
  DROP TYPE "public"."enum_products_discount_type";`)
}
