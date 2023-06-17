let json1, json2, region1, region2, startDate, endDate, xml1, xml2, jsonFull, xmlFull;
async function loadData(){
    var token = localStorage.getItem("token");
    $.ajax({
        url: "http://localhost:8080/graphData",
        type: 'GET',
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function(res) {
            jsonFull = res;
        }});

    await $.ajax({
        url: "http://localhost:8080/graphData/xml",
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function(res) {
            xmlFull = res;
        }});
}

async function test() {
    var token = localStorage.getItem("token");
    let xValues = [];
    let yValues1 = [];
    let yValues2 = [];
    let chart1;
    region1 = $("#region1")[0].value;
    region2 = $("#region2")[0].value;
    startDate = $('#startDate')[0].value;
    endDate = $('#endDate')[0].value;

    document.getElementById("charts").style.visibility = "visible";

    await $.ajax({
        url: "http://localhost:8080/graphData?yearStart="+startDate+"&yearEnd="+endDate+"&countryCode="+region1,
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function(res) {

            json1 = res;
            res.sort(function(a,b){
                return a.year - b.year || a.month - b.month;
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
    new Chart("chart1", {
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
        url: "http://localhost:8080/graphData?yearStart="+startDate+"&yearEnd="+endDate+"&countryCode="+region2,
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function(res) {
            json2 = res;
            res.sort(function(a,b){
                return a.year - b.year || a.month - b.month;
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
    new Chart("chart2", {
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
            url: "http://localhost:8080/graphData/xml?yearStart="+startDate+"&yearEnd="+endDate+"&countryCode="+region1,
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function(res) {
                xml1 = res;
            }
    });
        await $.ajax({
        url: "http://localhost:8080/graphData/xml?yearStart="+startDate+"&yearEnd="+endDate+"&countryCode="+region2,
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function(res) {
            xml2 = res;
        }
    });
    let xValuesRegion2;
    let yValues1Region2;
    let yValues2Region2;
    await $.ajax({
        url: "http://localhost:8080/graphData?yearStart="+startDate+"&yearEnd="+endDate+"&countryCode="+region1,
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function(res) {
            json2 = res;
            res.sort(function(a,b){
                return a.year - b.year || a.month - b.month;
            })
            xValuesRegion2 = [];
            yValues1Region2 = [];
            yValues2Region2 = [];
            for(let i = 0; i<res.length; i++) {
                xValuesRegion2.push(res[i]["month"] + '-' + res[i]["year"]);
                yValues1Region2.push(res[i]["totalNumberOfCases"]);
                yValues2Region2.push(res[i]["unemploymentPercentValue"]);
            }

        }
    });
    let maxCovidRegion1 = Math.max.apply(Math, yValues1)
    let maxCovidRegion2 = Math.max.apply(Math, yValues1Region2)
    let maxCovid = maxCovidRegion1 > maxCovidRegion2 ? maxCovidRegion1 : maxCovidRegion2;
    let maxUnemploymentRegion1 = Math.max.apply(Math, yValues2)
    let maxUnemploymentRegion2 = Math.max.apply(Math, yValues2Region2)
    let maxUnemployment = maxUnemploymentRegion1 > maxUnemploymentRegion2 ? maxUnemploymentRegion1 : maxUnemploymentRegion2;
    $('#canvas3')[0].innerHTML = ''
    $('#canvas3')[0].innerHTML = '<canvas id="chart3" style="width:100%;max-width:700px"></canvas>'
    $('#region3header')[0].innerHTML = 'Wykres połączony - stopa bezrobocia dla obu regionów: '+region2 + ' ' + region1

    new Chart("chart3", {
        type: "line",
        data: {
            labels: xValues, datasets: [{
                label: 'Unemployment percentage ' + region2,
                data: yValues2,
                borderColor: "green",
                fill: false,
            }, {
                label: 'Unemployment percentage ' + region1,
                data: yValues2Region2,
                borderColor: "black",
                fill: false,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        max: maxUnemployment,
                        min: 0
                    }
                    , position: 'left',
                    type: 'linear'
                },
                ]
            }
        }
    });
    $('#canvas4')[0].innerHTML = ''
    $('#canvas4')[0].innerHTML = '<canvas id="chart4" style="width:100%;max-width:700px"></canvas>'
    $('#region4header')[0].innerHTML = 'Wykres połączony - przypadki covid dla obu regionów: '+region2 + ' ' + region1

    new Chart("chart4", {
        type: "line",
        data: {
            labels: xValues, datasets: [{
                label: 'Monthly number of covid cases ' + region2, data: yValues1, borderColor: "red", fill: false,
            },
                {
                    label: 'Monthly number of covid cases '  + region1, data: yValues1Region2, borderColor: "blue", fill: false,
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        max: maxCovid,
                        min: 0
                    }
                    , position: 'left',
                    type: 'linear'
                },
                ]
            }
        }
    });

    $('#canvas5')[0].innerHTML = ''
    $('#canvas5')[0].innerHTML = '<canvas id="chart5" style="width:100%;max-width:700px"></canvas>'
    $('#region5header')[0].innerHTML = 'Wykres dla połączonych regionów '+region2 + ' ' + region1

    new Chart("chart5", {
        type: "line",
        data: {
            labels: xValues, datasets: [{
                label: 'Monthly number of covid cases ' + region2, yAxisID: 'A', data: yValues1, borderColor: "red", fill: false,
            }, {
                label: 'Unemployment percentage ' + region2, yAxisID: 'B', data: yValues2, borderColor: "green", fill: false,
            },
                {
                    label: 'Monthly number of covid cases '  + region1,yAxisID: 'A',  data: yValues1Region2, borderColor: "blue", fill: false,
                }, {
                    label: 'Unemployment percentage '  + region1 , yAxisID: 'B',data: yValues2Region2, borderColor: "black", fill: false,
                }
            ]
        },
        options:{
            scales: {
                yAxes : [{
                    id: 'A',
                    ticks : {
                        max : maxCovid+ 5000,
                        min : 0
                    }
                    , position: 'left',
                    type: 'linear'
                },
                    {
                        id: 'B',
                        ticks: {
                            min: 1,
                            max :maxUnemployment + 5
                        }
                        ,
                        position: 'right',
                        type: 'linear'
                    }

                ]
            }
        }
    });

}
function exportJsonRegion1(el) {
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json1));
    el.setAttribute("href", "data:"+data);
    el.setAttribute("download", "data"+region1+".json");
}


function exportXMLRegion1(el) {
    const serializer = new XMLSerializer();
    const xmlStr = serializer.serializeToString(xml1);
    var data = "text/xml;charset=utf-8," + encodeURIComponent(xmlStr);
    el.setAttribute("href", "data:"+data);
    el.setAttribute("download", "data"+region1+".xml");
}


function exportJsonRegion2(el) {
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json2));
    el.setAttribute("href", "data:"+data);
    el.setAttribute("download", "data"+region2+".json");
}


 function exportXMLRegion2(el) {
        const serializer = new XMLSerializer();
        const xmlStr = serializer.serializeToString(xml2);
        var data = "text/xml;charset=utf-8," + encodeURIComponent(xmlStr);
        el.setAttribute("href", "data:"+data);
        el.setAttribute("download", "data"+region2+".xml");
    }


 async function exportJsonFull(el){
     var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonFull));
     el.setAttribute("href", "data:"+data);
     el.setAttribute("download", "dataFull.json");
    }

function exportXMLFull(el) {
    const serializer = new XMLSerializer();
    const xmlStr = serializer.serializeToString(xmlFull);
    var data = "text/xml;charset=utf-8," + encodeURIComponent(xmlStr);
    el.setAttribute("href", "data:"+data);
    el.setAttribute("download", "dataXMLFull");
}
