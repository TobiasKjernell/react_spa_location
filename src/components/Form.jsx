// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContexts";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt()).map(char => String.fromCharCode(char - 127397).toLowerCase()).join('')
  return (<img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />)
}


function Form() {
  const navigate = useNavigate();
  const { createCity, isLoading } = useCities();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [emoji, setEmoji] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState("");

  useEffect(() => {

    if (!lat && !lng) return;
    const fetchCitydata = async () => {
      try {
        setIsLoadingGeocoding(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json();
        setGeocodingError("");
        if (!data.countryCode) throw new Error(`That doesn't seem to be a city. Click somewhere else`)

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))

      } catch (err) {
        setGeocodingError(err.message);
      }
      finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCitydata();
  }, [lat, lng])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng }
    }
    await createCity(newCity);
    navigate('/app/cities')
  }

  if (isLoadingGeocoding) return <Spinner />
  if (!lat && !lng) return <Message message='Start by clicking on the map' />
  if (geocodingError) return <Message message={geocodingError} />

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji && flagemojiToPNG(emoji)}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker onChange={date => setDate(date)} selected={date} dateFormat="dd/mm/yyyy" />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button type="back" onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}>&larr; Back</Button>
      </div>
    </form>
  );
}

export default Form;
