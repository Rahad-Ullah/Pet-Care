import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useCategories = () => {
    const {data: categories=[]} = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await axios.get('/categories.json')
            return res.data;
        }
    })
    
    return [categories]
};

export default useCategories;