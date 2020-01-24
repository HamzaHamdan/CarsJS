$(document).ready(function () {

    $("#carsMakeDDL").on("click", function () {
        if ($("#carsMakeDDL").val() != null) {
            $.ajax({
                url: "/getMakeModels",
                type: "POST",
                data: {
                    'makeName': $("#carsMakeDDL").val()
                },
                success: function (data) {
                    $('#carsModelDDL').empty();
                    $('#carsModelDDL').append($('<option/>', {
                        value: 'All models',
                        text: 'All models'
                    }));
                    data.forEach((key, value) => {
                        $('#carsModelDDL').append($('<option/>', {
                            value: value,
                            text: key
                        }));
                    });
                }
            });
        }


    });

    $("#carsModelDDL").on("click", function () {
        if ($("#carsModelDDL").val() != null) {
            $.ajax({
                url: "/getModelYears",
                type: "POST",
                data: {
                    'makeName': $("#carsMakeDDL").val()
                },
                success: function (data) {
                    $('#carsYearDDL').empty();
                    $('#carsYearDDL').append($('<option/>', {
                        value: 'All years',
                        text: 'All years'
                    }));
                    data.forEach((key, value) => {
                        $('#carsModelDDL').append($('<option/>', {
                            value: value,
                            text: key
                        }));
                    });
                }
            });
        }


    });
});
