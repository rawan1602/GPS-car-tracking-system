
import { useCard } from "./CardProvider";
import CloseSVG from "../assets/CloseSVG";
import "../Styles/CardForm.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AddCatigoryService, GetDevicesCount } from "../store/Devices/services/devicesService";

export default function AddCategoryCard() {
  const { toggleCard } = useCard();
  const dispatch= useDispatch()
  const inputStyle = {
    fontFamily: "Montserrat",
    fontSize: "14px",
    backgroundColor: "#1F1E22",
    width: "100%",
    height: "56px",
    margin: "5px 0",
  };

     const {
       register,
       handleSubmit,
       formState: { errors },
     } = useForm({
       mode: "onChange",
     });

     const AddCatigoryHandlerFunction = (data) => {
      dispatch(AddCatigoryService(data))
        .unwrap()
        .then(() => {
              dispatch(GetDevicesCount());
toggleCard()
        });
     };

  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ width: "70vw",  }}
    >
      <div className="w-100 d-flex justify-content-between align-items-center">
        <h3 className="m-0" style={{color:"white"}}>Add New Category</h3>

        <div onClick={toggleCard}>
          <CloseSVG />
        </div>
      </div>
      <form onSubmit={handleSubmit(AddCatigoryHandlerFunction)}>
        <div>
          <input
            autoFocus
            className="border border-dark p-2 rounded"
            style={inputStyle}
            {...register("category_name", {
              required: true,
            })}
          />

          {errors.category_name && errors.category_name.type === "required" && (
            <span style={{ color: "red" }}>category_name is required</span>
          )}
        </div>

        <button className="mt-3 mb-3" type="submit" >
          Done
        </button>
      </form>
    </div>
  );
}
