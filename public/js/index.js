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

                    data.carModelsArray.forEach((key, value) => {
                        console.log(key, value);
                        $('#carsModelDDL').append($('<option/>', {
                            value: value,
                            text: key
                        }));
                    });

                    $('#carsYearDDL').empty();
                    $('#carsYearDDL').append($('<option/>', {
                        value: 'All years',
                        text: 'All years'
                    }));
                    data.carYearArray.forEach((key, value) => {
                        console.log(key, value);
                        $('#carsYearDDL').append($('<option/>', {
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

    $(".addMakeForm").on("submit", function (event) {
        event.preventDefault();
        var makeTextField = $("#makeTextField").val().trim();

        $.ajax("/admin/addMake", {
            type: "POST",
            data: {
                'makeName': makeTextField
            }
        }).then(
            function () {
                console.log("created new burger");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });



    $(document).on("click", ".makeDeleteClass", function () {
        var makeId = $(this).attr('custom-attribute');

        $.ajax("/admin/deleteMake", {
            type: "POST",
            data: {
                'makeId': makeId
            }
        }).then(
            function () {
                console.log("created new burger");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });


    $("#book-test-drive").on("click", function () {
        console.log("booked!!!")
        $.ajax("/cars/booking", {
            type: "POST"
        }).then(function () {
            console.log("request");
        });
    });



});
