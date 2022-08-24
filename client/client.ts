import { RegisterNuiCB } from '@project-error/pe-utils';
import { NUIEvents, QBRacingEvents, RacingEvents } from '../types/Events';
import {
  CreateRaceInput,
  GetDistanceToRaceInput,
  JoinRaceInput,
  LeaveRaceInput,
  QBRace,
  Race,
  Track,
} from '../types/Racing';
import { User } from '../types/User';

const QBCore = global.exports['qb-core'].GetCoreObject();
const npwdExports = global.exports['npwd'];

RegisterNuiCB(RacingEvents.GetTracks, (_, cb) => {
  emitNet(RacingEvents.GetTracks);
  onNet(RacingEvents.SendTracks, (data: Track[]) => {
    cb({ status: 'ok', data: data.map(addDistanceToTrack) });
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

RegisterNuiCB(NUIEvents.GetDistanceToRace, (data: GetDistanceToRaceInput, cb) => {
  QBCore.Functions.TriggerCallback(
    QBRacingEvents.GetRacingData,
    (race: QBRace['RaceData']) => {
      const ped = PlayerPedId();
      const coords = GetEntityCoords(ped, true);
      const raceCoords = race.Checkpoints[0].coords;
      const distance = getDistance(getVector(coords), raceCoords);
      if (distance <= 115) {
        if (data.joined) {
          emit(QBRacingEvents.WaitingDistanceCheck);
        }
        cb(true);
      } else {
        QBCore.Functions.Notify(
          "You're too far away from the race. GPS has been set to the race.",
          'error',
          7500,
        );
        SetNewWaypoint(raceCoords.x, raceCoords.y);
        cb(false);
      }
    },
    data.raceId,
  );
});

RegisterNuiCB(NUIEvents.GetIsAuthorizedToCreateRaces, (trackName: string, cb) => {
  QBCore.Functions.TriggerCallback(
    QBRacingEvents.GetIsAuthorizedToCreateRaces,
    (isAuthorized: boolean, isNameAvailable: boolean) => {
      cb([isAuthorized, isNameAvailable]);
    },
    trackName,
  );
});

function addDistanceToTrack(track: Track) {
  const ped = PlayerPedId();
  const coords = GetEntityCoords(ped, true);
  const trackCoords = track.checkpoints[0].coords;
  const distance = getDistance(getVector(coords), trackCoords);

  return {
    ...track,
    distanceToTrack: distance,
  };
}

type Vector = {
  x: number;
  y: number;
  z: number;
};

function getVector(coords: number[]) {
  const [x, y, z] = coords;
  return {
    x,
    y,
    z,
  };
}

function getDistance(v1: Vector, v2: Vector) {
  const dx = v1.x - v2.x;
  const dy = v1.y - v2.y;
  const dz = v1.z - v2.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

// RegisterNuiCB(RacingEvents.StopRace, (trackName: string, cb) => {
//   emitNet(QBRacingEvents.Stop, trackName);
//   cb({ status: 'ok' });
// });
