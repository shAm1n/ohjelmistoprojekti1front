import React from 'react';
import {Link} from 'react-router-dom';
import {Box, Typography, List, ListItem, ListItemText, Button} from '@mui/material';

export default function Etusivu(props) {
    const makeList = ((kysymykset) => {
        return (
            <List>
            {kysymykset.map((kysymys) => {
            return (
                <ListItem key={kysymys}>
                    <ListItemText><Typography>{kysymys}</Typography></ListItemText>
                </ListItem>
            );
            })}
            </List>
        );
    })

    return (
    <Box>
        <List>
        {props.lista.map(kysely => {
        return (
            <ListItem key={kysely.kyselyId} button component={Link} to={'/nayta/'+kysely.kyselynNimi}>
                <ListItemText>
                    <Typography>{kysely.kyselynNimi}</Typography>
                </ListItemText>
                <ListItemText>
                    {makeList(kysely.kysymykset)}
                </ListItemText>
            </ListItem>
        );
        })}
        </List>
        <Button variant='outlined' to='/uusi' component={Link}>Lisää kysely</Button>
    </Box>
    );
}