/**
 * This file defines a React component 'Search' that represents a search section.
 * It includes input fields for room type and search query, as well as a button to
 * trigger the search. It uses the useRouter hook from 'next/navigation' to handle
 * navigation based on filter parameters.
 */

"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FC } from "react";

// Define the Props type for the Search component
type Props = {
  roomTypeFilter: string; // Selected room type filter
  searchQuery: string; // Search query input
  setRoomTypeFilter: (value: string) => void; // Function to set room type filter
  setSearchQuery: (value: string) => void; // Function to set search query
};

// Define the Search component
const Search: FC<Props> = ({ roomTypeFilter, searchQuery, setRoomTypeFilter, setSearchQuery }) => {
  // Hook for handling navigation
  const router = useRouter();

  // Handler for changing room type filter
  const handleRoomTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRoomTypeFilter(event.target.value);
  };

  // Handler for changing search query
  const handleSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Handler for triggering the search
  const handleFilterClick = () => {
    router.push(`/rooms?roomType=${roomTypeFilter}&searchQuery=${searchQuery}`);
  };

  // Render the search section with input fields and search button
  return (
    <section className="bg-tertiary-light px-4 py-6 rounded-lg">
      <div className="container mx-auto flex gap-4 flex-wrap justify-between items-center">
        <div className="w-full md:1/3 lg:w-auto mb-4 md:mb-0">
          <label className="block text-sm font-medium mb-2 text-black">Room Type</label>
          <div className="relative">
            {/* Dropdown for selecting room type filter */}
            <select value={roomTypeFilter} onChange={handleRoomTypeChange} className="w-full px-4 py-2 capitalize rounded leading-tight dark:bg-black focus:outline-none">
              <option value="All">All</option>
              <option value="Basic">Basic</option>
              <option value="Luxury">Luxury</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
        </div>

        <div className="w-full md:1/3 lg:w-auto mb-4 md:mb-0">
          <label className="block text-sm font-medium mb-2 text-black">Search</label>
          {/* Input field for entering search query */}
          <input type="search" id="search" placeholder="Search..." className="w-full px-4 py-3 rounded leading-tight dark:bg-black focus:outline-none placeholder:text-black dark:placeholder:text-white" value={searchQuery} onChange={handleSearchQueryChange} />
        </div>

        {/* Button to trigger the search */}
        <button className="btn-primary" type="button" onClick={handleFilterClick}>
          Search
        </button>
      </div>
    </section>
  );
};

export default Search;
