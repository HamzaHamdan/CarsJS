$(document).ready(function () {

    $("#carsMakeDDL").on("change", function () {
        $.ajax({
            url: "/getMakeModels",
            type: "POST",
            data: {
                'makeId': $("#carsMakeDDL").val()
            },
            success: function (data) {
                $('#carsYearDDL').empty();
                $('#carsYearDDL').append($('<option/>', {
                    value: 'ALL',
                    text: 'Choose a Year'
                }));
                $('#carsModelDDL').empty();
                $('#carsModelDDL').append($('<option/>', {
                    value: 'ALL',
                    text: 'Choose a Model'
                }));
                data.carModelsArray.forEach((element) => {
                    $('#carsModelDDL').append($('<option/>', {
                        value: element.carModelId,
                        text: element.carModel
                    }));
                });
            }
        });
    });

    $("#carsModelDDL").on("change", function () {
        if ($("#carsModelDDL").val() != null) {
            $.ajax({
                url: "/getModelYears",
                type: "POST",
                data: {
                    'makeId': $("#carsMakeDDL").val(),
                    'modelId': $("#carsModelDDL").val()
                },
                success: function (data) {
                    $('#carsYearDDL').empty();
                    $('#carsYearDDL').append($('<option/>', {
                        value: 'ALL',
                        text: 'Choose a Year'
                    }));
                    data.carYearsArray.forEach((element) => {
                        $('#carsYearDDL').append($('<option/>', {
                            value: element.carYear,
                            text: element.carYear
                        }));
                    });
                }
            });
        }
    });

    /* $(".addMakeForm").on("submit", function (event) {
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
    }); */

    /*     $(".addModelForm").on("submit", function (event) {
            event.preventDefault();
            var modelTextField = $("#modelTextField").val().trim();
            var makeSelectField = $("#makeSelectField option:selected").val();
    
            $.ajax("/admin/addModel", {
                type: "POST",
                data: {
                    'modelName': modelTextField,
                    'makeId': makeSelectField
                }
            }).then(
                function () {
                    console.log("created new model!");
                    // Reload the page to get the updated list
                    location.reload();
                }
            );
        }); */


    $(document).on("click", ".makeDeleteClass", function () {
        var makeId = $(this).attr('custom-attribute');

        $.ajax("/admin/manageMakes/" + makeId, {
            type: "DELETE"
        }).then(
            function () {
                console.log("make deleted!");
            }
        );
    });

    $(document).on("click", ".modelDeleteClass", function (event) {
        //event.preventDefault();
        var modelId = $(this).attr('custom-attribute');
        console.log(modelId);
        $.ajax("/admin/manageModels/" + modelId, {
            type: "DELETE"
        }).then(
            function () {
                console.log("model delted!");
            }
        );
    });

    $(document).on("click", ".testDriveDeleteClass", function () {
        var testId = $(this).attr('custom-attribute');

        $.ajax("/admin/deleteTestDrive", {
            type: "DELETE",
            data: {
                'testId': testId
            }
        }).then(
            function () {
                console.log("test drive deleted!");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });


    $("#addCarMakeDDL").on("change", function () {
        if ($("#addCarMakeDDL").val() != null) {
            $.ajax({
                url: "/cars/addPageGetMakeModels",
                type: "POST",
                data: {
                    'makeName': $("#addCarMakeDDL").val()
                },
                success: function (data) {
                    $('#addCarModelDDL').empty();
                    data.carModelsArray.forEach((carModelObject) => {
                        console.log(carModelObject.modelId, carModelObject.modelName);
                        $('#addCarModelDDL').append($('<option/>', {
                            value: carModelObject.modelId,
                            text: carModelObject.modelName
                        }));
                    });
                }
            });
        }
    });

    $(".postTestDriveSchedule").on("submit", function (event) {
        event.preventDefault();

        $.ajax("/cars/scheduleTestDrive", {
            type: "POST",
            data: {
                'date': $('#dateFieldSearchFrom').val().trim(),
                'notes': $('#notesField').val().trim(),
                'vinNumber': $('#vinNumber').val().trim(),
                'email': $('#emailAddressField').val().trim()
            }
        }).then(
            function () {
                console.log("created new schedule!");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $(".scheduleTestDriveFrom").on("submit", function (event) {
        event.preventDefault();

        $.ajax("/cars/scheduleTestDrive/" + $("#vinNumber").text(), {
            type: "POST"
        }).then(
            function () {
                console.log("created new schedule!");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });


    $(document).on("click", ".carDeleteClass", function () {
        var carId = $(this).attr('custom-attribute');
        $.ajax("/admin/deleteCar", {
            type: "DELETE",
            data: {
                'carId': carId
            }
        }).then(
            function () {
                console.log("vehicle deleted!");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

});
