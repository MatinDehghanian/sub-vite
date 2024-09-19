import { Container } from "react-bootstrap";
import ServiceInfo from "../components/ServiceInfo";
import Header from "../layouts/Header";
import Client from "../components/Client";
import { useEffect, useState } from "react";
import GetInfoRequest from "../utils/GetInfoRequest";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    GetInfoRequest.getInfo().then((res) => setData(res?.data));
  }, []);


  return (
    <>
      <Container>
        {data && (
          <>
            <Header />
            <ServiceInfo data={data} />
            <Client data={data} />
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
