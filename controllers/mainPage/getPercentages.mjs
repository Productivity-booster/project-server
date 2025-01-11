import db from "../../database/db.mjs";

const getPercentage = async (req, res) => {
  const user_id = req.user.user_id;
  const { type } = req.params;

  if (!type) {
    return res.status(400).json({ message: "Please choose a type!" });
  }

  const interval = type === "weekly" ? 7 : 30; 
  const dateUnit = type === "weekly" ? "DAY" : "DAY"; 

  try {
    // Assignments
    const [overallAssignments] = await db
      .promise()
      .query(
        `SELECT COUNT(*) AS overallAssignments 
         FROM assignment_tracker 
         WHERE user_id = ? 
         AND due_date BETWEEN DATE_SUB(CURDATE(), INTERVAL ${interval} ${dateUnit}) 
                         AND DATE_ADD(CURDATE(), INTERVAL ${interval} ${dateUnit})`,
        [user_id]
      );

    const [completedAssignments] = await db
      .promise()
      .query(
        `SELECT COUNT(*) AS completedAssignments 
         FROM assignment_tracker 
         WHERE user_id = ? 
         AND due_date BETWEEN DATE_SUB(CURDATE(), INTERVAL ${interval} ${dateUnit}) 
                         AND DATE_ADD(CURDATE(), INTERVAL ${interval} ${dateUnit}) 
         AND status = 'Completed'`,
        [user_id]
      );

    const assignmentPercentage = ((completedAssignments[0].completedAssignments / overallAssignments[0].overallAssignments) * 100).toFixed(2);

      // Exams
    const [overallExams] = await db
    .promise()
    .query(
      `SELECT COUNT(*) AS overallExams 
       FROM exam_tracker 
       WHERE user_id = ? 
       AND date BETWEEN DATE_SUB(NOW(), INTERVAL ${interval} ${dateUnit}) 
                       AND DATE_ADD(NOW(), INTERVAL ${interval} ${dateUnit})`,
      [user_id]
    );

  const [completedExams] = await db
    .promise()
    .query(
      `SELECT COUNT(*) AS completedExams 
       FROM exam_tracker 
       WHERE user_id = ? 
       AND date BETWEEN DATE_SUB(NOW(), INTERVAL ${interval} ${dateUnit}) AND NOW() `,
      [user_id]
    );

    const examPercentage = overallExams[0].overallExams > 0 ? ((completedExams[0].completedExams / overallExams[0].overallExams) * 100).toFixed(2) : "0.00";

    // Chores
    const [overallChores] = await db
      .promise()
      .query(
        `SELECT COUNT(*) AS overallChores 
         FROM chores_tracker 
         WHERE user_id = ? 
         AND due_date BETWEEN DATE_SUB(CURDATE(), INTERVAL ${interval} ${dateUnit}) 
                         AND DATE_ADD(CURDATE(), INTERVAL ${interval} ${dateUnit})`,
        [user_id]
      );

    const [completedChores] = await db
      .promise()
      .query(
        `SELECT COUNT(*) AS completedChores 
         FROM chores_tracker 
         WHERE user_id = ? 
         AND due_date BETWEEN DATE_SUB(CURDATE(), INTERVAL ${interval} ${dateUnit}) 
                         AND DATE_ADD(CURDATE(), INTERVAL ${interval} ${dateUnit}) 
         AND status = 'Completed'`,
        [user_id]
      );


      const chorePercentage =
      overallChores[0].overallChores > 0 ? ((completedChores[0].completedChores / overallChores[0].overallChores) * 100).toFixed(2) : "0.00";
    


    return res.json({
      assignmentPercentage : assignmentPercentage,
      examPercentage : examPercentage,
      chorePercentage : chorePercentage
    });
  } catch (error) {
    console.error("Error fetching percentages:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export default getPercentage;
