import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCampaigns = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    
    const {data: campaigns=[], refetch} = useQuery({
        queryKey: ['campaigns'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/campaigns?email=${user.email}`)
            return res.data;
        }
    })
    
    return [campaigns, refetch]
};

export default useCampaigns;