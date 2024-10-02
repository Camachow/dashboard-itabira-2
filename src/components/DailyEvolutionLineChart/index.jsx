import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function contarInscricoesPorDia(dataInicial, dataFinal, allForms) {
 // Converter as datas inicial e final para objetos Date em UTC
 const inicio = new Date(new Date(dataInicial).toISOString().substr(0, 10));
 const fim = new Date(new Date(dataFinal).toISOString().substr(0, 10));

    // Criar um mapa para contar as inscrições por data
    const mapaInscricoes = new Map();

    // Iterar sobre os dados JSON
    allForms.forEach(item => {
        const data = new Date(item.createdAt);
        //console.log(`data do item ${item.nomeCompleto}: ${data}`);
        // Criar uma data sem hora em UTC
        const dataSemHora = new Date(Date.UTC(data.getFullYear(), data.getMonth(), data.getDate()));
        //console.log(`data sem hora do item ${item.nomeCompleto}: ${dataSemHora}`);

        // Verificar se a data está dentro do intervalo especificado
        if (dataSemHora >= inicio && dataSemHora <= fim) {
            const chave = dataSemHora.toISOString().split('T')[0]; // Usar a data como chave no formato YYYY-MM-DD
            mapaInscricoes.set(chave, (mapaInscricoes.get(chave) || 0) + 1);
        }
    });

    // Criar um array de datas entre a data inicial e a data final
    const datas = [];
    for (let dt = new Date(inicio); dt <= fim; dt.setUTCDate(dt.getUTCDate() + 1)) {
        const chave = dt.toISOString().split('T')[0];
        datas.push({
            dia: `${dt.getUTCDate().toString().padStart(2, '0')}/${(dt.getUTCMonth() + 1).toString().padStart(2, '0')}`,
            inscricoes: mapaInscricoes.get(chave) || 0
        });
    }

    return datas;
}

const DailyEvolutionLineChart = ({allForms}) => {

  const diaAtual = new Date();
  diaAtual.setMinutes(diaAtual.getMinutes() - diaAtual.getTimezoneOffset());
  const dataLocal = diaAtual.toISOString().substr(0, 10);

  const startDate = "2024-09-03";
  const endDate = (dataLocal >= "2024-11-11") ? "2024-11-11" : dataLocal;


  const data = contarInscricoesPorDia(startDate, endDate, allForms);


  return (
      <ResponsiveContainer width="100%" height= {400}>
      <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
          }}
      >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dia" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="inscricoes" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
      </ResponsiveContainer>
  );
}

export default DailyEvolutionLineChart
