import { Server } from "socket.io";

let io = null;

/**
 * Initialize Socket.io server on top of an HTTP server.
 * @param {import('http').Server} httpServer
 */
export const initSocket = (httpServer) => {
	io = new Server(httpServer, {
		cors: {
			origin: "*",
			methods: ["GET", "POST"],
		},
	});

	io.on("connection", (socket) => {
		console.log(`Socket connected: ${socket.id}`);

		// Join user-specific room for targeted updates
		socket.on("join", (userId) => {
			socket.join(`user_${userId}`);
			console.log(`Socket ${socket.id} joined room user_${userId}`);
		});

		// Listen for expense sync events
		socket.on("expense:updated", (data) => {
			// Broadcast to all devices of the same user
			if (data.userId) {
				socket.to(`user_${data.userId}`).emit("expense:sync", data);
			}
		});

		// Listen for dashboard refresh requests
		socket.on("dashboard:refresh", (data) => {
			if (data.userId) {
				socket.to(`user_${data.userId}`).emit("dashboard:update", data);
			}
		});

		socket.on("disconnect", () => {
			console.log(`Socket disconnected: ${socket.id}`);
		});
	});

	return io;
};

/**
 * Get the Socket.io instance (for emitting events from controllers).
 */
export const getIO = () => {
	if (!io) {
		throw new Error("Socket.io not initialized. Call initSocket first.");
	}
	return io;
};

/**
 * Emit an event to a specific user's room.
 * @param {number|string} userId
 * @param {string} event
 * @param {any} data
 */
export const emitToUser = (userId, event, data) => {
	if (io) {
		io.to(`user_${userId}`).emit(event, data);
	}
};
