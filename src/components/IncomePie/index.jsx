import { Box } from '@mui/material';
import { PieChart, ResponsiveChartContainer } from '@mui/x-charts';

const IncomePie = ({qtdLabel1, qtdLabel2, qtdLabel3, qtdLabel4, qtdLabel5}) => {
  const data = [
    { id: 0, value: qtdLabel1, label: "Até 1 Salário" },
    { id: 1, value: qtdLabel2, label: "1-3 Salários" },
    { id: 2, value: qtdLabel3, label: "3-10 Salários" },
    { id: 3, value: qtdLabel4, label: "10-40 Salários" },
    { id: 4, value: qtdLabel5, label: "40+ Salários"}
  ];
    return (
      <PieChart
        series={[
          {
            data: data,
            highlightScope: { faded: 'global' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          },
        ]}
        height={200}
        width={400}
      />
 
    );
  }

export default IncomePie;  