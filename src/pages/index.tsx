import StateHandler from "@/states/StateHandler";

const Home: React.FC = () => {
  return (
    <div>
      <StateHandler />
    </div>
  );
};
export default Home;
// import { useState } from "react";
// import Timer from "../components/Timer";
// import ProcessQueue from "../components/ProcessQueue";

// const Home: React.FC = () => {
//   const [time, setTime] = useState<number>(0);
//   // Callback function to update the time from the Timer component
//   const handleTimeUpdate = (newTime: number) => {
//     setTime(newTime);
//   };

//   return (
//     <div>
//       <h1>Process Queue with Timer</h1>
//       <Timer onTimeUpdate={handleTimeUpdate} />
//       <ProcessQueue time={time} />
//     </div>
//   );
// };

// export default Home;
