(function (angular) {
    'use strict';

    angular
        .module('mllApp.upload')
        .directive('mllMusicOwnerInformationForm', mllMusicOwnerInformationForm);

    function mllMusicOwnerInformationForm() {
        return {
            restrict: 'AE',
            replace: true,
            scope: {},
            controller: 'MusicOwnerInformationFormController',
            controllerAs: 'ctrl',
            bindToController: {
                data: '=',
                onNext: '&',
                onPrevious:'&'
            },
            templateUrl: 'source/scripts/modules/upload/components/music-owner-information-form.template.html'
        };
    }
})(window.angular);