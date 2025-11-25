const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.info("dispatching", action);
  const result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};

const addDate = (store) => (next) => (action) => {
  // BEGIN (write your solution here)
  if (action.type === 'TASK_ADD' && action.payload && action.payload.task && action.payload.task.text) {
    const dateStr = new Date().toLocaleDateString('ru-RU');
    const textWithDate = `Задача на ${dateStr}: ${action.payload.task.text}`;
    // Клонируем action, чтобы не мутировать
    const newAction = {
      ...action,
      payload: {
        ...action.payload,
        task: {
          ...action.payload.task,
          text: textWithDate,
        },
      },
    };
    return next(newAction);
  }
  return next(action);
  // END
};

export default { logger, addDate };
