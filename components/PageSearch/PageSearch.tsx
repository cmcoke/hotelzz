/**
 * This file defines a React component 'PageSearch' that acts as a container
 * for the 'Search' component. It manages the state for room type filter and
 * search query using the useState hook, and then passes these states as props
 * to the 'Search' component.
 */

"use client";

import { useState } from "react";

// Import the 'Search' component
import Search from "../Search/Search";

// Define the 'PageSearch' component
const PageSearch = () => {
  // State to manage the selected room type filter
  const [roomTypeFilter, setRoomTypeFilter] = useState("");

  // State to manage the search query input
  const [searchQuery, setSearchQuery] = useState("");

  // Render the 'Search' component with the managed state as props
  return <Search roomTypeFilter={roomTypeFilter} searchQuery={searchQuery} setRoomTypeFilter={setRoomTypeFilter} setSearchQuery={setSearchQuery} />;
};

// Export the 'PageSearch' component as the default export of this module
export default PageSearch;
