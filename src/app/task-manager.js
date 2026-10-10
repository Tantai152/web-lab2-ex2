import { useState } from '../state/use-state.js';

/**
 * Reactive Task Manager component.
 * @returns {HTMLElement} Root <main> element containing the task manager UI.
 */
export function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('ALL');

  const main = document.createElement('main');
  main.className = 'task-manager';

  const header = document.createElement('header');

  const h2 = document.createElement('h2');
  h2.textContent = 'Tasks: ';

  const countSpan = document.createElement('span');
  countSpan.setAttribute('aria-live', 'polite');
  h2.appendChild(countSpan);

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'New task...';
  input.setAttribute('aria-label', 'New task');

  const addButton = document.createElement('button');
  addButton.type = 'button';
  addButton.textContent = 'Add';
  addButton._vnode = {
    props: {
      onClick: () => {
        const value = input.value.trim();
        if (value === '') return;
        const newTask = {
          id: crypto.randomUUID(),
          text: value,
          done: false
        };
        setTasks([...tasks, newTask]);
        input.value = '';
      }
    }
  };

  header.appendChild(h2);
  header.appendChild(input);
  header.appendChild(addButton);

  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Filter tasks');

  const filterButtons = ['ALL', 'ACTIVE', 'DONE'].map((f) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = f.charAt(0) + f.slice(1).toLowerCase();
    btn.dataset.filter = f;
    btn.setAttribute('aria-pressed', String(filter === f));
    btn._vnode = {
      props: {
        onClick: () => setFilter(f)
      }
    };
    return btn;
  });

  filterButtons.forEach((btn) => nav.appendChild(btn));

  const ul = document.createElement('ul');
  ul.className = 'task-list';

  const renderTasks = () => {
    ul.replaceChildren();

    const visible = filter === 'ALL'
      ? tasks
      : filter === 'ACTIVE'
        ? tasks.filter((t) => !t.done)
        : tasks.filter((t) => t.done);

    countSpan.textContent = String(visible.length);

    visible.forEach((task) => {
      const li = document.createElement('li');
      li.dataset.taskId = task.id;

      const label = document.createElement('label');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.done;
      checkbox._vnode = {
        props: {
          onClick: () => {
            setTasks(
              tasks.map((t) =>
                t.id === task.id ? { ...t, done: !t.done } : t
              )
            );
          }
        }
      };

      const span = document.createElement('span');
      span.textContent = task.text;

      label.appendChild(checkbox);
      label.appendChild(span);

      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.textContent = 'Delete';
      deleteButton.setAttribute('aria-label', `Delete task: ${task.text}`);
      deleteButton._vnode = {
        props: {
          onClick: () => {
            setTasks(tasks.filter((t) => t.id !== task.id));
          }
        }
      };

      li.appendChild(label);
      li.appendChild(deleteButton);
      ul.appendChild(li);
    });

    filterButtons.forEach((btn) => {
      btn.setAttribute('aria-pressed', String(filter === btn.dataset.filter));
    });
  };

  renderTasks();

  main.appendChild(header);
  main.appendChild(nav);
  main.appendChild(ul);

  return main;
}