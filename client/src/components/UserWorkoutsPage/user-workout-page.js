import React, { useState } from "react";
import { Button, FormControl, FormLabel, Input, Box} from '@chakra-ui/react';

import { ADD_WORKOUT } from "../../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME, QUERY_WORKOUTS } from "../../utils/queries";
import Auth from "../../utils/auth";




const UserWorkoutPage = () => {
    const userData = Auth.getProfile();
    const username = userData.data.username;
    

    const [workouts, setWorkouts] = useState(null);

    
    // const {loading, data} = useQuery(GET_ME);

    // const {loading2, data2} = useQuery(QUERY_WORKOUTS);

    const [addWorkout, {error}] = useMutation(ADD_WORKOUT);

    // const [userData, setUserData] = useState(loading ? null : data?.me);

    // const [workoutData, setWorkoutData] = useState(loading2 ? null : data2?.me)

    
    

    const [workoutTitle, setWorkoutTitle] = useState("");

    // if(loading){
    //     return <div>Loading...</div>
    // }


    const handleWorkoutSubmit = async (event) => {
        event.preventDefault();

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        
        if(!token){
            return false
        }


        try{

            console.log(workoutTitle);
            const {data} = await addWorkout({
                variables: {workoutTitle}
            });

            console.log(data);
            console.log(data.addWorkout.workouts);
            setWorkouts(data.addWorkout.workouts);
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
                        {workouts.map((workout, index) => (
                            <Box
                            w="45%"
                            key={index}
                            borderWidth="1px"
                            borderRadius="lg"
                            margin="3px"
                            padding="1px">
                                <div className="workout">
                                    <h2>{workout.workoutTitle}</h2>
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