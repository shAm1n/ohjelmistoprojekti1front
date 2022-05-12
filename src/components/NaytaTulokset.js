import { Box, Grid, List, ListItem, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function NaytaTulokset(props) {
    const {id} = useParams();
    const teeLista = (kysymykset) => {
        return (
        <Grid>
            {kysymykset.map((kysy) => 
                <Grid item key={kysy.kysymysid}>
                    <Typography>{kysy.kysymyslaatikko}</Typography>
                    <List>
                    {kysy.vastaukset.map((vs) =>
                        <ListItem><Typography>{vs.vastaus}</Typography></ListItem>
                    )}
                </List>
                </Grid>
            )}
        </Grid>
        )
    }

    return (
    <Box sx={{margin:2}}>
        {props.lista.map(kysely => {
            if (kysely.kyselyId===Number(id)) {
            return (
                <Box>
                {teeLista(kysely.kysymykset)}
                </Box>
            );
            }
        })}
    </Box>
    )
}