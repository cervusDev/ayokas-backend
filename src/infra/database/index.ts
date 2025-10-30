import { AsyncLocalStorage } from 'async_hooks';
import {
  drizzle as drizzlePostgreSQL,
  NodePgDatabase,
} from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { databaseEnv, EEnvironment, generalEnv } from 'shared/enviroment';
import { LoggerHelper } from 'shared/logHelper';

interface IStorageData {
  instance: NodePgDatabase;
}

const storage = new AsyncLocalStorage<IStorageData>();

class DrizzleDatabase {
  private databaseInstance: NodePgDatabase;

  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: databaseEnv.url,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
    this.pool.on('error', () => {
      LoggerHelper.error('[DrizzleORM] ❌ Erro de conexão');
    });
    this.databaseInstance = drizzlePostgreSQL({
      client: this.pool,
      logger: generalEnv.environment === EEnvironment.DEVELOPMENT,
    });
  }

  public getInstance(): NodePgDatabase {
    const store = storage.getStore();
    if (store) {
      return store.instance;
    }
    return this.databaseInstance;
  }

  public async withTransaction<T = any>(fn: () => Promise<T>): Promise<T> {
    const poolClient = await this.pool.connect();
    try {
      await poolClient.query('BEGIN');
      const transactionInstance = drizzlePostgreSQL({
        client: poolClient,
        logger: generalEnv.environment === EEnvironment.DEVELOPMENT,
      });
      return await storage.run({ instance: transactionInstance }, async () => {
        const result = await fn();
        await poolClient.query('COMMIT');
        return result;
      });
    } catch (error) {
      await poolClient.query('ROLLBACK');
      throw error;
    } finally {
      poolClient.release();
    }
  }
}

export const drizzleDatabase = new DrizzleDatabase();
