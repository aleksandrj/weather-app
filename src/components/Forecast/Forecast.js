import { Drop, Sun, Wind } from 'phosphor-react';
import styles from './Forecast.module.css';

const Forecast = (props) => {
  return (
    <div className={`container-md ${styles['forecast-container']} `}>
      <div className={`row ${styles['forecast-header']}`}>
        <div
          className={` d-flex justify-content-center align-items-center ${styles['forecast-date']}`}
        >
          {props.forecast.current.weekday} {props.forecast.current.date},{' '}
          {props.forecast.current.city}
        </div>
      </div>
      <div
        className={`row d-flex justify-content-center ${styles['forecast-main']}`}
      >
        <div className="d-flex justify-content-center align-items-center mt-2">
          <div className={`row d-flex col-6 ${styles['weather-details']}`}>
            <div className={`${styles['weather-detail']}`}>
              <span>
                <Wind className={styles.icon} size={24} weight="fill" />{' '}
                {props.forecast.current.wind} m/s
              </span>
            </div>
            <div className={`${styles['weather-detail']}`}>
              <span>
                {' '}
                <Drop className={styles.icon} size={24} weight="fill" />{' '}
                {props.forecast.current.humidity} %
              </span>
            </div>
            <div className={`${styles['weather-detail']}`}>
              <span>
                {' '}
                <Sun className={styles.icon} size={24} weight="fill" />{' '}
                {props.forecast.current.uvIndex}
              </span>
            </div>
          </div>
          <div className={`d-flex col-6 ${styles['main-temp-container']}`}>
            <h1 className={` ${styles['forecast-main-temp']}`}>
              {props.forecast.current.temperature}&deg;
            </h1>
          </div>
        </div>
        <p className={`${styles.conditions}`}>
          {props.forecast.current.conditions}
        </p>
      </div>
      <div className={`row ${styles['forecast-weekly']}`}>
        {props.forecast.forecast &&
          props.forecast.forecast.map((day, index) => {
            return (
              <div
                className={`g-0 mt-2 mb-2 ${styles['forecast-weekly-item']}`}
                key={index}
              >
                <p
                  key={`${day.weekday}-${day.date}-${day.index}`}
                  className="mb-1"
                >
                  {day.weekday}
                </p>
                <p
                  key={`${day.weekday}-${day.date}-${day.minTemp}`}
                  className="mb-0"
                >
                  {day.minTemp}&deg;
                </p>
                <p
                  key={`${day.weekday}-${day.date}-${day.maxTemp}`}
                  className="mb-0"
                >
                  {day.maxTemp}&deg;
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Forecast;
