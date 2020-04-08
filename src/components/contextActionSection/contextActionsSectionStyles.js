import {simplePageStyles} from "../../styles/simplePageStyles";
import {makeStyles} from "@material-ui/core/styles";

const contextActionsSectionStyles = theme => ({
  ...simplePageStyles(theme),
  previewActionsLabel: {
    height: 35,
    width: 190,
    marginTop: 20,
  },
  previewTileButtonsSection: {
    display: "flex",
    marginTop: 20,
  },
  previewTileButton: {
    height: 115,
    width: 120,
    marginLeft: theme.spacing(2),
  },
});

export const useContextActionsSectionStyles = makeStyles(contextActionsSectionStyles, {name: "ContextActionSection"});
