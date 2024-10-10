import React from "react";

export default function Activity(props) {
  function labelPriority(priority) {
    switch (priority) {
      case "1":
        return "Baixa";
      case "2":
        return "Normal";
      case "3":
        return "Alta";
      default:
        return "Não definido";
    }
  }

  function stylePriority(priority, icon) {
    switch (priority) {
      case "1":
        return icon ? "smile" : "success";
      case "2":
        return icon ? "meh" : "dark";
      case "3":
        return icon ? "frown" : "warning";
      default:
        return "Não definido";
    }
  }

  return (
    <div
      key={props.activity.id}
      className={"card mb-2 shadow-sm border-" + stylePriority(props.activity.priority, false)}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">
            <span className="badge text-bg-secondary me-1">{props.activity.id}</span>- {props.activity.title}
          </h5>
          <h6>
            Prioridade:
            <span className="ms-1 text-black">
              <i className={"me-1 far fa-" + stylePriority(props.activity.priority, true)}></i>
              {labelPriority(props.activity.priority)}
            </span>
          </h6>
        </div>
        <p className="card-text">{props.activity.description}</p>
        <div className="d-flex justify-content-end pt-2 m-0 border-top">
          <button className="btn btn-outline-primary me-2 btn-sm">
            <i className="fas fa-pen me-2" />
            Editar
          </button>
          <button className="btn btn-outline-danger btn-sm" onClick={() => props.deleteActivity(props.activity.id)}>
            <i className="fas fa-trash me-2" />
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}
