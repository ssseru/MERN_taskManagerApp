import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Addtask from "./AddTask";
import axios from "axios";
import { Card, Button } from "reactstrap";

function Dashboard(props) {
  const [t, setT] = useState([]);
  const { user } = props.auth;

  useEffect(() => {
    axios.get("api/tasks/" + props.auth.user.id).then((res) => {
      const r = res.data;
      setT([...r]);
    });
  });

  const handleRemove = (id) => {
    axios.delete("api/tasks/" + id).then((res) => {});
  };

  const onLogoutClick = (e) => {
    e.preventDefault();
    props.logoutUser();
  };

  return (
    <div style={{ height: "75vh" }} className="container ">
      <div className="row">
        <div className="col m6 center-align">
          <h4>
            <b>Hey there,</b> {user.name.split(" ")[0]}
            <p className="flow-text grey-text text-darken-1">Add a new Task </p>
          </h4>
          <div>
            <Addtask id={props.auth.user.id} />
            <br />
            <br />
            <br />
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              onClick={onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable red accent-3"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="col m6 center-align">
          <div>
            {t.length > 0 ? (
              t.map((task) => (
                <div className="container" key={task._id}>
                  <Card style={{ background: "papayawhip" }}>
                    <div>
                      Task title:<b> {task.task}</b>
                      <br />
                      Description: {task.description}
                      <br />
                    </div>
                    <Button
                      style={{
                        width: "auto",
                        borderRadius: "3px",
                      }}
                      className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                      color="primary"
                      onClick={() => {
                        handleRemove(task._id);
                      }}
                    >
                      Mark as completed
                    </Button>
                  </Card>
                  <br />
                </div>
              ))
            ) : (
              <p>No tasks have been added</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Dashboard);
