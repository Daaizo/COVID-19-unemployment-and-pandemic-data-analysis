let json1, json2, region1, region2, startDate, endDate, xml1, xml2, jsonFull, xmlFull;
async function loadData(){

    $.ajax({
        url: "http://localhost:8080/graphData",
        type: 'GET',
        success: function(res) {
            console.log(res)
            jsonFull = res;
        }});

    await $.ajax({
        url: "http://localhost:8080/graphData/xml",
        type: 'GET',
        success: function(res) {
            console.log(res);
            xmlFull = res;
        }});
}

async function test() {
    let xValues = [];
    let yValues1 = [];
    let yValues2 = [];
    let chart1;
    region1 = $("#region1")[0].value;
    region2 = $("#region2")[0].value;
    startDate = $('#startDate')[0].value;
    endDate = $('#endDate')[0].value;

    await $.ajax({
        url: "http://localhost:8080/graphData?yearStart="+startDate+"&yearEnd="+endDate+"&countryCode="+region1,
        type: 'GET',
        success: function(res) {
            console.log(res);

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
            success: function(res) {
                console.log(res);
                xml1 = res;
            }
    });
        await $.ajax({
        url: "http://localhost:8080/graphData/xml?yearStart="+startDate+"&yearEnd="+endDate+"&countryCode="+region2,
        type: 'GET',
        success: function(res) {
            console.log(res);
            xml2 = res;
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
