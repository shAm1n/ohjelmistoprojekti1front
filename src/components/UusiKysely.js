import React, {useState} from 'react';
import {Box, FormControl, InputLabel, FormGroup, Button, TextField, Grid} from '@mui/material';
//import {Link} from 'react-router-dom';

export default function UusiKysely(props) {
    const kysymyslista = [];
    const [kysely, setKysely] = useState({
        kyselyId: "",
        kyselynNimi: "",
        kysymykset: kysymyslista,
    })

    const muuta = (e) => {
        setKysely ({
                ...kysely,
                [e.target.name]: e.target.value,
                kysymykset: kysymyslista,
            })
    }

    const lisaaKysely = (kys) => {
        kys.preventDefault();
        setKysely(
            {
                kyselyId: "",
                kyselynNimi: "",
                kysymykset: [],
            });
        props.lista.push(kysely);
    }

    const lisaaKysymys = (kysymys) => {
        kysymyslista.push(kysymys);
    }
    /*<FormControl sx={{marginBottom:2}} focused>
                <InputLabel htmlFor='kysymys'>Kysymys</InputLabel>
                <TextField name='kysymys' value={kysely.kysymys} onChange={(e) => muuta(e)} label='Kysymys' variant="outlined" focused/>
            </FormControl>*/

    return (
    <Box component='form' noValidate autoComplete='off' sx={{margin:2}}>
        <FormGroup sx={{width: 300}}>
        <FormControl sx={{marginBottom:2}} focused>
                <InputLabel htmlFor='kyselyId'>Kyselyn ID</InputLabel>
                <TextField name='kyselyId' value={kysely.kyselyId} onChange={(e) => muuta(e)} label='Kyselyn ID' variant="outlined" focused/>
            </FormControl>
            <FormControl sx={{marginBottom:2}} focused>
                <InputLabel htmlFor='kyselynNimi'>Kyselyn nimi</InputLabel>
                <TextField name='kyselynNimi' value={kysely.kyselynNimi} onChange={(e) => muuta(e)} label='Kyselyn nimi' variant="outlined" focused/>
            </FormControl>
            <FormControl sx={{marginBottom:2}} focused>
            <Grid container spacing={1}>
                <Grid item>
                    <InputLabel htmlFor='kysymys'>Kysymykset</InputLabel>
                    <TextField name='kysymys' value={kysely.kysymys} onChange={(e) => muuta(e)} label='Kysymykset' variant="outlined" focused/>
                </Grid>
                <Grid item alignItems="stretch" style={{ display: "flex" }}>
                    <Button variant='outlined' onClick={lisaaKysymys(kysely.kysymys)}>Lisää</Button>
                </Grid>
            </Grid>
            </FormControl>
        </FormGroup>
        <Button variant='contained' onClick={lisaaKysely}>Valmis!</Button>
    </Box>
    );
}