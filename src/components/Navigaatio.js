import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Box, AppBar, Toolbar, Typography, IconButton, Divider} from '@mui/material';
import {Drawer, List, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navigaatio() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {setOpen(true);}
    const handleClose = () => {setOpen(false);}

    return (
        <Box>
            <AppBar position='relative' color='primary'>
            <Toolbar>
                <IconButton color='inherit' onClick={ handleOpen }><MenuIcon /></IconButton>
                <Typography variant='h6' color='inherit' sx={{textDecoration: 'none'}} component={Link} to='/'>Etusivu</Typography>
            </Toolbar>
            </AppBar>
            <nav>
            <Drawer anchor='left' open={ open } onClick={ handleClose }>
            <Typography variant='head' align='center' sx={{marginTop:2}}>Valikko</Typography>
            <Divider sx={{margin:2}}/>
                <List>
                    <ListItem button component={Link} to='/'>
                        <ListItemIcon><MenuIcon/></ListItemIcon>
                        <ListItemText primary='Etusivu'/>
                    </ListItem>
                    <ListItem button to='/uusi' component={Link}>
                        <ListItemIcon><CreateIcon/></ListItemIcon>
                        <ListItemText primary='Lisää kysely'/>
                    </ListItem>
                </List>
            </Drawer>
        </nav>
        </Box>
    );
}