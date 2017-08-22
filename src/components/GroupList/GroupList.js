//the whole grouplist with groups
import React from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import Group from '../Group/Group';
import Todo from '../Todo';

import './GroupList.css'


function GroupList({removeGroup, groups, updateGroup,
    removeTask, tasks, updateTask}) {

  

  let groupItems = groups.map((group, index) => {
  console.log("Todo Items Before group" + group.title);
  let todoItems = tasks.filter(function(task) 
    { return (task.groupId === group.key); })
  .map((task, ind) => {
      console.log("Todo Items Between group" + task.title);
  return (
      <Todo key={ind}
      task={task}
      removeTask={removeTask} // ????????????????
      updateTask={updateTask} // ????????????????
      />
    );
});

  return (
    <div key={index}>
      <Group key={index}
      group={group}
      removeGroup={removeGroup} // ?
      updateGroup={updateGroup} // ?
      />
      <div className="todo-items">{todoItems}</div>
    </div>

    );
});

  

  return (
    <div className="group-list">
    <div>
    {groupItems}
    </div>
    </div>
    );
}

GroupList.propTypes = { //should be provided to avoid warnings
  removeGroup: PropTypes.func.isRequired,
  groups: PropTypes.instanceOf(List).isRequired,
  updateGroup: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
  tasks: PropTypes.instanceOf(List).isRequired,
  updateTask: PropTypes.func.isRequired
};

export default GroupList;