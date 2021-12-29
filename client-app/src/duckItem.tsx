import React from "react";
import { Duck } from "./demo";

interface Props {
    duck: Duck;
}

//use curly braces in function 'DuckItem({structure})' , where structure 'duck' is what we looking inside
export default function DuckItem({duck}: Props) {
    return (
        
        <div>
            <span>{duck.name}</span>
            {/* wrap the method below in anonymous functions */}
            <button onClick={() => duck.makeSound(duck.name + 'quack')}>Make sound</button>
        </div>
    )
}