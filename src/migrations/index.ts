import * as migration_20241015_101232_initial_migration from './20241015_101232_initial_migration';

export const migrations = [
  {
    up: migration_20241015_101232_initial_migration.up,
    down: migration_20241015_101232_initial_migration.down,
    name: '20241015_101232_initial_migration'
  },
];
