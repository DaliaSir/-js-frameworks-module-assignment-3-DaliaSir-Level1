import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Heading from "../../layout/Heading";


export default function DetailsPage() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let { id } = useParams();

  const url = process.env.REACT_APP_BASE_URL + `wp/v2/pages/${id}`;

  useEffect(function () {
    async function getData() {
      try {
        const response = await axios.get(url);
        console.log("response", response);
        setPages(response.data);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div>Loading pages...</div>;

  if (error) return <div>{ }</div>;


  return (
    <>
      <Heading content="Page Details" />
      <div className="breadcrumb">
        <Link to={`/`}>Back</Link>
      </div>

      <Card className="page-card" key={pages.id}>
        <Link to={`/page/${pages.id}`}>
          <Card.Body>
            <Card.Title>{pages.title.rendered}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Created: {pages.date} </Card.Subtitle>
            <Card.Text dangerouslySetInnerHTML={{ __html: `${pages.excerpt.rendered}` }}></Card.Text>
          </Card.Body>
        </Link>
      </Card>


    </>
  );
}