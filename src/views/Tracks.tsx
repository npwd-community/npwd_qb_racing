import styled from '@emotion/styled';
import { Add } from '@mui/icons-material';
import { Divider, Fab, Stack, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { path } from '../../npwd.config';
import { NUIEvents } from '../../types/Events';
import { sortedTracksAtom } from '../atoms/tracks';
import TrackCard from '../components/TrackCard';
import fetchNui from '../utils/fetchNui';

const FabContainer = styled.div`
  position: absolute;
  bottom: 4.5rem;
  right: 1.5rem;
`;

const Tracks = () => {
  const history = useHistory();
  const tracks = useRecoilValue(sortedTracksAtom);
  const refreshTracks = useRecoilRefresher_UNSTABLE(sortedTracksAtom);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    fetchNui<boolean[], string>(NUIEvents.GetIsAuthorizedToCreateRaces).then((res) => {
      setIsAuthorized(res[0]);
    });
  }, []);

  return (
    <div>
      <Typography variant="h6">Tracks</Typography>
      <Typography variant="caption">Available tracks are listed below.</Typography>
      <Divider light sx={{ margin: '1.5rem 0' }} />

      <Stack spacing={1}>
        {tracks.map((track) => (
          <TrackCard key={track.id} track={track} isEditable onDelete={refreshTracks} />
        ))}
      </Stack>

      <FabContainer>
        <Fab
          onClick={() => history.push(path + '/setupTrack')}
          disabled={!isAuthorized}
          sx={{
            backgroundColor: `${theme.palette.primary.main} !important`,
            color: `${theme.palette.primary.contrastText} !important`,
            '&:hover': {
              backgroundColor: `${theme.palette.primary.dark} !important`,
            }
          }}
        >
          <Add />
        </Fab>
      </FabContainer>
    </div>
  );
};

export default Tracks;