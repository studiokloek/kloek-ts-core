import { AppEvent } from '../events/eventtypes';
import { PubSub } from '../events/pubsub';

// // DEBUG VALUES
declare global {
  interface Window {
    APP_DEBUG: { [key: string]: any };
  }
}

window.APP_DEBUG = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
PubSub.subscribe(AppEvent.DEBUG_VALUE, (debug: { name: string; value: any }) => (window.APP_DEBUG[debug.name] = debug.value));
