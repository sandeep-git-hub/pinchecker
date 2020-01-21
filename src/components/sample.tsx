import React, { useEffect, useState, useRef } from 'react';

let Example = () => {
    // useState = returns a stateful value and a function to update it
    let [count, setCount] = useState(0);

    useEffect(()=>{
        document.title = `${count} times`;
    },[count])

    return (<div>
        <p id='p'>This has been clickecd {count} times</p>
        <button onClick={() => setCount(count+1)}>Count</button>
    </div>);
}

export default Example;