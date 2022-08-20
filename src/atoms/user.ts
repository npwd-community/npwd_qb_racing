import { atom } from 'recoil';
import { Racer, Track } from '../types/Racing';
import { MockedRacer1, MockedTracks } from '../utils/mocks';

export const userAtom = atom<Racer>({
  key: 'user',
  default: MockedRacer1,
});
