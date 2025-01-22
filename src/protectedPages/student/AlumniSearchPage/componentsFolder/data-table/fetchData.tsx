import { Payment } from "./columns.tsx"

 
export async function getData(): Promise<Payment[]> {
    return [
      {
        id: '12',
        name: 'lakshay',
        jobtitle: 'software engineer',
        company: 'google',
        course: 'BSC H CS',
        batch: '2023-24'

      },
      {
        id: '12',
        name: 'aaashay',
        jobtitle: 'software engineer',
        company: 'google',
        course: 'BSC H CS',
        batch: '2023-24'

      },
      {
        id: '12',
        name: 'aaashay',
        jobtitle: 'software engineerr',
        company: 'google',
        course: 'BSC H CSc',
        batch: '2023-24'

      },
      {
        id: '12',
        name: 'aaashay',
        jobtitle: 'software engineerrr',
        company: 'google',
        course: 'BSC H CS',
        batch: '2023-24'

      },
      // ...
    ]
  // Fetch data from your API here.
  
}

 
