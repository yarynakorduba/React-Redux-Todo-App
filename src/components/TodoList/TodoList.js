//the whole todolist with tasks
import React from 'react'
import { List } from 'immutable'
import PropTypes from 'prop-types'
import Todo from '../Todo'

import './TodoList.css'

function TodoList({removeTask, tasks, updateTask, groups}) {

  let todoItems = tasks.map((task, index) => {

  return (
      <Todo key={index}
      task={task}
      removeTask={removeTask} // ????????????????
      updateTask={updateTask} // ????????????????
      groups={groups}
      />
    );
});

  return (
    <div className="task-list">
    {todoItems}
    </div>
    );
}

TodoList.propTypes = { //should be provided to avoid warnings
  removeTask: PropTypes.func.isRequired,
  tasks: PropTypes.instanceOf(List).isRequired,
  updateTask: PropTypes.func.isRequired,
  groups: PropTypes.instanceOf(List).isRequired
};

export default TodoList;