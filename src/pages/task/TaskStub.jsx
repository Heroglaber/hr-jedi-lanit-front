import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ProcessTitle from "../../components/processTitle/ProcessTitle";
import {useTaskStyles} from "./taskStyles";

const TaskStub = (props) => {
  const classes = useTaskStyles();
  const {task} = props;
  return (
    <form>
      <Card>
        <CardContent>
          <ProcessTitle {...props} isTitleNavigable={false}/>
          <Typography className={classes.stubText} component="span">
            Это форма-заглушка, необходимо:
            <ul>
              <li>Настроить для задачи ключ в Camunda - задача - Forms - Form Key. Сейчас настроено значение {`'${task.formKey || ""}'`}</li>
              <li>Настроить для ключа маппинг в компонент отрисовки в getTaskComponent.js</li>
            </ul>
          </Typography>
        </CardContent>
      </Card>
    </form>
  );
};

export default TaskStub;
