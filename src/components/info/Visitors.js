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
import { ButtonGroup, Button, Container } from 'react-bootstrap';
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
    <StyledContainer>
      <TitleContainer>
        <h4>Visitors</h4>
        <StyledButtonGroup>
          {ranges.map((range) => (
            <Button
              key={range.value}
              variant={selectedRange === range.value ? 'primary' : 'outline-primary'}
              onClick={() => setSelectedRange(range.value)}
            >
              {range.name}
            </Button>
          ))}
        </StyledButtonGroup>
      </TitleContainer>
      <LineContainer ref={lineRef}>
        <Line
          data={data}
          options={options}
          width={containerSize.width}
          height={containerSize.height}
        />
      </LineContainer>
    </StyledContainer>
  );
};
export default Visitors;

const StyledContainer = styled(Container).attrs({ fluid: true })`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const TitleContainer = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
`;

const StyledButtonGroup = styled(ButtonGroup)`
  .btn {
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 576px) {
      padding: 0.25rem 0.5rem;
      font-size: 0.85rem;
    }
  }
`;
const LineContainer = styled.div`
  height: 85%;
  width: 90%;
`;
