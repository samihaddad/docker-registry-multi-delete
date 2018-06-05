var checkedImages = [];
var API = '/repo/delete/';

addCheckboxes();


function deleteImages() {
    $('body').append('<div class="loading"></div>');
    $.each(checkedImages, function (index, tag) {
        $.get(API + getImageName() + '/' + tag)
        .done(function() {
            if (index == checkedImages.length - 1) {
                location.reload();
            }
        });
    });
}

function getImageName() {
    return $('.breadcrumb li.active').text();
}

function toggleDeleteButton(show) {
    if (show) {
        var button = $('<input id="delete-button" type="button" value="Delete Selected" style="position: absolute;right: 15px;top: 10px;padding: 10px;border-radius: 5px;color: #3379b7;"/>');
        button.appendTo($("dl"));

        button.click(function () {
            if (confirm("Are you sure you want to delete selected images?")) {
                deleteImages();
            };
        });

    } else {
        $("#delete-button").remove();
    }
}

function addCheckboxes() {
    var table = $('#main');

    var tableHeaderRow = table.find('thead tr');
    tableHeaderRow.prepend("<th></th>");

    var tableBodyRows = table.find('tbody tr');
    tableBodyRows.prepend('<td><input type="checkbox"></td>');

    $('#main :checkbox').change(function () {
        var imageTag = $(this).parent().parent().find('td:nth-child(3)').text();
        if (this.checked) {
            if (!checkedImages.length) toggleDeleteButton(true);
            checkedImages.push(imageTag);
        } else {
            checkedImages.splice(checkedImages.indexOf(imageTag), 1);
            if (!checkedImages.length) toggleDeleteButton(false);
        }
    });
}