import {useEffect, useRef, useState} from 'react';
import { dataFetch, formatInit } from '../../utils/functions';

export const Trow = ({item}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [values, setValues] = useState();
    const [keys, setKeys] = useState();

    useEffect(()=>{
        setValues(Object.values(item));
        setKeys(Object.keys(item));
    },[item])
        
    useEffect(()=>{
        console.log('VALUES == > ',values)
    })
    return <tr>
        {values && values.map((value, index) => {
            return <td key={index}>{!isEditing ? value : <input readOnly={false} name={`${item.id}data`} onChange={(e)=>{
                const newValues = values.map((value, index) => {

                })
            }} value={value} onClick={(e)=>{e.stopPropagation()}}/>}</td>
        })}
        <td>
            { isEditing ? <>
                <button onClick={()=>{
                    setIsEditing(!isEditing)
                }}>Salvar</button>
                <button onClick={()=>{
                    setIsEditing(!isEditing)
                }}>Cancelar</button>   
            </>
            : 
            <>
                <button onClick={()=>setIsEditing(!isEditing)}>Editar</button>
                <button>Excluir</button>
            </>
            }
        </td>
    </tr>
}