import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Addtask from "./Addtask";
import axios from "axios";
import { Card, Button } from "reactstrap";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    axios.get("api/tasks/" + this.props.auth.user.id).then((res) => {
      // console.log(res.data);
      const tasks = res.data;
      this.setState({ tasks: [...tasks] });
    });
  }

  componentDidUpdate() {
    axios.get("api/tasks/" + this.props.auth.user.id).then((res) => {
      const tasks = res.data;
      this.setState({ tasks: [...tasks] });
    });
  }

  handleRemove = (id) => {
    axios.delete("api/tasks/" + id).then((res) => {
      // console.log("Task deleted!!!");
    });
  };

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    const tasksList = this.state.tasks.map((task) => (
      <div className="container" key={task._id}>
        <Card style={{ background: "white" }}>
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
              this.handleRemove(task._id);
            }}
          >
            Mark as completed
          </Button>
        </Card>
        <br />
      </div>
    ));
    return (
      <div style={{ height: "75vh" }} className="container ">
        <div className="row">
          <div className="col s6 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                Add a new Task{" "}
              </p>
            </h4>
            <div>
              <Addtask id={this.props.auth.user.id} />
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
                onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable red accent-3"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="col s6 center-align">
            <div>
              {tasksList.length > 0 ? (
                <div>
                  <b>To do:</b> <p>{tasksList}</p>
                </div>
              ) : (
                <p>No tasks have been added </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Dashboard);
