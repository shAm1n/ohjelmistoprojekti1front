import React, { useState, useEffect }  from 'react';
import { useParams } from 'react-router-dom';
import {Box, FormControl, TextField, InputLabel, Button, Typography, Alert, FormLabel, Radio, RadioGroup, FormControlLabel} from '@mui/material';

export default function VastaaKyselyyn(props) {
    const [error, setError] = useState(null);
    const [viesti, setViesti] = useState(null);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const [kysymykset, setKysymykset] = useState([]);
    const [vastaus, setVastaus] = useState(
        {
            vastaus: '',
            kysymys: {kysymysid: null},
        }
    );

    useEffect(() => {
    const haeKysymykset = () => {
        fetch(`/api/kyselyt/${id}`)
        .then(response => response.json())
        .then(data => {
          setLoading(false);
          setKysymykset(data.kysymykset);
        },
          (error) => {
          setLoading(false);
          setError(error);
        })
    };
    haeKysymykset();
    }, [id])

    const muuta = (e, id) => {
        setViesti(null)
        setVastaus({
            vastaus : e.target.value,
            kysymys: {kysymysid : id},
        });
    }
//e.target.getAttribute('data-key')
    /*const lisaaVastaukset = (vs) => {
        vs.preventDefault();
        setVastaus([]);
    }*/

    async function lahetaVastaus() {
        console.log('Vs:'+JSON.stringify(vastaus))
        const response = await fetch('/api/vastaukset', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(vastaus)
        }).catch(err => console.error(err))
        if (response.status === 200) {
            setViesti('Vastauksen lähetys onnistui!');
        } else {
            setViesti('Virhe tiedon lähetyksessä');
        }
    }
    const radiot = [1, 2, 3, 4, 5];

    /*const makeForm = (() => {
        return (
            <Box>
            
            </Box>
        );
    })*/
    if(error) {
        return <div>Error</div>
    } else if(loading) {
        return <div>Loading...</div>
    } else {
    return (
    <Box sx={{margin:2}}>
        {kysymykset.map(kysy => {
            if(kysy.tyyppi === "open") {
                return (
                <FormControl key={kysy.kysymysid} sx={{margin:2, width: 600}}>
                    <InputLabel htmlFor='kysy.vastaukset.vastaus'></InputLabel>
                    <TextField name='kysy.vastaukset.vastaus' value={kysy.vastaukset.vastaus} onChange={(e) => muuta(e, kysy.kysymysid)} label={kysy.kysymyslaatikko} variant="outlined" focused/>
                <Button variant='outlined' onClick={lahetaVastaus}>Lähetä vastaus</Button>
                </FormControl>
                );
            } else if(kysy.tyyppi === "radio") {
                return (
                <FormControl key={kysy.kysymysid} sx={{margin:2, width: 600}}>
                    <FormLabel id="kysy.vastaukset.vastaus">{kysy.kysymyslaatikko}</FormLabel>
                    <RadioGroup aria-labelledby="kysy.vastaukset.vastaus" defaultValue="5" onChange={(e) => muuta(e, kysy.kysymysid)}>
                        {radiot.map(nro =>
                            <FormControlLabel key={nro} value={nro} control={<Radio />} label={nro}></FormControlLabel>
                        )}
                    </RadioGroup>
                <Button variant='outlined' onClick={lahetaVastaus}>Lähetä vastaus</Button>
                </FormControl>
                );
            }
        })}
        <Alert>{viesti}</Alert>
        <Typography>{vastaus.vastaus}</Typography>
    </Box>
    );
    }
}