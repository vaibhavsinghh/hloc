var app = angular.module('amchartApp', ['ngResource', 'amChartsDirective']);



app.controller('amchartController', ['$scope','$resource', function ($scope, $resource){
    var Amchart = $resource('/api/graph');
    Amchart.query(function (results) {
      $scope.graphvalues = results;
      // console.log(results);

    });

  // $scope.findHigh = function(){
  //  return  (Math.max($scope.open,$scope.close));
  // }
   var myArray = [];
   var myHashMap = {};
   var temp1=0;
    var temp2=0;
    var val1=0;
    var val2=0;
    var val3=0;
    var val4=0;
    var datevalue=0;
    var i=0;
   function graphValues() {
    
    
    
    

      for( i = 0; i < 50; i++)   {

        temp1=(Math.round(Math.random()*40)+300);
        temp2=(Math.round(Math.random()*40)+300);
        
        console.log(temp1);
        console.log(temp2);
        val1=temp1;
        val2=temp2;
        val3=(Math.max(val1,val2)+1);
        console.log(val3);
        val4=(Math.max(val1,val2)-1);
        var now = new Date();
        myHashMap = {"date": now.setDate(now.getDate() + i), "open": val1,"close": val2,"high": val3, "low": val4};
    
        myArray.push(myHashMap);
        myHashMap = {};
      }
         return myArray;

   }


  $scope.displayChart = function () {

      var Amchart = $resource('/api/graph');
        Amchart.query(function (results) {
        $scope.graphvalues = results;

     });

      graphValues();

      var chart = AmCharts.makeChart("chartdiv", {
                "type": "serial",
                "valueAxes": [{
                    "position": "left"
                }],
                "graphs": [{
                    "id": "g1",
                    "proCandlesticks": true,
                    "balloonText": "Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>",
                    "closeField": "close",
                    "fillColors": "#7f8da9",
                    "highField": "high",
                    "lineColor": "#7f8da9",
                    "lineAlpha": 1,
                    "lowField": "low",
                    "fillAlphas": 0.9,
                    "negativeFillColors": "#db4c3c",
                    "negativeLineColor": "#db4c3c",
                    "openField": "open",
                    "title": "Price:",
                    "type": "candlestick",
                    "valueField": "close"
                }],
                "chartScrollbar": {
                    "graph": "g1",
                    "graphType": "line",
                    "scrollbarHeight": 30
                },
                "chartCursor": {
                    "valueLineEnabled": true,
                    "valueLineBalloonEnabled": true
                },
                "categoryField": "date",
                "categoryAxis": {
                    "parseDates": true
                },
                  "dataProvider": myArray,
                "export": {
                    "enabled": true,
                    "position": "bottom-right"
                }

            });

      setInterval(function () {
        // normally you would load new datapoints here,
        // but we will just generate some random values
        // and remove the value from the beginning so that
        // we get nice sliding graph feeling
        
        // // remove datapoint from the beginning
        // chart.dataProvider.shift();
        chart.dataProvider = [];
        for( i = 0; i < 50; i++)   {
        // // add new one at the end
        
        temp1=(Math.round(Math.random()*40)+300);
        temp2=(Math.round(Math.random()*40)+300);
        
        val1=temp1;
        val2=temp2;
        val3=(Math.max(val1,val2)+1);
        console.log(val3);
        val4=(Math.max(val1,val2)-1);
        var now = new Date();
        myHashMap = {"date": now.setDate(now.getDate() + i), "open": val1,"close": val2,"high": val3, "low": val4};
        chart.dataProvider.push(myHashMap);
        chart.validateData(); 
        }
          }, 5000);

            chart.addListener("rendered", zoomChart);
            zoomChart();

            // this method is called when chart is first inited as we listen for "dataUpdated" event
            function zoomChart() {
                // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
                chart.zoomToIndexes(chart.dataProvider.length - 50, chart.dataProvider.length - 1);
            }

    }


}]);