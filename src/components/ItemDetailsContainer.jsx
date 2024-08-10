import data from '../data/productos.json'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';


export const ItemDetailsContainer = () => {

    const [item, setItem ] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        new Promise((resolve) => setTimeout(() => resolve(data), 2000))
        .then((response) => {

            const finded = response.find((i) => i.id === Number(id));
            setItem(finded);
        }
    ).finally(() => setLoading(false));
        
    }, [id])

    if(loading) return <p className="cargando">"Cargando..."</p>;

    return (
    <Container>
        <div className='details'>
        <h4>{item.marca} {item.modelo}</h4>
        <img className="fotoDetails" src={item.foto} alt="" />
        <p className='descripDetails'>{item.descripcion}</p>
        <p className='precioDetails'>Precio: ${item.precio}</p>
        </div>
    </Container>
    )
}