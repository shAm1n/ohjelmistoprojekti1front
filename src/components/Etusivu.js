import React from 'react';
import {Link} from 'react-router-dom';
import {Box, Typography, List, ListItem, ListItemText} from '@mui/material';

export default function Etusivu(props) {
    if(props.error) {
        return <div>Error</div>
    } else if(props.loading) {
        return <div>Loading...</div>
    } else {
        return (
        <Box>
            <List>
            {props.lista.map((kysely) => {
                return (
                <ListItem key={kysely.kyselyId} button component={Link} to={'/nayta/' + kysely.kyselyId}>
                    <ListItemText>
                        <Typography>{kysely.kyselynNimi}</Typography>
                    </ListItemText>
                </ListItem>
            )})}
            </List>
        </Box>
        );
    }
}