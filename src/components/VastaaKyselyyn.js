import React, { useState, useEffect }  from 'react';
import { useParams } from 'react-router-dom';
import {Box, FormControl, TextField, InputLabel, Button, Typography, Alert} from '@mui/material';

export default function VastaaKyselyyn(props) {
    const [error, setError] = useState(null);
    const [viesti, setViesti] = useState('');
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
        setViesti('')
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
        {kysymykset.map((kysy) =>
                <FormControl key={kysy.kysymysid} sx={{margin:2, width: 400}}>
                <InputLabel htmlFor='kysy.vastaukset.vastaus'></InputLabel>
                <TextField name='kysy.vastaukset.vastaus' data-key={kysy.kysymysid} value={kysy.vastaukset.vastaus} onChange={(e) => muuta(e, kysy.kysymysid)} label={kysy.kysymyslaatikko} variant="outlined" focused/>
                <Button variant='outlined' onClick={lahetaVastaus}>Valmis!</Button>
                </FormControl>
        )}
        <Alert>{viesti}</Alert>
        <Typography>{vastaus.vastaus}</Typography>
    </Box>
    );
    }
}