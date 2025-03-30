import Cart from './cart.svg';
import Home from './home.svg';
import Profile from './profile.svg';
import Search from './search.svg';
import Close from './close.svg';

const Icons = ({
  width = 20,
  height = 20,
  fill = '#fff',
  name,
  stroke = '#fff',
}) => {
  switch (name) {
    case 'Cart':
      return <Cart width={width} height={height} fill={fill} stroke={stroke} />;
    case 'Home':
      return <Home width={width} height={height} fill={fill} stroke={stroke} />;
    case 'Search':
      return (
        <Search width={width} height={height} fill={fill} stroke={stroke} />
      );
    case 'Close':
      return (
        <Close width={width} height={height} fill={fill} stroke={stroke} />
      );
    case 'Profile':
      return (
        <Profile width={width} height={height} fill={fill} stroke={stroke} />
      );
    default:
      return null;
  }
};

export default Icons;
