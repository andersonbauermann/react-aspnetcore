import "./App.css";
import { useEffect, useState } from "react";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";

let initialState = [
  {
    id: 1,
    priority: "1",
    title: "Título 1",
    description: "AAA"
  },
  {
    id: 2,
    priority: "2",
    title: "Título 2",
    description: "BBB"
  }
];

function App() {
  const [index, setIndex] = useState(0);
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState({ id: 0 });

  useEffect(() => {
    activities.length <= 0
      ? setIndex(1)
      : setIndex(
          Math.max.apply(
            Math,
            activities.map((ativ) => ativ.id)
          ) + 1
        );
  }, [activities]);

  function addActivity(activ) {
    setActivities([...activities, { ...activ, id: index }]);
  }

  function updateActivity(activ) {
    setActivities(activities.map((item) => (item.id === activ.id ? activ : item)));
    setActivity({ id: 0 });
  }

  function deleteActivity(id) {
    const filteredActivities = activities.filter((activity) => activity.id !== id);
    setActivities([...filteredActivities]);
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
