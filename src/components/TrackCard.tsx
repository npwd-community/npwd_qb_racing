import {
  Add,
  Delete,
  Favorite,
  Flag,
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
import { useHistory } from 'react-router';
import { useRecoilValue } from 'recoil';
import { path } from '../../npwd.config';
import { userAtom } from '../atoms/user';
import { Track } from '../types/Racing';

interface TrackCardProps {
  track: Track;
  isEditable?: boolean;
}

const TrackCard = ({ track, isEditable }: TrackCardProps) => {
  const history = useHistory();
  const user = useRecoilValue(userAtom);
  const menuRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const isCreator = track.creatorId === user.id;

  return (
    <Card elevation={4}>
      <CardHeader
        title={track.name}
        subheader={track.creatorName}
        avatar={
          <Avatar
            alt={track.creatorName}
            sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
          >
            {track.creatorName.substring(0, 1)}
          </Avatar>
        }
        action={
          isEditable && (
            <IconButton onClick={handleToggleExpanded} ref={menuRef}>
              <MoreVertRounded />
            </IconButton>
          )
        }
      />

      <Menu
        open={isExpanded}
        onClose={handleToggleExpanded}
        anchorEl={menuRef.current}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuList dense disablePadding>
          {isCreator && (
            <MenuItem>
              <ListItemIcon>
                <Delete />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          )}
          <MenuItem>
            <ListItemIcon>
              <Flag />
            </ListItemIcon>
            <ListItemText onClick={() => history.push(`${path}/setupRace/${track.id}`)}>
              Start race from this track
            </ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>

      <CardContent>
        <Stack direction="row" spacing={1}>
          <Chip
            icon={<Leaderboard fontSize="small" sx={{ paddingLeft: '0.35rem' }} />}
            label={`${Math.ceil(track.record.time / 100) / 10}s`}
          />

          <Chip
            label={`${track.checkpoints.length}`}
            icon={<FlagRounded fontSize="small" sx={{ paddingLeft: '0.25rem' }} />}
          />

          <Chip label={`${track.distance}m`} />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TrackCard;
