import { Link } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';

function ErrorPage () {
    return (
      <Link to="/">
        <ErrorMessage 
          mainMessage="Nothing to see here" 
          subMessage="Return to the main page"/>
      </Link>
    );
  }

export default ErrorPage;