import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navigaatio from './components/Navigaatio';
import Etusivu from './components/Etusivu';
import NaytaKysely from './components/NaytaKysely';
import VastaaKyselyyn from './components/VastaaKyselyyn';

const theme = createTheme({
  /*tyylit*/
});


export default function App() {
  const [error, setError] = useState(null);
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://kyselyohjelmistoprojekti.herokuapp.com/api/kyselyt', {
    method: 'GET',
    mode: 'no-cors',
    /*headers: {
      'access-control-allow-origin':'*',
      'Content-Type': 'application/json; charset=UTF-8',
    },*/
    })
    .then(response => response.json())
    .then(
      (result) => {
      setLoading(false);
      setLista(result);
    },
      (error) => {
      setLoading(false);
      setError(error);
    }
  )
}, []);

  /*const fetchUrl = async() => {
    try {
      const response = await fetch('https://kyselyohjelmistoprojekti.herokuapp.com/api/kyselyt');
      const json = await response.json();
      Object.keys(json).forEach(function(key) {
        setLista(json[key]);
      });
    } catch (error) {
        setIlmo('Ei löytynyt!');
    }
  }
  useEffect(() => {fetchUrl()}, []);*/

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
        <Navigaatio/>
        <Routes>
            <Route path='/' exact element={<Etusivu lista={lista} error={error} loading={loading}/>} />
            <Route path='/nayta/:id' element={<NaytaKysely lista={lista}/>} />
            <Route path='/vastaa/:id' element={<VastaaKyselyyn lista={lista}/>} />
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
  );
}
