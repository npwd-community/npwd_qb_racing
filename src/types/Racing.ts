export interface Coord {
  coords: { y: number; x: number; z: number };
  offset: {
    left: { y: number; x: number; z: number };
    right: { y: number; x: number; z: number };
  };
}

export interface LeaderBoard {}

export interface Racer {
  id: string;
  name: string;
}

export interface RaceRecord {
  name: string;
  time: number;
}

export interface Track {
  id: number;
  raceId: string;

  name: string;
  distance: number;
  checkpoints: Coord[];

  record: RaceRecord;

  creatorId: string;
  creatorName: string;
}

export interface Race extends Track {
  laps: number;
  raceCreatorId: string;
  raceCreatorName: string;
  started: boolean;
  waiting: boolean;
  lastLeaderboard: LeaderBoard;
  racers: Racer[];
}
