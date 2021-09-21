
import { Storage } from '@capacitor/storage';
import { getLogger } from '../logger';
import { getValueFromJSON } from './util';

const Logger = getLogger('data > localstorage');

const IS_MIGRATED_KEY = 'capacitor-storage-migrated';

class ConcreteStorage {
  public constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async set(key?: string, value?: any): Promise<void> {
    if (!key) {
      Logger.error('set', 'No valid key provided');
      return;
    }

    // er kan alleen een string opgeslagen worden
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }

    await Storage.set({ key, value });

    Logger.verbose('set', `${key}`, value);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async get(key?: string): Promise<any> {
    if (!key) {
      Logger.error('get', 'No valid key provided');
      return;
    }

    const returnValue = await Storage.get({ key });

    let value;

    if (returnValue && returnValue.value) {
      value = getValueFromJSON(returnValue.value);
    }

    Logger.verbose('get', `${key}`, value);

    return value;
  }

  public async remove(key?: string): Promise<void> {
    if (!key) {
      Logger.error('remove', 'No valid key provided');
      return;
    }

    await Storage.remove({ key });

    Logger.verbose('remove', `${key}`);
  }

  public async keys(): Promise<string[]> {
    const returnValue = await Storage.keys();

    if (returnValue && returnValue.keys) {
      return returnValue.keys;
    } else {
      return [];
    }
  }

  public async clear(): Promise<void> {
    await Storage.clear();
    Logger.verbose('cleared all storage!');
  }

  public async migrate(): Promise<void> {
    Logger.verbose('migrate() -> start...');
 
    if (await this.get(IS_MIGRATED_KEY)) {
      Logger.verbose('migrate() -> allready migrated!');
      return;
    }

    await Storage.migrate();
    
    Logger.verbose('migrate() -> removing old data...');
    await Storage.removeOld();

    this.set(IS_MIGRATED_KEY, true);

    Logger.verbose('migrate() -> done!');
  }
}

export const LocalStorage = new ConcreteStorage();
