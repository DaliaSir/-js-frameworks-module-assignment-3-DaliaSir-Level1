import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import axios from "axios";


export default function PageList() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = process.env.REACT_APP_BASE_URL + "wp/v2/pages";

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
    <Stack gap={3}>
      {pages.map((data) => {
        const DateDisplay = ({ date }) => <>{date.toString()}</>;
        const options = { year: "numeric", month: "long", day: "2-digit" };
        return (
          <Card className="page-card" key={data.id}>
            <Link to={`/page/${data.id}`}>
              <Card.Body>
                <Card.Title>{data.title.rendered}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Created: <DateDisplay date={new Date(data.date).toLocaleDateString("en-US", options)} /></Card.Subtitle>
                <Card.Text dangerouslySetInnerHTML={{ __html: `${data.excerpt.rendered}` }}></Card.Text>
              </Card.Body>
            </Link>
          </Card>
        );
      })}
    </Stack >
  );
}