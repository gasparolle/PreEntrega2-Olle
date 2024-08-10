import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import data from "../data/productos.json";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    new Promise((resolve) => setTimeout(resolve(data), 2000))
      .then((response) => {
        if (!id) {
          setItems(response);
        } else {
          const filtrar = response.filter((i) => i.categoria === id);
          setItems(filtrar);
        }
      })

      .finally(() => setLoading(false));
  }, [id]); //Va a cambiar cada vez que cambie el ID

  if (loading) return <p className="cargando">"Cargando..."</p>;

  return (
    <Container className="containerCards">
      {items.map((i) => (
          <Card className="card">
            <Card.Img variant="top" className="fotoCard" src={i.foto} />
            <Card.Body className="cardBody">
              <Card.Title className="cardTitle">{i.marca}</Card.Title>
              <Card.Text className="cardModelo">{i.modelo}</Card.Text>
              <Card.Text className="cardPrecio">${i.precio}</Card.Text>
              <Link to={`/item/${i.id}`}><Button variant="primary" className="buttonDetalles">Ver detalles</Button></Link>
            </Card.Body>
          </Card>
      ))}
    </Container>
  );
};
