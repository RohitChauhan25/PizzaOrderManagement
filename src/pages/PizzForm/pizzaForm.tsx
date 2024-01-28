import { useState } from "react";
import "../PizzForm/style.css";
import { useDispatch, useSelector } from "react-redux";
import { addPizza } from "../../store/slice/pizzSLice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
const PizzaForm = () => {
  const [pizza, setPizzaData] = useState({
    Type: "",
    Base: "",
    Size: "",
  });

  const { pizzas } = useSelector((state: RootState) => state.pizzaReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (title: string, value: string) => {
    setPizzaData((prev) => ({
      ...prev,
      [title]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let filterPizzs = pizzas?.filter((item) => item.stage == 1);

    if (filterPizzs?.length < 10) {
      const newPizza = {
        ...pizza,
        stage: 1,
        id: pizzas?.length + 1, // Assign a new id
        startTime: new Date(), // Assign the current time as startTime
        orderPlaceTime: new Date(), // Assign the current time as orderPlaceTime
      };

      dispatch(addPizza(newPizza));
      navigate("/order");
    } else {
      alert("Not taking any order for now");
      return;
    }
  };

  return (
    <div className="Container">
      <div className="add-button-container">
        <div className="add-button" onClick={() => navigate("/order")}>
          View Orders
        </div>
      </div>
      <form className="pizza-form" onSubmit={handleSubmit}>
        <label>
          Type:
          <select
            placeholder="select Type"
            value={pizza.Type}
            onChange={(e) => handleChange("Type", e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </label>

        <label>
          Size:
          <select
            value={pizza.Size}
            onChange={(e) => handleChange("Size", e.target.value)}
          >
            <option value="">Select Size</option>
            <option value="Large">Large</option>
            <option value="Medium">Medium</option>
            <option value="Small">Small</option>
          </select>
        </label>

        <label>
          Base:
          <select
            value={pizza.Base}
            onChange={(e) => handleChange("Base", e.target.value)}
          >
            <option value="">Select Base</option>
            <option value="Thin">Thin</option>
            <option value="Thick">Thick</option>
          </select>
        </label>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default PizzaForm;
