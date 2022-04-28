import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navigaatio from './components/Navigaatio';
import Etusivu from './components/Etusivu';
import NaytaKysely from './components/NaytaKysely';
import UusiKysely from './components/UusiKysely';
import VastaaKyselyyn from './components/VastaaKyselyyn';

const theme = createTheme({
  /*tyylit*/
});


export default function App() {
  const [ilmo, setIlmo] = useState('');
  const [lista, setLista] = useState([]);

  const fetchUrl = async() => {
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
  useEffect(() => {fetchUrl()}, []);

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
        <Navigaatio/>
        <Routes>
            <Route path='/' exact element={<Etusivu lista={lista}/>} />
            <Route path='/uusi' element={<UusiKysely lista={lista}/>} />
            <Route path='/nayta/:nimi' element={<NaytaKysely lista={lista}/>} />
            <Route path='/vastaa/:id' element={<VastaaKyselyyn/>} />
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
  );
}
