import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "collections" RENAME TO "collaborations";
  ALTER TABLE "products" RENAME COLUMN "collection_id" TO "collaborations_id";
  ALTER TABLE "events_rels" RENAME COLUMN "collections_id" TO "collaborations_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "collections_id" TO "collaborations_id";
  ALTER TABLE "products" DROP CONSTRAINT "products_collection_id_collections_id_fk";
  
  ALTER TABLE "events_rels" DROP CONSTRAINT "events_rels_collections_fk";
  
  ALTER TABLE "collaborations" DROP CONSTRAINT "collections_brand_id_brands_id_fk";
  
  ALTER TABLE "collaborations" DROP CONSTRAINT "collections_image_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_collections_fk";
  
  DROP INDEX IF EXISTS "products_collection_idx";
  DROP INDEX IF EXISTS "events_rels_collections_id_idx";
  DROP INDEX IF EXISTS "collections_slug_idx";
  DROP INDEX IF EXISTS "collections_brand_idx";
  DROP INDEX IF EXISTS "collections_image_idx";
  DROP INDEX IF EXISTS "collections_updated_at_idx";
  DROP INDEX IF EXISTS "collections_created_at_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_collections_id_idx";
  ALTER TABLE "collaborations" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "collaborations" ADD COLUMN "description" varchar;
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_collaborations_id_collaborations_id_fk" FOREIGN KEY ("collaborations_id") REFERENCES "public"."collaborations"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_collaborations_fk" FOREIGN KEY ("collaborations_id") REFERENCES "public"."collaborations"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "collaborations" ADD CONSTRAINT "collaborations_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "collaborations" ADD CONSTRAINT "collaborations_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_collaborations_fk" FOREIGN KEY ("collaborations_id") REFERENCES "public"."collaborations"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "products_collaborations_idx" ON "products" USING btree ("collaborations_id");
  CREATE INDEX IF NOT EXISTS "events_rels_collaborations_id_idx" ON "events_rels" USING btree ("collaborations_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "collaborations_slug_idx" ON "collaborations" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "collaborations_brand_idx" ON "collaborations" USING btree ("brand_id");
  CREATE INDEX IF NOT EXISTS "collaborations_image_idx" ON "collaborations" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "collaborations_updated_at_idx" ON "collaborations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "collaborations_created_at_idx" ON "collaborations" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_collaborations_id_idx" ON "payload_locked_documents_rels" USING btree ("collaborations_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "collaborations" RENAME TO "collections";
  ALTER TABLE "products" RENAME COLUMN "collaborations_id" TO "collection_id";
  ALTER TABLE "events_rels" RENAME COLUMN "collaborations_id" TO "collections_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "collaborations_id" TO "collections_id";
  ALTER TABLE "products" DROP CONSTRAINT "products_collaborations_id_collaborations_id_fk";
  
  ALTER TABLE "events_rels" DROP CONSTRAINT "events_rels_collaborations_fk";
  
  ALTER TABLE "collections" DROP CONSTRAINT "collaborations_brand_id_brands_id_fk";
  
  ALTER TABLE "collections" DROP CONSTRAINT "collaborations_image_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_collaborations_fk";
  
  DROP INDEX IF EXISTS "products_collaborations_idx";
  DROP INDEX IF EXISTS "events_rels_collaborations_id_idx";
  DROP INDEX IF EXISTS "collaborations_slug_idx";
  DROP INDEX IF EXISTS "collaborations_brand_idx";
  DROP INDEX IF EXISTS "collaborations_image_idx";
  DROP INDEX IF EXISTS "collaborations_updated_at_idx";
  DROP INDEX IF EXISTS "collaborations_created_at_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_collaborations_id_idx";
  ALTER TABLE "collections" ALTER COLUMN "name" SET NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_collections_fk" FOREIGN KEY ("collections_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "collections" ADD CONSTRAINT "collections_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "collections" ADD CONSTRAINT "collections_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_collections_fk" FOREIGN KEY ("collections_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "products_collection_idx" ON "products" USING btree ("collection_id");
  CREATE INDEX IF NOT EXISTS "events_rels_collections_id_idx" ON "events_rels" USING btree ("collections_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "collections_slug_idx" ON "collections" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "collections_brand_idx" ON "collections" USING btree ("brand_id");
  CREATE INDEX IF NOT EXISTS "collections_image_idx" ON "collections" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "collections_updated_at_idx" ON "collections" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "collections_created_at_idx" ON "collections" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_collections_id_idx" ON "payload_locked_documents_rels" USING btree ("collections_id");
  ALTER TABLE "collections" DROP COLUMN IF EXISTS "description";`)
}
