export enum RacingEvents {
  GetTracks = 'npwd:qb-racing:getTracks',
  SendTracks = 'npwd:qb-racing:sendTracks',

  GetRaces = 'npwd:qb-racing:getRaces',
  SendRaces = 'npwd:qb-racing:sendRaces',

  GetUser = 'npwd:qb-racing:getUser',
  SendUser = 'npwd:qb-racing:sendUser',

  CreateTrack = 'npwd:qb-racing:createTrack',
  SetupRace = 'npwd:qb-racing:setupRace',

  JoinRace = 'npwd:qb-racing:joinRace',
  LeaveRace = 'npwd:qb-racing:leaveRace',
  StartRace = 'npwd:qb-racing:startRace',
}

export enum QBRacingEvents {
  SetupRace = 'qb-lapraces:server:SetupRace',
  JoinRace = 'qb-lapraces:server:JoinRace',
  CreateTrack = 'qb-lapraces:server:CreateLapRace',
  LeaveRace = 'qb-lapraces:server:LeaveRace',
  StartRace = 'qb-lapraces:server:StartRace',
}
