import { RegisterNuiCB } from '@project-error/pe-utils';
import { QBRacingEvents, RacingEvents } from '../types/Events';
import { CreateRaceInput, JoinRaceInput, LeaveRaceInput, Race, Track } from '../types/Racing';
import { User } from '../types/User';

RegisterNuiCB(RacingEvents.GetTracks, (_, cb) => {
  emitNet(RacingEvents.GetTracks);
  onNet(RacingEvents.SendTracks, (data: Track[]) => {
    cb({ status: 'ok', data });
  });
});

RegisterNuiCB(RacingEvents.GetRaces, (_, cb) => {
  emitNet(RacingEvents.GetRaces);
  onNet(RacingEvents.SendRaces, (data: Race[]) => {
    cb({ status: 'ok', data });
  });
});

RegisterNuiCB(RacingEvents.GetUser, (_, cb) => {
  emitNet(RacingEvents.GetUser);
  onNet(RacingEvents.SendUser, (data: User) => {
    cb({ status: 'ok', data });
  });
});

RegisterNuiCB(RacingEvents.SetupRace, (data: CreateRaceInput, cb) => {
  emitNet(QBRacingEvents.SetupRace, data.trackId, data.laps);
  cb({ status: 'ok' });
});

RegisterNuiCB(RacingEvents.JoinRace, (data: JoinRaceInput, cb) => {
  emitNet(QBRacingEvents.JoinRace, { RaceData: { RaceName: data.raceName, RaceId: data.raceId } });
  cb({ status: 'ok' });
});

RegisterNuiCB(RacingEvents.LeaveRace, (data: LeaveRaceInput, cb) => {
  emitNet(QBRacingEvents.LeaveRace, { RaceName: data.raceName, RaceId: data.raceId });
  cb({ status: 'ok' });
});

emitNet(RacingEvents.GetRaces);
