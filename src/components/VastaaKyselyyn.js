import React, { useState }  from 'react';
import {useParams} from 'react-router-dom';
import {Box, FormGroup, FormControl, TextField, InputLabel, Button, Typography} from '@mui/material';

export default function VastaaKyselyyn(props) {
    const {id} = useParams();
    const [vastaus, setVastaus] = useState([]);

    const muuta = (e) => {
        setVastaus(e.target.value);
    }

    const lisaaVastaukset = (vs) => {
        vs.preventDefault();
        setVastaus([]);
    }

    const makeForm = ((kysymykset) => {
        return (
            <Box>
            {kysymykset.map((kysy) => 
                <FormControl key={kysy.kysymysid} sx={{margin:2}}>
                    <InputLabel htmlFor='kysy.vastaukset.vastaus'></InputLabel>
                    <TextField name='kysy.vastaukset.vastaus' value={kysy.vastaukset.vastaus} onChange={(e) => muuta(e)} label={kysy.kysymyslaatikko} variant="outlined" focused/>
                </FormControl>
            )}
            </Box>
        );
    })

    return (
    <Box component='form' noValidate autoComplete='off' sx={{margin:2}}>
        {props.lista.map(kysely => {
            if (kysely.kyselyId===Number(id)) {
            return (
            <FormGroup sx={{width: 300}}>
                {makeForm(kysely.kysymykset)}
                <Button variant='contained' onClick={lisaaVastaukset}>Valmis!</Button>
            </FormGroup>
            );
            } else {
            return (
                <Typography></Typography>
            );
        }})}
        <Typography>{vastaus}</Typography>
    </Box>
    );
}