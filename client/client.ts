import { RegisterNuiCB } from '@project-error/pe-utils';
import { NUIEvents, QBRacingEvents, RacingEvents } from '../types/Events';
import { CreateRaceInput, JoinRaceInput, LeaveRaceInput, Race, Track } from '../types/Racing';
import { User } from '../types/User';

const npwdExports = global.exports['npwd'];

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
  emitNet(QBRacingEvents.JoinRace, { RaceName: data.raceName, RaceId: data.raceId });
  cb({ status: 'ok' });
});

RegisterNuiCB(RacingEvents.LeaveRace, (data: LeaveRaceInput, cb) => {
  emitNet(QBRacingEvents.LeaveRace, { RaceName: data.raceName, RaceId: data.raceId });
  cb({ status: 'ok' });
});

RegisterNuiCB(RacingEvents.StartRace, (raceId: string, cb) => {
  emitNet(QBRacingEvents.StartRace, raceId);
  cb({ status: 'ok' });
});

RegisterNuiCB(RacingEvents.CreateTrack, (trackName: string, cb) => {
  emitNet(QBRacingEvents.CreateTrack, trackName);
  cb({ status: 'ok' });
});

onNet('qb-phone:client:UpdateLapraces', () => {
  npwdExports.sendUIMessage(NUIEvents.UpdateData);
});

// RegisterNuiCB(RacingEvents.StopRace, (trackName: string, cb) => {
//   emitNet(QBRacingEvents.Stop, trackName);
//   cb({ status: 'ok' });
// });
