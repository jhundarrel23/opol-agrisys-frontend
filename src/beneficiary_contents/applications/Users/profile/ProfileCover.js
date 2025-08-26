import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  Avatar,
  CardMedia,
  styled,
  Chip
} from '@mui/material';

import AgricultureIcon from '@mui/icons-material/Agriculture';
import VerifiedIcon from '@mui/icons-material/Verified';
import PendingIcon from '@mui/icons-material/Pending';

const AvatarWrapper = styled(Card)(
  ({ theme }) => `
    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(8)};
    margin-left: ${theme.spacing(3)};

    .MuiAvatar-root {
      width: ${theme.spacing(14)};
      height: ${theme.spacing(14)};
      border: 4px solid ${theme.palette.background.paper};
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;
    border-radius: ${theme.spacing(2)};

    .MuiCardMedia-root {
      height: ${theme.spacing(20)};
      background: linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%);
    }
`
);

const ProfileCover = ({ user }) => {
  const isVerified = user.followers === 'Verified';
  
  return (
    <>
      {/* Header Section */}
      <Box display="flex" mb={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
            <AgricultureIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold' }}>
              RSBSA Beneficiary Profile
              {isVerified && (
                <VerifiedIcon color="success" sx={{ fontSize: 28 }} />
              )}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Registry System for Basic Sectors in Agriculture
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Cover Image */}
      <CardCover elevation={3}>
        <CardMedia image={user.coverImg} />
      </CardCover>

      {/* Profile Avatar */}
      <AvatarWrapper elevation={2}>
        <Avatar variant="rounded" alt={user.name} src={user.avatar} />
      </AvatarWrapper>

      {/* Profile Information */}
      <Box py={3} pl={3} mb={2}>
        {/* User Description */}
        <Box mb={3}>
          <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6 }}>
            {user.description}
          </Typography>
        </Box>

        {/* Status and Location */}
        <Box display="flex" flexWrap="wrap" gap={1} alignItems="center" mb={2}>
          <Chip
            icon={isVerified ? <VerifiedIcon /> : <PendingIcon />}
            label={user.jobtitle}
            color={isVerified ? 'success' : 'warning'}
            variant="filled"
          />
          <Chip
            label={user.location}
            variant="outlined"
            color="primary"
          />
          <Chip
            label={`Status: ${user.followers}`}
            variant="outlined"
            color={isVerified ? 'success' : 'default'}
          />
        </Box>
      </Box>
    </>
  );
};

ProfileCover.propTypes = {
  user: PropTypes.object.isRequired
};

export default ProfileCover;