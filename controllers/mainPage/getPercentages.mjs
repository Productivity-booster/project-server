import db from "../../database/db.mjs";

const getPercentages = async (req, res) => {
  const { type } = req.params;
  const user_id = req.user.user_id;

  if (!type) {
    return res.json({ message: "Please choose a type!" });
  }

  const range = type === "weekly" ? 3 : 15;

  try {
    // Total assignments within the range
    const [overallAssignmentCount] = await db.promise().query(
      `SELECT COUNT(*) AS total 
           FROM assignment_tracker 
           WHERE due_date BETWEEN DATE_SUB(CURDATE(), INTERVAL ? DAY) AND DATE_ADD(CURDATE(), INTERVAL ? DAY) AND user_id = ?`,
      [range, range, user_id]
    );

    // Completed assignments within the range
    const [completedAssignmentCount] = await db.promise().query(
      `SELECT COUNT(*) AS completed 
           FROM assignment_tracker 
           WHERE due_date BETWEEN DATE_SUB(CURDATE(), INTERVAL ? DAY) AND DATE_ADD(CURDATE(), INTERVAL ? DAY )
           AND status = 'Completed'
           AND user_id = ?`,
      [range, range, user_id]
    );

    console.log(overallAssignmentCount, completedAssignmentCount);

    return res.json({
      total: overallAssignmentCount[0].total,
      completed: completedAssignmentCount[0].completed,
    });
  } catch (error) {
    console.error("Error fetching percentages:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export default getPercentages;
