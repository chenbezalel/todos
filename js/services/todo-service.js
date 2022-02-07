'use strict'

const STORAGE_KEY = 'todosDB';
var gTodos;
var gFilterBy = 'ALL';
var gSortBy;
_createTodos();

function getTodosForDisplay() {

    getTodosSort();

    if (gFilterBy === 'ALL') return gTodos;

    return gTodos.filter(todo =>
        todo.isDone && gFilterBy === 'DONE' ||
        !todo.isDone && gFilterBy === 'ACTIVE'
    )


}

function getMsgToDisplay(){

    var todos = getTodosForDisplay();

    if (todos.length === 0) {
        var msg = '';
        if (gFilterBy === 'DONE') msg = `No Done Todos`;
        else if (gFilterBy === 'ACTIVE') msg = `No Active Todos`;
        else if (gFilterBy === 'ALL') msg = `No todos`;
    };

    return msg;
}

function getTodosSort() {
    if (gSortBy === 'TEXT') {
        gTodos.sort(function (a, b) {
            var nameA = a.txt.toUpperCase();
            var nameB = b.txt.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    } else if (gSortBy === 'CREATED') {
        gTodos.sort(function (a, b) {
            return b.createdAt - a.createdAt;
        });
    } else if (gSortBy === 'IMPORTANCE'){
        gTodos.sort(function (a, b) {
            return b.importance - a.importance;
        });
    }
}


function removeTodo(todoId) {
    const idx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(idx, 1)
    _saveTodosToStorage()
}

function toggleTodo(todoId) {
    var todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    _saveTodosToStorage()
}

function addTodo(txt, importance) {
    const todo = _createTodo(txt, importance)
    gTodos.unshift(todo)
    _saveTodosToStorage()
}

function getTodosCount() {
    return gTodos.length
}

function getActiveTodosCount() {
    const activeTodos = gTodos.filter(todo => !todo.isDone)
    return activeTodos.length
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function setSort(sortBy) {
    gSortBy = sortBy;
}

function _createTodos() {
    gTodos = loadFromStorage(STORAGE_KEY)
    if (!gTodos || !gTodos.length) {
        gTodos = [
            _createTodo('Learn HTML', 2),
            _createTodo('Study CSS', 1),
            _createTodo('Master Javascript', 3),
        ]
        _saveTodosToStorage()
    }
}

function _createTodo(txt, importance) {
    const todo = {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createdAt: Date.now(),
        importance: importance
    }
    return todo
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos)
}



function getFormattedTime(ts) {
    var d = new Date(ts);
    var date = d.getDate() + '/' + (d.getMonth() + 1) + '/'
        + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes();
    return date;
}