import "./App.css";
import { useState } from "react";
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
  const [activities, setActivities] = useState(initialState);

  function addActivity(event) {
    event.preventDefault();

    const activity = {
      id: document.getElementById("id").value,
      priority: document.getElementById("priority").value,
      title: document.getElementById("title").value,
      description: document.getElementById("description").value
    };

    setActivities([...activities, { ...activity }]);
  }

  function deleteActivity(id) {
    const filteredActivities = activities.filter((activity) => activity.id !== id);
    setActivities([...filteredActivities]);
  }

  return (
    <>
      <ActivityForm activities={activities} addActivity={addActivity} />
      <ActivityList activities={activities} deleteActivity={deleteActivity} />
    </>
  );
}

export default App;
