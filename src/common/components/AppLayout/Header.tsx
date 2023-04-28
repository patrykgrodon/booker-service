type HeaderProps = {
  toggleSidebar: () => void;
};

const Header = ({ toggleSidebar }: HeaderProps) => {
  return <div onClick={toggleSidebar}>Header</div>;
};

export default Header;
