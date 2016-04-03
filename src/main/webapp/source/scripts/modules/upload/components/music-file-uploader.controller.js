(function (angular) {
    'use strict';

    angular
        .module('mllApp.upload')
        .controller('MusicFileUploaderController', MusicFileUploaderController);

    MusicFileUploaderController.$inject = ['musicForms', 'musicData', 'musicUploadService'];

    function MusicFileUploaderController(musicForms, musicData, musicUploadService) {
        this.forms = musicForms;

        this.data = musicData;

        this.uploadService = musicUploadService;

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

        this.prepare = (data) => {
            let obj = {
                generalInformation: data.generalInformation,
                ownershipInformation: data.ownershipInformation,
                soundInformation: data.soundInformation
            };

            obj.isDirect = data.fileInformation.isDirect;
            obj.file = (obj.isDirect) ? data.fileInformation.file : data.fileInformation.file.link;

            return obj;
        };

        this.submit = () => {
            let data = this.prepare(this.data);

            if (data.isDirect)
                this.uploadService.submitDirect(data, 'file')
                    .then((response) => {
                        alert('OK');
                        console.dir(response);
                    })
                    .catch((reject) => {
                        alert('ERROR');
                        console.dir(reject);
                    });

            else
                this.uploadService.submitCloud(data)
                    .then((response) => {
                        alert('OK');
                        console.dir(response);
                    })
                    .catch((reject) => {
                        alert('ERROR');
                        console.dir(reject);
                    });
        };
    }
})(window.angular);