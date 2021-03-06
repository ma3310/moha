/**
 * @file
 *   Provides useful js functions.
 */
/* jshint esversion: 6 */
/* jshint unused:false, strict: false */
/* globals Drupal:object, jQuery:object, echarts:object, _:object, ResizeSensor:function */
var moha = moha || {};

/**
 * Convert to celsius degree.
 *
 * @param degree
 *
 * @returns {number}
 */
moha.toCelsius = function (degree) {
  const real = (degree - 32) * 5 / 9;
  return Math.round(real);
};

/**
 * Convert to fahrenheit degree.
 *
 * @param degree
 *
 * @returns {number}
 */
moha.toFahrenheit = function (degree) {
  const real = degree * 9 / 5 + 32;
  return Math.round(real);
};

(function ($) {
  Drupal.behaviors.mohaUI = {


    /**
     * Resize all registered charts.
     */
    resizeExpensesCharts: function () {
      try {
        Drupal.settings.moha_ui = Drupal.settings.moha_ui || {};

        _.forEach(Drupal.settings.moha_ui.expenses_charts, function (chart) {
          chart.echarts.resize();
        });
      }
      catch (e) {
        console.log(e);
      }
    },

  /**
     * Attach behaviors to enhance UIs.
     *
     * @param context document
     * @param settings Drupal.settings
     *
     * @see Drupal.attachBehaviors JSDoc.
     */
    attach: function(context, settings) {
      $('body', context).once('moha-ui-body-attach', function () {

        Drupal.behaviors.mohaUI.toggleClass = function (className) {
          const body = $('body', context);
          const isOn = body.hasClass(className + '-on');

          if (!isOn) {
            body.removeClass('moha-toggle-class-off').addClass('moha-toggle-class-on').removeClass(className + '-off').addClass(className + '-on');
          }
          else {
            body.removeClass('moha-toggle-class-on').addClass('moha-toggle-class-off').removeClass(className + '-on').addClass(className + '-off');
          }
        };

        $(context).on('click', '[data-toggle="toggle-class"]', function (e) {
          e.preventDefault();
          const toggleClassName = $(this).data('toggle-class');
          Drupal.behaviors.mohaUI.toggleClass.call($(this), toggleClassName);
        });

        const $statistic_rows = $('.moha-ui-statistic-row', context);
        if ($statistic_rows.length > 1) {
          $statistic_rows.first().css('display', 'none');
        }

      }); // once body finished.

      try {
        // Initial expense charts
        $('.moha-ui-dashboard-expense-chart-container', context).once('moha-ui-expense-chart-container', function () {

          const $container = $(this);

          // Option template for expense chart.
          const option = {
            grid: {
              calculable: true,
              left: 50,
              right: 20,
              top: 50,
              bottom: 70,
            },
            title: {
              text: ''
            },
            tooltip: {
              trigger: 'axis',
            },
            toolbox: {
              feature: {
                dataZoom: {
                  yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
              }
            },
            dataZoom: [
              {
                type: 'inside',
                start: 80,
                end: 100
              },
              {
                start: 0,
                end: 10,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                  color: '#fff',
                  shadowBlur: 3,
                  shadowColor: 'rgba(0, 0, 0, 0.6)',
                  shadowOffsetX: 2,
                  shadowOffsetY: 2
                }
              }
            ],
            legend: {
              data: []
            },
            // dataset: {
            //   source:[]
            // },
            xAxis: {
              data: []
            },
            yAxis: {},
            series: [{
              animation: false,
              name: 'RMB',
              type: 'bar',
              smooth: true,
              large: true,
              data: []
            }]
          };

          _.forEach(settings.moha_ui.expenses_charts, function (chart) {
            if ($container.attr('id') === chart.wrapper_id) {
              $container.append('<div id="moha-ui-element-expense-chart-' + chart.name + '" class="moha-ui-element-expense-chart" style="min-height: 300px; height: 30vh; width: 100%;"></div>');
              chart.echarts = echarts.init($container.find('#moha-ui-element-expense-chart-' + chart.name).get(0), 'light', {renderer: 'canvas'});
              option.xAxis.data = chart.dates;
              option.series[0].data = chart.costs;
              chart.echarts.setOption(option);
            }
          });

          new ResizeSensor($container, Drupal.behaviors.mohaUI.resizeExpensesCharts);
        }); // once initial expense chart finished.

      }
      catch (e) {
        console.log(e);
      }

      /** @see php: moha_ui_loading() */
      $('.moha-ui-loading', context).once('moha-ui-loading', function () {
        const $loading = $(this);

        _.forEach(settings.moha_ui.moha_ui_loading, function(loading){
          if ($loading.prop('id') === loading.id) {
            setTimeout(function() {
              $loading.find('img').remove();
              $loading.find('#'+loading.id+'-text').text(loading.finished);
            }, loading.duration * 1000);
          }
        });
      });

      $('.moha-ui-date-range', context).once('moha-ui-date-range', function () {
        $('#demo').daterangepicker({
          "minYear": 2017,
          "autoApply": true,
          ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
          },
          "locale": {
            "format": "MM/DD/YYYY",
            "separator": " - ",
            "applyLabel": "确定",
            "cancelLabel": "取消",
            "fromLabel": "从",
            "toLabel": "到",
            "customRangeLabel": "自选",
            "weekLabel": "周",
            "daysOfWeek": [
              "日",
              "一",
              "二",
              "三",
              "四",
              "五",
              "六"
            ],
            "monthNames": [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December"
            ],
            "firstDay": 1
          },
          "startDate": "10/13/2019",
          "endDate": "10/19/2019"
        }, function(start, end, label) {
          console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
        });
      })
    }
  };

})(jQuery);
