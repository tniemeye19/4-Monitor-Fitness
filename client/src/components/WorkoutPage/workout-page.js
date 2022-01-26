import React, { useState } from "react";
import { Button, Box } from '@chakra-ui/react';
import { useMutation } from "@apollo/client";
import { ADD_EXERCISE } from "../../utils/mutations";
import Auth from "../../utils/auth";

const WorkoutPage = () => {
    const [equipment, setEquipment] = useState("7");

    const [exercises, setExercises] = useState(null);

    const [addExercise, {error}] = useMutation(ADD_EXERCISE);

    const url = window.location;

    const workoutId = url.toString().split("/")[4];

    const handleEquipmentChange = (e) => {
        setEquipment(e.target.value);
        console.log(equipment);
    }

    const exerciseSearch = () => {
        console.log(equipment);
        
        const api = `https://wger.de/api/v2/exercise/?equipment=${equipment}&language=2`;

        fetch(api, {
            "method": "GET"
        })
        .then(function(response){
            if(response.ok){
                response.json().then(function(data){
                    console.log(data.results);
                    setExercises(data.results);
                })
            }
            else{
                console.log("error");
            }
        })
    }

    const handleAddExercise = async (event) => {
        const exerciseName = event.target.parentElement.children[0].innerText;
        const exerciseDescription = event.target.parentElement.children[1].innerText;

        event.preventDefault();

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        const exerciseData = {
            exerciseTitle: exerciseName,
            exerciseDescription: exerciseDescription
        }

        
        if(!token){
            return false
        }

        try{
            const {data} = await addExercise({
                variables: {
                    workoutId: workoutId,
                    exerciseTitle: exerciseName,
                    exerciseDescription: exerciseDescription
                }
            })
            console.log(data);
        }
        catch(err){
            console.error(err);
        }
    }
    

    return (
        <div className="workout-page">
            <div className="workout-search">
                <label htmlFor="equipment">Select your equipment:</label>
                <select name="equipment" id="equipment" defaultValue={equipment} onChange={handleEquipmentChange}>
                    <option value="1">Barbell</option>
                    <option value="2">SZ-Bar</option>
                    <option value="3">Dumbbell</option>
                    <option value="4">Gym mat</option>
                    <option value="5">Swiss Ball</option>
                    <option value="6">Pull-up bar</option>
                    <option value="7">None</option>
                    <option value="8">Bench</option>
                    <option value="9">Incline bench</option>
                    <option value="10">Kettlebell</option>
                </select>
                <Button
                    className="search-btn"
                    colorScheme="orange"
                    size="lg"
                    onClick={exerciseSearch}>
                    Search
                </Button>
            </div>
            <div className="workoutList">
                <h1>Exercises</h1>
                {exercises && (
                    <div className="exercises">
                        {exercises.map((exercise, index) => (
                            <Box 
                            w="45%" 
                            key={index} 
                            borderWidth="1px" 
                            borderRadius="lg"
                            margin="3px"
                            padding="1px">
                                <div className="exercise">
                                    <h2>{exercise.name}</h2>
                                    <h3>{exercise.description}</h3>
                                    <Button
                                    className="add-btn"
                                    colorScheme="red"
                                    size="sm"
                                    onClick={handleAddExercise}>Add Exercise</Button>
                                </div>
                            </Box>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkoutPage;