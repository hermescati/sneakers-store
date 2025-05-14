import * as migration_20250123_122041_initial_migration from './20250123_122041_initial_migration'
import * as migration_20250305_150106_product_updates from './20250305_150106_product_updates'
import * as migration_20250311_140113_added_slugs from './20250311_140113_added_slugs'
import * as migration_20250415_090021_collection_updates from './20250415_090021_collection_updates'

export const migrations = [
  {
    up: migration_20250123_122041_initial_migration.up,
    down: migration_20250123_122041_initial_migration.down,
    name: '20250123_122041_initial_migration'
  },
  {
    up: migration_20250305_150106_product_updates.up,
    down: migration_20250305_150106_product_updates.down,
    name: '20250305_150106_product_updates'
  },
  {
    up: migration_20250311_140113_added_slugs.up,
    down: migration_20250311_140113_added_slugs.down,
    name: '20250311_140113_added_slugs'
  },
  {
    up: migration_20250415_090021_collection_updates.up,
    down: migration_20250415_090021_collection_updates.down,
    name: '20250415_090021_collection_updates'
  }
]
