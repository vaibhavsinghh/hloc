var app = angular.module('amchartApp', ['ngResource', 'amChartsDirective']);



app.controller('amchartController', ['$scope','$resource', function ($scope, $resource){
    var Amchart = $resource('/api/graph');
    Amchart.query(function (results) {
      $scope.graphvalues = results;
      // console.log(results);

    });

  $scope.addValues = function(){
    window.location = "/value.html";
   }

  $scope.showChart = function(){
    window.location = "/";
   }
  $scope.fetchValue = function(){
    return  (Math.round(Math.random()*40)+300);
   }

  // $scope.findHigh = function(){
  //  return  (Math.max($scope.open,$scope.close));
  // }

  $scope.findLow = function(){
    console.log($scope.open);
    console.log($scope.close);
    return  (Math.max($scope.open,$scope.close)-1);
    
   }

   $scope.findMax = function(){
    console.log($scope.open);
    console.log($scope.close);
    return  (Math.max($scope.open,$scope.close)+1);
    
   }


  $scope.displayChart = function () {

      var Amchart = $resource('/api/graph');
        Amchart.query(function (results) {
        $scope.graphvalues = results;

     
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
                "dataProvider": $scope.graphvalues,
                "export": {
                    "enabled": true,
                    "position": "bottom-right"
                }
            });
      });

            chart.addListener("rendered", zoomChart);
            zoomChart();

            // this method is called when chart is first inited as we listen for "dataUpdated" event
            function zoomChart() {
                // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
                chart.zoomToIndexes(chart.dataProvider.length - 50, chart.dataProvider.length - 1);
            }
    }
    $scope.createValues = function () {
      var graphvalue   = new Amchart();
      graphvalue.date  = $scope.date;
      graphvalue.open  = $scope.open;
      graphvalue.high  = $scope.high;
      graphvalue.low   = $scope.low;
      graphvalue.close = $scope.close;
      graphvalue.$save(function (result) {
        $scope.graphvalues.push(graphvalue);
        $scope.date = '' ;
        $scope.open = '' ;
        $scope.high='';
        $scope.low='';
        $scope.close='';

      });
      
    }

}]);