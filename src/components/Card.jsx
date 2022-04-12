import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard() {
  const user = useSelector(state=>state.auth.loggedUser)
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {user.first_name} {user.last_name} 
        </Typography>
        <Typography variant="h5" component="div">
          {/* be{bull}nev{bull}o{bull}lent */}
           The usename is {user.username}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          This user is logged in
        </Typography>
        <Typography variant="body2">
          This user is logged now
          <br />
          {/* {'"a benevolent smile"'} */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
