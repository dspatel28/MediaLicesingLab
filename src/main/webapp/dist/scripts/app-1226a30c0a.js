(function (angular) {
    'use strict';

    angular.module('mllApp',
        ['mllApp.shared', 'mllApp.header', 'mllApp.footer', 'mllApp.upload', 'ui.router']);

})(window.angular);
(function(angular) {
    'use strict';

    angular
        .module('mllApp')
        .config(config);

    function config() {

    }

})(window.angular);

(function (angular) {
    'use strict';

    angular
        .module('mllApp')
        .controller('ApplicationController', ApplicationController);

    function ApplicationController() {
        this.homeLink = { text: 'Home', href: '/profile' };

        this.navigationLinks = [
            { text: 'People', href: '/people' },
            { text: 'Music', href: '/misuc' }
        ];

        let a;
    }

})(window.angular);

(function (angular) {
    'use strict';

    angular
        .module('mllApp')
        .directive('mllApplication', mllApplication);

    function mllApplication() {
        return {
            restrict: 'AE',
            scope: {},
            controller: 'ApplicationController',
            controllerAs: 'ctrl',
            templateUrl: 'app.template.html'
        };
    }

})(window.angular);
(function (angular) {
    'use strict';

    angular.module('mllApp.header', ['mllApp.shared', 'mllApp.templates']);

})(window.angular);
(function (angular){
    'use strict';

    angular
        .module('mllApp.header')
        .controller('HeaderController', HeaderController);

    function HeaderController() {
        this.authLinks = [
            { text: 'Log In', href: '/login' },
            { text: 'Log Out', href: '/logout' }
        ];
    }

})(window.angular);

(function (angular){
    'use strict';

    angular
        .module('mllApp.header')
        .directive('mllHeader', mllHeader);

    function mllHeader() {
        return {
            restrict: 'AE',
            scope: {},
            controller: 'HeaderController',
            controllerAs: 'ctrl',
            templateUrl: 'header.template.html',
            bindToController: {
                navLinks: '=',
                homeLink: '='
            }
        };
    }

})(window.angular);
(function (angular) {
    'use strict';

    angular.module('mllApp.footer', ['mllApp.templates']);

})(window.angular);
(function (angular) {
    'use strict';

    angular.module('mllApp.picker', ['mllApp.templates']);

})(window.angular);
(function (angular) {
    'use strict';

    angular
        .module('mllApp.picker')
        .controller('HddFileReaderController', HddFileReaderController);

    function HddFileReaderController() {
        this.change = (e) => {
            let file = e.target.files[0];

            this.onSelect({ file: file });
        };
    }
})(window.angular);

(function (angular) {
    'use strict';

    angular
        .module('mllApp.picker')
        .directive('mllHddFileReader', mllHddFileReader);

    function mllHddFileReader() {
        return {
            restrict: 'AE',
            replace: true,
            scope: {},
            controller: 'HddFileReaderController',
            controllerAs: 'ctrl',
            bindToController: {
                onSelect: '&'
            },
            templateUrl: 'hdd-file-reader.template.html',
            link: _link
        };

        function _link(scope, elem, attrs, ctrl) {
            let input = elem[0].querySelector('input[type="file"]');

            input.addEventListener('change', (e) => {
                scope.$apply(() => ctrl.change(e));
            });
        }
    }
})(window.angular);
(function (angular) {
    'use strict';

    angular
        .module('mllApp.picker')
        .controller('DropboxFileReaderController', DropboxFileReaderController);

    function DropboxFileReaderController() {

    }
})(window.angular);
(function (angular) {
    'use strict';

    angular
        .module('mllApp.picker')
        .directive('mllDropboxFileReader', mllDropboxFileReader);

    function mllDropboxFileReader() {
        return {
            restrict: 'AE',
            replace: true,
            scope: {},
            controller: function() {},
            controllerAs: 'ctrl',
            bindToController: {
                formats: '=',
                onSelect: '&'
            },
            templateUrl: 'dropbox-file-reader.template.html',
            link: link
        };

        function link(scope, elem, attr, ctrl) {
            ctrl.select = () => {
                let options = {
                    success: (files) => {
                        scope.$apply(() => ctrl.onSelect({ file: files[0] }));
                    },
                    linkType: 'direct',
                    multiselect: false,
                    extensions: ctrl.formats
                };

                Dropbox.choose(options);
            };
        }
    }
})(window.angular);
(function (angular) {
    'use strict';

    angular
        .module('mllApp.picker')
        .controller('FileSelectorController', FileSelectorController);

    function FileSelectorController() {
        this.selectHDD = (file) => this.onSelectHdd({ file: file });

        this.selectDropbox = (file) => this.onSelectDropbox({ file: file });
    }
})(window.angular);
(function (angular) {
    'use strict';

    angular
        .module('mllApp.picker')
        .directive('mllFileSelector', mllFileSelector);

    function mllFileSelector() {
        return {
            restrict: 'AE',
            replace: true,
            scope: {},
            controller: 'FileSelectorController',
            controllerAs: 'ctrl',
            bindToController: {
                formats: '=',
                onSelectHdd: '&',
                onSelectDropbox: '&'
            },
            templateUrl: 'file-selector.template.html'
        };
    }
})(window.angular);
(function (angular) {
    'use strict';

    angular.module('mllApp.upload', ['mllApp.picker', 'mllApp.templates', 'ui.bootstrap']);

})(window.angular);
(function (angular) {
    'use strict';

    angular
        .module('mllApp.upload')
        .controller('MusicAgreementFormController', MusicAgreementFormController);

    function MusicAgreementFormController() {
        this.form = { invalid: true, submitted: false };

        this.validate = (isChecked) => this.form.invalid = !isChecked;

        this.submit = () => {
            if (this.form.invalid) this.form.submitted = true;
            else this.onNext();
        };
    }
})(window.angular);
(function (angular) {
    'use strict';

    angular
        .module('mllApp.upload')
        .directive('mllMusicAgreementForm', mllMusicAgreementForm);

    function mllMusicAgreementForm() {
        return {
            restrict: 'AE',
            scope: {},
            controller: 'MusicAgreementFormController',
            controllerAs: 'ctrl',
            bindToController: {
                onNext: '&'
            },
            templateUrl: 'music-agreement-form.template.html'
        };
    }
})(window.angular);
(function (angular) {
    'use strict';

    angular
        .module('mllApp.upload')
        .controller('MusicFileFormController', MusicFileFormController);

    function MusicFileFormController() {
        this.form = { invalid: true, submitted: false, errors: { size: false, format: false, required: true } };

        this.size = 10 * 1024 * 1024;
        this.formats = ['.mp3', '.pdf'];

        this.validateFormat = (fileName) => {
            return this.formats.includes(fileName.slice(fileName.lastIndexOf('.')));
        };

        this.validateSize = (size) => size <= this.size;

        this.selectHDD = (file) => {
            this.form.errors.size = !this.validateSize(file.size);
            this.form.errors.format = !this.validateFormat(file.name);
            this.form.errors.required = false;

            this.form.invalid = this.form.errors.size || this.form.errors.format;

            if (!this.form.invalid) this.data = file;

        };

        this.selectDropbox = (file) => {
            this.form.invalid = false;

            this.data = file;
        };

        this.submit = () => {
            if (this.form.invalid) this.form.submitted = true;
            else this.onNext();
        };

        this.reset = () => this.onPrevious();
    }
})(window.angular);
(function (angular) {
    'use strict';

    angular
        .module('mllApp.upload')
        .directive('mllFileForm', mllFileForm);

    function mllFileForm() {
        return {
            restrict: 'AE',
            replace: true,
            scope: {},
            controller: 'MusicFileFormController',
            controllerAs: 'ctrl',
            bindToController: {
                data: '=',
                onNext: '&',
                onPrevious: '&'
            },
            templateUrl: 'music-file-form.template.html'
        };
    }
})(window.angular);
(function (angular) {
    'use strict';

    angular
        .module('mllApp.upload')
        .controller('MusicGeneralInformationFormController', MusicGeneralInformationFormController);

    function MusicGeneralInformationFormController() {

        this.genres = [
            'Alternative', 'Blues', 'Children\'s Music', 'Christian & Gospel', 'Comedy', 'Classical', 'Country', 'Dance',
            'Electronic', 'Hip - Hop / Rap', 'Pop', 'Jazz', 'Latino', 'R & B / Soul', 'Reggae', 'Metal', 'Rock',
            'Singer / Songwriter', 'Folk / Americana', 'Funk'
        ];

        this.addArtist = () => this.data.artists.push({ name: '' });

        this.removeArtist = (i) => this.data.artists.splice(i, 1);

        this.selectGenre = (genre) => { if (!genre) this.data.secondaryGenre = null; };

        this.submit = () => {
            if (this.generalForm.$invalid) this.generalForm.$submitted = true;
            else this.onNext();
        };

        this.reset = () => this.onPrevious();

    }
})(window.angular);
(function (angular) {
    'use strict';

    angular
        .module('mllApp.upload')
        .directive('mllMusicGeneralInformationForm', mllMusicGeneralInformationForm);

    function mllMusicGeneralInformationForm() {
        return {
            restrict: 'AE',
            replace: true,
            scope: {},
            controller: 'MusicGeneralInformationFormController',
            controllerAs: 'ctrl',
            bindToController: {
                data: '=',
                onNext: '&',
                onPrevious:'&'
            },
            templateUrl: 'music-general-information-form.template.html'
        };
    }
})(window.angular);
(function (angular) {
    'use strict';

    angular
        .module('mllApp.upload')
        .controller('MusicOwnerInformationFormController', MusicOwnerInformationFormController);

    function MusicOwnerInformationFormController() {

        this.addWriter = () => this.data.songwriters.push({
            name: '', primaryPhone: '', secondaryPhone: '', primaryEmail: '', secondaryEmail: ''
        });

        this.removeWriter = (i) => this.data.songwriters.splice(i, 1);

        this.submit = () => {
            if (this.ownerForm.$invalid) this.ownerForm.$submitted = true;
            else this.onNext();
        };

        this.reset = () => this.onPrevious();

    }
})(window.angular);
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
            templateUrl: 'music-owner-information-form.template.html'
        };
    }
})(window.angular);
(function (angular) {
    'use strict';

    angular
        .module('mllApp.upload')
        .controller('MusicSoundInformationFormController', MusicSoundInformationFormController);

    function MusicSoundInformationFormController() {

        this.addOwner = () => this.data.soundOwners.push({
            name: '', primaryPhone: '', secondaryPhone: '', primaryEmail: '', secondaryEmail: ''
        });

        this.removeOwner = (i) => this.data.soundOwners.splice(i, 1);

        this.copyOwners = () => {
            if (this.isIdentical) {
                this.data.soundOwners = angular.copy(this.ownersFn());
            }
        };

        this.submit = () => {
            if (this.soundForm.$invalid) { this.soundForm.$submitted = true; }
            else this.onNext();
        };

        this.reset = () => this.onPrevious();

    }
})(window.angular);
(function (angular) {
    'use strict';

    angular
        .module('mllApp.upload')
        .directive('mllMusicSoundInformationForm', mllMusicSoundInformationForm);

    function mllMusicSoundInformationForm() {
        return {
            restrict: 'AE',
            replace: true,
            scope: {},
            controller: 'MusicSoundInformationFormController',
            controllerAs: 'ctrl',
            bindToController: {
                data: '=',
                ownersFn: '&',
                onNext: '&',
                onPrevious: '&'
            },
            templateUrl: 'music-sound-information-form.template.html'
        };
    }
})(window.angular);
(function (angular) {
    'use strict';

    angular
        .module('mllApp.upload')
        .controller('MusicFileUploaderController', MusicFileUploaderController);

    function MusicFileUploaderController() {
        this.forms = {
            current: 0,
            data: [
                { title: 'License Agreement', isActive: true, isDisabled: false },
                { title: 'Song Selection', isActive: false, isDisabled: true },
                { title: 'General Information', isActive: false, isDisabled: true },
                { title: 'Ownership Information', isActive: false, isDisabled: true },
                { title: 'Sound Ownership Information', isActive: false, isDisabled: true }
        ]};

        this.data = {
            fileInformation: { name: '', file: null },
            generalInformation: { title: '', artists: [{ name: '' }], beatRate: 0, genres: [] },
            ownershipInformation: {
                songwriters: [ { name: '', primaryEmail: '', primaryPhone: '', secondaryPhone: '' }],
                copyright: '',
                pubCompany: '',
                pbo: ''
            },
            soundInformation: {
                soundOwners: [ { name: '', primaryEmail: '', primaryPhone: '', secondaryPhone: '' }]
            }
        };

        this.next = () => {
            if (this.forms.current < this.forms.data.length - 1) {
                this.forms.data[this.forms.current].isActive = false;

                this.forms.current++;

                this.forms.data[this.forms.current].isActive = true;
                this.forms.data[this.forms.current].isDisabled = false;
            }

            else this.submit();
        };

        this.previous = () => {
            this.forms.data[this.forms.current].isActive = false;

            this.forms.current--;

            this.forms.data[this.forms.current].isActive = true;
        };

        this.submit = () => {};
    }
})(window.angular);
(function (angular) {
    'use strict';

    angular
        .module('mllApp.upload')
        .directive('mllMusicFileUploader', mllMusicFileUploader);

    function mllMusicFileUploader() {
        return {
            restrict: 'AE',
            scope: {},
            controller: 'MusicFileUploaderController',
            controllerAs: 'ctrl',
            templateUrl: 'music-file-uploader.template.html'
        };
    }
})(window.angular);
(function (angular) {
    'use strict';

    angular.module('mllApp.shared', ['mllApp.templates', 'ui.bootstrap']);

})(window.angular);
(function (angular) {
    'use strict';

    angular
        .module('mllApp.shared')
        .controller('ScrollableAgreementController', ScrollableAgreementController);

    function ScrollableAgreementController() {
        this.agree = () => this.onAgree({ isChecked: this.isChecked });
    }
})(window.angular);
(function (angular) {
    'use strict';

    angular
        .module('mllApp.shared')
        .directive('mllScrollableAgreement', mllScrollableAgreement);

    function mllScrollableAgreement() {
        return {
            restrict: 'AE',
            transclude: true,
            scope: {},
            controller: 'ScrollableAgreementController',
            controllerAs: 'ctrl',
            bindToController: {
                onAgree: '&'
            },
            templateUrl: 'scrollable-agreement.template.html',
            link: link
        };

        function link(scope, elem, attrs, ctrl) {
            let doc = elem[0].querySelector('.agreement__document');

            doc.addEventListener('scroll', onScroll);

            function onScroll() {
                let ratio = (this.scrollTop + this.offsetHeight) / this.scrollHeight;

                if (ratio === 1) {
                    scope.$apply(() => { ctrl.isScrolled = true; });
                    this.removeEventListener('scroll', onScroll);
                }
            }
        }
    }
})(window.angular);