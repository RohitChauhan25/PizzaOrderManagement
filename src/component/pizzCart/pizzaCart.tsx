import moment from "moment";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { moveToNext } from "../../store/slice/pizzSLice";
import { useEffect, useState } from "react";

const PizzaCard = ({ pizza }: any) => {
  const dispatch = useDispatch();
  const [overtime, setOvertime] = useState(false);
  const [timeSpent, setTimeSpent] = useState<string | null>(null);

  useEffect(() => {
    const calculateTimeSpent = () => {
      const startTime = moment(pizza.startTime);
      const currentTime = moment();
      const duration = moment.duration(currentTime.diff(startTime));
      const minutes = duration.minutes();
      const seconds = duration.seconds();
      setTimeSpent(`${minutes} minutes ${seconds} seconds`);
      if (pizza.Size === "Small" && minutes >= 3) setOvertime(true);
      if (pizza.Size === "Medium" && minutes >= 4) setOvertime(true);
      if (pizza.Size === "Large" && minutes >= 5) setOvertime(true);
    };

    // Calculate time spent when the component mounts
    calculateTimeSpent();

    // Update time spent every second
    const intervalId = setInterval(calculateTimeSpent, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [pizza.startTime]);

  const movePizzaToNextStage = () => {
    dispatch(moveToNext(pizza));
  };

  return (
    <div className={`pizza-card ${overtime && "overtime"}`}>
      <p>Order No : {pizza.id}</p>
      {/* <h3>Type: {pizza.Type}</h3> */}
      <p>
        Size: <span>{pizza.Size}</span>
      </p>
      <p>{timeSpent}</p>
      <button onClick={movePizzaToNextStage} className="next">
        Next
      </button>
    </div>
  );
};

export default PizzaCard;
