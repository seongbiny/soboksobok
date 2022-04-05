import styled from "styled-components";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getAxios } from "../../api";

const Container = styled.div`
  // max-width: 800px;
  // padding-top: 7vh;
  // padding-bottom: 7vh;
  // padding-left: 7vh;
  padding: 3vh;
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
          // "rgba(238, 102, 121, 1)",
          // "rgba(255, 127, 14, 1)",
          // "rgba(255, 198, 0, 1)",
          // "rgba(112, 173, 70, 1)",
          // "rgba(98, 181, 229, 1)",
          // "#52489C",
          "rgba(255, 99, 132, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(255, 205, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(153, 102, 255, 0.8)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          // "rgb(153, 102, 255)",
          // "rgb(201, 203, 207)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/welfare/recommend/purpose");
        console.log(res.data);
        // let wel = res.data.map(a => a.welfare_service_name);
        // await setLabel(wel);
        // let view = res.data.map(a => a.welfare_view);
        // await setDatas(view);
        let wel = res.data;
        await setLabel(Object.keys(wel).slice(0, 6));
        await setDatas(Object.values(wel).slice(0, 6));
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
