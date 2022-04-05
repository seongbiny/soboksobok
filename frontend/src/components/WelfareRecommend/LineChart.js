import styled from "styled-components";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getAxios } from "../../api";
import axios from "axios";

const Container = styled.div`
  max-width: 800px;
  height: 80%;
  padding: 3vh;
`;

function Chart() {
  const axios = getAxios();
  const [label, setLabel] = useState([]);
  const [datas, setDatas] = useState([]);

  const data = {
    // labels: ["1번", "2번", "3번", "4번", "5번"],
    labels: label,
    datasets: [
      {
        label: "데이터",
        // data: [65, 59, 80, 81, 56, 55, 40],
        data: datas,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          // "rgba(153, 102, 255, 0.2)",
          // "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          // "rgb(153, 102, 255)",
          // "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    legend: {
      display: false,
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
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
      <Bar type="line" data={data} options={options} />
    </Container>
  );
}
export default Chart;
