import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();
const CITIES_URL = "http://localhost:9000/cities"

const CitiesProvider = ({ children }) => {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({})

    useEffect(() => {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${CITIES_URL}`);
                const data = await res.json();
                setCities(data);
                console.log(data);

            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, [])

    const getCity = async (id) => {

        try {
            setIsLoading(true);
            const res = await fetch(`${CITIES_URL}/${id}`);
            const data = await res.json();
            setCurrentCity(data);

        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    return <CitiesContext.Provider value={
        {
            cities,
            isLoading,
            currentCity,
            getCity
        }
    }>{children}</CitiesContext.Provider>
}

const useCities = () => {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error('CitiesContext used outside scope')
    return context;
}

export { CitiesProvider, useCities };