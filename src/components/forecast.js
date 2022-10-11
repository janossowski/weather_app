import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ( props ) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek - 1, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek - 1));
  
  var nice_score = 0;
  var rainy = false;
  var avg_temp_bad = false;
  var extreme_temp_bad = false;
  for (let i = 0; i < 7; i++) {
    if(props.forecast.forecast.forecastday[i].day.daily_will_it_rain === 1) rainy = true;
    if(props.forecast.forecast.forecastday[i].day.avgtemp_c > 25 || props.forecast.forecast.forecastday[i].day.avgtemp_c < 18) avg_temp_bad = true;
    if(props.forecast.forecast.forecastday[i].day.maxtemp_c > 30 || props.forecast.forecast.forecastday[i].day.mintemp_c < 15) extreme_temp_bad = true;
  }
  nice_score = 3 - rainy - avg_temp_bad - extreme_temp_bad;
  let nice_desc;
  if (nice_score === 3) {
    nice_desc = 'The weather is going to be very nice!';
  } else if (nice_score === 2) {
    nice_desc = 'The weather is going to be okay!';
  } else {
    nice_desc = 'The weather is not going to be nice.';
  }

  return (
    <div>
      <label className="title">Daily weather forecast. {nice_desc}</label>
      <Accordion allowZeroExpanded>
        {props.forecast.forecast.forecastday.map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img src={item.day.condition.icon} className="icon-small" alt="weather" />
                  <label className="day">{forecastDays[idx]}</label>
                  <label className="description">{item.day.condition.text}</label>
                  <label className="min-max">{Math.round(item.day.maxtemp_c)}°C /{Math.round(item.day.mintemp_c)}°C</label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Humidity:</label>
                  <label>{item.day.avghumidity}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Max wind speed:</label>
                  <label>{item.day.maxwind_kph} km/h</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Forecast;