import { PieChart } from '@mui/x-charts';

const EducationTypePie = ({nomeLabel1, qtdLabel1, nomeLabel2, qtdLabel2, nomeLabel3, qtdLabel3, nomeLabel4, qtdLabel4, nomeLabel5, qtdLabel5, nomeLabel6, qtdLabel6}) => {
    return (
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: qtdLabel1, label: nomeLabel1 },
                { id: 1, value: qtdLabel2, label: nomeLabel2 },
                { id: 2, value: qtdLabel3, label: nomeLabel3 },
                { id: 3, value: qtdLabel4, label: nomeLabel4 },
                { id: 4, value: qtdLabel5, label: nomeLabel5 },
                { id: 5, value: qtdLabel6, label: nomeLabel6 },
              ],
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            },
          ]}
          width={400}
          height={200}
        />
    );
  }

export default EducationTypePie;  