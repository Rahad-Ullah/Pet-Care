
import SectionTitle from "../../components/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CampaignsCard from "./CampaignsCard";

const Campaigns = () => {
    const [loading, setLoading] = useState(false)
    const [pets, setPets] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const axiosPublic = useAxiosPublic()

    useEffect(() => {
        axiosPublic.get(`/all-campaigns`)
          .then((res) => {
            setPets(res.data)
            setLoading(false)
          })
          .catch((err) => console.log(err));
      }, []);


      const fetchMoreData = () => {
        axiosPublic
          .get(`/all-campaigns`)
          .then((res) => {
            setPets((prevItems) => [...prevItems, ...res.data]);
    
            res.data.length > 0 ? setHasMore(true) : setHasMore(false);
          })
          .catch((err) => console.log(err));
      };
    

    
    return (
        <div className="py-20 w-5/6 max-w-screen-xl mx-auto">
            <div className="text-center max-w-xl mx-auto">
                <SectionTitle
                    heading={'Support Our Furry Pets'}
                    subheading={'Gift of Love'}
                ></SectionTitle>
                <p className="text-accent mb-4">Every Contribution Counts: Your Pet Rescue Donation Card Sparks Change, Offering Comfort, Healing, and Second Chances to Beloved Companions in Need.</p>
            </div>
            {
                loading ? <div className="py-32 mx-auto text-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>
                : <InfiniteScroll
                dataLength={pets.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<div className="py-32 mx-auto text-center text-lg md:text-2xl font-semibold">Loading...</div>}
                >
                {
                    pets.length > 0 ?
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-14">
                    {
                        pets.map((pet, index) => <CampaignsCard
                            pet={pet}
                            key={index}
                        ></CampaignsCard>)
                    }
                    </div>
                    : <div className="py-32 mx-auto text-center text-info text-xl md:text-3xl font-semibold">No Data Found</div>
                }
                </InfiniteScroll>
            }
        </div>
    );
};

export default Campaigns;