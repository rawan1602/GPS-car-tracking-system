
import { useCard } from "./CardProvider";
import CloseSVG from "../assets/CloseSVG";
import "../Styles/CardForm.css";
import { useDispatch, useSelector } from "react-redux";
import MultiSelect from "./MultiSelect/MultiSelect";
import { useForm } from "react-hook-form";
import { AddDeviceService, GetDevicesCount } from "../store/Devices/services/devicesService";

export default function AddDeviceCard() {
  const { toggleCard } = useCard();
  const {  data } = useSelector((state) => state.devicesSlice);
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
           setValue,
           formState: { errors },
         } = useForm({
           mode: "onChange",
         });


         const AddDeviceHandlerFunction = (data) => {
            
           dispatch(AddDeviceService(data))
             .unwrap()
             .then(() => {
               dispatch(GetDevicesCount());
               toggleCard();
             });
         };
  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ width: "70vw" }}
    >
      <div className="w-100 d-flex justify-content-between align-items-center">
        <h3 className="m-0" style={{ color: "white" }}>
          Add New Device
        </h3>

        <div onClick={toggleCard}>
          <CloseSVG />
        </div>
      </div>
      <form onSubmit={handleSubmit(AddDeviceHandlerFunction)}>
        <div>
          <p style={{ marginTop: "15px" }}>Serial Number</p>
          <input
            autoFocus
            className="border border-dark p-2 rounded"
            style={inputStyle}
            {...register("serial_number", {
              required: true,
            })}
          />

          {errors.serial_number && errors.serial_number.type === "required" && (
            <span style={{ color: "red" }}>serial number is required</span>
          )}
        </div>
        <div>
          <p style={{ marginTop: "15px" }}>Phone</p>
          <input
            autoFocus
            className="border border-dark p-2 rounded"
            style={inputStyle}
            type="number"
            {...register("phone", {
              required: true,
            })}
          />

          {errors.phone && errors.phone.type === "required" && (
            <span style={{ color: "red" }}>phone is required</span>
          )}
        </div>
        <div>
          <p style={{ marginTop: "15px" }}>Car Name</p>
          <input
            autoFocus
            className="border border-dark p-2 rounded"
            style={inputStyle}
            {...register("car_name", {
              required: true,
            })}
          />

          {errors.car_name && errors.car_name.type === "required" && (
            <span style={{ color: "red" }}>car_name is required</span>
          )}
        </div>

        <div>
          <p style={{ marginTop: "15px" }}>Plate Number</p>
          <input
            autoFocus
            className="border border-dark p-2 rounded"
            style={inputStyle}
            {...register("plate_number", {
              required: true,
            })}
          />

          {errors.plate_number && errors.plate_number.type === "required" && (
            <span style={{ color: "red" }}>plate_number is required</span>
          )}
        </div>

        <div>
          <MultiSelect
            required={true}
            data={
              data?.categories &&
              data?.categories?.map((el) => ({
                ...el,
                label: el.category_name,
                value: el.id,
              }))
            }
            onSelectionChange={(e) => {
              setValue("category", e.value);
            }}
          />
        </div>

        <button
          className="mt-3"
          type="submit"
          // onClick={function () {
          //   toggleCard();
          //   // Do some more things
          // }}
        >
          Done
        </button>
      </form>
    </div>
  );
}
