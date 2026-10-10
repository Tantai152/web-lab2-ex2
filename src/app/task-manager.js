import { useState } from '../state/use-state.js';

/**
 * Creates the reactive task manager UI.
 * @returns {HTMLElement} The task manager root element.
 */
export function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('ALL');

  const root = document.createElement('main');
  root.className = 'task-manager';

  const header = document.createElement('header');
  const heading = document.createElement('h2');
  const taskCount = document.createElement('span');

  const getVisibleTasks = () => {
    if (filter === 'ACTIVE') {
      return tasks.filter((task) => !task.done);
    }

    if (filter === 'DONE') {
      return tasks.filter((task) => task.done);
    }

    return tasks;
  };

  const visibleTasks = getVisibleTasks();

  heading.appendChild(document.createTextNode('Tasks: '));

  taskCount.setAttribute('aria-live', 'polite');
  taskCount.textContent = String(visibleTasks.length);
  heading.appendChild(taskCount);

  const inputEl = document.createElement('input');
  inputEl.type = 'text';
  inputEl.placeholder = 'New task...';
  inputEl.setAttribute('aria-label', 'New task');

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = 'Add';

  addBtn._vnode = {
    props: {
      onClick: () => {
        const value = inputEl.value.trim();

        if (!value) {
          return;
        }

        const newTask = {
          id: crypto
