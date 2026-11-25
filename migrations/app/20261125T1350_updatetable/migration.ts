#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/a9b4c6733b4b962ccbced2501cf8c42f7cd14a9a3c48194a543660cb9ca25ddf/contract';
import endContract from '../../snapshots/a9b4c6733b4b962ccbced2501cf8c42f7cd14a9a3c48194a543660cb9ca25ddf/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/e056853e7e8f4e8bc42b2bd5d19616131185d200e92eeb0f151bd038015a903a/contract';
import startContract from '../../snapshots/e056853e7e8f4e8bc42b2bd5d19616131185d200e92eeb0f151bd038015a903a/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropConstraint({
        schema: 'public',
        table: 'ShortUrl',
        constraint: 'ShortUrl_short_url_key',
      }),
      this.dropColumn({ schema: 'public', table: 'ShortUrl', column: 'full_url' }),
      this.dropColumn({ schema: 'public', table: 'ShortUrl', column: 'short_url' }),
      this.dropNotNull({ schema: 'public', table: 'ShortUrl', column: 'clicks' }),
      this.dropNotNull({ schema: 'public', table: 'ShortUrl', column: 'createdAt' }),
      this.addColumnWithTemporaryDefault({
        schema: 'public',
        table: 'ShortUrl',
        column: 'fullUrl',
        type: 'text',
        temporaryDefault: sql`''`,
      }),
      this.addRequiredColumnToEmptyTable({
        schema: 'public',
        table: 'ShortUrl',
        column: 'short',
        type: 'text',
      }),
      this.addUnique({
        schema: 'public',
        table: 'ShortUrl',
        constraint: 'ShortUrl_short_key',
        columns: ['short'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
