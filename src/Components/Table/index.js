import { useEffect, useState } from "react"
import { StyledTable } from "../../Styles/styledTable";
import { Trow } from "./Trow";

export const Table = ({object = {}}) => {
    const [thead, setThead] = useState();
    
    useEffect(()=>{
        console.log(object[0])
        const keys = Object.keys(object[0]);
        setThead(keys);
    }, [object]);

    if(object && thead) return <>
        <StyledTable>
            <thead>
                <tr>
                    {thead.map((key, index) => {
                        return <th key={index}>{key.toUpperCase()}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {object && object.map((item, index) => {
                    console.log(item)
                    return <Trow key={index} item={item}/>
                }) }
            </tbody>
        </StyledTable>
    </>
}