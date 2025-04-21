import React, { useState, useContext } from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, Typography, Box, Avatar, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ApiIcon from '@mui/icons-material/Api';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate, Outlet } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

function Dashboard({ isMenuOpen, toggleMenu }) {
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [collapsed, setCollapsed] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check for small screens

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate('/dashboard/profile');
    handleMenuClose();
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/login');
  };

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Reports', icon: <ListAltIcon />, path: '/dashboard/reports' },
    { text: 'Services', icon: <ApiIcon />, path: '/dashboard/services' },
  ];

  const handleMenuItemClick = (path) => {
    navigate(path);
    if (isMobile) {
      toggleMenu();
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMenu}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tahlyl - The Digital Health Identity
          </Typography>
          <IconButton onClick={handleMenuOpen} color="inherit">
            <Avatar alt="User Profile" src="/static/images/avatar/1.jpg" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'} // change drawer type for mobile
        anchor="left"
        open={isMobile ? isMenuOpen : true} // control drawer open state for mobile
        onClose={isMobile ? toggleMenu : () => {}} // close drawer on mobile.
        sx={{
          width: collapsed ? 60 : 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: collapsed ? 60 : 240,
            boxSizing: 'border-box',
            marginTop: '64px',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 8px', marginTop: '64px' }}>
          <IconButton onClick={handleCollapse}>
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => handleMenuItemClick(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ display: collapsed || isMobile ? 'none' : 'block' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: '64px', width: isMobile ? '100%' : collapsed ? `calc(100% - 60px)` : `calc(100% - 240px)` }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Dashboard;