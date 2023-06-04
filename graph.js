let json1;
let json2;
let region1;
let region2

async function test() {
    let xValues = [];
    let yValues1 = [];
    let yValues2 = [];
    let chart1;
    region1 = $("#region1")[0].value;
    region2 = $("#region2")[0].value;

    await $.ajax({
        url: "http://localhost:9192/graphData?countryCode="+region1,
        type: 'GET',
        success: function(res) {
            json1 = res;
            res.sort(function(a,b){
                return a.year.localeCompare(b.year) || a.month.localeCompare(b.month)
            })
            xValues = [];
            yValues1 = [];
            yValues2 = [];
            for(let i = 0; i<res.length; i++) {
                    xValues.push(res[i]["month"] + '-' + res[i]["year"]);
                    yValues1.push(res[i]["totalNumberOfCases"]);
                    yValues2.push(res[i]["unemploymentPercentValue"]);
            }

        }
    });

    $('#canvas1')[0].innerHTML = ''
    $('#canvas1')[0].innerHTML = '<canvas id="chart1" style="width:100%;max-width:700px"></canvas>'
    $('#region1header')[0].innerHTML = 'Wykres dla '+region1
    chart1 = new Chart("chart1", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                label: 'Monthly number of covid cases',
                yAxisID: 'A',
                data: yValues1,
                borderColor: "red",
                fill: false,
            }, {
                label: 'Unemployment percentage',
                yAxisID: 'B',
                data: yValues2,
                borderColor: "green",
                fill: false,
            },]
        },
        options: {
            legend: {display: true},
            scales: {
                yAxes: [{
                    id: 'A',
                    type: 'linear',
                    position: 'left',
                    ticks: {
                        beginAtZero: true,
                    }
                }, {
                    id: 'B',
                    type: 'linear',
                    position: 'right',
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            }
        }
    });

    await $.ajax({
        url: "http://localhost:9192/graphData?countryCode="+region2,
        type: 'GET',
        success: function(res) {
            json2 = res;
            res.sort(function(a,b){
                return a.year.localeCompare(b.year) || a.month.localeCompare(b.month)
            })
            xValues = [];
            yValues1 = [];
            yValues2 = [];
            for(let i = 0; i<res.length; i++) {
                xValues.push(res[i]["month"] + '-' + res[i]["year"]);
                yValues1.push(res[i]["totalNumberOfCases"]);
                yValues2.push(res[i]["unemploymentPercentValue"]);
            }

        }
    });
    $('#canvas2')[0].innerHTML = ''
    $('#canvas2')[0].innerHTML = '<canvas id="chart2" style="width:100%;max-width:700px"></canvas>'
    $('#region2header')[0].innerHTML = 'Wykres dla '+region2
    chart1 = new Chart("chart2", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                label: 'Monthly number of covid cases',
                yAxisID: 'A',
                data: yValues1,
                borderColor: "red",
                fill: false,
            }, {
                label: 'Unemployment percentage',
                yAxisID: 'B',
                data: yValues2,
                borderColor: "green",
                fill: false,
            },]
        },
        options: {
            legend: {display: true},
            scales: {
                yAxes: [{
                    id: 'A',
                    type: 'linear',
                    position: 'left',
                    ticks: {
                        beginAtZero: true,
                    }
                }, {
                    id: 'B',
                    type: 'linear',
                    position: 'right',
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            }
        }
    });
}

function exportJsonRegion1(el) {
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json1));
    el.setAttribute("href", "data:"+data);
    el.setAttribute("download", "data"+region1+".json");
}


function exportJsonRegion2(el) {
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json2));
    el.setAttribute("href", "data:"+data);
    el.setAttribute("download", "data"+region2+".json");
}