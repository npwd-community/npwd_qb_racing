import { Button, Divider, Stack, TextField, Typography } from '@mui/material';
import React, { FormEvent, useState } from 'react';
import { RacingEvents } from '../../types/Events';
import fetchNui from '../utils/fetchNui';

const SetupTrack = () => {
  const [name, setName] = useState('');

  const handleCreateTrack = (event: FormEvent) => {
    event.preventDefault();
    fetchNui(RacingEvents.CreateTrack, name);
  };

  return (
    <div>
      <Typography variant="h6">Setup a new track</Typography>
      <Typography variant="caption">
        Once there's a race created it will show up here. Come back later!
      </Typography>

      <Divider light sx={{ margin: '1.5rem 0' }} />

      <form onSubmit={handleCreateTrack}>
        <Stack spacing={1.5}>
          <TextField
            label="Create track"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <Button>Start creating track</Button>
        </Stack>
      </form>
    </div>
  );
};

export default SetupTrack;
