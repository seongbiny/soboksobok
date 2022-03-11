import styled from "styled-components";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const Container = styled.div`
  width: 20vw;
  max-width: 900px;
`;

const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};

function Chart() {
  return (
    <Container>
      <Doughnut type="doughnut" data={data} />
    </Container>
  );
}
export default Chart;
