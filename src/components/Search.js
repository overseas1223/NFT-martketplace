import React from "react";
import TextInput from "./base/TextInput";
import { AiOutlineSearch } from "react-icons/ai";

const Search = ({ value, setValue }) => {
  return (
    <TextInput
      placeholder="Explore NFTs"
      value={value}
      setValue={setValue}
      icon={<AiOutlineSearch size="30" color="rgba(48,118,234,1)" />}
    />
  );
};

export default Search;
