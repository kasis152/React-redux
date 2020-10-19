import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class CoursePage extends React.Component {
  /*   constructor(props) {
      super(props);   
      this.state = {
        course: {
          title: ""
        }
      };
      this.handleChange = this.handleChange.bind(this); */
  state = {
    course: {
      title: ""
    }
  };

  /* 
    handleChange(event) {
      const course = { ...this.state.course, title: event.target.value };
      // can be written as this.setState({course : course});
      this.setState({ course });
    } */

  handleChange = event => {
    const course = { ...this.state.course, title: event.target.value };
    // can be written as this.setState({course : course});
    this.setState({ course });
  };

  handleSubmit = event => {
    /*  event.preventDefault();
        alert(this.state.course.title); */
    event.preventDefault();
    this.props.actions.createCourse(this.state.course);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Courses</h1>
        <h3>Add courses</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <input type="submit" value="save" />
        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

//function mapStatetoProps(state,ownProps)
function mapStatetoProps(state) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createCourse: course => dispatch(courseActions.createCourse(course))
    // we can use bindActionCreator and then wrap all the actions.betra ko jhamela sab affai wrap hunxa with dispatch.:
    // Lets rename it as action instead as later we will have many actions ,not only createcourse
    actions: bindActionCreators(courseActions, dispatch)
  };
}

CoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  //createCourse: PropTypes.func.isRequired
  actions: PropTypes.object.isRequired
};

//1.const coonectedstateandProps = connect(mapStatetoProps,mapDispatchToProps);
//2.  export default connectedstateandprops(coursePage);
// when combine 1 and 2 => export default connect(mapStatetoProps,mapDispatchToProps) (CoursePage);
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(CoursePage);
