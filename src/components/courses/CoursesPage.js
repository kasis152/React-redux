import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursePage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };

  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch(error => {
        alert("Loading courses failed" + error);
      });
    }

    // if (this.props.authors.length === 0) {
    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert("Loading Authors failed" + error);
      });
    }
  }

  /* 
  handleDeleteCourse = course => {
    toast.success("Course Deleted"); // here we are sending the delete msg to user first then we will actuallu delete
    this.props.actions.deleteCourse(course).catch(error => {
      toast.error("Delete Failed " + error.message), { autoClose: false };
    });
  }; */

  //async/await method bata (it still uses promise behind the scene)
  handleDeleteCourse = async course => {
    toast.success("Course Deleted");
    try {
      this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete Failed " + error.message), { autoClose: false };
    }
  };

  render() {
    return (
      <div>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h1>Courses List</h1>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <div>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add course
            </button>
            <CourseList
              onDeleteClick={this.handleDeleteCourse}
              courses={this.props.courses}
            />
          </div>
        )}
      </div>
      /* 
        {this.props.courses.map(course => (
          <div key={course.title}>
            {course.title} WITH ID {course.id}
      */
    );
  }
}

CoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  //createCourse: PropTypes.func.isRequired
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

//function mapStatetoProps(state,ownProps)
function mapStatetoProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createCourse: course => dispatch(courseActions.createCourse(course))
    // we can use bindActionCreator and then wrap all the actions.betra ko jhamela sab affai wrap hunxa with dispatch.:
    // Lets rename it as action instead as later we will have many actions ,not only createcourse
    // when only 1 is there : actions: bindActionCreators(courseActions, dispatch)
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
}

//1.const coonectedstateandProps = connect(mapStatetoProps,mapDispatchToProps);
//2.  export default connectedstateandprops(coursePage);
// when combine 1 and 2 => export default connect(mapStatetoProps,mapDispatchToProps) (CoursePage);
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(CoursePage);
