import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" ALTER COLUMN "discount_type" DROP NOT NULL;
  ALTER TABLE "products" ALTER COLUMN "discount_value" DROP NOT NULL;
  ALTER TABLE "brands" ADD COLUMN "slug" varchar;
  ALTER TABLE "models" ADD COLUMN "slug" varchar;
  ALTER TABLE "collections" ADD COLUMN "slug" varchar;
  CREATE UNIQUE INDEX IF NOT EXISTS "brands_slug_idx" ON "brands" USING btree ("slug");
  CREATE UNIQUE INDEX IF NOT EXISTS "models_slug_idx" ON "models" USING btree ("slug");
  CREATE UNIQUE INDEX IF NOT EXISTS "collections_slug_idx" ON "collections" USING btree ("slug");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "brands_slug_idx";
  DROP INDEX IF EXISTS "models_slug_idx";
  DROP INDEX IF EXISTS "collections_slug_idx";
  ALTER TABLE "products" ALTER COLUMN "discount_type" SET NOT NULL;
  ALTER TABLE "products" ALTER COLUMN "discount_value" SET NOT NULL;
  ALTER TABLE "brands" DROP COLUMN IF EXISTS "slug";
  ALTER TABLE "models" DROP COLUMN IF EXISTS "slug";
  ALTER TABLE "collections" DROP COLUMN IF EXISTS "slug";`)
}
