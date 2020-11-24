import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Course from '../course';
import { SearchBar } from './searchBar';

// Styles
import styles from '../../../styles/FourYearPlan.module.css'

export default class CourseSearchBar extends React.Component {
    render() {
        return (
            <div className={styles.searchContainer}>
                <SearchBar />
                <Droppable droppableId={this.props.quarter.id}>
                    {// For droppable to work, its contents must be a function that returns a component
                    provided => (
                        <div 
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={styles.courseList}
                        >
                            {this.props.courses.map((course, index) => (
                                <Course key={course.id} course={course} index={index} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        );
    }
}