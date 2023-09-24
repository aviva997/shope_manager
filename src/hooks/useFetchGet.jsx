import axios from 'axios';
import { useEffect, useState } from 'react';

function useFetchGet (url, headers){

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const[error, setError] = useState(null);

    useEffect(()=>{

        const fetch = async ()=>{
            try{
                setLoading(true)
                const response = await axios.get(url,{
                    headers
                })

                setData(response.data)

            }catch(error){
                setError(error)

            }finally{
                setLoading(false)
            }
        }

        fetch();
    },[url])

    return [data, loading,error]

}

export default useFetchGet