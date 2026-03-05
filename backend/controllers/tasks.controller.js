const listTasks = async (req, res) => {
    try {
        const { filter } = req.params
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const query = {}

        if (req.user.role === "MANAGER") {
            query.assigned_by = req.user._id

            switch (filter) {
                case "assigned":
                    query.assigned_to = { $ne: null }
                    break

                case "unassigned":
                    query.assigned_to = null
                    break

                case "closed":
                    query.status = "COMPLETED"
                    break

                default:
                    return res.status(400).json({ message: "Invalid filter" })
            }
        } else if (req.user.role === "EMPLOYEE") {
            query.assigned_to = req.user._id

            switch (filter) {
                case "upcoming":
                    query.start_date = { $gt: new Date() }
                    query.status = { $ne: "COMPLETED" }
                    break

                case "due":
                    query.due_date = { $lte: new Date() }
                    query.status = { $ne: "COMPLETED" }
                    break

                case "completed":
                    query.status = "COMPLETED"
                    break

                default:
                    return res.status(400).json({ message: "Invalid filter" })
            }
        }

        const tasks = await Task.paginate(query, {
            page,
            limit,
            sort: { createdAt: -1 },
            populate: ["assigned_to", "assigned_by"],
        })

        res.status(200).json({
            success: true,
            data: tasks.docs,
            pagination: {
                total: tasks.totalDocs,
                page: tasks.page,
                limit: tasks.limit,
                totalPages: tasks.totalPages,
            },
        });
    } catch (err) {
        console.log("Error while fetching tasks: ", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

const getTaskById = async (req, res) => { }

const searchTask = async (req, res) => { }

module.exports = { listTasks }
