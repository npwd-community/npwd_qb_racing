import { atom } from 'recoil';
import { Track } from '../types/Racing';
import { MockedTracks } from '../utils/mocks';

export const tracksAtom = atom<Track[]>({
  key: 'tracks',
  default: MockedTracks,
});
