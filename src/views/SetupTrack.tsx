import { Divider, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { path } from '../../npwd.config';

const SetupTrack = () => {
  return (
    <div>
      <Typography variant="h6">Setup a new track</Typography>
      <Typography variant="caption">
        Once there's a race created it will show up here. Come back later!
      </Typography>
    </div>
  );
};

export default SetupTrack;
