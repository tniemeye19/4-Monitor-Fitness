import React, { useState, useEffect } from "react";
import { Button, FormControl, FormLabel, Input, Box} from '@chakra-ui/react';

import { ADD_WORKOUT, DELETE_WORKOUT } from "../../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME, QUERY_USER, QUERY_WORKOUTS } from "../../utils/queries";
import Auth from "../../utils/auth";
import { Navigate } from "react-router";
import { useNavigate } from "react-router-dom";




const UserWorkoutPage = () => {
    const userInfo = Auth.getProfile();
    const username = userInfo.data.username

    const navigate = useNavigate();

    const [workouts, setWorkouts] = useState(null);

    
    const {loading, data} = useQuery(QUERY_USER, {
        variables: {username}
    });

    const [addWorkout, {error}] = useMutation(ADD_WORKOUT);

    const [deleteWorkout, {error2}] = useMutation(DELETE_WORKOUT);
        
    const [workoutTitle, setWorkoutTitle] = useState("");

    useEffect(() => {
        if(data){
            setWorkouts(data.user.workouts);
        }
    }, [data])

    const handleWorkoutSubmit = async (event) => {
        event.preventDefault();

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        
        if(!token){
            return false
        }


        try{
            const {data} = await addWorkout({
                variables: {workoutTitle, username}
            });

            window.location.assign("/userworkouts");
        }
        catch(err){
            console.error(err);
        }
    }

    const onEditBtnClick = (event) => {
        navigate(`/userworkouts/${event.target.id}`);
    }
    
    const onDeleteBtnClick = async (event) => {
        const workoutId = event.target.id
        try{
            const {data} = await deleteWorkout({
                variables: {workoutId: workoutId}
            })

            window.location.assign("/userworkouts");
        }
        catch(err){
            console.error(err);
        }
    }

    return (
        <div>
            <FormControl>
                <FormLabel htmlFor="workoutTitle">Workout Title:</FormLabel>
                <Input 
                    placeholder="Workout Title"
                    name="workoutTitle"
                    id="workoutTitle"
                    onChange={(e) => setWorkoutTitle(e.target.value)}
                />
                <Button
                    colorScheme="blue"
                    size="md"
                    onClick={handleWorkoutSubmit}>Add Workout
                </Button>
            </FormControl>
            <div className="userWorkoutList">
                <h1>Workouts</h1>
                {workouts && (
                    <div className="workouts">
                        {workouts && workouts.map((workout, index) => (
                            <Box
                            w="45%"
                            key={index}
                            borderWidth="1px"
                            borderRadius="lg"
                            margin="3px"
                            padding="1px">
                                <div className="workout">
                                    <h2>{workout.workoutTitle}</h2>
                                    <Button
                                    onClick={onEditBtnClick}
                                    id={workout._id}
                                    colorScheme="green">Edit Workout</Button>
                                    <Button
                                    colorScheme="red"
                                    id={workout._id}
                                    onClick={onDeleteBtnClick}>Delete Workout</Button>
                                </div>
                            </Box>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
};

export default UserWorkoutPage;