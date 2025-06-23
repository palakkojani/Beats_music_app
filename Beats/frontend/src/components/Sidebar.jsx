import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExploreIcon from '@mui/icons-material/Explore';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import MicIcon from '@mui/icons-material/Mic';
import RadioIcon from '@mui/icons-material/Radio';
import AlbumIcon from '@mui/icons-material/Album';
import StarRateIcon from '@mui/icons-material/StarRate';
import ScheduleIcon from '@mui/icons-material/Schedule';
import FolderIcon from '@mui/icons-material/Folder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import BlurOnIcon from '@mui/icons-material/BlurOn';

const drawerWidth = 285;

const listItems1 = [
    { name: 'Explore', icon: ExploreIcon },
    { name: 'Generes', icon: VolumeUpIcon },
    { name: 'Albums', icon: AlbumIcon },
    { name: 'Artists', icon: MicIcon },
    { name: 'Radios', icon: RadioIcon },
]

const listItems2 = [
    { name: 'Recent', icon: ScheduleIcon },
    { name: 'Albums', icon: VolumeUpIcon },
    { name: 'Favourite', icon: StarRateIcon },
    { name: 'Local', icon: FolderIcon },
]
const listItems3 = [
    { name: 'Create New', icon: AddCircleOutlineIcon },
    { name: 'Design Flow', icon: PlayCircleIcon },
    { name: 'Best of 2020', icon: PlayCircleIcon },
    { name: 'Indian Jams', icon: PlayCircleIcon },
]

export default function Sidebar() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                sx={{

                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        bgcolor: '#18181c',
                        color: '#fff',
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Typography variant="h4" component="h4" sx={{ paddingLeft: '10px', color: 'white', marginTop: '30px', marginLeft: '50px' }}>
                    <BlurOnIcon /> Beats
                </Typography>
                <Toolbar />
                <Box sx={{ marginLeft: '20px' }}>
                    <Typography variant="h6" component="h6" sx={{ paddingLeft: '10px', color: 'grey' }}>
                        Menu
                    </Typography>
                    <List>
                        {listItems1.map((value, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {<value.icon sx={{ color: '#fff', fontSize: '20px' }} />}
                                    </ListItemIcon>
                                    <ListItemText primary={value.name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <Typography variant="h6" component="h6" sx={{ paddingLeft: '10px', color: 'grey' }}>
                        Library
                    </Typography>
                    <List>
                        {listItems2.map((value, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {<value.icon sx={{ color: '#fff', fontSize: '20px' }} />}
                                    </ListItemIcon>
                                    <ListItemText primary={value.name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <Typography variant="h6" component="span" sx={{ paddingLeft: '10px', color: 'grey' }}>
                        Playlist
                    </Typography>
                    <List>
                        {listItems3.map((value, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {<value.icon sx={{ color: '#fff', fontSize: '20px' }} />}
                                    </ListItemIcon>
                                    <ListItemText primary={value.name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}

