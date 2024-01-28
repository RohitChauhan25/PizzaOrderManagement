import "../MainDisplay/style.css";
import PizzaCard from "../../component/pizzCart/pizzaCart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import { cacelOrder } from "../../store/slice/pizzSLice";

const pizzaData = [
  {
    id: 1,
    type: "Veg",
    size: "Large",
    base: "Thin",
    stage: "Order Placed",
    startTime: "2024-01-27T12:00:00",
  },
  {
    id: 2,
    type: "Non-Veg",
    size: "Medium",
    base: "Thick",
    stage: "Order in Making",
    startTime: "2024-01-27T12:15:00",
  },
  {
    id: 3,
    type: "Veg",
    size: "Small",
    base: "Thin",
    stage: "Order Ready",
    startTime: "2024-01-27T12:30:00",
  },
  {
    id: 4,
    type: "Non-Veg",
    size: "Large",
    base: "Thick",
    stage: "Order Picked",
    startTime: "2024-01-27T12:45:00",
  },
];

const MainDisplay = () => {
  const { pizzas } = useSelector((state: RootState) => state.pizzaReducer);
  const navigate = useNavigate();
  const [individualTimes, setIndividualTimes] = useState<any>({});
  const dispatch = useDispatch();
  // calculate spent time
  const calculateIndividualTime = () => {
    const updatedIndividualTimes: any = {};
    pizzas.forEach((item) => {
      const startTime = moment(item?.orderPlaceTime);
      const currentTime = moment();
      const duration = moment.duration(currentTime.diff(startTime));
      const minutes = duration.minutes();
      const seconds = duration.seconds();
      updatedIndividualTimes[item.id] = `${minutes} minutes ${seconds} seconds`;
    });

    setIndividualTimes(updatedIndividualTimes);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      calculateIndividualTime();
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [pizzas]);

  const handleCancel = (item: any) => {
    dispatch(cacelOrder(item));
  };

  const stages = (stage: number) => {
    switch (stage) {
      case 1:
        return "Order Placed";
      case 2:
        return "Order in Making";
      case 3:
        return "Order Ready";
      case 4:
        return "Order Picked";
      default:
        return "Order Canceled";
    }
  };

  return (
    <div className="main-display">
      <div className="add-button-container">
        <div className="add-button" onClick={() => navigate("/")}>
          + Add Order
        </div>
      </div>
      <div className="colum-container">
        <div className="column">
          <p className="title">Order Placed</p>
          <div className="cart-wrap">
            <div>
              {pizzas
                ?.filter((pizza: any) => pizza.stage === 1)
                ?.map((pizza: any, index: number) => (
                  <PizzaCard key={index} pizza={pizza} />
                ))}
            </div>
          </div>
        </div>

        <div className="column">
          <p className="title">Order in Making</p>
          <div className="cart-wrap">
            {pizzas
              ?.filter((pizza: any) => pizza.stage === 2)
              ?.map((pizza: any, index: number) => (
                <PizzaCard key={index} pizza={pizza} />
              ))}
          </div>
        </div>

        <div className="column">
          <p className="title">Order Ready</p>
          <div className="cart-wrap">
            {pizzas
              .filter((pizza: any) => pizza.stage === 3)
              .map((pizza: any, index: number) => (
                <PizzaCard key={index} pizza={pizza} />
              ))}
          </div>
        </div>

        <div className="column">
          <p className="title">Order Picked</p>
          <div className="cart-wrap">
            {pizzas
              .filter((pizza: any) => pizza.stage === 4)
              .map((pizza: any, index: number) => (
                <PizzaCard key={index} pizza={pizza} />
              ))}
          </div>
        </div>
      </div>

      <h2>Order Information</h2>

      <table>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Stage</th>
            <th>Total time spent</th>
            <th className="action">Action</th>
          </tr>
        </thead>
        <tbody>
          {pizzas?.map((item: any) => {
            return (
              <tr className={`${item.stage === -1 && "cancel"}`}>
                <td>{item?.id}</td>
                <td>{stages(item.stage)}</td>
                <td>{item.stage !== -1 && individualTimes[item?.id]}</td>

                <td className="action">
                  {item?.stage < 3 && item.stage !== -1 && (
                    <button
                      className="cancel-btn"
                      onClick={() => handleCancel(item)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>Total orderd delivered</td>
            <td colSpan={3}>
              {pizzas?.filter((item) => item.stage === 4).length}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default MainDisplay;
