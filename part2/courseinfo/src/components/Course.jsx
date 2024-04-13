
const Header = ({ name }) => {
    return (
        <div>
            <h1>{name}</h1>
        </div>
    );
};

const Part = ({ part }) => {
    return (
        <div>
            <p>{part.name} {part.exercises}</p>
        </div>
    );
};

const Content = ({ parts }) => {
    const differentParts = parts.map(part => <Part key={part.id} part={part} />);
    return (
        <div>
            {differentParts}
        </div>
    );
};

const Total = ({ parts }) => {
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
        <div>
            <p>
                total of {totalExercises} exercises
            </p>
        </div>
    );
};

const Course = ({ course }) => {
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    );
};

export default Course;
