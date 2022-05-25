export const CHART_DATA = {
    chart: {
        zoomType: 'x',
        renderTo: 'container',
        resetZoomButton: {
            theme: {
                fill: 'white',
                stroke: 'RGB(252, 253, 254)',
                strokeWidth: 5,
                r: 6,
                lineWidth: 4,
                states: {
                    hover: {
                        fill: '#448AFF',
                        style: {
                            color: 'white'
                        }
                    }
                }
            }
        }
    },
    series: [
        {
            name: 'Company',
            type: 'area',
            marker: {
                symbol: 'circle',
                lineWidth: 6,
                fillColor: '#FFFFFF',
                lineColor: null
            },
            fillColor: {
                linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                stops: [
                    [0, 'rgba(68, 138, 255, 0.12)'], // start
                    [1, 'rgba(68, 138, 255, 0)'] // end
                ]
            },
            data: [],
        },
        {
            name: 'Partners',
            type: 'area',
            animation: false,
            marker: {
                symbol: 'circle',
                fillColor: '#FFFFFF',
                lineWidth: 6,
                lineColor: null
            },
            data: [],
            lineWidth: 0,
            fillColor: {
                linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                stops: [
                    [0, 'rgba(68, 138, 255, 0.12)'], // start
                    [1, 'rgba(68, 138, 255, 0)'] // end
                ]
            },
        },
        {
            name: 'Total',
            type: 'area',
            marker: {
                symbol: 'circle',
                lineWidth: 6,
                fillColor: '#FFFFFF',
                lineColor: null
            },
            data: [],
            lineWidth: 0,
            fillColor: {
                linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                stops: [
                    [0, 'rgba(2, 192, 118, 0.12)'], // start
                    [1, 'rgba(68, 138, 255, 0)'] // end
                ]
            },
        }
    ],
    title: '',
    credits: {
        enabled: false
    },
    colors: ['#448AFF', '#448AFF'],
    xAxis: {
        categories: [],
        crosshair: true,
        type: 'datetime',
        tickInterval: 12,
        title: true,
        labels: {
            format: '{value:,.0f}',
            style: {
                color: '#9FA2B4',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px'
            }
        },
        minPadding: 0,
        maxPadding: 0,
        minRange: 0,
        visible: true,
        gridLineWidth: 0,
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
    },
    yAxis: [
        {
            categories: [],
            title: true,
            labels: {
                format: '{value:,.0f}'
            },
            visible: false,
            gridLineWidth: 0,
            minPadding: 0,
            maxPadding: 0,
            minRange: 0,
        },
    ],
    legend: {
        enabled: false
    },
    tooltip: {
        backgroundColor: '#1B1A1C',
        shared: true,
        borderRadius: 8,
        borderColor: '#1B1A1C',
        shadow: false,
        useHTML: true,
        headerFormat: '<table><tr><th colspan="2" style="color: white; font-size: 14px; font-weight: 800; ">{point.key}</th></tr>',
        pointFormat: '<tr><td style="color: white; font-weight: 300; padding-right: 15px">{series.name} </td>' +
            '<td style="text-align: right; font-weight: 300;"><b>{point.y} <span style="color: rgba(255, 255, 255, 0.6);" >BTC</span></b></td></tr>',
        footerFormat: '</table>',
        style: {
            color: 'white',
            fontWeight: 'bold',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px'
        },
    },
    plotOptions: {
        series: {
            lineWidth: 3,
            states: {
                inactive: {
                    opacity: 1,
                    lineWidth: 2,
                },
                hover: {
                    lineWidth: 2,
                    opacity: 1,
                }
            },
            marker: {
                enabled: false,
                radius: .2,
                states: {
                    hover: {
                        radius: 6
                    }
                }
            },
        }
    },
};


export const FILTER_DATA = {
    day: 1,
    today: 0,
    week: 7,
    month: 30,
    total: 99999,
    year: 360,
}
