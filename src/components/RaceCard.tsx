import {
  Add,
  Delete,
  Favorite,
  FlagCircleRounded,
  FlagRounded,
  Leaderboard,
  MoreVertRounded,
  PeopleAlt,
  PeopleAltRounded,
  PeopleOutlineRounded,
  PeopleRounded,
  Warning,
} from '@mui/icons-material';
import {
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../atoms/user';
import { Race } from '../types/Racing';

interface RaceCardProps {
  race: Race;
}

const RaceCard = ({ race }: RaceCardProps) => {
  const user = useRecoilValue(userAtom);

  const isSprint = race.laps === 0;
  const isCreator = race.raceCreatorId === user.id;
  const isCompeting = !!race.racers.find((racer) => racer.id === user.id);

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
            label={`${race.racers.length}/5`}
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
              <Button color="error">Leave</Button>
            ) : (
              <Button color="success">Join</Button>
            )}

            {isCreator && (
              <Button color="success" disabled={race.racers.length === 0}>
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
