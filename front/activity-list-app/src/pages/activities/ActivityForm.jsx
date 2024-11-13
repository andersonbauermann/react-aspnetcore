import { useEffect, useState } from "react";

const initialActivity = {
  id: 0,
  title: "",
  priority: 0,
  description: ""
};

export default function ActivityForm(props) {
  const [activity, setActivity] = useState(currentActivity());

  useEffect(() => {
    if (props.selectedActivity.id !== 0) {
      setActivity(props.selectedActivity);
    }
  }, [props.selectedActivity]);

  const inputTextHandler = (e) => {
    const { name, value } = e.target;

    setActivity({ ...activity, [name]: value });
  };

  function currentActivity() {
    if (props.selectedActivity.id !== 0) {
      return props.selectedActivity;
    }

    return initialActivity;
  }

  const cancelEditActivity = (e) => {
    e.preventDefault();
    props.cancelActivity();
    setActivity(initialActivity);
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (props.selectedActivity.id !== 0) props.updateActivity(activity);
    else props.addActivity(activity);

    setActivity(initialActivity);
  };

  return (
    <form className="row g-3 mt-3" onSubmit={submitForm}>
      <div className="col-md-6">
        <label className="form-label">Título</label>
        <input
          name="title"
          id="title"
          type="text"
          className="form-control"
          onChange={inputTextHandler}
          value={activity.title}
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Prioridade</label>
        <select
          name="priority"
          id="priority"
          className="form-select"
          onChange={inputTextHandler}
          value={activity.priority}
        >
          <option defaultValue="NaoDefinido">Selecione...</option>
          <option value="Baixa">Baixa</option>
          <option value="Normal">Normal</option>
          <option value="Alta">Alta</option>
        </select>
      </div>
      <div className="col-md-12">
        <label className="form-label">Descrição</label>
        <textarea
          name="description"
          id="description"
          type="text"
          className="form-control"
          onChange={inputTextHandler}
          value={activity.description}
        />
      </div>
      <div className="col-12">
        {activity.id === 0 ? (
          <button className="btn btn-outline-success" type="submit">
            <i className="fas fa-plus me-2" />
            Salvar
          </button>
        ) : (
          <>
            <button className="btn btn-outline-success" type="submit">
              <i className="fas fa-plus me-2" />
              Salvar
            </button>
            <button className="btn btn-outline-danger ms-2" onClick={cancelEditActivity}>
              <i className="fa-solid fa-xmark me-2" />
              Cancelar
            </button>
          </>
        )}
      </div>
    </form>
  );
}
