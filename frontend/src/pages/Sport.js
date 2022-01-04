import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const Sport = () => (
  <div>
    <h1>This is the sports program page!</h1>
    <Button variant="contained" component={Link} to="/sport/create">Create new program</Button>
  </div>
);

export default Sport;
