import React, { useState } from 'react';

const TodoForm = ({ submitHandler }) => {
  const [newTaskText, setNewTaskText] = useState('');
  const handleChangeText = (event) => setNewTaskText(event.target.value);

  const inputClassName = 'form-control me-3';

  const onSubmit = (event) => {
    submitHandler(event, newTaskText);
    setNewTaskText('');
  };

  return (
    <form onSubmit={onSubmit} className="todo-form">
      <div className="input-group has-validation">
        <input
          type="text"
          onChange={handleChangeText}
          value={newTaskText}
          data-testid="input"
          required
          className={inputClassName}
          placeholder="I am going..."
        />
        <div className="input-group-append">
          <input type="submit" data-testid="submit" className="btn btn-primary btn-sm" value="Add" />
        </div>
      </div>
    </form>
  );
};

export default TodoForm;
