import React, { useState } from "react";
import AutoCompleteText from "./AutoCompleteText";

const TagInputs = ({placeholder, workBank}) => {
    const [tags, setTags] = useState([]);

    const handleClick = (newTag) => {
        setTags((prevTags) => [...prevTags, newTag]);
    }

    const deleteTag = (tag) => {
        setTags(tags.filter(item => item !== tag))
    }

    const renderTags = () => {
        const output = [];
        
        for(let i = 0; i < tags.length; i++){
            output.push(<div className="inline-block border border-black bg-light rounded p-1 my-2 me-1 box-shadow">
                <span>{tags[i]}</span>
                <span onClick={() => deleteTag(tags[i])} className="ms-1" style={{cursor : "pointer"}}>x</span>
            </div>)
        };

        return output;
    }

    return(
        <div className="container d-flex flex-wrap w-100 align-items-center border rounded">
            {renderTags()}
            <AutoCompleteText placeholder={placeholder} selectItem={handleClick} workBank={workBank}/>
        </div>
    )
}

export default TagInputs;