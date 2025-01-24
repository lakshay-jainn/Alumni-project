import { Payment } from "./columns.tsx"
import axios from "axios";


export async function getData(): Promise<Payment[]> {
  const BACKEND_URL = "http://localhost:8080/api/v1/alumni/showallalumni";
  const token='';
    try {
      const res= await axios.get(BACKEND_URL, {
         headers: {
            Authorization: `Bearer ${token}`,
        },
      });


    
    } catch (e) {
      throw new Error("Login failed. Please try again")
    }
    return [
      {
        id: '12',
        name: 'lakshay',
        jobtitle: 'software engineer',
        company: 'google',
        course: 'BSC H CS',
        batch: '2023-24',
        img:'place'

      },

      {
        id: '12',
        name: 'aaashay',
        jobtitle: 'software engineer',
        company: 'google',
        course: 'BSC H CS',
        batch: '2023-24',
        img:'place'

      },
      {
        id: '12',
        name: 'aaashay',
        jobtitle: 'software engineerr',
        company: 'google',
        course: 'BSC H CSc',
        batch: '2023-24',
        img:'place'

      },
      {
        id: '12',
        name: 'aaashay',
        jobtitle: 'software engineerrr',
        company: 'google',
        course: 'BSC H CS',
        batch: '2023-24',
        img:'place'

      },
      {
        id: '12',
        name: 'aaasdhay',
        jobtitle: 'software engineerrr',
        company: 'google',
        course: 'BSC H CSss',
        batch: '2023-243',
        img:'place'

      },
      {
        id: '12',
        name: 'aaashay',
        jobtitle: 'software engineerrr',
        company: 'google',
        course: 'BSC H CS',
        batch: '2023-244',
        img:'place'

      },
      {
        id: '12',
        name: 'aaashay',
        jobtitle: 'software engineerrr',
        company: 'google',
        course: 'BSC H CS',
        batch: '2023-244',
        img:'place'

      },
      {
        id: '12',
        name: 'aaashay',
        jobtitle: 'software engineerrr',
        company: 'google',
        course: 'BSC H CS',
        batch: '2023-244',
        img:'place'

      },
      {
        id: '12',
        name: 'aaashay',
        jobtitle: 'software engineerrr',
        company: 'google',
        course: 'BSC H CS',
        batch: '2023-244',
        img:'place'

      },
      {
        id: '12',
        name: 'aaashay',
        jobtitle: 'software engineerrr',
        company: 'google',
        course: 'BSC H CS',
        batch: '2023-244',
        img:'place'

      },
      {
        id: '12',
        name: 'aaashay',
        jobtitle: 'software engineerrr',
        company: 'google',
        course: 'BSC H CS',
        batch: '2023-244',
        img:'place'

      },
      {
        id: '12',
        name: 'aaashay',
        jobtitle: 'software engineerrr',
        company: 'google',
        course: 'BSC H CS',
        batch: '2023-244',
        img:'place'

      },
      {
        id: '12',
        name: 'aaashay',
        jobtitle: 'software engineerrr',
        company: 'google',
        course: 'BSC H CS',
        batch: '2023-244',
        img:'place'

      },
      {
        id: '12',
        name: 'aaashay',
        jobtitle: 'software engineerrr',
        company: 'google',
        course: 'BSC H CS',
        batch: '2023-244',
        img:'place'

      },
      {
        id: '12',
        name: 'aaashay',
        jobtitle: 'software engineerrr',
        company: 'google',
        course: 'BSC H CS',
        batch: '2023-244',
        img:'place'

      },
      {
        id: '12',
        name: 'aaashay',
        jobtitle: 'software engineerrr',
        company: 'google',
        course: 'BSC H CS',
        batch: '2023-244',
        img:'place'

      },
      {
        id: '12',
        name: 'aaashay',
        jobtitle: 'software engineerrr',
        company: 'google',
        course: 'BSC H CS',
        batch: '2023-244',
        img:'place'

      },
      // ...
    ]
  // Fetch data from your API here.
  
}

 
