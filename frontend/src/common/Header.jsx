import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

import logo from '../images/sitelogo.png';
import profile from '../images/profileimage.png';

function Header() {
  const navigate = useNavigate();
  const { user } = useUser();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <Box
      component="header"
      sx={{
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5em 1.5em',
        backgroundColor: 'transparent',
      }}
    >
      {/* Logo */}
      <IconButton onClick={() => navigate('/')} sx={{ p: 0 }}>
        <img src={logo} alt="Site Logo" style={{ height: 36 }} />
      </IconButton>

      {/* Avatar + Menu */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ p: 0 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              sx={{ width: 40, height: 40 }}
              src={user?.profilePicture || profile}
            />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          slotProps={{
            paper: {
              elevation: 2,
              sx: {
                mt: 1,
                minWidth: 120,
              },
            },
          }}
        >
          <MenuItem onClick={() => navigate('/profile/me')}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

export default Header;
