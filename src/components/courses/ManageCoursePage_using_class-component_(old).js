/* import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";

class ManageCoursePage extends React.Component {
  componentDidMount() {
    const { courses, authors, loadAuthors, loadCourses } = this.props;

    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Loading courses failed" + error);
      });
    }

    // if (this.props.authors.length === 0) {
    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading Authors failed" + error);
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Manage Course</h1>
      </div>
    );
  }
}

//function mapStatetoProps(state,ownProps)
function mapStatetoProps(state) {
  return {
    courses: state.courses,
    authors: state.authors
  };
}

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors
  /*
     if we do -> import {loadCourses} from "path" then instead of importing all the actions of the loadcourse we are being specific
     {loadCourses: loadCourses,
    loadAuthors: loadAuthors}
    Then
    as left hand == right hand
    {loadCourses,
    loadAuthors}
 
};

ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  //createCourse: PropTypes.func.isRequired
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired
};

//1.const coonectedstateandProps = connect(mapStatetoProps,mapDispatchToProps);
//2.  export default connectedstateandprops(ManageCoursePage);
// when combine 1 and 2 => export default connect(mapStatetoProps,mapDispatchToProps) (ManageCoursePage);
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(ManageCoursePage); */
