import React from 'react';
import { Card } from 'react-bootstrap';
import { 
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  WbSunny as SunIcon,
  Air as WindIcon,
  DeviceThermostat as TempIcon

} from '@mui/icons-material';
import OpacityIcon from '@mui/icons-material/Opacity';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import { useSelector } from 'react-redux';
import './App.css';
import moment from 'moment';// time
import { motion } from 'framer-motion'; // Pour les animations
import 'moment/locale/fr'; // Pour les dates en français
export default function Weather() {
  const weatherstate = useSelector((state) => state.weather?.weather);
  
  // Vérification complète des données avant utilisation
  if (!weatherstate || !weatherstate.sys || !weatherstate.main || !weatherstate.weather?.[0]) {
    return (
      <Card className='Card'>
        <Card.Body className="text-center">
          <p>No weather data available. Please search for a city.</p>
        </Card.Body>
      </Card>
    );
  }
// Animation configurations
const iconAnimations = {
    width: '200px',
    height: '200px',
    hover: {
      scale: 1.1,
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.9 },
    float: {
      y: [-5, 5],
      transition: {
        y: {
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }
      }
    }
  };
  // Extraction sécurisée des données avec valeurs par défaut
  const sunrise = new Date(weatherstate.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(weatherstate.sys.sunset * 1000).toLocaleTimeString();
  const windSpeed = weatherstate.wind.speed;
  const temperature = weatherstate.main.temp;
  const city = weatherstate.name;
  const country = weatherstate.sys.country;
  const humidity = weatherstate.main.humidity;
  const lastUpdated = new Date(weatherstate.dt * 1000).toLocaleString();
  const weatherCondition = weatherstate.weather[0].description;
  const iconCode = weatherstate.weather[0].icon;
  const currentTime = moment().locale('fr').format('dddd,DD MM yyyy'); // Formatage de l'heure actuelle
  return (
    <div>
      {/* Carte principale */}
      <Card className='Card'>
        <Card.Body>
          <Card.Title style={{color: "black"}}>
            {city}, {country} <LocationIcon className="icon" style={{width: "24px", height: "24px"}}/>
          </Card.Title>
            <Card.Text style={{color: "black" }}>
              {currentTime}
            </Card.Text>
          <Card.Text>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div className='titre' style={{fontSize: '2rem', margin: '10px 0'}}>
              <TempIcon style={{ width: "40px", height: "36px", color: '#FF6347' }} />
                {Math.round(temperature)}°C
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                  <motion.img
                  src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
                  alt={weatherCondition}
                  style={{ width: '200px' }}
                  variants={iconAnimations}
                  whileHover="hover"
                  whileTap="tap"
                  
                />
              </motion.div>
              <div className='titre' style={{textTransform: 'capitalize'}}>
                {weatherCondition}
              </div>
              <div style={{color:"#3498db", fontFamily:"Roboto"}} className='titre'>
                <TimeIcon className='time-icon' style={{width: "16px", height: "16px", marginRight: '5px'}}/>
                Last update: {lastUpdated}
              </div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Carte des détails */}
      <Card className='Card' style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', padding: '15px' }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <SunIcon style={{ width: "30px", height: "30px", color: '#FFA500' }} />
            <p>Sunrise: {sunrise}</p>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <WindIcon style={{ width: "30px", height: "30px", color: '#4682B4' }} />
            <p>WindSpeed: {windSpeed} m/s</p>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <OpacityIcon style={{ width: "30px", height: "30px", color: '#FF6347' }} />
            <p>humidity: {humidity} %</p>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <WbTwilightIcon style={{ width: "30px", height: "30px", color: '#FF6347' }} />
            <p>sunset:  {sunset}</p>
          </div>
        

        </div>
      </Card>
    </div>
  );
}