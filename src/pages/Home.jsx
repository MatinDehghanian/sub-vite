import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import ServiceInfo from "../components/ServiceInfo";
import Header from "../layouts/Header";
import Client from "../components/Client";
import { useEffect, useState } from "react";
import GetInfoRequest from "../utils/GetInfoRequest";

const Home = () => {
  const [data, setData] = useState(null); // Start with null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetInfoRequest.getInfo()
      .then((res) => {
        setData(res?.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Container>
        <Helmet>
          <title>
            {data?.username ? `${data.username} Sub Info` : "Sub Info"}
          </title>
          <meta
            name="description"
            content="Powered by https://github.com/MatinDehghanian"
          />
        </Helmet>
        {loading ? (
          <div>Loading...</div>
        ) : (
          data && (
            <>
              <Header />
              <ServiceInfo data={data} />
              <Client data={data} />
            </>
          )
        )}
      </Container>
    </>
  );
};

export default Home;
