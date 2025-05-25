import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import css from "./SearchBar.module.css";

const SearchBar = ({ oldValue, callbackOnSubmit }) => {
  const [searchText, setSearchText] = useState(oldValue ?? "");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!searchText || searchText.trim().length === 0) {
      toast.error("Please, enter the search string.");
    } else {
      callbackOnSubmit(searchText.trim());
    }
  };

  const handleChange = (evt) => {
    setSearchText(evt.target.value);
  };

  return (
    <div className={css.searchBarContainer}>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit}>
        <input
          className={css.searchInput}
          type="text"
          autoComplete="off"
          autoFocus
          value={searchText}
          onChange={handleChange}
        />
        <button type="submit" className={css.submitBtn}>
          <FaSearch className={css.searchIcon} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
