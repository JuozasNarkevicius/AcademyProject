import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ROUTES from '../constants/Routes';

const Sport = () => (
  <div>
    <h1>This is the sports program page!</h1>
    <Button variant="contained" component={Link} to={ROUTES.CREATE_PROGRAM}>Create new program</Button>
    <Button variant="contained" component={Link} to={ROUTES.MY_PROGRAMS}>View my programs</Button>
  </div>
);

export default Sport;
