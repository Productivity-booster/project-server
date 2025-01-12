import db from "../../database/db.mjs";

const getAllNotification = async (req, res) => {
  const now = new Date();
  const user_id = req.user.user_id;

  try {
    const [exams] = await db
      .promise()
      .query(
        "SELECT exam_name AS exam_name, date AS exam_date from exam_tracker WHERE user_id = ? ",
        [user_id]
      );

    const [assignments] = await db
      .promise()
      .query(
        "SELECT title AS assignment_name, due_date AS assignment_duedate from assignment_tracker WHERE user_id = ?",
        [user_id]
      );

    const [events] = await db
      .promise()
      .query(
        `SELECT title AS event_name, event_date, start_time, end_time from events WHERE event_date > ? AND user_id = ? `,
        [now, user_id]
      );

    return res.json({ user_id: user_id, exams: exams, assignments: assignments, events: events });
  } catch (error) {
    return res.status(500).send("Server Error!");
  }
};

export default getAllNotification;