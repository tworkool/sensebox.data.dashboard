import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestWeatherDataFetch } from "../../redux/actions/app_state";
import { getWeatherData } from "../../redux/selectors/appState";
import "./style.scss";

const HomePage = () => {
  const weatherData = useSelector(getWeatherData);
  const dispatch = useDispatch();

  const handleBtnClick = useCallback(() => {
    dispatch(requestWeatherDataFetch({ lat: 52.520008, lon: 13.404954 }));
  }, [dispatch]);

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

  return (
    <div className="wsb-page wbs-home-page">
      <button onClick={handleBtnClick}>Fetch Weather Data</button>
      <div>{JSON.stringify(weatherData)}</div>
    </div>
  );
};

export default HomePage;
