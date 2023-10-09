import $ from 'jquery';

import {
  indexTasks,
  postTask,
  deleteTask,
  markComplete,
  markActive,
} from "./requests.js";

var filter = 0;

var filterTasks = function (tasks, filter) {
  var newList = [];
  if (filter === 0) {
    return tasks;
  } else if (filter === 1) {
    newList = tasks.filter(function (task) {
      return task.completed === false;
    });
  } else {
    newList = tasks.filter(function (task) {
      return task.completed === true;
    });
  }

  return newList;
}

var listTasks = function (filter) {
  indexTasks(function (response) {
    var tasks = filterTasks(response.tasks, filter)
    console.log(tasks);
    if (tasks.length > 0) {
      $('#list-contents').html('');
      $('#list-contents').append('<div class="row">' +
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
      '</div>');
  
      var htmlString = tasks.map(function(task) {
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
          `<td class="text-center"><button type="button" id="${id}" class="btn btn-light btn-sm delete">Delete</button></td>` +
          '</tr>';
      });
  
      $('tbody').append(htmlString);
      $('#numItems').html(tasks.length);
    } else {
      $('tbody').html('');
      $('#numItems').html(tasks.length);
    }

  });
}

$(document).ready(() => {

  listTasks(filter);

  $('#new-task-form').on('submit', function (event) {
    if (event) { event.preventDefault(); }
    var newItem = $('#todoInput').val();
    console.log(newItem);
    if (newItem) {
      postTask(newItem);
    }
    $('#todoInput').val('');
    listTasks(filter);
  });

  $('#list-contents').on('click', '.delete', function (event) {
    var id = $(this).attr('id');
    deleteTask(id);
    listTasks(filter);
  });

  $('#list-contents').on('click', '.checkbox', function (event) {
    var id = $(this).closest('td').next().find('.delete').attr('id');
    if ($(this).prop('checked')) {
      markComplete(id);
    } else {
      markActive(id);
    }
  });

  $('#all').on('click', function () {
    $('#active').attr('class', 'btn btn-primary');
    $('#active').attr('aria-pressed', 'false');
    $('#completed').attr('class', 'btn btn-primary');
    $('#completed').attr('aria-pressed', 'false');
    filter = 0;
    listTasks(filter);
  });

  $('#active').on('click', function () {
    $('#all').attr('class', 'btn btn-primary');
    $('#all').attr('aria-pressed', 'false');
    $('#completed').attr('class', 'btn btn-primary');
    $('#completed').attr('aria-pressed', 'false');
    filter = 1;
    listTasks(filter);
  });

  $('#completed').on('click', function () {
    $('#all').attr('class', 'btn btn-primary');
    $('#all').attr('aria-pressed', 'false');
    $('#active').attr('class', 'btn btn-primary');
    $('#active').attr('aria-pressed', 'false');
    filter = 2;
    listTasks(filter);
  });

});