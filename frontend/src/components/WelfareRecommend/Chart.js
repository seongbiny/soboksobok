import styled from "styled-components";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getAxios } from "../../api";

const Container = styled.div`
  max-width: 800px;
  padding-top: 7vh;
  padding-bottom: 7vh;
  padding-left: 7vh;
`;

function Chart() {
  const axios = getAxios();
  const [label, setLabel] = useState([]);
  const [datas, setDatas] = useState([]);

  const data = {
    // labels: ["Red", "Blue", "Yellow"],
    labels: label,
    datasets: [
      {
        label: "My First Dataset",
        // data: [300, 50, 100, 50, 20],
        data: datas,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(255, 105, 86)",
          "rgb(155, 205, 86)",
          "rgb(155, 305, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const request = await axios.get("/api/welfare/recommend/purpose");
        const request = await axios.get("/api/welfare/recommend/grouppopular");
        console.log(request.data);
        // let wel = request.data;
        // await setLabel(Object.keys(wel).slice(0, 6));
        // await setDatas(Object.values(wel).slice(0, 6));
        let wel = request.data.map(a => a.welfare_service_name);
        // console.log(wel);
        await setLabel(wel);
        let view = request.data.map(a => a.welfare_view);
        await setDatas(view);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Doughnut type="doughnut" data={data} />
    </Container>
  );
}
export default Chart;
