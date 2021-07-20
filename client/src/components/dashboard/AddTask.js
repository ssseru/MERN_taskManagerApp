import axios from "axios";
import React, { useState } from "react";
import { Button, FormGroup, Label, Input, Form } from "reactstrap";

export default function AddTask(props) {
  const [t, setT] = useState("");
  const [d, setD] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    const x = {
      task: t,
      description: d,
    };
    const userid = props.id;
    axios.post("api/tasks/add/" + userid, x);
    setT("");
    setD("");
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label for="task">Task title:</Label>
        <Input
          type="text"
          id="task"
          name="task"
          value={t}
          onChange={(e) => setT(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="description">Description:</Label>
        <Input
          type="text"
          name="description"
          id="description"
          value={d}
          onChange={(e) => setD(e.target.value)}
        />
      </FormGroup>
      <br />
      <Button type="submit" value="submit" color="primary">
        Add task
      </Button>
    </Form>
  );
}
