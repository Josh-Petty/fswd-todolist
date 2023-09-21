import $ from 'jquery';

import {
  indexTasks,
  postTask,
} from "./requests.js";

indexTasks(function (response) {
  console.log(response);
  if (response.tasks.length > 0) {
    $('.todo-container').append('<div id="list-contents" class="list-body-section">' +
    '<div class="row">' +
    '<div class="col-12">' +
    '<table>' +
    '<thead>' +
    '<tr>' +
    '<th class="col-9 text-center" scope="col">Description</th>' +
    '<th class="col-1 text-center" scope="col">Completed</th>' +
    '<th class="col-2" scope="col"></th>' +
    '</tr>' +
    '</thead>' +
    '<tbody>' +
    '</tbody>' +
    '</table>' +
    '</div>' +
    '</div>' +
    '</div>');

    var htmlString = response.tasks.map(function(task) {
      var content = task.content;
      var completed = task.completed;
      var id = task.id;
      var checkboxHTML;
      if (completed === true) {
        checkboxHTML = `<td class="text-center"><input class="form-check-input checkbox" type="checkbox" value="" checked></td>`
      } else {
        checkboxHTML = `<td class="text-center"><input class="form-check-input checkbox" type="checkbox" value=""></td>`
      }

      return '<tr>' +
        '<td class="itemDescription">' + content + '</td>' +
        checkboxHTML +
        `<td class="text-center"><button id="${id}" class="btn btn-light btn-sm delete">Delete</button></td>` +
        '</tr>';
    });

    $('tbody').append(htmlString);
    $('#numItems').html(response.tasks.length);
  }
});

$('#new-task-form').on('submit', function (event) {
  if (event) { event.preventDefault(); }
  console.log('add clicked');
  var newItem = $('#todoInput').val();
  console.log(newItem);
  if (newItem) {
    postTask(newItem);
  }
  $('#todoInput').val('');
});
