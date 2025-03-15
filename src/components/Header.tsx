interface HeaderProps {
  label: string;
}

const Header: React.FC<HeaderProps> = ({ label }) => {
  return (
    <header>
      <h1>{label}</h1>
    </header>
  );
};
