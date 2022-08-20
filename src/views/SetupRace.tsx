import { FlagRounded } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Collapse,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { FormEvent, useState } from 'react';
import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';
import { tracksAtom } from '../atoms/tracks';
import TrackCard from '../components/TrackCard';
import { Track } from '../types/Racing';

const SetupRace = () => {
  const tracks = useRecoilValue(tracksAtom);

  const { trackId } = useParams<{ trackId: string }>();
  const initialTrack = tracks.find((track) => track.id === parseInt(trackId));

  const [selectedTrack, setSelectedTrack] = useState<Track | null>(initialTrack ?? null);
  const [laps, setLaps] = useState('');

  const isInvalidLapCount = isNaN(parseInt(laps, 10));
  const isDisabled = !selectedTrack || isInvalidLapCount;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isDisabled) {
      return;
    }

    console.log('Setting up race with', {
      selectedTrack,
      numberOfLaps: laps,
    });
  };

  return (
    <div>
      <Typography variant="h6">Setup a new race</Typography>
      <Typography variant="caption">
        Once there's a race created it will show up here. Come back later!
      </Typography>

      <Divider light sx={{ margin: '1.5rem 0' }} />

      <Stack spacing={1}>
        <Typography variant="h6">Select racing track</Typography>
        <Autocomplete
          defaultValue={initialTrack}
          options={tracks}
          getOptionLabel={(option) => option.name}
          onChange={(_, track) => setSelectedTrack(track)}
          renderOption={(props, track) => (
            <Box component="li" p={2} {...props}>
              <Stack
                direction="row"
                justifyContent="space-between"
                display="flex"
                width="100%"
                alignItems="center"
              >
                <Stack>
                  <Typography>{track.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {track.creatorName}
                  </Typography>
                </Stack>
                <Stack spacing={0.5} direction="row">
                  <Chip
                    size="small"
                    label={`${track.checkpoints.length}`}
                    icon={<FlagRounded fontSize="small" sx={{ paddingLeft: '0.25rem' }} />}
                  />

                  <Chip size="small" label={`${track.distance}m`} />
                </Stack>
              </Stack>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Select racing track"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'racing-track', // disable autocomplete and autofill
              }}
            />
          )}
        />
      </Stack>

      <form onSubmit={handleSubmit} aria-disabled={isDisabled}>
        <Stack spacing={3}>
          <Collapse in={Boolean(selectedTrack)}>
            {selectedTrack && (
              <Paper sx={{ marginTop: 3 }}>
                <TrackCard track={selectedTrack} />
              </Paper>
            )}
          </Collapse>

          <TextField
            label="Select number of laps"
            type="number"
            value={laps}
            onChange={(event) => setLaps(event.target.value)}
            helperText="If lap count is 0, it will create a sprint."
          />

          <Button size="large" fullWidth type="submit" disabled={isDisabled} variant="contained">
            Setup the race
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default SetupRace;
