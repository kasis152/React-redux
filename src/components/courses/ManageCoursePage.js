import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
// import { saveCourse } from "../../api/courseApi";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Loading courses failed" + error);
      });
    } else {
      setCourse({ ...props.course });
    }

    // if (this.props.authors.length === 0) {
    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading Authors failed" + error);
      });
    }
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) {
      return; // if the form is not valid then simple return
    }
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("Course Saved .");
        history.push("/courses");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
    //saveCourse(course);
  }

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    // Form will be valid if error object will have no properties
    return Object.keys(errors).length === 0;
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      errors={errors}
      course={course}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

export function getCoursesBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

//function mapStatetoProps(state,ownProps)
function mapStatetoProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCoursesBySlug(state.courses, slug)
      : newCourse;
  return {
    course: course,
    courses: state.courses,
    authors: state.authors
  };
}

const mapDispatchToProps = {
  /*  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,     if we import * from courseAction from "path" but we can be more consise too*/
  loadCourses,
  loadAuthors,
  saveCourse
  /*
       if we do -> import {loadCourses} from "path" then instead of importing all the actions of the loadcourse we are being specific
       {loadCourses: loadCourses,
      loadAuthors: loadAuthors}
      Then
      as left hand == right hand
      {loadCourses,
      loadAuthors}
   */
};

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  //createCourse: PropTypes.func.isRequired
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

//1.const coonectedstateandProps = connect(mapStatetoProps,mapDispatchToProps);
//2.  export default connectedstateandprops(ManageCoursePage);
// when combine 1 and 2 => export default connect(mapStatetoProps,mapDispatchToProps) (ManageCoursePage);
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(ManageCoursePage);
