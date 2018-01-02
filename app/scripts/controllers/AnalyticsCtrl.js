(function() {
    function AnalyticsCtrl($rootScope, $scope, Metric){
      // mostly via https://gist.github.com/Jverma/887877fc5c2c2d99be10 with contextual updates
     // set the dimensions of the canvas
        var margin = {top: 20, right: 20, bottom: 70, left: 40},
            width = 600 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;



        // set the ranges
        var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

        var y = d3.scale.linear().range([height, 0]);

        // sets data for the chart as the song plays counter on the root scope
        var data = $rootScope.songPlays;

        // define the axis
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")


        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(data.length);


        // add the SVG element
        var svg = d3.select("div.chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");

          x.domain(data.map(function(d) { return d.title; }));
          y.domain([0, d3.max(data, function(d) { return d.plays; })]);

          // add axis
          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis)
            .selectAll("text")
              .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", "-.55em")
              .attr("transform", "rotate(-90)" );

          svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
              .append("text")
              .attr("y", -15)
              .attr("x", -25)
              .text("Frequency");



          // Add bar chart
          svg.selectAll("bar")
              .data(data)
            .enter().append("rect")
              .attr("class", "bar")
              .attr("x", function(d) { return x(d.title); })
              .attr("width", x.rangeBand())
              .attr("y", function(d) { return y(d.plays); })
              .attr("height", function(d) { return height - y(d.plays); });
    }

    angular
        .module('blocJams')
        .controller('AnalyticsCtrl', ['$rootScope', '$scope', 'Metric', AnalyticsCtrl]);
})();
