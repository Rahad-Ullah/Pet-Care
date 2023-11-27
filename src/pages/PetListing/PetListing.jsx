import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../components/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PetListingCard from "./PetListingCard";
import { useState } from "react";

const PetListing = () => {
    const [category, setCategory] = useState('Cat')
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    console.log(category, search)
    
    const axiosPublic = useAxiosPublic()
    const {data: pets=[], refetch} = useQuery({
        queryKey: ['pets', category, search],
        queryFn: async () => {
            const res = await axiosPublic.get(`/pets?category=${category}&search=${search}`)
            setLoading(false)
            return res.data;
        }
    })
    console.log(pets)

    const handleSearch = e => {
        e.preventDefault()
        const searchText = e.target.search.value;
        const category = e.target.category.value;
        setCategory(category)
        setSearch(searchText)
        refetch()
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
                    <input className="input input-bordered join-item" 
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
                    <button className="btn btn-primary text-base px-8 join-item">Search</button>
                </div>
                </form>
            </div>
            {
                loading ? <div className="py-32 mx-auto text-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>
                : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-14">
                    {
                        pets.map(pet => <PetListingCard
                            key={pet._id}
                            pet={pet}
                        ></PetListingCard>)
                    }
                </div>
            }
        </div>
    );
};

export default PetListing;