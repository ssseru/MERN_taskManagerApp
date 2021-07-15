import axios from "axios";
import React, { Component } from "react";
import { Button, FormGroup, Label, Input, Form } from "reactstrap";

export default class Addtask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      description: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const task = {
      task: this.state.task,
      description: this.state.description,
    };
    const userid = this.props.id;
    axios.post("api/tasks/add/" + userid, task);
    this.setState({ task: "", description: "" });
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Label for="task">Task title:</Label>
          <Input
            type="text"
            id="task"
            name="task"
            value={this.state.task}
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description:</Label>
          <Input
            type="text"
            name="description"
            id="description"
            value={this.state.description}
            onChange={this.onChange}
          />
        </FormGroup>
        <br />
        <Button type="submit" value="submit" color="primary">
          Add task
        </Button>
      </Form>
    );
  }
}
