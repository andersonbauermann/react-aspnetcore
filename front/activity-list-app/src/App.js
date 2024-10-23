import "./App.css";
import { useEffect, useState } from "react";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import api from "./api/activity";

function App() {
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState({ id: 0 });

  const getAllActivities = async () => {
    const response = await api.get("activity");
    return response.data;
  };

  useEffect(() => {
    const getActivities = async () => {
      const allActivities = await getAllActivities();
      if (allActivities) setActivities(allActivities);
    };
    getActivities();
  }, []);

  async function addActivity(activ) {
    const response = await api.post("activity", activ);
    setActivities([...activities, response.data]);
  }

  async function updateActivity(activ) {
    const response = await api.put(`activity/${activ.id}`, activ);
    const { id } = response.data;
    setActivities(activities.map((item) => (item.id === id ? response.data : item)));
    setActivity({ id: 0 });
  }

  async function deleteActivity(id) {
    const deleteSuccess = await api.delete(`activity/${id}`);
    if (deleteSuccess) {
      const filteredActivities = activities.filter((activity) => activity.id !== id);
      setActivities([...filteredActivities]);
    }
  }

  function cancelActivity() {
    setActivity({ id: 0 });
  }

  function setActivityToUpdate(id) {
    const activity = activities.filter((activity) => activity.id === id);
    setActivity(activity[0]);
  }

  return (
    <>
      <ActivityForm
        activities={activities}
        selectedActivity={activity}
        addActivity={addActivity}
        updateActivity={updateActivity}
        cancelActivity={cancelActivity}
      />
      <ActivityList activities={activities} deleteActivity={deleteActivity} setActivityToUpdate={setActivityToUpdate} />
    </>
  );
}

export default App;
