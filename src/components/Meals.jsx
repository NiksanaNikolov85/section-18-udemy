import { useState, useEffect } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from '../components/UI/Error';

const requestConfig = {};

export default function Meals () {
    const {data: loadedMeals, isLoading, error} = useHttp('http://localhost:3000/meals', requestConfig, [])
   //const [loadedMeals, setLoadetMelas] = useState([]);
//    useEffect(() => {
//     async function fetchMeals () {
//         const response = await fetch('http://localhost:3000/meals');
//         if (!response.ok) {
//            alert('something is wrong')
//         }
//         const meals = await response.json();
//         setLoadetMelas(meals);
//     }
//     fetchMeals();
//    }, []);

    if (isLoading) {
        return <p className="center">Fetching meals ... </p>
    }

    if (error) {
        return <Error title="Failed to fetch meals" message={error}/>
    }

    
    return <ul id="meals">
        {loadedMeals.map((meal) => (
           <MealItem key={meal.key} meal={meal}/>
        ))}
    </ul>
}