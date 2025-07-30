import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { fetchweather } from './weatherSlice'; // Correction: import nommé avec {}
import { resetresult } from './weatherSlice'; // Correction: import nommé avec {}
export const SearchBar = () => {
    const [inputValue, setInputValue] = useState('');
    
    // Villes prédéfinies
    const allOptions = [
        'Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Agadir'
    ];

    // Selector
    const weather = useSelector((state) => state.weather?.weather); // Ajout du ?. pour la sécurité
    console.log("Weather data:", weather); // Debugging line
    const dispatch = useDispatch();
    // reset
    const handleReset= (e) => {
        e.preventDefault();
        dispatch(resetresult());
        setInputValue(''); // Réinitialiser la valeur de l'input
        
    };
// Fonction de soumission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Input value:", inputValue); // Debugging line
        if (inputValue.trim()) {
            dispatch(fetchweather(inputValue))
                .unwrap()
                .catch(error => {
                    console.error("Error fetching weather:", error);
                });
        }
        
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 d-flex" controlId="formBasicEmail">
                    <Autocomplete 
                        style={{ width: "100%", background: "white", opacity: "0.9" }}
                        className='autocomplete'
                        freeSolo//chois une ville n'existe pas
                        options={allOptions}
                        inputValue={inputValue}
                        onInputChange={(_, newValue) => setInputValue(newValue)}
                        renderInput={(params) => (
                            <TextField 
                                {...params} 
                                placeholder="Search for a city" 
                                variant="outlined"
                            />
                        )}
                    />
                    
                    <Button 
                        style={{ 
                            fontFamily: 'Roboto',
                            background: "#f1c40f",
                            marginLeft: "10px",
                            minWidth: "100px"
                        }}
                        type="submit"
                    >
                        Search
                    </Button>
                    <Button 
                        style={{ 
                            fontFamily: 'Roboto',
                            background: "#f1c40f",
                            marginLeft: "10px",
                            minWidth: "100px"
                        }}
                        onClick={handleReset}
                        type="submit"
                    >
                        <CancelIcon style={{ width: "16px", height: "16px" }} />Cancel
                    </Button>   
                </Form.Group>
            </Form>
        </div>
    );
};