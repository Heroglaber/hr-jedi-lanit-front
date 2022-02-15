import {makeStyles} from "@material-ui/core/styles";

const profileStyles = () => ({
  imageInput: {
    width: 250,
    cursor: 'pointer'
  }
});

export const useProfileStyles = makeStyles(profileStyles, {name: "Profile"});
