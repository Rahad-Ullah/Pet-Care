

import SectionTitle from "../../components/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PetListingCard from "./PetListingCard";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const PetListing = () => {
    const [category, setCategory] = useState('Cat')
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [pets, setPets] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const axiosPublic = useAxiosPublic()

    useEffect(() => {
        axiosPublic.get(`/pets?category=${category}&search=${search}`)
          .then((res) => {
            setPets(res.data)
            setLoading(false)
          })
          .catch((err) => console.log(err));
      }, [category, search]);


      const fetchMoreData = () => {
        axiosPublic
          .get(`/pets?category=${category}&search=${search}`)
          .then((res) => {
            setPets((prevItems) => [...prevItems, ...res.data]);
    
            res.data.length > 0 ? setHasMore(true) : setHasMore(false);
          })
          .catch((err) => console.log(err));
      };
    
    console.log(pets)

    const handleSearch = e => {
        e.preventDefault()
        const searchText = e.target.search.value;
        const category = e.target.category.value;
        setCategory(category)
        setSearch(searchText)
        setLoading(true)
    }
    
    return (
        <div className="py-20 w-5/6 max-w-screen-xl mx-auto">
            <div className="text-center max-w-xl mx-auto">
                <SectionTitle
                    heading={'Waiting For Adoption'}
                    subheading={'Meet The Animals'}
                ></SectionTitle>
                <p className="text-accent mb-4">Adopting pets brings boundless joy, loyalty, and purpose. Transform lives—yours and theirs—by choosing compassion and companionship today.</p>
                <form onSubmit={handleSearch} className="join mt-6">
                <div>
                    <div>
                    <input className="input input-bordered join-item w-full" 
                    name="search"
                    placeholder="Search here..."/>
                    </div>
                </div>
                <select defaultValue={'Category'}
                name="category"
                className="select select-bordered join-item text-base">
                    <option disabled>Category</option>
                    <option value={'Dog'}>Dog</option>
                    <option value={'Cat'}>Cat</option>
                    <option value={'Rabbit'}>Rabbit</option>
                    <option value={'Bird'}>Bird</option>
                </select>
                <div className="indicator">
                    <button className="btn btn-primary text-base md:px-8 join-item">Search</button>
                </div>
                </form>
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
                        pets.map((pet, index) => <PetListingCard
                            key={index}
                            pet={pet}
                        ></PetListingCard>)
                    }
                    </div>
                    : <div className="py-32 mx-auto text-center text-info text-xl md:text-3xl font-semibold">No Data Found</div>
                }
                </InfiniteScroll>
            }
        </div>
    );
};

export default PetListing;