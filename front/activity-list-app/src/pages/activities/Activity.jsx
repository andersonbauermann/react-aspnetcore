import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import api from "../../api/activity";
import ActivityList from './ActivityList';
import ActivityForm from './ActivityForm';
import TitlePage from "../../components/TitlePage";

export default function Activity() {
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState({ id: 0 });

  useEffect(() => {
    const getActivities = async () => {
      const allActivities = await getAllActivities();
      if (allActivities) setActivities(allActivities);
    };
    getActivities();
  }, []);

  const toggleActivityModal = () => setShowActivityModal(!showActivityModal);

  const toggleConfirmModal = (id) => {
    setShowConfirmModal(!showConfirmModal);
    if (id !== 0 && id !== undefined) {
      const activity = activities.filter((activity) => activity.id === id);
      setActivity(activity[0]);
    } else {
      setActivity({ id: 0 });
    }
  };

  const getAllActivities = async () => {
    const response = await api.get("activity");
    return response.data;
  };

  const newActivity = () => {
    setActivity({ id: 0 });
    toggleActivityModal();
  };

  async function addActivity(activ) {
    const response = await api.post("activity", activ);
    setActivities([...activities, response.data]);
    toggleActivityModal();
  }

  async function updateActivity(activ) {
    const response = await api.put(`activity/${activ.id}`, activ);
    const { id } = response.data;
    setActivities(activities.map((item) => (item.id === id ? response.data : item)));
    setActivity({ id: 0 });
    toggleActivityModal();
  }

  async function deleteActivity(id) {
    const deleteSuccess = await api.delete(`activity/${id}`);
    if (deleteSuccess) {
      const filteredActivities = activities.filter((activity) => activity.id !== id);
      setActivities([...filteredActivities]);
    }
    toggleConfirmModal(0);
  }

  function cancelActivity() {
    setActivity({ id: 0 });
    toggleActivityModal();
  }

  function setActivityToUpdate(id) {
    const activity = activities.filter((activity) => activity.id === id);
    setActivity(activity[0]);
    toggleActivityModal();
  }

  return (
    <>
      <TitlePage title={"Atividade " + (activity.id !== 0 ? activity.title : "")}>
        <Button variant="outline-secondary" onClick={newActivity}>
          <i className="fas fa-plus" />
        </Button>
      </TitlePage>

      <ActivityList
        activities={activities}
        setActivityToUpdate={setActivityToUpdate}
        toggleConfirmModal={toggleConfirmModal}
      />

      <Modal show={showActivityModal} onHide={toggleActivityModal}>
        <Modal.Header closeButton>
          <Modal.Title>Atividade {activity.id !== 0 ? activity.title : ""}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <ActivityForm
            activities={activities}
            selectedActivity={activity}
            addActivity={addActivity}
            updateActivity={updateActivity}
            cancelActivity={cancelActivity}
          />
        </Modal.Body>
      </Modal>

      <Modal size="md" show={showConfirmModal} onHide={toggleConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Excluir Atividade {activity.id !== 0 ? activity.title : ""}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Você tem certeza que deseja excluir a atividade {activity.id} - {activity.title}?
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-outline-success me-2" onClick={() => deleteActivity(activity.id)}>
            <i className="fas fa-check me-2" />
            Sim
          </button>
          <button className="btn btn-danger me-2" onClick={() => toggleConfirmModal(0)}>
            <i className="fas fa-times me-2" />
            Não
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
