import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();
const CITIES_URL = "http://localhost:9000/cities"

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: ''

}

const reducer = (state, action) => {
    switch (action.type) {
        case 'loading':
            return {
                ...state, isLoading: true
            }
        case 'cities/loaded':
            return {
                ...state, isLoading: false, cities: action.payload
            }
        case 'city/loaded':
            return {
                ...state, isLoading: false, currentCity: action.payload
            }
        case 'city/created':
            return {
                ...state, isLoading: false, cities: [...state.cities, action.payload], currentCity: action.payload
            }
        case 'city/deleted':
            return {
                ...state, isLoading: false, cities: state.cities.filter(item => item.id !== action.payload)
            }
        case 'rejected':
            return {
                ...state, isLoading: false, error: action.payload
            }
        default: throw new Error('Unknown action');
    }

}

const CitiesProvider = ({ children }) => {
    // const [cities, setCities] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [currentCity, setCurrentCity] = useState({})
    const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initialState);


    useEffect(() => {
        async function fetchCities() {
            dispatch({ type: 'loading' });
            try {
                const res = await fetch(`${CITIES_URL}`);
                const data = await res.json();
                dispatch({ type: 'cities/loaded', payload: data })

            } catch {
                dispatch({ type: 'rejected', payload: 'error but we going to change this error handling later' })
            }
        }
        fetchCities();
    }, [])

    const getCity = async (id) => {
        if(currentCity.id === Number(id)) return;
        
        dispatch({ type: 'loading' })
        try {
            const res = await fetch(`${CITIES_URL}/${id}`);
            const data = await res.json();
            dispatch({ type: 'city/loaded', payload: data })

        } catch {
            dispatch({ type: 'rejected', payload: 'cannot fetch/load city' });
        }
    }


    const createCity = async (newCity) => {
        dispatch({ type: 'loading' });

        try {
            const res = await fetch(`${CITIES_URL}/`, { method: "POST", body: JSON.stringify(newCity), headers: { "Content-Type": "application/json" } });
            const data = await res.json();
            dispatch({ type: 'city/created', payload: data })

        } catch {
            dispatch({ type: 'rejected', payload: 'cannot create city' })
        }
    }

    const deleteCity = async (id) => {
        dispatch({ type: 'loading' });
        try {

            await fetch(`${CITIES_URL}/${id}`, { method: "DELETE", body: JSON.stringify(id), headers: { "Content-Type": "application/json" } });
            dispatch({ type: 'city/deleted', payload: id })
        } catch (e) {
            console.error(e);
        }
    }

    return <CitiesContext.Provider value={
        {
            cities,
            isLoading,
            currentCity,
            error,
            getCity,
            createCity,
            deleteCity
        }
    }>{children}</CitiesContext.Provider>
}

const useCities = () => {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error('CitiesContext used outside scope')
    return context;
}

export { CitiesProvider, useCities };