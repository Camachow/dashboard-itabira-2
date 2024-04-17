import { PieChart } from '@mui/x-charts';

const GenderPie = ({qtdLabel1, qtdLabel2, qtdLabel3, qtdLabel4, qtdLabel5}) => {
  const data = [
    { id: 0, value: qtdLabel1, label: "Masculino" },
    { id: 1, value: qtdLabel2, label: "Feminino" },
    { id: 2, value: qtdLabel3, label: "Não Binário" },
    { id: 3, value: qtdLabel4, label: "Não Declarado" },
    { id: 4, value: qtdLabel5, label: "Outros"}
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

export default GenderPie;  