import { query } from "../config/db.js";

/**
 * GET /notifications
 * Get all notifications for the authenticated user
 */
export const getNotifications = async (req, res) => {
	try {
		const result = await query(
			`SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50`,
			[req.user.id],
		);
		res.json(result.rows);
	} catch (err) {
		console.error("Get notifications error:", err);
		res.status(500).json({ error: "Server error" });
	}
};

/**
 * POST /notifications/send
 * Create and send a notification
 */
export const sendNotification = async (req, res) => {
	try {
		const { title, message, type } = req.body;

		if (!title || !message) {
			return res.status(400).json({ error: "Title and message are required" });
		}

		const result = await query(
			`INSERT INTO notifications (user_id, title, message, type, is_read, created_at)
			 VALUES ($1, $2, $3, $4, false, NOW())
			 RETURNING *`,
			[req.user.id, title, message, type || "general"],
		);

		// TODO: Integrate Firebase Cloud Messaging (FCM) for push notifications
		// const fcmResult = await sendFCMNotification(req.user.fcm_token, title, message);

		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error("Send notification error:", err);
		res.status(500).json({ error: "Server error" });
	}
};

/**
 * PUT /notifications/:id/read
 * Mark a notification as read
 */
export const markAsRead = async (req, res) => {
	try {
		const { id } = req.params;

		const result = await query(
			`UPDATE notifications SET is_read = true WHERE id = $1 AND user_id = $2 RETURNING *`,
			[id, req.user.id],
		);

		if (result.rows.length === 0) {
			return res.status(404).json({ error: "Notification not found" });
		}

		res.json(result.rows[0]);
	} catch (err) {
		console.error("Mark as read error:", err);
		res.status(500).json({ error: "Server error" });
	}
};
