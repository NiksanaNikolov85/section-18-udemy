import { useState, useEffect } from "react";

export default function Meals () {
    const [loadedMeals, setLoadetMelas] = useState([]);

    useEffect(() => {
     async function fetchMeals () {
         const response = await fetch('http://localhost:3000/meals');
         if (!response.ok) {
            //... 
         }
         const meals = await response.json();
         console.log(meals);
         setLoadetMelas(meals);
     }
     fetchMeals();
    }, []);


    return <ul id="meals">
        {loadedMeals.map((meal) => {
           return <li>{meal.name}</li>
        })}
    </ul>
}