'use strict'

function onInit() {
    renderTodos();
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    if (!confirm('Delete this todo?')) return;
    console.log('Removing Todo', todoId);

    removeTodo(todoId)
    renderTodos()
}

function renderTodos() {
    const todos = getTodosForDisplay();

    var strHTMLs = todos.map(todo =>
        `<li class="${(todo.isDone) ? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
        <span class = "todo-txt">
        ${todo.txt},
        </span>
        <span class = "importance">
        importance: ${todo.importance}
        </span>
        <button onclick="onRemoveTodo(event, '${todo.id}')">x</button>
        </li>
        <span class = "created-at">
        Created at: ${getFormattedTime(todo.createdAt)}
        </span>`)

    document.querySelector('.todo-list').innerHTML = strHTMLs.join('')

    document.querySelector('.todos-total-count').innerText = getTodosCount()
    document.querySelector('.todos-active-count').innerText = getActiveTodosCount()
}


function onToggleTodo(todoId) {
    console.log('Toggling', todoId);
    toggleTodo(todoId)

    renderTodos()
}

function onAddTodo() {
    const elTxt = document.querySelector('input[name=todoTxt]');
    const txt = elTxt.value;
    const elImportance = document.querySelector('input[name="todoImportance"]');
    const importance = elImportance.value;

    if (!txt.trim() || importance < 1 || importance > 3) return;

    addTodo(txt, importance);

    elTxt.value = '';
    elImportance.value = '';

    renderTodos()
}

function onSetFilter(filterBy) {
    console.log('Filtering By:', filterBy);
    
    setFilter(filterBy)
    renderTodos()
    
    var msg = getMsgToDisplay();
    var elMsg = document.querySelector('.msg');
    if(msg){
        elMsg.innerText = msg;
        elMsg.style.display = 'block';
    } else elMsg.style.display = 'none';
}

function onSetSort(sortBy) {
    console.log('Sorting By:', sortBy);

    setSort(sortBy)
    renderTodos()

}