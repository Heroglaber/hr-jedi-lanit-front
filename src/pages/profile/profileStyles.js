import {makeStyles} from "@material-ui/core/styles";

const profileStyles = () => ({
  imageInput: {
    width: 250,
  }
});

export const useProfileStyles = makeStyles(profileStyles, {name: "Profile"});
