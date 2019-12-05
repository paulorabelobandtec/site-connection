    var exibiu_grafico = false;

    verificar_autenticacao();


    // só mexer se quiser alterar o tempo de atualização
    // ou se souber o que está fazendo!
    function atualizarGrafico() {
        obterDadosGrafico();
        setTimeout(atualizarGrafico, 1000);
    }

    // altere aqui as configurações do gráfico
    // (tamanhos, cores, textos, etc)
    function configurarGrafico() {
        var configuracoes = {
            responsive: true,
            maintainAspectRatio: false,
            animation: exibiu_grafico ? false : {duration: 1500},
            hoverMode: 'index',
            stacked: false,
            title: {
                display: true,
                text: 'Histórico recente de Presença'
            },
            scales: {
                yAxes: [{
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: 'left',
                    id: 'y-sensor1',
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1
                    }
                }],
            }
        };

        exibiu_grafico = true;

        return configuracoes;
    }

    // altere aqui como os dados serão exibidos
    // e como são recuperados do BackEnd
    function obterDadosGrafico() {

        // neste JSON tem que ser 'labels', 'datasets' etc, 
        // porque é o padrão do Chart.js
        var dados = {
            labels: [],
            datasets: [
                {
                    yAxisID: 'y-sensor1',
                    label: 'Sensor Topo',
                    borderColor: window.chartColors.green,
                    backgroundColor: window.chartColors.green,
                    fill: false,
                    data: []
                }
                // {
                //     yAxisID: 'y-sensor2',
                //     label: 'Sensor2',
                //     borderColor: window.chartColors.blue,
                //     backgroundColor: window.chartColors.blue,
                //     fill: false,
                //     data: []
                // }
            ]
        };

        fetch('/leituras/historico', { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    resposta.reverse();
                    var oi = resposta[0].reverse();
                    console.log(resposta);
                    for (i = 0; i < oi.length; i++) {
                        var registro = oi[i];
                    
                        // aqui, após 'registro.' use os nomes 
                        // dos atributos que vem no JSON 
                        // que gerou na consulta ao banco de dados

                        dados.labels.push(`Dia ${registro.Minuto % 30 + 1}`);

                        dados.datasets[0].data.push(registro.Qtd);
                        // dados.datasets[1].data.push(registro.vTopo);
                    }
                    console.log(JSON.stringify(dados));

                    div_aguarde.style.display = 'none';

                    plotarGrafico(dados);
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });

    }

    // só altere aqui se souber o que está fazendo!
    function plotarGrafico(dados) {
        console.log('iniciando plotagem do gráfico...');

        var ctx = canvas_grafico.getContext('2d');
        window.grafico_linha = Chart.Line(ctx, {
            data: dados,
            options: configurarGrafico()
        });
    }