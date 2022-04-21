import React, {useParams} from 'react';
import {Link} from 'react-router-dom';
import {Box, List, ListItem, ListItemText, Button, Typography, Grid} from '@mui/material';

export default function NaytaKysely(props) {
    const {nimi} = useParams();

    /*const makeList = ((kysymykset) => {
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
    })*/
    //{makeList(kysely.kysymykset)}
    /**/
    return (
    <Box>
        {props.lista.map(kysely => {
            if (kysely.kyselynNimi===nimi) {
            return (
            <Grid key={kysely.kyselyId}>
                <Grid item>
                    <Typography>{kysely.kyselynNimi}</Typography>
                </Grid>
                <Grid item>
                    <Typography>{kysely.kysymys}</Typography>
                </Grid>
                <Button variant='outlined' to={'/vastaa/'+kysely.kyselyId} component={Link}>Vastaa kyselyyn</Button>
            </Grid>
            );
        } else {
            return (
                <Typography>Ei löydy!
                </Typography>
            )
        }})}
    </Box>
    );
}