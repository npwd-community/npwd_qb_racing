import styled from '@emotion/styled';
import { Add } from '@mui/icons-material';
import { Divider, Fab, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { path } from '../../npwd.config';
import { tracksAtom } from '../atoms/tracks';
import TrackCard from '../components/TrackCard';

const FabContainer = styled.div`
  position: absolute;
  bottom: 4.5rem;
  right: 1.5rem;
`;

const Tracks = () => {
  const history = useHistory();
  const tracks = useRecoilValue(tracksAtom);

  return (
    <div>
      <Typography variant="h6">Tracks</Typography>
      <Typography variant="caption">Available tracks are listed below.</Typography>
      <Divider light sx={{ margin: '1.5rem 0' }} />

      <Stack spacing={1}>
        {tracks.map((track) => (
          <TrackCard key={track.id} track={track} isEditable />
        ))}
      </Stack>

      <FabContainer>
        <Fab color="success" onClick={() => history.push(path + '/setupTrack')}>
          <Add />
        </Fab>
      </FabContainer>
    </div>
  );
};

export default Tracks;
