$(document).ready(function() {

    var app = new Vue({
       el: '#vm',
        data:{
           usuario:{
               name: '',
               lastName: '',
               email: '',
               phone: '',
               address: '',
               educacion:'',
               experiencia:'',
               objetivo: '',
           },
            enableBtnPDf: false,
            Softwarelenguage:[],
            image: '',
            software:[],
            skill: null,
            experiences: [
                'Estudiante', 'Principiante', 'Con Experiencia', 'Gerente', 'Ejecutivo'
            ],
            sector: null,
            sectores:[
                'Administración', 'Computación', 'Contabilidad', 'Alimentos y bebidas'
            ]
        },
        methods:{
           limpiar: function () {

               this.usuario.objetivo = ' ';
               this.usuario.experiencia = ' ';
               this.usuario.educacion = ' ';
               this.usuario.name = ' ';
               this.usuario.lastName = ' ';
               this.usuario.phone = ' ';
               this.usuario.address = ' ';
               this.usuario.email = ' ';
           },
           mostrarNombre: function () {
               return this.usuario.name + ' ' + this.usuario.lastName
           },onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                var image = new Image();
                var reader = new FileReader();
                var vm = this;

                reader.onload = (e) => {
                    vm.image = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            removeImage: function (e) {
                this.image = '';
            }
        }
    });


    $('#contact_form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            first_name: {
                validators: {
                    stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please supply your first name'
                    }
                }
            },
            last_name: {
                validators: {
                    stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please supply your last name'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your email address'
                    },
                    emailAddress: {
                        message: 'Please supply a valid email address'
                    }
                }
            },
            skill: {
                validators: {
                    notEmpty: {
                        message: 'Por favor introduzca su nivel de experiencia'
                    }
                }
            },
            sector: {
                validators: {
                    notEmpty: {
                        message: 'Por favor introduzca un sector profesional al que pertenezca'
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your phone number'
                    },
                    phone: {
                        country: 'US',
                        message: 'Please supply a vaild phone number with area code'
                    }
                }
            },
            address: {
                validators: {
                    stringLength: {
                        min: 8,
                    },
                    notEmpty: {
                        message: 'Please supply your street address'
                    }
                }
            },
            city: {
                validators: {
                    stringLength: {
                        min: 4,
                    },
                    notEmpty: {
                        message: 'Please supply your city'
                    }
                }
            },
            state: {
                validators: {
                    notEmpty: {
                        message: 'Please select your state'
                    }
                }
            },
            zip: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your zip code'
                    },
                    zipCode: {
                        country: 'US',
                        message: 'Please supply a vaild zip code'
                    }
                }
            },
            comment: {
                validators: {
                    stringLength: {
                        min: 10,
                        max: 300,
                        message:'Por favor introduce mas de 20 letras y un maximo de 300'
                    },
                    notEmpty: {
                        message: 'Please supply a description of your project'
                    }
                }
            }
        }
    })
        .on('success.form.bv', function(e) {
            $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
            $('#contact_form').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            // Use Ajax to submit form data
            $.post($form.attr('action'), $form.serialize(), function(result) {
                console.log(result);
            }, 'json');
        });
});

