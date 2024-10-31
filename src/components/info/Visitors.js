import { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from 'chart.js';
import styled from 'styled-components';
import { ButtonGroup, Button } from 'react-bootstrap';
import { getVisitors } from './helpers';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

const Visitors = () => {
  const lineRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [selectedRange, setSelectedRange] = useState('week');
  const [chartData, setChartData] = useState({ data: [], labels: [] });

  const ranges = [
    { name: '6 Months', value: '6months' },
    { name: 'Month', value: 'month' },
    { name: 'Week', value: 'week' },
  ];

  useEffect(() => {
    getVisitors(setChartData, selectedRange);
  }, [selectedRange]);

  useEffect(() => {
    const handleResize = () => {
      if (lineRef.current) {
        setContainerSize({
          width: lineRef.current.offsetWidth,
          height: lineRef.current.offsetHeight,
        });
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Count',
        data: chartData.data,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };
  return (
    <Container>
      <TitleContainer>
        <h4>Visitors</h4>
        <ButtonGroup>
          {ranges.map((range) => (
            <Button
              key={range.value}
              variant={selectedRange === range.value ? 'primary' : 'outline-primary'}
              onClick={() => setSelectedRange(range.value)}
            >
              {range.name}
            </Button>
          ))}
        </ButtonGroup>
      </TitleContainer>
      <LineContainer ref={lineRef}>
        <Line
          data={data}
          options={options}
          width={containerSize.width}
          height={containerSize.height}
        />
      </LineContainer>
    </Container>
  );
};
export default Visitors;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
`;

const TitleContainer = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  padding: 0 15%;
  justify-content: space-between;
`;
const LineContainer = styled.div`
  height: 90%;
`;
