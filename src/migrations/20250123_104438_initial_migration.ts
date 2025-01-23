import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'user');
  CREATE TYPE "public"."enum_products_size_category" AS ENUM('mens', 'womens', 'kids');
  CREATE TYPE "public"."enum_orders_history_status" AS ENUM('pending', 'rejected', 'shipped', 'delivered', 'completed');
  CREATE TYPE "public"."enum_orders_status" AS ENUM('pending', 'rejected', 'shipped', 'delivered', 'completed');
  CREATE TYPE "public"."enum_orders_method" AS ENUM('card', 'g_pay', 'apple_pay', 'klarna');
  CREATE TYPE "public"."enum_events_type" AS ENUM('discount', 'drop', 'spotlight');
  CREATE TYPE "public"."enum_events_discount_type" AS ENUM('percent_off', 'amount_off');
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"role" "enum_users_role" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"_verified" boolean,
  	"_verificationtoken" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "products_sizes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" numeric NOT NULL,
  	"price" numeric NOT NULL,
  	"discount" numeric,
  	"stock" numeric DEFAULT 1 NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "products_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "products" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"sku" varchar NOT NULL,
  	"brand_id" uuid NOT NULL,
  	"model_id" uuid NOT NULL,
  	"name" varchar,
  	"nickname" varchar,
  	"colorway" varchar NOT NULL,
  	"collection_id" uuid,
  	"description" varchar,
  	"release_date" timestamp(3) with time zone,
  	"size_category" "enum_products_size_category" NOT NULL,
  	"retail_price" numeric NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "orders_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" uuid NOT NULL,
  	"size" numeric NOT NULL,
  	"price" numeric NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "orders_history" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"status" "enum_orders_history_status" NOT NULL,
  	"timestamp" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "orders" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"user_id" uuid NOT NULL,
  	"status" "enum_orders_status" NOT NULL,
  	"details_subtotal" numeric,
  	"details_delivery" numeric,
  	"details_discount" numeric,
  	"details_tax" numeric,
  	"details_total" numeric,
  	"address_country" varchar,
  	"address_state" varchar,
  	"address_city" varchar,
  	"address_line_1" varchar,
  	"address_line_2" varchar,
  	"address_postal_code" numeric,
  	"address_number" varchar,
  	"method" "enum_orders_method",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "events" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"type" "enum_events_type" NOT NULL,
  	"cta_label" varchar DEFAULT 'SHOP NOW' NOT NULL,
  	"product_id" uuid,
  	"applied_to_all" boolean,
  	"image_id" uuid NOT NULL,
  	"discount_stripe_id" varchar,
  	"discount_code" varchar,
  	"discount_type" "enum_events_discount_type",
  	"discount_value" numeric,
  	"discount_start_date" timestamp(3) with time zone,
  	"discount_end_date" timestamp(3) with time zone,
  	"discount_max_redemptions" numeric,
  	"discount_min_amount" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "events_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"brands_id" uuid,
  	"models_id" uuid,
  	"collections_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "brands" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "models" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"brand_id" uuid NOT NULL,
  	"name" varchar NOT NULL,
  	"featured" boolean,
  	"image_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "collections" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"brand_id" uuid NOT NULL,
  	"name" varchar NOT NULL,
  	"featured" boolean,
  	"image_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"user_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_smartphone_url" varchar,
  	"sizes_smartphone_width" numeric,
  	"sizes_smartphone_height" numeric,
  	"sizes_smartphone_mime_type" varchar,
  	"sizes_smartphone_filesize" numeric,
  	"sizes_smartphone_filename" varchar,
  	"sizes_tablet_url" varchar,
  	"sizes_tablet_width" numeric,
  	"sizes_tablet_height" numeric,
  	"sizes_tablet_mime_type" varchar,
  	"sizes_tablet_filesize" numeric,
  	"sizes_tablet_filename" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" uuid,
  	"products_id" uuid,
  	"orders_id" uuid,
  	"events_id" uuid,
  	"brands_id" uuid,
  	"models_id" uuid,
  	"collections_id" uuid,
  	"media_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "products_sizes" ADD CONSTRAINT "products_sizes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_images" ADD CONSTRAINT "products_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_images" ADD CONSTRAINT "products_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_model_id_models_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."models"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "orders_products" ADD CONSTRAINT "orders_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "orders_products" ADD CONSTRAINT "orders_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "orders_history" ADD CONSTRAINT "orders_history_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "events" ADD CONSTRAINT "events_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "events" ADD CONSTRAINT "events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_brands_fk" FOREIGN KEY ("brands_id") REFERENCES "public"."brands"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_models_fk" FOREIGN KEY ("models_id") REFERENCES "public"."models"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_collections_fk" FOREIGN KEY ("collections_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "models" ADD CONSTRAINT "models_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "models" ADD CONSTRAINT "models_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
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
   ALTER TABLE "media" ADD CONSTRAINT "media_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_orders_fk" FOREIGN KEY ("orders_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_brands_fk" FOREIGN KEY ("brands_id") REFERENCES "public"."brands"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_models_fk" FOREIGN KEY ("models_id") REFERENCES "public"."models"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_collections_fk" FOREIGN KEY ("collections_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "products_sizes_order_idx" ON "products_sizes" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_sizes_parent_id_idx" ON "products_sizes" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_images_order_idx" ON "products_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_images_parent_id_idx" ON "products_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_images_image_idx" ON "products_images" USING btree ("image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "products_sku_idx" ON "products" USING btree ("sku");
  CREATE INDEX IF NOT EXISTS "products_brand_idx" ON "products" USING btree ("brand_id");
  CREATE INDEX IF NOT EXISTS "products_model_idx" ON "products" USING btree ("model_id");
  CREATE INDEX IF NOT EXISTS "products_collection_idx" ON "products" USING btree ("collection_id");
  CREATE INDEX IF NOT EXISTS "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "orders_products_order_idx" ON "orders_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "orders_products_parent_id_idx" ON "orders_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "orders_products_product_idx" ON "orders_products" USING btree ("product_id");
  CREATE INDEX IF NOT EXISTS "orders_history_order_idx" ON "orders_history" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "orders_history_parent_id_idx" ON "orders_history" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "orders_user_idx" ON "orders" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "orders_updated_at_idx" ON "orders" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "orders_created_at_idx" ON "orders" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "events_product_idx" ON "events" USING btree ("product_id");
  CREATE INDEX IF NOT EXISTS "events_image_idx" ON "events" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "events_rels_order_idx" ON "events_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "events_rels_parent_idx" ON "events_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "events_rels_path_idx" ON "events_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "events_rels_brands_id_idx" ON "events_rels" USING btree ("brands_id");
  CREATE INDEX IF NOT EXISTS "events_rels_models_id_idx" ON "events_rels" USING btree ("models_id");
  CREATE INDEX IF NOT EXISTS "events_rels_collections_id_idx" ON "events_rels" USING btree ("collections_id");
  CREATE INDEX IF NOT EXISTS "brands_updated_at_idx" ON "brands" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "brands_created_at_idx" ON "brands" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "models_brand_idx" ON "models" USING btree ("brand_id");
  CREATE INDEX IF NOT EXISTS "models_image_idx" ON "models" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "models_updated_at_idx" ON "models" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "models_created_at_idx" ON "models" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "collections_brand_idx" ON "collections" USING btree ("brand_id");
  CREATE INDEX IF NOT EXISTS "collections_image_idx" ON "collections" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "collections_updated_at_idx" ON "collections" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "collections_created_at_idx" ON "collections" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "media_user_idx" ON "media" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_smartphone_sizes_smartphone_filename_idx" ON "media" USING btree ("sizes_smartphone_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_tablet_sizes_tablet_filename_idx" ON "media" USING btree ("sizes_tablet_filename");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_orders_id_idx" ON "payload_locked_documents_rels" USING btree ("orders_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_brands_id_idx" ON "payload_locked_documents_rels" USING btree ("brands_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_models_id_idx" ON "payload_locked_documents_rels" USING btree ("models_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_collections_id_idx" ON "payload_locked_documents_rels" USING btree ("collections_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users" CASCADE;
  DROP TABLE "products_sizes" CASCADE;
  DROP TABLE "products_images" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "orders_products" CASCADE;
  DROP TABLE "orders_history" CASCADE;
  DROP TABLE "orders" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "events_rels" CASCADE;
  DROP TABLE "brands" CASCADE;
  DROP TABLE "models" CASCADE;
  DROP TABLE "collections" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_products_size_category";
  DROP TYPE "public"."enum_orders_history_status";
  DROP TYPE "public"."enum_orders_status";
  DROP TYPE "public"."enum_orders_method";
  DROP TYPE "public"."enum_events_type";
  DROP TYPE "public"."enum_events_discount_type";`)
}
