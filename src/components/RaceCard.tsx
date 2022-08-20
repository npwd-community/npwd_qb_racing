import { FlagRounded, PeopleAlt } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Stack,
} from '@mui/material';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../atoms/user';
import { JoinRaceInput, LeaveRaceInput, Race } from '../../types/Racing';
import fetchNui from '../utils/fetchNui';
import { RacingEvents } from '../../types/Events';

interface RaceCardProps {
  race: Race;
  onUpdate(): void;
}

const RaceCard = ({ race, onUpdate }: RaceCardProps) => {
  const user = useRecoilValue(userAtom);
  const userId = user?.citizenid ?? '';

  const isSprint = race.laps === 0;
  const isCreator = race.raceCreatorId === userId;
  const isCompeting = Boolean(race.racers[userId]);
  const numberOfRacers = Object.keys(race.racers).length;

  const handleLeave = async () => {
    await fetchNui<boolean, LeaveRaceInput>(RacingEvents.LeaveRace, {
      raceId: race.raceId,
      raceName: race.name,
    });
    onUpdate();
  };

  const handleJoin = async () => {
    await fetchNui<boolean, JoinRaceInput>(RacingEvents.JoinRace, {
      raceId: race.raceId,
      raceName: race.name,
    });
    onUpdate();
  };

  return (
    <Card elevation={4}>
      <CardHeader
        title={`${race.name} ${isSprint ? '(Sprint)' : ''}`}
        subheader={race.raceCreatorName}
        avatar={
          <Avatar
            alt={race.raceCreatorName}
            sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
          >
            {race.raceCreatorName.substring(0, 1)}
          </Avatar>
        }
        action={
          <Chip
            color={race.started ? 'primary' : 'default'}
            label={race.started ? 'Started' : 'Not started'}
          />
        }
      />

      <CardContent>
        <Stack direction="row" spacing={1}>
          <Chip
            variant="outlined"
            icon={<PeopleAlt fontSize="small" sx={{ paddingLeft: '0.35rem' }} />}
            label={`${numberOfRacers}`}
          />

          <Chip
            variant="outlined"
            label={`${isSprint ? 'Sprint' : race.laps}`}
            icon={<FlagRounded fontSize="small" sx={{ paddingLeft: '0.25rem' }} />}
          />

          <Chip variant="outlined" label={`${race.distance}m`} />
        </Stack>
      </CardContent>

      <Divider light />

      {race.started ? (
        <CardActions disableSpacing>
          <Stack direction="row" spacing={1} marginLeft="auto">
            {isCreator && <Button color="error">Stop</Button>}
            {isCompeting && <Button color="error">Abort</Button>}
          </Stack>
        </CardActions>
      ) : (
        <CardActions disableSpacing>
          <Stack direction="row" spacing={1} marginLeft="auto">
            {isCreator && <Button color="error">Delete</Button>}

            {isCompeting ? (
              <Button color="error" onClick={handleLeave}>
                Leave
              </Button>
            ) : (
              <Button color="success" onClick={handleJoin}>
                Join
              </Button>
            )}

            {isCreator && (
              <Button color="success" disabled={numberOfRacers === 0}>
                Start
              </Button>
            )}
          </Stack>
        </CardActions>
      )}
    </Card>
  );
};

export default RaceCard;
