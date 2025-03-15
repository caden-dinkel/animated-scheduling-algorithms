import InitialState from "@/states/InitialState";

const Home: React.FC = () => {
  const onSubmit = () => {
    console.log("Values Selected");
  };
  return (
    <div>
      <InitialState onSubmit={onSubmit} />
    </div>
  );
};
export default Home;
