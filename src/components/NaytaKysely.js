import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {Box, List, ListItem, ListItemText, Button, Typography, Grid} from '@mui/material';

export default function NaytaKysely(props) {
    const {id} = useParams();
    const makeList = ((kysymykset) => {
        return (
            <List>
            {kysymykset.map((kysy) => 
                <ListItem key={kysy.kysymysid}>
                    <ListItemText><Typography>{kysy.kysymyslaatikko}</Typography></ListItemText>
                </ListItem>
            )}
            </List>
        );
    })

    return (
    <Box sx={{margin:2}}>
        {props.lista.map(kysely => {
            if (kysely.kyselyId===Number(id)) {
            return (
            <Grid key={kysely.kyselyId}>
                <Grid item>
                    <Typography>{kysely.kyselynNimi}</Typography>
                </Grid>
                <Grid item>
                    {makeList(kysely.kysymykset)}
                </Grid>
                <Button variant='outlined' to={'/vastaa/'+kysely.kyselyId} component={Link}>Vastaa kyselyyn</Button>
                <Button variant='outlined' to={'/tulokset/'+kysely.kyselyId} component={Link}>Tutki vastauksia</Button>
            </Grid>
            );
        } else {
            return (
                <Typography></Typography>
            )
        }})}
    </Box>
    );
}