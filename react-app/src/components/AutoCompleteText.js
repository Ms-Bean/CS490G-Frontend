import React, { useState } from "react";

const AutoCompleteText = ({selectItem, workBank, placeholder}) => {

    const [value, setValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleTextChange = (e) => {
        const input = e.target.value;
        setValue(input);
        let suggestions = [];

        if(input.length > 0){
            const regex = new RegExp(`^${input}`, "i");
            suggestions = workBank.sort().filter(v => regex.test(v));
        }

        setSuggestions(suggestions);
    }

    const handleClick = (item) => {
        selectItem(item);
        setValue("");
        setSuggestions([]);
    }

    return(
        <div className="flex-grow-1 position-relative">
            <input 
            type="text"
            onChange={handleTextChange}
            value={value}
            className="w-100 border-0 inline-block shadow-none form-control my-1"
            placeholder={placeholder}
            style={{padding : "0.100em"}}
            />
            <ul className="list-group w-100 position-absolute" style={{maxHeight : "10em", marginBottom : "10px"  ,overflow : "scroll", zIndex: "1000"}}>
                {suggestions.map((item, index) => (
                    <li key={index} onClick={() => handleClick(item)} className="list-group-item" style={{cursor : "pointer"}}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

export default AutoCompleteText;