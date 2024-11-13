import React from "react";
import ItemActivity from "./ItemActivity";

export default function ActivityList(props) {
  return (
    <div className="mt-3">
      {props.activities.map((activity) => (
        <ItemActivity
          key={activity.id}
          activity={activity}
          toggleConfirmModal={props.toggleConfirmModal}
          setActivityToUpdate={props.setActivityToUpdate}
        />
      ))}
    </div>
  );
}
