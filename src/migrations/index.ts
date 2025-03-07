import * as migration_20250123_122041_initial_migration from './20250123_122041_initial_migration';
import * as migration_20250305_150106_product_updates from './20250305_150106_product_updates';

export const migrations = [
  {
    up: migration_20250123_122041_initial_migration.up,
    down: migration_20250123_122041_initial_migration.down,
    name: '20250123_122041_initial_migration',
  },
  {
    up: migration_20250305_150106_product_updates.up,
    down: migration_20250305_150106_product_updates.down,
    name: '20250305_150106_product_updates'
  },
];
