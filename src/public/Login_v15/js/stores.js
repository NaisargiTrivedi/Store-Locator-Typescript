let storeTable;

const storeDataFetch = () => {
    storeTable = $('#storeTable').DataTable({
        ajax: {
            type: "GET",
            url: "/stores/storeDataFetchApi/",
            dataSrc: "",
            dataType: "json"
        },
        columns: [
            { data: "storeName", name: "StoreName" },
            {
                data: "logoFilePath",
                render: function (data) {
                    return '<img src="/Login_v15/storeLogo/' + data + '" height="50" width="90">';
                }
            },
            { data: "address", name: "Address" },
            {
                data: "status", name: "Status",
                render: function (data) {
                    if (data) {
                        return '<span class="badge" style="background-color: #67B644;">Active</span>';
                    }
                    else {
                        return '<span class="badge" style="background-color: #FF6B6B;">InActive</span>';
                    }

                }
            },
            {
                data: {
                    "id": "_id",
                    "storeName": "storeName",
                    "city": "city",
                    "state": "state",
                    "country": "country",
                    "postalCode": "postalCode",
                    "address": "address",
                    "logo": "logoFilePath",
                    "status": "status"
                },
                render: function (full) {
                    console.log(full);
                    return '<div class="d-flex flex-row"><button type="button" class="btn btn-success me-3" data-bs-toggle="modal" data-bs-target="#editModal" data-id="' + full._id + '" data-storename="' + full.storeName + '" data-city="' + full.city + '" data-state="' + full.state + '" data-country="' + full.country + '" data-postalcode="' + full.postalCode + '" data-address="' + full.address + '"  data-status="' + full.status + '" data-logo="' + full.logoFilePath + '">Edit</button> <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" data-id="' + full._id + '">Delete</button></div>';
                }
            }
        ]
    });
}

$('#editModal').on('show.bs.modal', function (event) {
    let id = $(event.relatedTarget).data('id');
    let storeName = $(event.relatedTarget).data('storename');
    let city = $(event.relatedTarget).data('city');
    let state = $(event.relatedTarget).data('state');
    let country = $(event.relatedTarget).data('country');
    let postalCode = $(event.relatedTarget).data('postalcode');
    let address = $(event.relatedTarget).data('address');
    let logo = $(event.relatedTarget).data('logo');
    let status = $(event.relatedTarget).data('status');
    $('#update').attr('onclick', 'updateStoreBtn("' + id + '");');
    $('#storeName').val(storeName);
    $('#city').val(city);
    $('#state').val(state);
    $('#country').val(country);
    $('#postalCode').val(postalCode);
    $('#address').val(address);

    if (status) {
        $('#status').prop('checked', true);
        $('#status').val("on");
    }
    else {
        $('#status').prop('checked', false);
    }
});

$('#status').change(
    function () {
        if (this.checked) {
            $("#status").val("on");
        }
        else {
            $("#status").val("");
        }
    });

const updateStoreBtn = (id) => {
    let s;
    if ($('#status').val() == "on") {
        s = true;
    }
    else {
        s = false;
    }

    let storeUpdate = {
        "id": id,
        "storeName": $('#storeName').val(),
        "city": $('#city').val(),
        "state": $('#state').val(),
        "country": $('#country').val(),
        "postalCode": $('#postalCode').val(),
        "address": $('#address').val(),
        "logo": $('#logo').val(),
        "status": s,
    };
    $.ajax({
        type: "POST",
        url: "/stores/updateStoreApi/",
        data: JSON.stringify(storeUpdate),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        cache: false,
        success: function (data) {
            if (data.validationError) {
                $('#storeVal').html(data.storeVal);
                $('#cityVal').html(data.cityVal);
                $('#stateVal').html(data.stateVal);
                $('#countryVal').html(data.countryVal);
                $('#addVal').html(data.addVal);
                $('#postalVal').html(data.postalVal);
            }
            else {
                $('#storeVal').html('');
                $('#cityVal').html('');
                $('#stateVal').html('');
                $('#countryVal').html('');
                $('#addVal').html('');
                $('#postalVal').html('');
                $('#editModal').modal('hide').data('bs.modal', null);
                storeTable.ajax.reload(null, false);
            }
        },
        error: function () {
            alert("error");
        }
    });
};

// const updateStoreBtn = (id) => {
//     let s;
//     if ($('#status').val() == "on") {
//         s = true;
//     }
//     else {
//         s = false;
//     }
//     let form=$('#updateStoreForm')[0];
//     let storeName=$('#storeName').val();
//     let city=$('#city').val();
//     let state=$('#state').val();
//     let country=$('#country').val();
//     let postalCode=$('#postalCode').val();
//     let address=$('#address').val();
//     let logo=$('#logo').get(0).files[0];
//     let storeUpdate = new FormData(form);
//     storeUpdate.append("id",id);
//     storeUpdate.append("storeName",storeName);
//     storeUpdate.append("city",city);
//     storeUpdate.append("state",state);
//     storeUpdate.append("country",country);
//     storeUpdate.append("postalCode",postalCode);
//     storeUpdate.append("address",address);
//     storeUpdate.append("status",s);
//     storeUpdate.append("logo",logo);
//     console.log(storeUpdate);
//     // let storeUpdate = {
//     //     "id": id,
//     //     "storeName": $('#storeName').val(),
//     //     "city": $('#city').val(),
//     //     "state": $('#state').val(),
//     //     "country": $('#country').val(),
//     //     "postalCode": $('#postalCode').val(),
//     //     "address": $('#address').val(),
//     //     "logo": $('#logo').val(),
//     //     "status": s,
//     // };
//     $.ajax({
//         type: "POST",
//         url: "/stores/updateStoreApi/",
//         data: storeUpdate,
//         enctype: 'multipart/form-data',
//         processData: false,
//         contentType: false,
//         async: true,
//         cache: false,
//         success: function (data) {
//             console.log(data);
//             if (data.validationError) {
//                 // $('#storeName').val(data.req.storeName);
//                 // $('#city').val(data.req.city);
//                 // $('#state').val(data.req.state);
//                 // $('#country').val(data.req.country);
//                 // $('#postalCode').val(data.req.postalCode);
//                 // $('#address').val(data.req.address);
//                 $('#storeVal').html(data.storeVal);
//                 $('#cityVal').html(data.cityVal);
//                 $('#stateVal').html(data.stateVal);
//                 $('#countryVal').html(data.countryVal);
//                 $('#addVal').html(data.addVal);
//                 $('#postalVal').html(data.postalVal);
//             }
//             else {
//                 $('#storeVal').html('');
//                 $('#cityVal').html('');
//                 $('#stateVal').html('');
//                 $('#countryVal').html('');
//                 $('#addVal').html('');
//                 $('#postalVal').html('');
//                 $('#editModal').modal('hide').data('bs.modal', null);
//                 storeTable.ajax.reload(null, false);
//             }
//         },
//         error: function () {
//             alert("error");
//         }
//     });
// };

$('#deleteModal').on('show.bs.modal', function (event) {
    let id = $(event.relatedTarget).data('id');
    $('#delete').attr('onclick', 'deleteStoreBtn("' + id + '");');
});

const deleteStoreBtn = (id) => {
    let idDelete = { "id": id };
    $.ajax({
        type: "POST",
        url: "/stores/deleteStore/",
        data: JSON.stringify(
            idDelete
        ),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        cache: false,
        success: function (data) {
            if (data) {
                $('#deleteModal').modal('hide').data('bs.modal', null);
                storeTable.ajax.reload(null, false);
            }
        },
        error: function () {
            alert("error");
        }
    });
};



$('#addStoreForm').validate({
    rules: {
        storeName: {
            required: true,
            minlength: 4
        },
        city: {
            required: true,
            minlength: 4
        },
        state: {
            required: true,
            minlength: 4
        },

        country: {
            required: true,
            minlength: 4
        },
        address: {
            required: true,
            minlength: 10
        },

        postalCode: {
            required: true,
            minlength: 4
        },
        logo: "required"
    }
});