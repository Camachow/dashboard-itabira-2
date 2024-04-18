import * as React from 'react';
import {useEffect, useState} from 'react';
import ExamsStatusPie from '../../components/ExamsStatusPie';
import {Box, Paper, Typography, CircularProgress, useTheme, useMediaQuery, Divider, Grid} from '@mui/material';
import AgeRangePie from '../../components/AgeRangePie';
import IncomePie from '../../components/IncomePie';
import GenderPie from '../../components/GenderPie';
import DailyEvolutionLineChart from '../../components/DailyEvolutionLineChart';

function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


function countUsersWithFieldValue(users, fieldName, value) {
    return users.reduce((count, user) => {
        if (user[fieldName] === value) {
            return count + 1;
        }
        return count;
    }, 0);
}

function countUsersWithAgeInRange(users, minValue, maxValue) {
    return users.reduce((count, user) => {
        const age = calculateAge(user.dataNasc);
            if (age >= minValue && age <= maxValue) {
                return count + 1;
            }
            if (age > minValue && age < maxValue) {
                return count + 1;
            }
        return count;
    }, 0);
}

const DashboardMain = () => {
    const [dataForms, setDataForms] = useState([]);
    const [countForms, setCountForms] = useState(0);
    const [loading, setLoading] = useState(true);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMidScreen = useMediaQuery(theme.breakpoints.down('xl'));

    useEffect(() => {
        const fetchCompletedForms = async () => {
            const response = await fetch('https://nodered.pdcloud.dev/totalForms/Pequi');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let data = await response.json();
            return data;
        }

        const fetchExamsStatus = async () => {
            const response = await fetch('https://api-hml.pdcloud.dev/form/testData/a09d7656-f2a0-4b33-8c12-c8a4580e5e9d', {
            headers: {
                'API-KEY': "Rm9ybUFwaUZlaXRhUGVsb0plYW5QaWVycmVQYXJhYURlc2Vudm9sdmU=",
            }
            }); //Retorna as Provas que já aconteceram
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            let data = await response.json();
            console.log('Exams Status:',data);
            return data;
        };

        // Usa Promise.all para esperar ambas as funções
        Promise.all([fetchCompletedForms(), fetchExamsStatus()])
            .then(([completedForms, examsStatus]) => {
                setDataForms(completedForms.filter(form => form.examHour !== null));
                setCountForms(examsStatus.totalTests);
                
            })
            .catch((error) => {
                console.error('Erro ao buscar dados:', error);
            })
            .finally(() => {
                setLoading(false); // Atualiza o estado de loading independentemente do resultado
            });
    },[])

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
            }}>
                <CircularProgress/>
            </Box> 
        )
    }
    
    const countPublica = countUsersWithFieldValue(dataForms, 'escolaPublica', true);
    const countParticular = (countUsersWithFieldValue(dataForms, 'escolaPublica', false) + countUsersWithFieldValue(dataForms, 'escolaPublica', null));
  
    const countAge15to18 = countUsersWithAgeInRange(dataForms, 15, 18);
    const countAge19to25 = countUsersWithAgeInRange(dataForms, 19, 25);
    const countAge26to35 = countUsersWithAgeInRange(dataForms, 26, 35);
    const countAge35Plus = countUsersWithAgeInRange(dataForms, 36, 100);

    const countMenorQue1 = countUsersWithFieldValue(dataForms, 'rendaFamiliar', 'InferiorAUmSalarioMinimo')
    const countDe1a3 = countUsersWithFieldValue(dataForms, 'rendaFamiliar', 'De1a3SalariosMinimos')
    const countDe3a10 = countUsersWithFieldValue(dataForms, 'rendaFamiliar', 'De3a10SalariosMinimos')
    const countDe10a40 = countUsersWithFieldValue(dataForms, 'rendaFamiliar', 'De10a40SalariosMinimos')
    const countMaiorQue40 = countUsersWithFieldValue(dataForms, 'rendaFamiliar', 'MaisDe40SalariosMinimos')

    const countMasculino = countUsersWithFieldValue(dataForms, 'genero', 'Masculino')
    const countFeminino = countUsersWithFieldValue(dataForms, 'genero', 'Feminino')
    const countNaoBinario = countUsersWithFieldValue(dataForms, 'genero', 'NaoBinario')
    const countNaoDeclarado = countUsersWithFieldValue(dataForms, 'genero', 'PrefiroNaoDeclarar')
    const countOutros = countUsersWithFieldValue(dataForms, 'genero', 'Outros')

    const countMedioIncompleto = countUsersWithFieldValue(dataForms, 'escolaridade', 'MedioIncompleto')
    const countMedioCompleto = countUsersWithFieldValue(dataForms, 'escolaridade', 'MedioCompleto')
    const countMedioCursando = countUsersWithFieldValue(dataForms, 'escolaridade', 'MedioCursando')
    const countSuperiorIncompleto = countUsersWithFieldValue(dataForms, 'escolaridade', 'SuperiorIncompleto')
    const countSuperiorCompleto = countUsersWithFieldValue(dataForms, 'escolaridade', 'SuperiorCompleto')
    const countSuperiorCursando = countUsersWithFieldValue(dataForms, 'escolaridade', 'SuperiorCursando')

    return (
        <Box sx={{ 
            height: '100vh',
            backgroundColor: '#F5F5F5', 
            p: 3,
            overflowX: 'hidden',
        }}>
                <Typography fontSize={isSmallScreen ? 35 : 70} fontWeight={'bold'} textAlign={'center'}>Painel de Inscrições</Typography>
                <Typography fontSize={isSmallScreen ? 35 : 60} fontWeight={'bold'} textAlign={'center'}>Pequi {countForms}</Typography>

                <Divider sx={{my:1}}/>

                <Grid container spacing={2} sx={{margin: 'auto', paddingLeft: 0}}>
                <Grid item xs={12} sm={12} md={6} lg={6} xg={6} sx={{ p: 2}}>
                        <Typography fontSize={isSmallScreen ? 20 : 30} fontWeight={'bold'} textAlign={'center'} mb={1} sx={{ textDecoration: 'underline' }}>Escola Pública x Escola Particular</Typography>
                        <ExamsStatusPie
                            nm1={'Pública'} 
                            qtdLabel1={countPublica}
                            nm2={'Particular'}
                            qtdLabel2={countParticular}
                            isSmallScreen={isSmallScreen}
                            isMidScreen={isMidScreen}
                        />
                        <Typography fontSize={20} textAlign={'center'}>Total de Agendamentos: {countForms}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xg={6} sx={{ p: 2}}>
                        <Typography fontSize={isSmallScreen ? 25 : 30} fontWeight={'bold'} textAlign={'center'} mb={1} sx={{ textDecoration: 'underline' }}>Escolaridade</Typography>
                        <ExamsStatusPie
                            nm1={'Medio Incompleto'} 
                            qtdLabel1={countMedioIncompleto}
                            nm2={'Medio Completo'}
                            qtdLabel2={countMedioCompleto}
                            nm3={'Medio Cursando'} 
                            qtdLabel3={countMedioCursando}
                            nm4={'Superior Incompleto'}
                            qtdLabel4={countSuperiorIncompleto}
                            nm5={'Superior Completo'} 
                            qtdLabel5={countSuperiorCompleto}
                            nm6={'Superior Cursando'}
                            qtdLabel6={countSuperiorCursando}
                            isSmallScreen={isSmallScreen}
                            isMidScreen={isMidScreen}
                        />
                        <Typography fontSize={20} textAlign={'center'}>Total de Agendamentos: {countForms}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xg={6} sx={{p: 2}}>
                    <Typography fontSize={isSmallScreen ? 25 : 30} fontWeight={'bold'} textAlign={'center'} mb={1} sx={{ textDecoration: 'underline' }}>Faixa Etária</Typography>
                        <ExamsStatusPie
                            nm1={'15-18 anos'} 
                            qtdLabel1={countAge15to18}
                            nm2={'19-25 anos'}
                            qtdLabel2={countAge19to25}
                            nm3={'26-35 anos'} 
                            qtdLabel3={countAge26to35}
                            nm4={'36+ anos'}
                            qtdLabel4={countAge35Plus}
                            isSmallScreen={isSmallScreen}
                            isMidScreen={isMidScreen}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xg={6} sx={{p: 2}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 0, maxWidth: 800, margin:'auto'}}>
                            <Typography fontSize={isSmallScreen ? 25 : 30} fontWeight={'bold'} textAlign={'center'} mb={1} sx={{ textDecoration: 'underline' }}>Renda Familiar</Typography>
                            <ExamsStatusPie
                            nm1={'Até 1 Salário'} 
                            qtdLabel1={countMenorQue1}
                            nm2={'1-3 Salários'}
                            qtdLabel2={countDe1a3}
                            nm3={'3-10 Salários'} 
                            qtdLabel3={countDe3a10}
                            nm4={'10-40 Salários'}
                            qtdLabel4={countDe10a40}
                            nm5={'40+ Salários'}
                            qtdLabel5={countMaiorQue40}
                            isSmallScreen={isSmallScreen}
                            isMidScreen={isMidScreen}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xg={12} sx={{p: 2}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 0, maxWidth: 800, margin:'auto'}}>
                            <Typography fontSize={isSmallScreen ? 25 : 30} fontWeight={'bold'} textAlign={'center'} mb={1} sx={{ textDecoration: 'underline' }}>Gênero</Typography>
                            <ExamsStatusPie
                            nm1={'Masculino'} 
                            qtdLabel1={countMasculino}
                            nm2={'Feminino'}
                            qtdLabel2={countFeminino}
                            nm3={'Não Binario'} 
                            qtdLabel3={countNaoBinario}
                            nm4={'Não Declarado'}
                            qtdLabel4={countNaoDeclarado}
                            nm5={'Outros'}
                            qtdLabel5={countOutros}
                            isSmallScreen={isSmallScreen}
                            isMidScreen={isMidScreen}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xg={12} sx={{p: 2}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 0, maxWidth: 800, margin:'auto'}}>
                            <Typography fontSize={isSmallScreen ? 25 : 30} fontWeight={'bold'} textAlign={'center'} mb={1} sx={{ textDecoration: 'underline' }}>Evolução das Inscrições</Typography>
                            <DailyEvolutionLineChart allForms={dataForms}/>
                        </Box>
                    </Grid>
                </Grid>   
        </Box>
    )
}

export default DashboardMain;