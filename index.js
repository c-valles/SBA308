// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript",
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50,
        course_id: 451,
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150,
        course_id: 451,
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500,
        course_id: 451,
      },
    ],
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47,
      },
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150,
      },
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400,
      },
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39,
      },
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140,
      },
    },
  ];
  
  function getLearnerData(course, ag, submissions) {
    const result = [
      {
        id: 125,
        avg: 0.985, // (47 + 150) / (50 + 150)
        1: 0.94, // 47 / 50
        2: 1.0 // 150 / 150
      },
      {
        id: 132,
        avg: 0.82, // (39 + 125) / (50 + 150)
        1: 0.78, // 39 / 50
        2: 0.833 // late: (140 - 15) / 150
      }
    ];
  
    function calculatePercentage(score, points_possible) {
      return (score / points_possible) * 100;
    }
  
    for (const submission of submissions) {
      const learner_id = submission.learner_id;
      const assignment_id = submission.assignment_id;
      const assignment = ag.assignments.find(a => a.id === assignment_id);
  
      if (!assignment) {
        console.log("Invalid assignment ID:", assignment_id);
        continue;
      }

      console.log("Assignment:", assignment);
      console.log("Course ID:", CourseInfo.id);
      console.log("Type of assignment.course.id:", typeof assignment.course);
      console.log("Type of course.id:", typeof CourseInfo.id);


      if(assignment.course_id !== course.id) {
        console.log("Assignment does not belong to the provided course:", assignment)
        continue;
      }
      
  
      const points_possible = assignment.points_possible;
      const score = submission.submission.score;
      const due_at = new Date(assignment.due_at);
      const submitted_at = new Date(submission.submission.submitted_at);
  
      if (submitted_at <= due_at) {
        const latePenalty = submitted_at > due_at ? 0.1 * points_possible : 0;
        const adjustedScore = Math.max(0, score - latePenalty);
  
        let learnerData = result.find(data => data.id === learner_id);
        if (!learnerData) {
          learnerData = { id: learner_id };
          result.push(learnerData);
        }
  
        learnerData[assignment_id] = calculatePercentage(adjustedScore, points_possible);
      }
    }
  
    for (const learnerData of result) {
      let totalScore = 0;
      let totalPointsPossible = 0;
  
      for (const assignment_id of Object.keys(learnerData)) {
        if (assignment_id !== "id") {
          totalScore += learnerData[assignment_id];
          totalPointsPossible += ag.assignments.find(a => a.id == assignment_id).points_possible;
        }
      }

      learnerData.avg = totalScore / totalPointsPossible;
    }

    return result;
  }

  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
  console.log(result);
  