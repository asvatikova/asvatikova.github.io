var MAXMIND_TO_MAP = {
    '01': 'ru-ad',
    '02': 'ru-bu',
    '03': 'ru-ga',
    '04': 'ru-al',
    '05': 'ru-am',
    '06': 'ru-ar',
    '07': 'ru-as',
    '08': 'ru-bk',
    '09': 'ru-bl',//,"Belgorod"
    '10': 'ru-br',//,"Bryansk"
    '11': 'ru-bu',//,"Buryat"
    '12': 'ru-cn',//,"Chechnya"
    '13': 'ru-cl',//"Chelyabinsk"
    '14': 'ru-ct',//,"Chita"
    '15': 'ru-2485',//,"Chukot"
    '16': 'ru-cv',//"Chuvashia"
    '17': 'ru-da',//,"Dagestan"
    '18': 'ru-ck',//,"Evenk"
    '19': 'ru-in',//,"Ingush"
    '20': 'ru-ir',//,"Irkutsk"
    '21': 'ru-iv',//,"Ivanovo"
    '22': 'ru-kb',//"Kabardin-Balkar"
    '23': 'ru-kn',//"Kaliningrad"
    '24': 'ru-kl',//"Kalmyk"
    '25': 'ru-kg',//,"Kaluga"
    '26': 'ru-ka',//,"Kamchatka"
    '27': 'ru-kc',//,"Karachay-Cherkess"
    '28': 'ru-ki',//,"Karelia"
    '29': 'ru-ke',//,"Kemerovo"
    '30': 'ru-kh',//,"Khabarovsk"
    '31': 'ru-kk',//,"Khakass"
    '32': 'ru-km',//,"Khanty-Mansiy"
    '33': 'ru-kv',//,"Kirov"
    '34': 'ru-ko',//,"Komi"
    '36': 'ru-ka',
    '37': 'ru-kt',
    '38': 'ru-kd', //"Krasnodar"
    '39': 'ru-ky',//"Krasnoyarsk"
    '40': 'ru-ku',//"Kurgan"
    '41': 'ru-ks',//,"Kursk"
    '42': 'ru-ln',//,"Leningrad"
    '43': 'ru-lp',//,"Lipetsk"
    '44': 'ru-mg',//,"Magadan"
    '45': 'ru-me',//"Mariy-El"
    '46': 'ru-mr',//"Mordovia"
    '47': 'ru-2509',//,"Moskva"
    '48': 'ru-ms', //,"Moscow City"
    '49': 'ru-mm',//,"Murmansk"
    '50': 'ru-nn',//,"Nenets"
    '51': 'ru-nz',//,"Nizhegorod"
    '52': 'ru-ng',//,"Novgorod"
    '53': 'ru-ns',//,"Novosibirsk"
    '54': 'ru-om', //,"Omsk"
    '55': 'ru-ob',//,"Orenburg"
    '56': 'ru-ol',//,"Orel"
    '57': 'ru-pz', //,"Penza"
    '58': 'ru-pe',//"Perm'"
    '59': 'ru-pr',//"Primor'ye"
    '60': 'ru-ps',//,"Pskov"
    '61': 'ru-ro',//,"Rostov"
    '62': 'ru-rz',//"Ryazan'"
    '63': 'ru-ck',//,"Sakha"
    '64': 'ru-sl',//,"Sakhalin"
    '65': 'ru-sa',//,"Samara"
    '66': 'ru-sp',//,"Saint Petersburg City"
    '67': 'ru-sr',//,"Saratov"
    '68': 'ru-no',//,"North Ossetia"
    '69': 'ru-sm',//,"Smolensk"
    '70': 'ru-st',//,"Stavropol'"
    '71': 'ru-sv',//,"Sverdlovsk"
    '72': 'ru-tb',//,"Tambovskaya oblast"
    '73': 'ru-tt',//,"Tatarstan"
    '74': 'ru-ky',//,"Taymyr"
    '75': 'ru-to',//,"Tomsk"
    '76': 'ru-tl',//,"Tula"
    '77': 'ru-tv',//,"Tver'"
    '78': 'ru-ty',//"Tyumen'"
    '79': 'ru-tu',//"Tuva"
    '80': 'ru-ud',//,"Udmurt"
    '81': 'ru-ul',//,"Ul'yanovsk"
    '83': 'ru-vl',//,"Vladimir"
    '84': 'ru-vg',//,"Volgograd"
    '85': 'ru-vo',//,"Vologda"
    '86': 'ru-vr',//,"Voronezh"
    '87': 'ru-yn',//,"Yamal-Nenets"
    '88': 'ru-ys',//,"Yaroslavl'"
    '89': 'ru-yv',
    '90': 'ru-pe',//,"Permskiy Kray"
    '91': 'ru-ky',//,"Krasnoyarskiy Kray"
    '92': 'ru-ka',//,"Kamchatskiy Kray"
    '93': 'ru-ct'//,"Zabaykal'skiy Kray"
};

function MapChart(filename, divId) {
    this.divId = divId;
    this.map = null;
    this.currentChartData = [];
    this.currentBubblesData = [];
    this.chartData = [];

    var self = this;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", filename, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) {
                var csv = rawFile.responseText;

                self.chartData = [];

                var lines = csv.split("\n");

                for (var i = 0; i < lines.length; i++) {
                    var elements = lines[i].split(',');
                    if (elements.length >= 9) {
                        self.chartData[i] = {
                            date: elements[0],
                            region: MAXMIND_TO_MAP[elements[1]],
                            hardware: parseInt(elements[2]),
                            network: parseInt(elements[3]),
                            //
                            //
                            metric1: parseFloat(elements[7]),
                            //
                            //
                            size: elements[8]
                        }
                    }
                }
            }
        }
    };
    rawFile.send(null);
}

MapChart.prototype.filter = function(date, network, hardware) {
    var res = [];
    var bubbles = [[],[],[],[],[],[],[],[],[],[]];
    var i = 0;
    var bi = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (var el in this.chartData) {
        var element = this.chartData[el];
        if (element.network === network && element.hardware === hardware && element.date === date) {
            // res[i] = [element.region, element.metric1];
            res[i] = {
                "hc-key": element.region,
                "value": element.metric1
            };
            i++;

            var bbl = {
                "hc-key": element.region,
                "z": element.size
            };

            var bin = 0;
            if (element.size < 10) {
                bin = 0;
            } else if (element.size < 100) {
                bin = 1;
            } else if (element.size < 500) {
                bin = 2;
            } else if (element.size < 1000) {
                bin = 3;
            } else if (element.size < 3000) {
                bin = 4;
            } else if (element.size < 5000) {
                bin = 5;
            } else if (element.size < 10000) {
                bin = 6;
            } else if (element.size < 20000) {
                bin = 7;
            } else if (element.size < 30000) {
                bin = 8;
            } else {
                bin = 9;
            }
            bubbles[bin][bi[bin]] = bbl;
            bi[bin]++;
        }
    }

    this.currentChartData = res;
    this.currentBubblesData = bubbles;
};

MapChart.prototype.draw = function (date, network, hardware) {
    this.filter(date, network, hardware);

    this.map = Highcharts.mapChart(this.divId, {
        chart: {
            map: 'countries/ru/custom/ru-all-disputed'
        },
        title: {
            text: ''
        },
        legend: {
            title: {
                text: 'NT7, ms',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
            },
            align: 'left',
            verticalAlign: 'bottom',
            // floating: true,
            // layout: 'vertical',
            valueDecimals: 0,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255, 255, 255, 0.85)',
            symbolRadius: 0,
            symbolHeight: 14
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            dataClasses: [{
                color: 'rgba(0,125,0,1)',
                to: 1000
            }, {
                color: 'rgba(0,125,0,0.75)',
                from: 1000,
                to: 2000
            }, {
                color: 'rgba(0,125,0,0.5)',
                from: 2000,
                to: 3000
            }, {
                color: 'rgba(255,235,0,1)',
                from: 3000,
                to: 4000
            }, {
                color: 'rgba(255,235,0,1)',
                from: 4000,
                to: 5000
            }, {
                color: 'rgba(255,235,0,0.75)',
                from: 5000,
                to: 6000
            }, {
                color: 'rgba(255,138,15,0.5)',
                from: 6000,
                to: 7000
            }, {
                color: 'rgba(255,138,15,0.75)',
                from: 7000,
                to: 8000
            }, {
                color: 'rgba(255,0,0,0.5)',
                from: 8000,
                to: 9000
            }, {
                color: 'rgba(255,0,0,0.75)',
                from: 9000,
                to: 10000
            }, {
                color: 'rgba(255,0,0,1)',
                from: 10000
            } ]


        },

        series: [
            {
                data: this.currentChartData,
                // mapData: Highcharts.maps['countries/ru/custom/ru-all-disputed'],
                name: 'NT7',
                // allowPointSelect: true,
                joinBy: 'hc-key',
                states: {
                    hover: {
                        color: '#f96400'
                    }
                }
            },
            {
                name: 'Count',
                type: 'mapbubble',
                minSize: 5,
                maxSize: 5,
                color: 'rgba(255,255,255,0.5)',
                joinBy: 'hc-key',
                data: this.currentBubblesData[0]

            },
            {
                name: 'Count',
                type: 'mapbubble',
                minSize: 15,
                maxSize: 15,
                color: 'rgba(255,255,255,0.5)',
                joinBy: 'hc-key',
                data: this.currentBubblesData[1]

            },
            {
                name: 'Count',
                type: 'mapbubble',
                minSize: 25,
                maxSize: 25,
                color: 'rgba(255,255,255,0.5)',
                joinBy: 'hc-key',
                data: this.currentBubblesData[2]

            },
            {
                name: 'Count',
                type: 'mapbubble',
                minSize: 32,
                maxSize: 32,
                color: 'rgba(255,255,255,0.5)',
                joinBy: 'hc-key',
                data: this.currentBubblesData[3]

            },
            {
                name: 'Count',
                type: 'mapbubble',
                minSize: 37,
                maxSize: 37,
                color: 'rgba(255,255,255,0.5)',
                joinBy: 'hc-key',
                data: this.currentBubblesData[4]

            },
            {
                name: 'Count',
                type: 'mapbubble',
                minSize: 42,
                maxSize: 42,
                color: 'rgba(255,255,255,0.5)',
                joinBy: 'hc-key',
                data: this.currentBubblesData[5]

            },
            {
                name: 'Count',
                type: 'mapbubble',
                minSize: 47,
                maxSize: 47,
                color: 'rgba(255,255,255,0.5)',
                joinBy: 'hc-key',
                data: this.currentBubblesData[6]

            },
            {
                name: 'Count',
                type: 'mapbubble',
                minSize: 55,
                maxSize: 55,
                color: 'rgba(255,255,255,0.5)',
                joinBy: 'hc-key',
                data: this.currentBubblesData[7]

            },
            {
                name: 'Count',
                type: 'mapbubble',
                minSize: 60,
                maxSize: 60,
                color: 'rgba(255,255,255,0.5)',
                joinBy: 'hc-key',
                data: this.currentBubblesData[8]

            },
            {
                name: 'Count',
                type: 'mapbubble',
                minSize: 65,
                maxSize: 65,
                color: 'rgba(255,255,255,0.5)',
                joinBy: 'hc-key',
                data: this.currentBubblesData[9]

            }
        ]
    });
};

MapChart.prototype.redraw = function (date, network, hardware) {
    if (this.map) {
        this.filter(date, network, hardware);
        this.map.series[0].setData(this.currentChartData);

        for (var i = 1; i < 11; i++) {
            this.map.series[i].setData(this.currentBubblesData[i-1]);
        }
    }
};