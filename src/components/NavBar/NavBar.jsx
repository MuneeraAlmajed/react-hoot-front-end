import { useContext } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {

  const { user } = useContext(UserContext)

  return (
    <nav>
      <ul>

        { user
          ?
          <li>Hello {user.username}</li>
          :
          <li><Link to='/sign-up'>Sign Up</Link></li>
        }
      </ul>
    </nav>
  );
};

export default NavBar;