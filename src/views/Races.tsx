import { MoreVertRounded } from '@mui/icons-material';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { racesAtom } from '../atoms/races';
import RaceCard from '../components/RaceCard';

const Races = () => {
  const races = useRecoilValue(racesAtom);
  const refreshRaces = useRecoilRefresher_UNSTABLE(racesAtom);
  const isThereActiveRaces = races.length > 0;

  if (!isThereActiveRaces) {
    return (
      <div>
        <Typography variant="h6">There no races yet.</Typography>
        <Typography variant="body2">
          Once there are any active races, they will show up here.
        </Typography>

        <Divider sx={{ margin: '1.5rem 0' }} />
        <Typography variant="caption">
          You can easily setup a track yourself from the navigation below.
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h6">Active races</Typography>
      <Typography variant="caption" sx={{ lineHeight: 1 }}>
        You can easily setup a track yourself from the navigation below.
      </Typography>

      <Divider sx={{ margin: '1.5rem 0' }} />

      <Stack spacing={1}>
        {races.map((race) => (
          <RaceCard key={race.id} race={race} onUpdate={refreshRaces} />
        ))}
      </Stack>
    </div>
  );
};

export default Races;
