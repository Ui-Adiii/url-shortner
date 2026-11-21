#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/05f09b32b208a9833fc58996452169a4f2439f939d0bccca68d416f8d23d441e/contract';
import startContract from '../../snapshots/05f09b32b208a9833fc58996452169a4f2439f939d0bccca68d416f8d23d441e/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/e056853e7e8f4e8bc42b2bd5d19616131185d200e92eeb0f151bd038015a903a/contract';
import endContract from '../../snapshots/e056853e7e8f4e8bc42b2bd5d19616131185d200e92eeb0f151bd038015a903a/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [this.dropNotNull({ schema: 'public', table: 'User', column: 'updatedAt' })];
  }
}

MigrationCLI.run(import.meta.url, M);
