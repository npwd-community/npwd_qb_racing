import { ServerPromiseResp } from '@project-error/npwd-types';
import { atom, selector } from 'recoil';
import { RacingEvents } from '../../types/Events';
import { Track } from '../../types/Racing';
import fetchNui from '../utils/fetchNui';
import { isEnvBrowser } from '../utils/misc';
import { MockedTracks } from '../utils/mocks';

export const tracksAtom = atom<Track[]>({
  key: 'npwd-qb-racing:tracks',
  default: selector<Track[]>({
    key: 'npwd-qb-racing:defaultTracks',
    get: async () => {
      try {
        const resp = await fetchNui<ServerPromiseResp<Track[]>>(RacingEvents.GetTracks);

        if (!resp.data) {
          console.log('no response data');
          return [];
        }

        return resp.data;
      } catch {
        if (isEnvBrowser()) {
          return MockedTracks;
        }

        return [];
      }
    },
  }),
});
