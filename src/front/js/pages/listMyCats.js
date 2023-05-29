import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ListMyCats = () => {
    const [cats, setCats] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
      const token = localStorage.getItem("miTokenJWT");
      
      if (!token) {
        // No tengo el token, no debería poder acceder a esta página de React
        navigate('/login');
      } else {
        getCats(token);
      }
    }, [navigate]);
    
    const getCats = async (token) => {
      try {
        const response = await fetch(process.env.BACKEND_URL + "/api/cats", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setCats(data);
        } 
      } catch (error) {
        console.log(error);
      }
    };
    
    
    return (
      <div>
       {cats && cats.map((cat) => (
          <div key={cat.id}>
              <h2>{cat.name}</h2>
              <img src={cat.image_url}/>
          </div>
        ))} 
      </div>
    );
  };
