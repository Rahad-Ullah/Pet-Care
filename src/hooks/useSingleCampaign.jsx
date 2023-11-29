import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSingleCampaign = ({id}) => {
    const axiosSecure = useAxiosSecure()
    
    const {data: campaign={}, refetch, isLoading} = useQuery({
        queryKey: ['campaigns', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/single-campaign?id=${id}`)
            return res.data;
        }
    })
    
    return [campaign, refetch, isLoading]
};

export default useSingleCampaign;