import React from 'react';
import {Link} from 'react-router-dom';
import {Box, AppBar, Toolbar, Typography} from '@mui/material';

export default function Navigaatio() {
    return (
        <Box>
            <AppBar position='relative' color='primary'>
            <Toolbar>
                <Typography variant='h6' color='inherit' sx={{textDecoration: 'none'}} component={Link} to='/'>Etusivu</Typography>
            </Toolbar>
            </AppBar>
        </Box>
    );
}