'use strict';

angular.module('EcreateIonic')
    .factory('utils', function ($http, config) {
        return {
            getWeek: function (date) {
                var newdate = new Date(date);
                var firstWeek = new Date(newdate.getFullYear(), 0, 1);
                var dayDiff = (newdate - firstWeek) / 86400000;
                var weekNumber = 1 + Math.ceil(dayDiff / 7);
                return weekNumber;
            },
            getBeginDate: function (date) {
                var newdate = new Date(date);
                newdate.setDate(newdate.getDate() - ((newdate.getDay()+6) %7));
                return newdate;
            },
            getEndDate: function (date) {
                var newdate = new Date(date);
                newdate.setDate(newdate.getDate() + (7-newdate.getDay()));
                return newdate;
            }
        }
    });