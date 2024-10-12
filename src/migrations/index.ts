import * as migration_20241012_163633_initial_migration from './20241012_163633_initial_migration';

export const migrations = [
  {
    up: migration_20241012_163633_initial_migration.up,
    down: migration_20241012_163633_initial_migration.down,
    name: '20241012_163633_initial_migration'
  },
];
