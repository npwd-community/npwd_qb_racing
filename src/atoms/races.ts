import { atom } from 'recoil';
import { Race, Track } from '../types/Racing';
import { MockedRaces } from '../utils/mocks';

export const racesAtom = atom<Race[]>({
  key: 'races',
  default: MockedRaces,
});
