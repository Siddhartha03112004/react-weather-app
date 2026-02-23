import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { useState } from "react";

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "17b5446388379238e99e6e7b699899d9";

  let getWeatherInfo = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      let response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`,
      );
      let jsonResponse = await response.json();
      let result = {
        city: city,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  };

  let handleChange = (evt) => {
    setCity(evt.target.value);
  };

  let handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      let newInfo = await getWeatherInfo();
      updateInfo(newInfo);
      setCity("");
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="SearchBox">
      <div className="glassBox">
        <form onSubmit={handleSubmit}>
          <TextField
            id="city"
            label="City Name"
            variant="outlined"
            required
            value={city}
            onChange={handleChange}
            sx={{
              width: "100%",
              mb: 2,

              "& .MuiOutlinedInput-root": {
                backgroundColor: "rgba(255,255,255,0.1)", // <-- ADD THIS
                color: "white",

                "& fieldset": {
                  borderColor: "rgba(255,255,255,0.4)",
                },
                "&:hover fieldset": {
                  borderColor: "#00ffff",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#8a2be2",
                },
              },

              "& .MuiInputLabel-root": {
                color: "rgba(255,255,255,0.7)",
              },

              "& .MuiInputLabel-root.Mui-focused": {
                color: "#00ffff",
              },

              "& input": {
                color: "white",
              },
            }}
          />
          <br></br>
          <br></br>
          <Button variant="contained" type="submit">
            Search
          </Button>
          {error && <p style={{ color: "red" }}>No such place exist</p>}
        </form>
      </div>
    </div>
  );
}
