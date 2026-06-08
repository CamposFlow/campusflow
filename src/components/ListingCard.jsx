import {ChevronDown} from "lucide-react";
import {useState} from "react";
import {MapPin} from "lucide-react";
import {getCategories} from "../services/api.js";

const listings =[

]

const filter = [
        {label:'Category', key:'category'},
        {label: 'Condition', key:'condition'},
        {label: 'Price Range', key:'price'},
    ]

    const FilterChips = ({categories = [], onFilterChange})=>{
    const handleCategory = (id) => {
        onFilterChange({category_id:id});
    };
    

    return (
        <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollable-hide">
            {
                categories.map(({id, name}) =>
                     (
                        <button key={id}
                                className="flex items-center gap-1 px-4 py-1.5 rounded-full text-sm whitespace-nowrap border transition-all
                              bg-white text-gray-600 border-gray-200 "
                        onClick={()=>handleCategory(id)}>
                            {name}
                            <ChevronDown size={14}/>
                        </button>
                    )
                )
            }

        </div>
    )
}

export default FilterChips;