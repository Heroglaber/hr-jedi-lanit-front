import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ProcessTitle from "../../../components/processTitle/ProcessTitle";
import ContextActionsSection from "../../../components/contextActionSection/ContextActionsSection";
import {useTaskStyles} from "../taskStyles";
import CommonProcessInfo from "../../../components/processInfo/CommonProcessInfo";

const ActionSelector = ({actionByActionIdMap, currentAction, setCurrentAction, disabled = false, classes}) => (
  Object.keys(actionByActionIdMap).length > 1 &&
  <Select
    value={currentAction.id}
    onChange={e => setCurrentAction(actionByActionIdMap[e.target.value])}
    className={classes.selectAction}
    disabled={disabled}
  >
    {
      Object.entries(actionByActionIdMap)
        .map(actionIdAndAction => <MenuItem key={actionIdAndAction[0]} value={actionIdAndAction[0]}>{actionIdAndAction[1].name}</MenuItem>)
    }
  </Select>
);

const TaskHarnessView = (props) => {
  const {task, uiDescription, actionByActionIdMap, currentAction, setCurrentAction, history, isSubmitting} = props;
  const {actions, TaskProcessInfo} = uiDescription;

  const ProcessInfo = TaskProcessInfo || CommonProcessInfo;
  const {ComponentAction = () => <></>, ContextActions} = currentAction;

  const classes = useTaskStyles();
  return (
    <form>
      <Card classes={{root: classes.processCard}}>
        <CardContent>
          <ProcessTitle task={task} isTitleNavigable={false}/>
          <ProcessInfo task={task} history={history}/>
          <Typography variant="h4">{task.name}</Typography>
          <ActionSelector
            actions={actions}
            actionByActionIdMap={actionByActionIdMap}
            currentAction={currentAction}
            setCurrentAction={setCurrentAction}
            classes={classes}
            disabled={isSubmitting}
          />
          <ComponentAction {...props} actionId={currentAction.id}/>
          {ContextActions &&
          <ContextActionsSection>
            <ContextActions {...props}/>
          </ContextActionsSection>
          }
          {/*
          {error && <FormErrors classes={classes}>{error}</FormErrors>}

          */}
        </CardContent>
      </Card>
    </form>
  );

};

export default TaskHarnessView;
